import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { FaSun, FaMoon, FaMapMarkedAlt, FaMicrochip, FaHome } from 'react-icons/fa';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark gradient shadow-lg mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">Smart Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><FaHome className="me-1" />Strona Główna</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dane"><FaMicrochip className="me-1" />Urządzenia</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pokoje"><FaMapMarkedAlt className="me-1" /> Pokoje</Link>
                        </li>
                    </ul>
                    <button 
                        className={`btn btn-outline-${theme === 'light' ? 'dark' : 'light'} rounded-circle`} 
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
