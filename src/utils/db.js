const DB_NAME = 'HumusDB';
const DB_VERSION = 3; // Incremented version
const STORE_GALLEY = 'gallery';
const STORE_NOTICES = 'notices';
const STORE_EVENTS = 'events';
const STORE_ALUMNI = 'alumni';

export const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('IndexedDB error:', event.target.error);
            reject('Error opening database');
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Gallery Store
            if (!db.objectStoreNames.contains(STORE_GALLEY)) {
                db.createObjectStore(STORE_GALLEY, { keyPath: 'id' });
            }
            // Notices Store
            if (!db.objectStoreNames.contains(STORE_NOTICES)) {
                db.createObjectStore(STORE_NOTICES, { keyPath: 'id' });
            }
            // Events Store
            if (!db.objectStoreNames.contains(STORE_EVENTS)) {
                db.createObjectStore(STORE_EVENTS, { keyPath: 'id' });
            }
            // Alumni Store
            if (!db.objectStoreNames.contains(STORE_ALUMNI)) {
                db.createObjectStore(STORE_ALUMNI, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
};

// Generic Helper
const performTransaction = async (storeName, mode, callback) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], mode);
        const store = transaction.objectStore(storeName);
        const request = callback(store);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// --- Gallery ---
export const saveGalleryItem = (item) => performTransaction(STORE_GALLEY, 'readwrite', (store) => store.put(item));
export const getAllGalleryItems = () => performTransaction(STORE_GALLEY, 'readonly', (store) => store.getAll());
export const deleteGalleryItemFromDB = (id) => performTransaction(STORE_GALLEY, 'readwrite', (store) => store.delete(id));

// --- Notices ---
export const saveNotice = (item) => performTransaction(STORE_NOTICES, 'readwrite', (store) => store.put(item));
export const getNotices = () => performTransaction(STORE_NOTICES, 'readonly', (store) => store.getAll());
export const deleteNoticeFromDB = (id) => performTransaction(STORE_NOTICES, 'readwrite', (store) => store.delete(id));

// --- Events ---
export const saveEvent = (item) => performTransaction(STORE_EVENTS, 'readwrite', (store) => store.put(item));
export const getEvents = () => performTransaction(STORE_EVENTS, 'readonly', (store) => store.getAll());
export const deleteEventFromDB = (id) => performTransaction(STORE_EVENTS, 'readwrite', (store) => store.delete(id));

// --- Alumni ---
export const saveAlumni = (item) => performTransaction(STORE_ALUMNI, 'readwrite', (store) => store.put(item));
export const getAlumni = () => performTransaction(STORE_ALUMNI, 'readonly', (store) => store.getAll());
export const deleteAlumniFromDB = (id) => performTransaction(STORE_ALUMNI, 'readwrite', (store) => store.delete(id));
