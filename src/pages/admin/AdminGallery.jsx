import { useState, useRef } from 'react';
import { Plus, Trash2, Image, Video, Upload, AlertTriangle, X, Edit } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const AdminGallery = () => {
    const { gallery, addGalleryItem, deleteGalleryItem, updateGalleryItem } = useData();
    const fileInputRef = useRef(null);

    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', type: 'Photo', url: '', date: '' });
    const [pendingFiles, setPendingFiles] = useState([]);
    const [existingImages, setExistingImages] = useState([]); // Array of URLs
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteGalleryItem(id);
        }
    };

    const handleEdit = (item) => {
        setNewItem({
            title: item.title,
            type: item.type,
            url: item.url || '',
            date: item.date || ''
        });

        if (item.type === 'Photo') {
            const images = item.images || (item.url ? [item.url] : []);
            setExistingImages(images);
        } else {
            setExistingImages([]);
        }

        setEditingId(item.id);
        setShowForm(true);
        setPendingFiles([]);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newPendingFiles = [];
        let hasError = false;

        files.forEach(file => {
            if (file.size > 20 * 1024 * 1024) {
                setError(`File "${file.name}" exceeds 20MB limit.`);
                hasError = true;
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPendingFiles(prev => [...prev, { file, previewUrl: reader.result }]);
            };
            reader.readAsDataURL(file);
        });

        if (!hasError) setError('');
        e.target.value = '';
    };

    const removePendingFile = (index) => {
        setPendingFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newItem.type === 'Photo') {
            const totalImagesCount = existingImages.length + pendingFiles.length;

            if (totalImagesCount === 0) {
                setError('Please select at least one photo.');
                return;
            }

            const newImageUrls = pendingFiles.map(f => f.previewUrl);
            const finalImages = [...existingImages, ...newImageUrls];
            const finalCoverUrl = finalImages.length > 0 ? finalImages[0] : '';

            const itemPayload = {
                title: newItem.title,
                type: 'Photo',
                date: newItem.date,
                url: finalCoverUrl,
                images: finalImages
            };

            if (editingId) {
                const existingItem = gallery.find(g => g.id === editingId);
                const updatedItem = {
                    ...existingItem,
                    ...itemPayload
                };
                updateGalleryItem(updatedItem);
            } else {
                let currentId = gallery.length > 0 ? Math.max(...gallery.map(item => item.id)) + 1 : 1;
                addGalleryItem({ id: currentId, ...itemPayload });
            }

        } else {
            // Video logic remains same
            if (!newItem.url) {
                setError('Please provide a video URL');
                return;
            }
            if (editingId) {
                updateGalleryItem({ id: editingId, ...newItem });
            } else {
                const newId = gallery.length > 0 ? Math.max(...gallery.map(item => item.id)) + 1 : 1;
                addGalleryItem({ id: newId, ...newItem });
            }
        }

        setNewItem({ title: '', type: 'Photo', url: '', date: '' });
        setPendingFiles([]);
        setExistingImages([]);
        setError('');
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Manage Gallery</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setNewItem({ title: '', type: 'Photo', url: '', date: '' });
                        setPendingFiles([]);
                        setExistingImages([]);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={18} /> {showForm ? 'Cancel' : 'Add Item'}
                </button>
            </div>

            {showForm && (
                <div className="admin-form-container">
                    <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}</h3>
                    {error && (
                        <div className="error-message" style={{
                            background: '#ffebee',
                            color: '#c62828',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <AlertTriangle size={18} /> {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Title / Caption (Applied to all)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Annual Sports Day"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select
                                    value={newItem.type}
                                    onChange={(e) => {
                                        setNewItem({ ...newItem, type: e.target.value, url: '' });
                                        setPendingFiles([]);
                                        setError('');
                                    }}
                                >
                                    <option value="Photo">Photo</option>
                                    <option value="Video">Video</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={newItem.date}
                                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    {newItem.type === 'Video' ? 'Video Embed URL' : 'Upload Images'}
                                </label>
                                {newItem.type === 'Photo' ? (
                                    <div className="file-upload-container">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            id="gallery-file-upload"
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <label
                                                    htmlFor="gallery-file-upload"
                                                    className="btn secondary"
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        cursor: 'pointer',
                                                        padding: '0.6rem 1rem',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        background: '#f9f9f9',
                                                        width: 'fit-content'
                                                    }}
                                                >
                                                    <Upload size={16} /> {editingId ? 'Add More Photos' : 'Choose Files'}
                                                </label>
                                                <small style={{ color: '#666' }}>
                                                    Max 20MB per image.
                                                </small>
                                            </div>

                                            {/* Existing Images Display */}
                                            {existingImages.length > 0 && (
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Existing Photos ({existingImages.length})</p>
                                                    <div className="pending-files-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        {existingImages.map((url, index) => (
                                                            <div key={`existing-${index}`} className="preview-thumb" style={{ position: 'relative' }}>
                                                                <img
                                                                    src={url}
                                                                    alt="Existing"
                                                                    style={{
                                                                        height: '80px',
                                                                        width: '80px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '4px',
                                                                        border: '2px solid #22c55e'
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeExistingImage(index)}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '-5px',
                                                                        right: '-5px',
                                                                        background: 'red',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '50%',
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        cursor: 'pointer',
                                                                        fontSize: '12px'
                                                                    }}
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* New Pending Images Display */}
                                            {pendingFiles.length > 0 && (
                                                <div>
                                                    <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>New Photos ({pendingFiles.length})</p>
                                                    <div className="pending-files-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        {pendingFiles.map((fileObj, index) => (
                                                            <div key={`new-${index}`} className="preview-thumb" style={{ position: 'relative' }}>
                                                                <img
                                                                    src={fileObj.previewUrl}
                                                                    alt="Preview"
                                                                    style={{
                                                                        height: '80px',
                                                                        width: '80px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '4px',
                                                                        border: '2px solid #3b82f6'
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removePendingFile(index)}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '-5px',
                                                                        right: '-5px',
                                                                        background: 'red',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '50%',
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        cursor: 'pointer',
                                                                        fontSize: '12px'
                                                                    }}
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="https://www.youtube.com/embed/..."
                                            value={newItem.url}
                                            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                                            required
                                        />
                                        <small style={{ display: 'block', marginTop: '0.5rem', color: '#666' }}>
                                            Note: Video upload is not supported. Please use YouTube/Vimeo embed links.
                                        </small>
                                    </>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={!!error || (newItem.type === 'Photo' && pendingFiles.length === 0 && !editingId)}>
                            {editingId ? 'Update Item' : (newItem.type === 'Photo' && pendingFiles.length > 1 ? `Create Album (${pendingFiles.length} Photos)` : 'Add to Gallery')}
                        </button>
                    </form>
                </div>
            )}

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Preview</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gallery.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    {item.type === 'Photo' ? (
                                        <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                                            <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                            {item.images && item.images.length > 1 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: 0,
                                                    background: 'rgba(0,0,0,0.7)',
                                                    color: 'white',
                                                    fontSize: '10px',
                                                    padding: '2px 4px',
                                                    borderTopLeftRadius: '4px'
                                                }}>
                                                    {item.images.length}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ width: '50px', height: '50px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                                            <Video size={20} />
                                        </div>
                                    )}
                                </td>
                                <td style={{ fontWeight: '500' }}>{item.title}</td>
                                <td>{item.date}</td>
                                <td>
                                    <span className={`status-badge ${item.type === 'Photo' ? 'published' : 'draft'}`}>
                                        {item.type === 'Photo' && item.images && item.images.length > 1
                                            ? `Album`
                                            : item.type}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="action-btn" title="Edit" onClick={() => handleEdit(item)}>
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="action-btn delete"
                                            title="Delete"
                                            onClick={() => handleDelete(item.id)}
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

export default AdminGallery;
