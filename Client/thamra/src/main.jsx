import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import './styles.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import About from './pages/About'
import Corrector from './pages/Corrector'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Home" element={<About />} />
                    <Route path="/Corrector" element={<Corrector />} />
            </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);