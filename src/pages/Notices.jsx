import { FileText, Download, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Notices.css';

const Notices = () => {
    const { notices } = useData();
    return (
        <div className="notices-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Notice Board</h1>
                    <p className="page-subtitle">Stay updated with the latest announcements regarding academic schedules, scholarships, and departmental activities.</p>
                </div>
            </div>

            <section className="section">
                <div className="container notices-container">
                    {notices.map((notice) => (
                        <div key={notice.id} className="notice-card glass animate-fade-in">
                            <div className="notice-icon">
                                <FileText size={32} />
                            </div>
                            <div className="notice-content">
                                <div className="notice-date">{new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                <h3 className="notice-title">{notice.title}</h3>
                                <div className="notice-tags">
                                    <span className="notice-tag">{notice.type}</span>
                                </div>
                            </div>
                            <div className="notice-actions">
                                <a href={notice.link} className="btn-icon" title="View/Download">
                                    {notice.type === 'Link' ? <ExternalLink size={20} /> : <Download size={20} />}
                                </a>
                            </div>
                        </div>
                    ))}

                    <div className="text-center mt-8">
                        <button className="btn btn-outline">View Archived Notices</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Notices;
