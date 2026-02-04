import './About.css';
import { Target, Eye, Users, BookOpen } from 'lucide-react';
import historyImage from '../assets/humus_history.jpg';

const About = () => {
    return (
        <div className="about-page">
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1 className="animate-fade-in">About HUMUS</h1>
                    <p className="animate-fade-in">Learn about our history, mission, and the values that drive us.</p>
                </div>
            </section>

            {/* History Section */}
            <section className="section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Our History</h2>
                            <p>
                                Established with the vision of uniting the students of the Soil, Water, and Environment Department of Dr. Muhammad Shahidullah Hall, HUMUS has been a beacon of brotherhood and academic excellence for decades.
                            </p>
                            <p>
                                From humble beginnings as a small study circle, we have grown into a vibrant community that organizes seminars, cultural programs, and social welfare activities, fostering a spirit of cooperation among seniors and juniors.
                            </p>
                        </div>
                        <div className="about-image-placeholder p-0 border-0 overflow-hidden">
                            <img src={historyImage} alt="HUMUS History" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section bg-light">
                <div className="container">
                    <div className="mission-vision-grid">
                        <div className="mv-card">
                            <div className="mv-icon"><Target size={40} /></div>
                            <h3>Our Mission</h3>
                            <p>
                                To create a supportive environment where students can thrive academically and socially, bridging the gap between academic theory and practical application through seminars and workshops.
                            </p>
                        </div>
                        <div className="mv-card">
                            <div className="mv-icon"><Eye size={40} /></div>
                            <h3>Our Vision</h3>
                            <p>
                                To be the leading student organization at the University of Dhaka, known for producing capable, ethical, and visionary leaders in the field of environmental science.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center mb-lg">Core Values</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <Users size={32} />
                            <h4>Community</h4>
                            <p>We believe in the power of unity and brotherhood.</p>
                        </div>
                        <div className="value-item">
                            <BookOpen size={32} />
                            <h4>Excellence</h4>
                            <p>Striving for the highest standards in academics and leadership.</p>
                        </div>
                        {/* Add more values as needed */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
