import { useState } from 'react';
import { Plus, Trash2, FileText, Download, Search, Edit, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const AdminNotices = () => {
    const { notices, addNotice, deleteNotice, updateNotice } = useData();

    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', date: '', link: '', type: 'File' });
    const [editingId, setEditingId] = useState(null);

    const [fileError, setFileError] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this notice?')) {
            deleteNotice(id);
        }
    };

    const handleEdit = (notice) => {
        setNewItem({
            title: notice.title,
            date: notice.date,
            link: notice.link || notice.url || '',
            type: notice.type || 'Link'
        });
        setEditingId(notice.id);
        setShowForm(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setFileError('File size exceeds 10MB.');
            return;
        }
        setFileError('');

        const reader = new FileReader();
        reader.onloadend = () => {
            setNewItem(prev => ({ ...prev, link: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId && !newItem.link) {
            // If editing and no new link/file, keep old one (handled in update logic usually, 
            // but here we might need to be careful if we cleared it. 
            // We'll assume if it's preserved, link is not empty/null in state)
        } else if (!newItem.link) {
            setFileError('Please upload a file.');
            return;
        }

        const noticeType = 'File';

        if (editingId) {
            updateNotice({
                id: editingId,
                ...newItem,
                type: noticeType
            });
            setEditingId(null);
        } else {
            const newId = notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1;
            addNotice({ id: newId, ...newItem, type: noticeType });
        }

        setNewItem({ title: '', date: '', link: '', type: 'Link' });
        setUseFileUpload(false);
        setFileError('');
        setShowForm(false);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Manage Notices</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setNewItem({ title: '', date: '', link: '', type: 'Link' });
                        setUseFileUpload(false);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={18} /> {showForm ? 'Cancel' : 'Add Notice'}
                </button>
            </div>

            {showForm && (
                <div className="admin-form-container">
                    <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Notice' : 'Add New Notice'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Notice Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Exam Schedule fall 2024"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Publish Date</label>
                                <input
                                    type="date"
                                    value={newItem.date}
                                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Attachment (PDF/Image)</label>

                            <div className="file-upload-wrapper">
                                <label className="custom-file-upload">
                                    <Upload size={18} />
                                    Choose File
                                    <input
                                        type="file"
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>

                                {fileError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{fileError}</p>}

                                {newItem.link && typeof newItem.link === 'string' && newItem.link.startsWith('data:') && (
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>File Selected</p>
                                )}

                                {/* Show existing file note if editing */}
                                {editingId && !newItem.link?.startsWith('data:') && (
                                    <p style={{ fontSize: '0.9rem', color: 'green', marginTop: '0.5rem' }}>Existing file present. Upload new to replace.</p>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">{editingId ? 'Update Notice' : 'Publish Notice'}</button>
                    </form>
                </div>
            )}

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice) => (
                            <tr key={notice.id}>
                                <td style={{ fontWeight: '500' }}>{notice.title}</td>
                                <td>{notice.date}</td>
                                <td>
                                    <span className="status-badge draft">{notice.type}</span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="action-btn" title="Edit" onClick={() => handleEdit(notice)}>
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="action-btn delete"
                                            title="Delete"
                                            onClick={() => handleDelete(notice.id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminNotices;
