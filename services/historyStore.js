let history = [];

export const getHistory = () => history;

export const addHistoryEvent = (student, action) => {
    const entry = {
        id: Date.now() + Math.random(),
        student: student?.fullname ?? 'Unknown',
        studentId: student?.studentId ?? '',
        room: student?.room ?? '',
        building: student?.building ?? '',
        floor: student?.floor ?? (student?.room ? String(student.room)[0] : ''),
        action,
        time: new Date().toLocaleString(),
    };
    history = [entry, ...history];
    return entry;
};

export const clearHistory = () => { history = []; };
