import React from 'react'

export default function Home() {
    return (
        <>
            <main className='relative'>
                <div>
                    <img
                        src="http://localhost:3000/assets/images/particles_line.png"
                        alt="particle_line"
                        className="absolute top-0 right-9"
                    />
                    <div className='circle w-[40rem] absolute top-[35rem] -left-[20rem] -z-10 bg-light-beige h-[40rem] rounded-full'></div>
                    <div className='circle w-[40rem] absolute -top-2 -right-[25rem] -z-10 bg-light-beige h-[40rem] rounded-full'></div>
                </div>
                <div className='absolute top-[32rem]  left-1/2 transform -translate-x-1/2  z-10' >
                    <img
                        src="http://localhost:3000/assets/images/icons/android-192x192.png"
                        alt="logo"
                        className='block mr-auto ml-auto'
                    />
                    <h className='font-extrabold whitespace-nowrap text-center block'>مساحة تعينك في حفظ كتاب الله عز وجل</h>
                    <a className='h-16 text-center shadow-black shadow-md bg-white w-80 rounded-lg mr-auto ml-auto block mt-5' href='/login'>
                        <h1 className='text-4xl leading-[4rem] font-extrabold'>ابدأ</h1>
                    </a>
                </div>
            </main>
        </>
    );
}