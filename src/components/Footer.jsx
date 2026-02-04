import './Footer.css';
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">HUMUS</h3>
                    <p className="footer-desc">
                        A Community of Soil, Water & Environment Department,<br />
                        Dr. Muhammad Shahidullah Hall, University of Dhaka.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/notices">Notices</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/alumni">Alumni</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Contact Us</h4>
                    <div className="contact-item">
                        <MapPin size={16} />
                        <span>Dr. Muhammad Shahidullah Hall, DU</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={16} />
                        <span>info@humus-du.com</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={16} />
                        <span>+880 1234 567890</span>
                    </div>
                    <div className="social-links">
                        <a href="https://www.facebook.com/profile.php?id=61586758424938" target="_blank" rel="noreferrer"><Facebook /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} HUMUS. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
