
import React, { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPlay } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function About() {
    const [inputValue, setInputValue] = useState(1);
    const [inputValue2, setInputValue2] = useState(2);
    const [surahs, setSurahs] = useState({});
    const [isRecording, setIsRecording] = useState(false);
    const [selectedSurah, setSelectedSurah] = useState('');
    const [result, setResult] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        function removeArabicDiacritics(text) {
            text = text.replace(/ٱ/g, 'ا');
            return text.replace(/[\u064B-\u0652\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '');
        }
        axios.get('https://api.alquran.cloud/v1/quran/ar.alafasy')
            .then(response => {
                const fetchedSurahs = {};
                response.data.data.surahs.forEach(element => {
                    fetchedSurahs[element.number] = removeArabicDiacritics(element.name.replace('سُورَةُ ', ''));
                });
                setSurahs(fetchedSurahs);
            })
            .catch(error => console.log(error));
    }, []);

    const handleChange = (event) => setInputValue(event.target.value);
    const handleChange2 = (event) => setInputValue2(event.target.value);
    const handleSurahChange = (event) => setSelectedSurah(event.target.value);

    const uploadAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.mp3');
        formData.append('surah', selectedSurah);
        formData.append('fromAyah', inputValue)
        formData.append('toAyah', inputValue2)
        try {
            const response = await axios.post('http://localhost:3001/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data.result)
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.ondataavailable = e => {
                    audioChunksRef.current.push(e.data);
                };
                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
                    uploadAudio(audioBlob);

                    audioChunksRef.current = [];
                };
                mediaRecorderRef.current.start();
                setIsRecording(true);
            })
            .catch(e => console.error(e));
    };
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };
    const handleRecording = () => isRecording ? stopRecording() : startRecording();

    return (
        <>
            <Nav loc='Corrector' />
            <div className='flex w-full justify-center mt-16 h-screen'>
                <main className='w-full'>
                    <img
                        src="http://localhost:3000/assets/images/particles.png"
                        alt="particles"
                        className="absolute top-0 right-0 z-20"
                    />
                    <div className='py-[0.6rem] w-[60%] mx-auto px-16 text-center shadow-md shadow-gray-500 rounded-md bg-[#DADCCC] font-extrabold text-xl'>مصحح التلاوة</div>
                    <div className='w-[90%] mt-16 bg-[#F6E7D9] z-30 mx-auto rounded-3xl h-[65%] relative shadow-md shadow-gray-500 border-gray-300'>
                        <button className='record rounded-full bg-white h-12 w-12 border-[5px] border-[#DADCCC] text-center absolute left-2 -top-5' onClick={handleRecording}>
                            <FontAwesomeIcon icon={faMicrophone} className={`${isRecording ? 'text-red-900' : 'text-gray-500'} text-[1.8rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
                        </button>
                        <div class='h-[40%] w-[100%]'>
                            <div class='flex flex-col justify-center gap-4 w-[100%] h-[100%] items-center'>
                                <div class='flex justify-center gap-4'>
                                    <div class='px-7 py-2 bg-[#DADCCC] rounded-md font-bold text-lg text-gray-500'>من</div>
                                    <div class='px-7 py-2 bg-[#DADCCC] rounded-md font-bold text-lg text-gray-500'>السورة</div>
                                    <div class='px-7 py-2 bg-[#DADCCC] rounded-md font-bold text-lg text-gray-500'>إلى</div>
                                </div>
                                <div class='flex justify-center gap-4'>
                                    <input
                                        className='w-[21%] py-2 bg-[#DADCCC] rounded-md font-bold text-lg text-gray-500 text-center'
                                        type='number'
                                        defaultValue={inputValue}
                                        onChange={handleChange}
                                    />
                                    <select className='px-[0.350rem] py-2 bg-[#DADCCC] rounded-md font-bold text-lg text-gray-500' onChange={handleSurahChange}>
                                        {Object.keys(surahs).map(key => (
                                            <option className='max-h-4' key={key} value={key}>{surahs[key]}</option>
                                        ))}
                                    </select>
                                    <input
                                        className='w-[21%] py-2 bg-[#DADCCC] rounded-md font-bold text-lg text-gray-500 text-center'
                                        type='number'
                                        defaultValue={inputValue2}
                                        onChange={handleChange2}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-[100%] h-[60%] absolute bottom-0 bg-[#DADCCC] flex justify-center rounded-3xl border-gray-300 shadow-md shadow-gray-500 border-4 -z-30'>
                            <div className='w-[95%] h-40 rounded-3xl border-[6px] border-gray-800 mt-8 bg-white font-bold text-center relative z-40'>
                                <button className='rounded-full bg-white h-12 w-12 border-[5px] border-[#F6E7D9] text-center absolute left-1 -top-9 z-50'>
                                    <FontAwesomeIcon icon={faPlay} className={` text-gray-500 text-[1.8rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
                                </button>
                                <span dangerouslySetInnerHTML={{ __html: result }}></span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
