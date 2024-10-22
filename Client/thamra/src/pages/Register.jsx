import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await axios.post('http://localhost:3001/register', { name, email, password });
            navigate('/login'); 
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <main>
                    <img
                        src="http://localhost:3000/assets/images/particles.png"
                        alt="particles"
                        className="absolute top-0 right-0 -z-10"
                    />
                    <div className="bg-light-beige p-4 rounded-2xl z-10 pr-12 pl-12">
                        <img
                            src="http://localhost:3000/assets/images/icons/android-192x192.png"
                            alt="logo"
                            className="mx-auto block h-32"
                        />
                        <h className='text-center block font-extrabold'>تسجيل كـ طالب</h>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-16 relative'>
                                <label className='font-bold'>الاسم:</label>
                                <br></br>
                                <input name='name' className='w-72 h-11 p-2 rounded-md mt-2 shadow-md bg-white/70 hover:outline-none'></input>
                                <div className='absolute text-white text-center text-xl leading-[2.75rem] w-10 h-11 bg-[#C2C5AA] left-0 top-8 rounded-l-lg'>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            </div>
                            <div className='mt-5 relative'>
                                <label className='font-bold'>البريد الاكتروني:</label>
                                <br></br>
                                <input name='email' className='w-72 h-11 p-2 rounded-md mt-2 shadow-md bg-white/70 hover:outline-none'></input>
                                <div className='absolute text-white text-center text-xl leading-[2.75rem] w-10 h-11 bg-[#C2C5AA] left-0 top-8 rounded-l-lg'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                            </div>
                            <div className='mt-5 relative'>
                                <label className='font-bold'>كلمة المرور:</label>
                                <br></br>
                                <input type='password' name='password' className='w-72 h-11 p-2 rounded-md mt-2 shadow-md bg-white/70 hover:outline-none'></input>
                                <div className='absolute leading-[2.75rem] text-white text-center text-xl w-10 h-11 bg-[#C2C5AA] left-0 top-8 rounded-l-lg'>
                                    <FontAwesomeIcon icon={faLock} />
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <button type='submit' className='h-11 p-2 text-white font-bold w-full  block text-center rounded-md mt-2 shadow-md bg-[#C2C5AA] hover:outline-none'>
                                تسجيل
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}