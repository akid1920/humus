import { useData } from '../context/DataContext';
import { Mail, Linkedin, User } from 'lucide-react';
import './Alumni.css';

const Alumni = () => {
    const { alumni } = useData();

    return (
        <div className="container alumni-page section">
            <div className="section-header text-center">
                <h2>Our Alumni</h2>
                <div className="line"></div>
                <p>Distinguished graduates making an impact worldwide.</p>
            </div>

            {alumni.length > 0 ? (
                <div className="alumni-grid">
                    {alumni.map((alum) => (
                        <div key={alum.id} className="alumni-card">
                            <img
                                src={alum.image || 'https://via.placeholder.com/150'}
                                alt={alum.name}
                                className="alumni-image"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                            />
                            <div className="alumni-info">
                                <h3>{alum.name}</h3>
                                <span className="alumni-batch">Batch: {alum.batch}</span>
                                <div className="alumni-job">
                                    <strong>{alum.jobTitle}</strong>
                                    <br />
                                    {alum.company}
                                </div>
                                <div className="alumni-links">
                                    {alum.email && (
                                        <a href={`mailto:${alum.email}`} className="alumni-link email-link" title="Email">
                                            <Mail size={20} />
                                        </a>
                                    )}
                                    {alum.linkedIn && (
                                        <a href={alum.linkedIn} target="_blank" rel="noopener noreferrer" className="alumni-link" title="LinkedIn">
                                            <Linkedin size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center" style={{ padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>No alumni profiles added yet.</p>
                </div>
            )}
        </div>
    );
};

export default Alumni;
