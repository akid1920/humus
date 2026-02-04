import { useState } from 'react';
import { Plus, Trash2, Edit, Upload, User, Linkedin, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const AdminAlumni = () => {
    const { alumni, addAlumni, deleteAlumni, updateAlumni } = useData();

    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        batch: '',
        jobTitle: '',
        company: '',
        image: '',
        email: '',
        linkedIn: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [imageError, setImageError] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this alumni profile?')) {
            deleteAlumni(id);
        }
    };

    const handleEdit = (alum) => {
        setNewItem({
            name: alum.name,
            batch: alum.batch,
            jobTitle: alum.jobTitle,
            company: alum.company,
            image: alum.image,
            email: alum.email || '',
            linkedIn: alum.linkedIn || ''
        });
        setEditingId(alum.id);
        setShowForm(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setImageError('Image size exceeds 5MB.');
            return;
        }
        setImageError('');

        const reader = new FileReader();
        reader.onloadend = () => {
            setNewItem(prev => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            updateAlumni({
                id: editingId,
                ...newItem
            });
            setEditingId(null);
        } else {
            const newId = alumni.length > 0 ? Math.max(...alumni.map(a => a.id)) + 1 : 1;
            addAlumni({ id: newId, ...newItem });
        }

        setNewItem({ name: '', batch: '', jobTitle: '', company: '', image: '', email: '', linkedIn: '' });
        setImageError('');
        setShowForm(false);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Manage Alumni</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setNewItem({ name: '', batch: '', jobTitle: '', company: '', image: '', email: '', linkedIn: '' });
                        setImageError('');
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={18} /> {showForm ? 'Cancel' : 'Add Alumni'}
                </button>
            </div>

            {showForm && (
                <div className="admin-form-container">
                    <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Profile' : 'Add New Alumni'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., John Doe"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Batch</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 2015"
                                    value={newItem.batch}
                                    onChange={(e) => setNewItem({ ...newItem, batch: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Job Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Senior Soil Scientist"
                                    value={newItem.jobTitle}
                                    onChange={(e) => setNewItem({ ...newItem, jobTitle: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Company/Organization</label>
                                <input
                                    type="text"
                                    placeholder="e.g., AgriCorp International"
                                    value={newItem.company}
                                    onChange={(e) => setNewItem({ ...newItem, company: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email (Optional)</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={newItem.email}
                                    onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>LinkedIn URL (Optional)</label>
                                <input
                                    type="url"
                                    placeholder="https://linkedin.com/in/..."
                                    value={newItem.linkedIn}
                                    onChange={(e) => setNewItem({ ...newItem, linkedIn: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Profile Image</label>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                {newItem.image && (
                                    <img
                                        src={newItem.image}
                                        alt="Preview"
                                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                                    />
                                )}
                                <label className="custom-file-upload">
                                    <Upload size={18} />
                                    Choose Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                            {imageError && <p style={{ color: 'red', fontSize: '0.8rem' }}>{imageError}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary">{editingId ? 'Update Profile' : 'Create Profile'}</button>
                    </form>
                </div>
            )}

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>Job Profile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumni.map((alum) => (
                            <tr key={alum.id}>
                                <td>
                                    <img
                                        src={alum.image || 'https://via.placeholder.com/40'}
                                        alt={alum.name}
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                </td>
                                <td style={{ fontWeight: '500' }}>{alum.name}</td>
                                <td>{alum.batch}</td>
                                <td>
                                    <div style={{ fontSize: '0.9rem' }}>{alum.jobTitle}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{alum.company}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="action-btn" title="Edit" onClick={() => handleEdit(alum)}>
                                            <Edit size={18} />
                                        </button>
                                        <button className="action-btn delete" title="Delete" onClick={() => handleDelete(alum.id)}>
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

export default AdminAlumni;
