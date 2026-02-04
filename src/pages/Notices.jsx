import { FileText, Download, ExternalLink, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Notices.css';

const Notices = () => {
    const { notices } = useData();
    const handleView = (e, notice) => {
        e.preventDefault();
        if (notice.link && notice.link.startsWith('data:')) {
            // Convert Base64 data URI to Blob to bypass browser security restrictions on top-frame navigation
            fetch(notice.link)
                .then(res => res.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    window.open(url, '_blank');
                })
                .catch(err => console.error("Error viewing file:", err));
        } else {
            // Normal URL
            window.open(notice.link, '_blank');
        }
    };

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
                            <div className="notice-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                                {notice.type === 'Link' ? (
                                    <a href={notice.link} target="_blank" rel="noopener noreferrer" className="btn-icon" title="Visit Link">
                                        <ExternalLink size={20} />
                                    </a>
                                ) : (
                                    <>
                                        <a href={notice.link} onClick={(e) => handleView(e, notice)} className="btn-icon" title="View">
                                            <Eye size={20} />
                                        </a>
                                        <a href={notice.link} download={`${notice.title}.pdf`} className="btn-icon" title="Download">
                                            <Download size={20} />
                                        </a>
                                    </>
                                )}
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
