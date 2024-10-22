# ثمار | Thamra

تطبيق ويب يصحّح تلاوة القرآن الكريم صوتيًا.

## الفكرة

المستخدم يختار السورة ونطاق الآيات ويسجّل تلاوته. التطبيق يحوّل الصوت إلى نص عبر Google Speech-to-Text، يقارنه بالنص الأصلي للآيات، ويعرض النتيجة ملوّنة: الكلمات الزائدة والناقصة والصحيحة.

## التقنيات

- **Client:** React 18، Vite، Tailwind CSS
- **Server:** Node.js، Express، MySQL، JWT، bcrypt

## الإعداد

### Server

    cd Server
    npm install
    node index.js

انسخ `.env.example` إلى `.env` واملأ القيم:
`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `GOOGLE_APPLICATION_CREDENTIALS`

### Client

    cd Client/thamra
    npm install
    npm run dev

يتطلب أيضًا ملف مفتاح Google Cloud (`key.json`) وقاعدة بيانات MySQL محلية بجدول `users`.

## ملاحظة

هذا المشروع نتاج هاكاثون بمدة 72 ساعة. الكود يعكس قيود ذلك الوقت.