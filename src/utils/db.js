import { supabase } from './supabaseClient';

// Helper to map DB snake_case to app camelCase
const fromAlumniDB = (item) => ({
    ...item,
    jobTitle: item.job_title,
    linkedIn: item.linkedin
});

const toAlumniDB = (item) => ({
    name: item.name,
    batch: item.batch,
    job_title: item.jobTitle,
    company: item.company,
    image: item.image,
    email: item.email,
    linkedin: item.linkedIn
});

// --- Gallery ---
export const saveGalleryItem = async (item) => {
    const { id, ...data } = item;
    // If id is present and exists, it's an update, otherwise insert
    // Supabase upset can handle this if we pass ID. 
    // DataContext passes ID even for new items (random gen), but DB generates IDs. 
    // We should probably rely on DB IDs or handle the transition.
    // For simplicity, let's just upsert using the ID if valid or let DB gen if it's a new ID paradigm.
    // Current app generates IDs like "length + 1" or "Date.now()". 
    // Let's assume we pass the whole object. If it has an ID that matches DB, it updates.

    // NOTE: Application logic generates sequential IDs. Supabase uses BigInt identity.
    // Conflict on ID could occur if we manually set IDs. 
    // Best practice: Let DB handle ID for new items. DataContext passes 'id' usually.
    // If 'id' is passed for new item, we might want to ignore it and let DB create one, 
    // then reload. BUT DataContext expects immediate UI update.

    // Strategy: Upsert.
    const { error } = await supabase.from('gallery').upsert(item).select();
    if (error) throw error;
};

export const getAllGalleryItems = async () => {
    const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const deleteGalleryItemFromDB = async (id) => {
    const { error } = await supabase.from('gallery').delete().match({ id });
    if (error) throw error;
};

// --- Notices ---
export const saveNotice = async (item) => {
    const { error } = await supabase.from('notices').upsert(item).select();
    if (error) throw error;
};

export const getNotices = async () => {
    const { data, error } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const deleteNoticeFromDB = async (id) => {
    const { error } = await supabase.from('notices').delete().match({ id });
    if (error) throw error;
};

// --- Events ---
export const saveEvent = async (item) => {
    const { error } = await supabase.from('events').upsert(item).select();
    if (error) throw error;
};

export const getEvents = async () => {
    const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const deleteEventFromDB = async (id) => {
    const { error } = await supabase.from('events').delete().match({ id });
    if (error) throw error;
};

// --- Alumni ---
export const saveAlumni = async (item) => {
    const dbItem = toAlumniDB(item);
    if (item.id) dbItem.id = item.id; // Include ID if updating

    const { error } = await supabase.from('alumni').upsert(dbItem).select();
    if (error) throw error;
};

export const getAlumni = async () => {
    const { data, error } = await supabase.from('alumni').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(fromAlumniDB);
};

export const deleteAlumniFromDB = async (id) => {
    const { error } = await supabase.from('alumni').delete().match({ id });
    if (error) throw error;
};
