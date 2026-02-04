import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Play, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
    const { gallery } = useData();
    const [filter, setFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);
    const [visibleImagesCount, setVisibleImagesCount] = useState(10);

    const filteredItems = gallery.filter(item => {
        if (filter === 'All') return true;
        return item.type === filter;
    });

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setVisibleImagesCount(10); // Reset to initial count
    };

    const loadMoreImages = (e) => {
        e.stopPropagation();
        console.log("Load More clicked. Current:", visibleImagesCount, "Total:", selectedItem?.images?.length);

        if (selectedItem && selectedItem.images) {
            setVisibleImagesCount(selectedItem.images.length);
        }
    };

    const closeLightbox = () => {
        setSelectedItem(null);
    };

    return (
        <div className="container gallery-page section">
            <div className="section-header text-center">
                <h2>Our Gallery</h2>
                <div className="line"></div>
                <p>Capturing moments from our department's journey.</p>
            </div>

            <div className="gallery-filters">
                {['All', 'Photo', 'Video'].map((type) => (
                    <button
                        key={type}
                        className={`filter-btn ${filter === type ? 'active' : ''}`}
                        onClick={() => setFilter(type)}
                    >
                        {type === 'All' ? 'All' : `${type}s`}
                    </button>
                ))}
            </div>

            <div className="gallery-grid">
                {filteredItems.map((item) => (
                    <div key={item.id} className="gallery-item" onClick={() => handleItemClick(item)}>
                        <div className="media-container">
                            {item.type === 'Photo' ? (
                                <img src={item.url} alt={item.title} loading="lazy" />
                            ) : (
                                <>
                                    {/* Show thumbnail or iframe with overlay to capture click */}
                                    <iframe
                                        src={item.url}
                                        title={item.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ pointerEvents: 'none' }} // Disable iframe interaction in grid to allow click to open lightbox
                                    ></iframe>
                                    <div className="play-overlay">
                                        <div className="play-button">
                                            <Play size={24} fill="currentColor" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="gallery-info">
                            <h3>{item.title}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="gallery-date">{new Date(item.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                                {item.images && item.images.length > 1 && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#666' }}>
                                        <Images size={14} /> {item.images.length}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center" style={{ padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>No {filter.toLowerCase()}s found to display.</p>
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedItem && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <X size={32} />
                        </button>

                        {selectedItem.type === 'Photo' ? (
                            <div className="lightbox-scroll-container">
                                {/* Show Grid if it's an album (images array exists and > 0) */}
                                {selectedItem.images && selectedItem.images.length > 0 ? (
                                    <>
                                        <div className="lightbox-grid">
                                            {selectedItem.images.slice(0, visibleImagesCount).map((imgUrl, idx) => (
                                                <div key={idx} className="lightbox-grid-item">
                                                    <img src={imgUrl} alt={`${selectedItem.title} ${idx + 1}`} loading="lazy" />
                                                </div>
                                            ))}
                                        </div>
                                        {visibleImagesCount < selectedItem.images.length && (
                                            <div className="lightbox-footer">
                                                <button className="load-more-btn" onClick={loadMoreImages}>
                                                    More
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    /* Fallback for single legacy photos */
                                    <img
                                        src={selectedItem.url}
                                        alt={selectedItem.title}
                                        style={{ maxHeight: '80vh', maxWidth: '100%', objectFit: 'contain' }}
                                    />
                                )}
                            </div>
                        ) : (
                            <iframe
                                src={selectedItem.url}
                                title={selectedItem.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
