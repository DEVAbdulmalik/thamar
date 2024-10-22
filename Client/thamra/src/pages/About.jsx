import React from 'react'
import Nav from '../components/Nav'

export default function About() {
    const Username = 'عبدالملك'
    return (
        <>
            <Nav loc='Home'></Nav>
            <img
                src="http://localhost:3000/assets/images/particles.png"
                alt="particles"
                className="absolute top-0 right-0 -z-30"
            />

            <div className='absolute font-extrabold text-xl w-full justify-center items-center top-24 px-4 flex'>
            
                <div className='absolute right-0 flex items-center'>
                    <img src="http://localhost:3000/assets/images/icons/android-192x192.png" alt="logo" className='h-24' />
                    أهلا! {Username}
                </div>
                <div className='points flex px-7 bg-[#f2f2f29f] text-gray-500  rounded-2xl absolute left-10 text-center '>
                <img
                    src="http://localhost:3000/assets/images/points.png"
                    alt="points"
                    className="absolute top-1/2 mt-1 transform -translate-y-1/2 h-10 -left-6 z-30"
                />
                    <span className='z-20'>0</span>
                    <div className='absolute w-[115%] rounded-2xl h-[118%] bg-[#F1D8C2] shadow-md shadow-gray-500 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    </div>
                </div>
            </div>

            <div className='bg-[#F1D8C2] w-full h-96 absolute bottom-[20rem] -z-20 rounded-tl-[10rem] shadow-inner shadow-gray-500'>
                <div className='title py-2 relative w-52 text-black font-extrabold rounded-2xl shadow-md shadow-gray-500 bg-[#C2C5AA] mt-5 mr-5 text-center text-2xl'>
                    <h1>
                        مصحح ثمار
                    </h1>
                    <div className='absolute w-[103%] rounded-2xl h-[112%] bg-white -z-10 top-1/2 left-1/2 shadow-md shadow-gray-500 transform -translate-x-1/2 -translate-y-1/2'></div>
                </div>
                <div className='w-96 mt-10 mr-3 font-bold'>
                    أداة مصحح التلاوة صممت لتساعدك فهي تقوم بكتابة الأخطاء المتواجدة في تلاوتك لتصحهها.
                </div>
            </div>
            <div className='bg-[#C2C5AA] w-full h-[30rem] absolute bottom-[0rem] -z-10 border-white border-l-8 border-t-8 rounded-tl-[10rem]'>
                <div className='title py-2 relative w-52 text-black font-extrabold rounded-2xl shadow-md shadow-gray-500 bg-[#F1D8C2] mt-5 mr-5 text-center text-2xl'>
                    <h1>
                        حلقات ثمار
                    </h1>
                    <div className='absolute w-[103%] rounded-2xl h-[112%] bg-white -z-10 top-1/2 left-1/2 shadow-md shadow-gray-500 transform -translate-x-1/2 -translate-y-1/2'></div>
                </div>
                <div className='w-96 mt-10 mr-3 font-bold'>
                    حلقات ثمار هي حلقات قرآنية تمكن الطالب من الدخول الى حلقات عامة وخاصة تهدف الى تحسين قراءتهم وتعزيز مستواهم ، حيث توفر الاداة فرصة للمعلم لتوجيه الطلاب وإدارة واجبات إضافية لتعزيز تقدمهم خلال حلقات ثمار.
                </div>
            </div>
        </>
    )
}