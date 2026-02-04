import { createContext, useContext, useState, useEffect } from 'react';
import { noticesData, eventsData, galleryData as mockGalleryData, alumniData as mockAlumniData } from '../data/mockData';
import {
    saveNotice, getNotices, deleteNoticeFromDB,
    saveEvent, getEvents, deleteEventFromDB,
    saveGalleryItem, getAllGalleryItems, deleteGalleryItemFromDB,
    saveAlumni, getAlumni, deleteAlumniFromDB
} from '../utils/db';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [notices, setNotices] = useState([]);
    const [events, setEvents] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [alumni, setAlumni] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('humus_admin_auth') === 'true';
    });

    const login = (password) => {
        if (password === 'humus@123') {
            setIsAuthenticated(true);
            localStorage.setItem('humus_admin_auth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('humus_admin_auth');
    };

    // Load ALL data from IndexedDB on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                // Notices
                const loadedNotices = await getNotices();
                if (loadedNotices.length > 0) setNotices(loadedNotices);
                else setNotices(noticesData); // Fallback/Seed

                // Events
                const loadedEvents = await getEvents();
                if (loadedEvents.length > 0) setEvents(loadedEvents);
                else setEvents(eventsData); // Fallback/Seed

                // Gallery
                const loadedGallery = await getAllGalleryItems();
                if (loadedGallery.length > 0) setGallery(loadedGallery);
                else setGallery(mockGalleryData); // Fallback/Seed

                // Alumni
                const loadedAlumni = await getAlumni();
                if (loadedAlumni.length > 0) setAlumni(loadedAlumni);
                else setAlumni(mockAlumniData); // Fallback/Seed

            } catch (error) {
                console.error("Failed to load data from DB:", error);
                // Fallback to mocks if DB fails completely
                setNotices(noticesData);
                setEvents(eventsData);
                setGallery(mockGalleryData);
                setAlumni(mockAlumniData);
            }
        };
        loadData();
    }, []);

    // --- Notices CRUD ---
    const addNotice = async (notice) => {
        setNotices(prev => [notice, ...prev]);
        try { await saveNotice(notice); } catch (e) { console.error(e); }
    };

    const deleteNotice = async (id) => {
        setNotices(prev => prev.filter(n => n.id !== id));
        try { await deleteNoticeFromDB(id); } catch (e) { console.error(e); }
    };

    const updateNotice = async (updatedNotice) => {
        setNotices(prev => prev.map(n => (n.id === updatedNotice.id ? updatedNotice : n)));
        try { await saveNotice(updatedNotice); } catch (e) { console.error(e); }
    };

    // --- Events CRUD ---
    const addEvent = async (event) => {
        setEvents(prev => [event, ...prev]);
        try { await saveEvent(event); } catch (e) { console.error(e); }
    };

    const deleteEvent = async (id) => {
        setEvents(prev => prev.filter(e => e.id !== id));
        try { await deleteEventFromDB(id); } catch (e) { console.error(e); }
    };

    const updateEvent = async (updatedEvent) => {
        setEvents(prev => prev.map(e => (e.id === updatedEvent.id ? updatedEvent : e)));
        try { await saveEvent(updatedEvent); } catch (e) { console.error(e); }
    };

    // --- Gallery CRUD ---
    const addGalleryItem = async (item) => {
        setGallery(prev => [item, ...prev]);
        try { await saveGalleryItem(item); } catch (e) { console.error(e); }
    };

    const deleteGalleryItem = async (id) => {
        setGallery(prev => prev.filter(item => item.id !== id));
        try { await deleteGalleryItemFromDB(id); } catch (e) { console.error(e); }
    };

    const updateGalleryItem = async (updatedItem) => {
        setGallery(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        try { await saveGalleryItem(updatedItem); } catch (e) { console.error(e); }
    };

    // --- Alumni CRUD ---
    const addAlumni = async (item) => {
        setAlumni(prev => [item, ...prev]);
        try { await saveAlumni(item); } catch (e) { console.error(e); }
    };

    const deleteAlumni = async (id) => {
        setAlumni(prev => prev.filter(item => item.id !== id));
        try { await deleteAlumniFromDB(id); } catch (e) { console.error(e); }
    };

    const updateAlumni = async (updatedItem) => {
        setAlumni(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        try { await saveAlumni(updatedItem); } catch (e) { console.error(e); }
    };

    return (
        <DataContext.Provider value={{
            notices,
            addNotice,
            deleteNotice,
            updateNotice,
            events,
            addEvent,
            deleteEvent,
            updateEvent,
            gallery,
            addGalleryItem,
            deleteGalleryItem,
            updateGalleryItem,
            alumni,
            addAlumni,
            deleteAlumni,
            updateAlumni,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </DataContext.Provider>
    );
};
