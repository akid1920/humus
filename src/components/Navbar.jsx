import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/humus_logo.png';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Organization', path: '/organization' },
        { name: 'Notices', path: '/notices' },
        { name: 'Events', path: '/events' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Alumni', path: '/alumni' },
    ];

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="HUMUS Logo" className="navbar-logo-img" />
                    <span className="navbar-logo-text">HUMUS</span>
                </Link>

                <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.name} className="navbar-item">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
