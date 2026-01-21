import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { FaSun, FaMoon, FaHome, FaTable, FaMapMarkedAlt } from 'react-icons/fa';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    // Styl dla aktywnego linku w react-router-dom v6+
    const activeLinkStyle = {
        transform: 'scale(1.1)',
        fontWeight: 'bold',
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-gradient shadow-lg mb-4">
            <div className="container">
                <NavLink className="navbar-brand fw-bold" to="/">
                   Smart Home
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                                <FaHome className="me-1" /> Strona Główna
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dane" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                                <FaTable className="me-1" /> Urządzenia
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/pokoje" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                                <FaMapMarkedAlt className="me-1" /> Pokoje
                            </NavLink>
                        </li>
                    </ul>
                    <button className="btn btn-outline-light rounded-circle p-2 lh-1" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;