require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios').default;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const speech = require('@google-cloud/speech');
const app = express();
const diff = require('diff');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const client = new speech.SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});



app.post('/transcribe', upload.single('audio'), async (req, res) => {
    try {
        let numberSurah = req.body.surah - 1
        let fromAyah = req.body.fromAyah - 1
        let toAyah = req.body.toAyah - 1
        const audioFile = req.file;
        if (numberSurah == -1) {
            numberSurah = 0
        }
        if (fromAyah == -1) {
            fromAyah = 0
        }
        if (toAyah == -1) {
            toAyah = 0
        }
        if (!audioFile) {
            throw new Error('Missing audioFile parameter');
        }

        const response = await axios.get('https://api.alquran.cloud/v1/quran/ar.alafasy');
        let Ayahs = ''
        for (let index = fromAyah; index <= toAyah; index++) {
            Ayahs += `${index > fromAyah ? ' ' : ''}${removeArabicDiacritics(response.data.data.surahs[numberSurah].ayahs[index].text)}`;
        }
        let transcription = await SpeechtoText(audioFile);
        let result = ''
        const differences = diff.diffWords(Ayahs, transcription);
        differences.forEach(part => {
            if (part.added) {
                result +=  `<span class='text-red-500'>${part.value}</span> ` 
            } else if (part.removed) {
                result +=  `<span class='text-red-500'>${part.value}</span> ` 
            } else {
                result +=  part.value
            }
        });
        res.json({ result });
    } catch (error) {
        console.error(`Error processing request: ${error}`);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});


async function SpeechtoText(audioFile) {
    const filePath = path.join(__dirname, audioFile.path);
    const file = fs.readFileSync(filePath);
    const audioBytes = file.toString('base64');

    const audio = {
        content: audioBytes,
    };

    const config = {
        encoding: 'MP3',
        sampleRateHertz: 44100,
        languageCode: 'ar-SA',
        enableAutomaticPunctuation: true,
    };

    const request = {
        audio: audio,
        config: config,
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    fs.unlinkSync(filePath);
    return transcription.replace('.', '')
}

function removeArabicDiacritics(text) {
    text = text.replace(/[\u064B-\u0652\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '');
    text = text.replace(/ٱ/g, 'ا');
    text = text.replace(/أ/g, 'ا');
    return text
}

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'name, email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error('Error checking existing user:', err);
                return res.status(500).send({ message: 'An error occurred while registering the user' });
            }

            if (results.length > 0) {
                return res.status(409).send({ message: 'Email is already registered' });
            }

            db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword],
                (err) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(409).send({ message: 'Email is already registered' });
                        }
                        console.error('Error registering user:', err);
                        return res.status(500).send({ message: 'An error occurred while registering the user' });
                    }

                    res.send({ message: 'User registered successfully' });
                }
            );
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send({ message: 'An error occurred while registering the user' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const comparison = await bcrypt.compare(password, results[0].password);
            if (comparison) {
                const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
                    expiresIn: 86400 * 4
                });

                res.send({ auth: true, token: token });
            } else {
                res.send({ auth: false, message: 'Password does not match' });
            }
        } else {
            res.send({ auth: false, message: 'User not found' });
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
