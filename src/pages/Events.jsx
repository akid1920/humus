import { Calendar, MapPin, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Events.css';

const Events = () => {
    const { events } = useData();
    return (
        <div className="events-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Events & Seminars</h1>
                    <p className="page-subtitle">Join us in celebrating brotherhood and academic excellence through our diverse range of activities.</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="events-grid">
                        {events.map((event) => (
                            <div key={event.id} className="event-card glass animate-fade-in">
                                <div className="event-image-placeholder">
                                    {/* Placeholder for event image */}
                                    <div className="event-date-badge">
                                        <span className="day">{new Date(event.date).getDate()}</span>
                                        <span className="month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                    </div>
                                </div>
                                <div className="event-content">
                                    <h3 className="event-title">{event.title}</h3>

                                    <div className="event-meta">
                                        <div className="meta-item">
                                            <Calendar size={16} />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="meta-item">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <p className="event-description">
                                        {event.description}
                                    </p>


                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
