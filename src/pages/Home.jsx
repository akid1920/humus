import { ArrowRight, Calendar, Users, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png'; // Re-using logo for hero graphic

const Home = () => {
    return (
        <div className="home">
            {/* Modern Hero Section */}
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content animate-fade-in">
                        <div className="hero-badge">Welcome to</div>
                        <h1 className="hero-title">
                            <span className="text-gradient">HUMUS</span> Community
                        </h1>
                        <p className="hero-subtitle">
                            The heartbeat of the Soil, Water, and Environment Department at Dr. Muhammad Shahidullah Hall, University of Dhaka.
                            <br />Building Brotherhood, Preserving History.
                        </p>
                        <div className="hero-actions">
                            <Link to="/about" className="btn btn-primary">
                                Discover Our Story <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <Link to="/notices" className="btn btn-outline">
                                Latest Notices
                            </Link>
                        </div>
                    </div>

                    <div className="hero-visual animate-float">
                        {/* Abstract circle or actual image */}
                        <div className="visual-circle-bg"></div>
                        <img src={logo} alt="HUMUS Emblem" className="hero-logo-large" />
                    </div>
                </div>
            </section>



            {/* Quick Access Grid */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="title-underline">Explore HUMUS</h2>
                        <p className="subtitle">Everything you need to know about our activities.</p>
                    </div>

                    <div className="features-grid">
                        <Link to="/about" className="feature-card glass">
                            <div className="icon-wrapper"><Users size={32} /></div>
                            <h3>Who We Are</h3>
                            <p>Learn about our mission, vision, and the legacy we carry forward.</p>
                        </Link>

                        <Link to="/events" className="feature-card glass">
                            <div className="icon-wrapper"><Calendar size={32} /></div>
                            <h3>Events & Seminars</h3>
                            <p>Join our academic seminars, cultural programs, and sports events.</p>
                        </Link>

                        <Link to="/notices" className="feature-card glass">
                            <div className="icon-wrapper"><Megaphone size={32} /></div>
                            <h3>Notice Board</h3>
                            <p>Stay updated with the latest announcements from the department.</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
