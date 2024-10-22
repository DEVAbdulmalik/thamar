import React from 'react'
import {
    Navbar,

} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faHouse, faClipboard, faPenToSquare, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Nav(loc) {
    const navList = (
        <ul className="mb-2 mt-2 flex w-full flex-row justify-center items-center z-10 text-xs text-black font-medium">
            <a className="flex flex-col items-center me-4 relative">
                <FontAwesomeIcon icon={faCrown} className="mb-2 text-lg" />
                قائمة المتصدرين
            </a>
            <a className="flex flex-col items-center me-4 relative">
                <FontAwesomeIcon icon={faClipboard} className="mb-2 text-lg" />
                حلقات ثمار
            </a>
            <a className="flex flex-col items-center me-4 relative" href='/Home'>
                {loc.loc == 'Home' ? (<div className="w-7 h-1 bg-[#815B5C] absolute -top-4 rounded-b-lg"></div>) : (<></>)}
                <FontAwesomeIcon icon={faHouse} className="mb-2 text-lg" />
                الرئيسية
            </a>
            <a className="flex flex-col items-center me-4 relative" href='/Corrector'>
                {loc.loc == 'Corrector' ? (<div className="w-7 h-1 bg-[#815B5C] absolute -top-4 rounded-b-lg"></div>) : (<></>)}
                <FontAwesomeIcon icon={faPenToSquare} className="mb-2 text-lg" />
                مصحح ثمار
            </a>
            <a className="flex flex-col items-center relative">
                <FontAwesomeIcon icon={faBars} className="mb-2 text-lg" />
                الاعدادات
            </a>
        </ul>
    );

    return (
        <Navbar className="mx-auto max-w-[95%] rounded-[1.1rem] shadow-sm shadow-black py-2 px-4 fixed bottom-[2%] left-1/2 transform -translate-x-1/2">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                {navList}
            </div>
        </Navbar>
    );
}