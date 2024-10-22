
import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate('/home');
        }
    }, [navigate]);
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            if (response.data.auth) {
                localStorage.setItem("token", response.data.token);
                navigate('/home');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
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
                        <h className='text-center block font-extrabold'>تسجيل دخول كـ طالب</h>
                        <form onSubmit={handleLogin}>
                            <div className='mt-16 relative'>
                                <label className='font-bold'>البريد الاكتروني:</label>
                                <br></br>
                                <input 
                                    name='email' 
                                    className='w-72 h-11 p-2 rounded-md mt-2 shadow-md bg-white/70 hover:outline-none'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                                <div className='absolute text-white text-center text-xl leading-[2.75rem] w-10 h-11 bg-[#C2C5AA] left-0 top-8 rounded-l-lg'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                            </div>
                            <div className='mt-5 relative'>
                                <label className='font-bold'>كلمة المرور:</label>
                                <br></br>
                                <input
                                    name='password' 
                                    type='password' 
                                    className='w-72 h-11 p-2 rounded-md mt-2 shadow-md bg-white/70 hover:outline-none'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></input>
                                <div className='absolute leading-[2.75rem] text-white text-center text-xl w-10 h-11 bg-[#C2C5AA] left-0 top-8 rounded-l-lg'>
                                    <FontAwesomeIcon icon={faLock} />
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <button type="submit" className='h-11 p-2 text-white font-bold w-full  block text-center rounded-md mt-2 shadow-md bg-[#C2C5AA] hover:outline-none'>
                                تسجيل الدخول
                            </button>
                        </form>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-full h-px my-8 border-0 bg-black" />
                            <span className="absolute px-3 font-medium text-gray-900 bg-light-beige -translate-x-1/2  left-1/2 ">او</span>
                        </div>
                        <a href='/register' className='h-11 p-2 font-bold w-full block text-center rounded-md mt-2 border border-[#815B5C] text-[#815B5C] bg-transparent hover:outline-none'>
                            تسجيل جديد
                        </a>
                    </div>
                </main>
            </div>
        </>

    );
}
