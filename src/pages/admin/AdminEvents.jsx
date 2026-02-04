import { useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Edit, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const AdminEvents = () => {
    const { events, addEvent, deleteEvent, updateEvent } = useData();

    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', date: '', location: '', description: '', image: '' });
    const [editingId, setEditingId] = useState(null);
    const [fileError, setFileError] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent(id);
        }
    };

    const handleEdit = (event) => {
        setNewItem({
            title: event.title,
            date: event.date,
            location: event.location,
            description: event.description || '',
            image: event.image || ''
        });
        setEditingId(event.id);
        setShowForm(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setFileError('Image size exceeds 10MB.');
            return;
        }
        setFileError('');

        const reader = new FileReader();
        reader.onloadend = () => {
            setNewItem(prev => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            updateEvent({
                id: editingId,
                ...newItem,
                status: 'Upcoming'
            });
            setEditingId(null);
        } else {
            const newId = events.length > 0 ? Math.max(...events.map(n => n.id)) + 1 : 1;
            addEvent({ id: newId, ...newItem, status: 'Upcoming' });
        }

        setNewItem({ title: '', date: '', location: '', description: '', image: '' });
        setFileError('');
        setShowForm(false);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Manage Events</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setNewItem({ title: '', date: '', location: '', description: '', image: '' });
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={18} /> {showForm ? 'Cancel' : 'Add Event'}
                </button>
            </div>

            {showForm && (
                <div className="admin-form-container">
                    <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Event' : 'Add New Event'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Event Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Annual Dinner"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event Date</label>
                                <input
                                    type="date"
                                    value={newItem.date}
                                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Auditorium"
                                    value={newItem.location}
                                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event Image</label>
                                <div className="file-upload-wrapper">
                                    <label className="custom-file-upload" style={{ width: '100%' }}>
                                        <Upload size={18} />
                                        <span>{newItem.image ? 'Change Image' : 'Choose Image'}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                    {fileError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{fileError}</p>}
                                    {newItem.image && (
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <img src={newItem.image} alt="Preview" style={{ height: '80px', borderRadius: '4px', border: '1px solid #eee', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label>Description</label>
                            <textarea
                                rows="3"
                                placeholder="Event details..."
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">{editingId ? 'Update Event' : 'Create Event'}</button>
                    </form>
                </div>
            )}

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Date & Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>
                                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{event.title}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Calendar size={14} color="#64748b" /> {event.date}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <MapPin size={14} color="#64748b" /> {event.location}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${event.status === 'Upcoming' ? 'active' : 'draft'}`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="action-btn" title="Edit" onClick={() => handleEdit(event)}>
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="action-btn delete"
                                            title="Delete"
                                            onClick={() => handleDelete(event.id)}
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

export default AdminEvents;
