import { Platform } from 'react-native';

const ANDROID_EMULATOR = 'http://10.0.2.2:3001';
const IOS_SIMULATOR = 'http://localhost:3001';

export const API_BASE = Platform.OS === 'android' ? ANDROID_EMULATOR : IOS_SIMULATOR;

const API_STUDENTS = `${API_BASE}/students`;
const API_HISTORY = `${API_BASE}/history`;

const asJson = async (res, msg) => {
    if (!res.ok) throw new Error(msg);
    return res.json();
};

export const getStudents = async () =>
    asJson(await fetch(API_STUDENTS), 'Load students failed');

export const addStudent = async (payload) =>
    asJson(
        await fetch(API_STUDENTS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }),
        'Add student failed'
    );

export const updateStudent = async (id, payload) =>
    asJson(
        await fetch(`${API_STUDENTS}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }),
        'Update student failed'
    );

export const deleteStudent = async (id) => {
    const res = await fetch(`${API_STUDENTS}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete student failed');
    return true;
};

const floorFromRoom = (room) => {
    const s = String(room ?? '');
    return s ? s[0] : '';
};

export const getHistoryPersist = async () =>
    asJson(await fetch(API_HISTORY), 'Load history failed');

export const addHistoryEventPersist = async (student, action) => {
    const entry = {
        id: Date.now().toString(36),
        student: student?.fullname ?? 'Unknown',
        studentId: String(student?.studentId ?? ''),
        room: student?.room ?? '',
        building: student?.building ?? '',
        floor: student?.floor ?? floorFromRoom(student?.room),
        action,
        time: new Date().toLocaleString(),
    };

    return asJson(
        await fetch(API_HISTORY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry),
        }),
        'Add history failed'
    );
};

export const deleteHistoryPersist = async (id) => {
    const res = await fetch(`${API_HISTORY}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete history failed');
    return true;
};

export const clearHistoryPersist = async () => {
    const items = await getHistoryPersist();
    await Promise.all(items.map((it) => fetch(`${API_HISTORY}/${it.id}`, { method: 'DELETE' })));
    return true;
};
