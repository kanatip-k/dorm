
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import SearchBar from '../components/SearchBar';
import { getStudents } from '../services/api';

function assignBedsByFloor(floor) { if (floor >= 1 && floor <= 3) return 2; if (floor === 4) return 3; if (floor === 5) return 4; return 2; }
function generateRooms() {
    const rooms = {};
    const buildings = ['B1', 'B2'];
    buildings.forEach(b => {
        for (let floor = 1; floor <= 5; floor++) {
            for (let i = 1; i <= 10; i++) {
                const roomNum = `${floor}${String(i).padStart(2, '0')}`;
                rooms[`${b}-${roomNum}`] = { building: b, room: roomNum, floor: String(floor), totalBeds: assignBedsByFloor(floor), students: [] };
            }
        }
    });
    return rooms;
}
function fill(rooms, students) {
    students.forEach(s => {
        const k = `${s.building || 'B1'}-${s.room}`;
        if (rooms[k]) rooms[k].students.push(s);
    });
}

export default function RoomView({ navigation }) {
    const [students, setStudents] = useState([]);
    const [q, setQ] = useState('');
    const [b, setB] = useState('');
    const [f, setF] = useState('');

    useEffect(() => {
        const unsub = navigation.addListener('focus', async () => {
            try { setStudents(await getStudents()); } catch { }
        });
        return unsub;
    }, [navigation]);

    const rooms = useMemo(() => {
        const base = generateRooms(); fill(base, students); return Object.values(base);
    }, [students]);

    const filtered = rooms.filter(r => {
        if (b && r.building !== b) return false;
        if (f && r.floor !== f) return false;
        if (q && !(r.room.includes(q) || r.students.some(s => s.fullname.toLowerCase().includes(q.toLowerCase())))) return false;
        return true;
    });

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 18 }}>
            <SearchBar value={q} onChangeText={setQ} placeholder="ค้นหาห้อง/ชื่อ" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {['B1', 'B2'].map(x => (
                    <TouchableOpacity key={x}
                        onPress={() => setB(b === x ? '' : x)}
                        style={{
                            paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12,
                            backgroundColor: b === x ? colors.primary : colors.card, borderWidth: 1, borderColor: colors.chip
                        }}>
                        <Text style={{ color: '#fff' }}>{x}</Text>
                    </TouchableOpacity>
                ))}
                {['1', '2', '3', '4', '5'].map(x => (
                    <TouchableOpacity key={x}
                        onPress={() => setF(f === x ? '' : x)}
                        style={{
                            paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12,
                            backgroundColor: f === x ? colors.primary : colors.card, borderWidth: 1, borderColor: colors.chip
                        }}>
                        <Text style={{ color: '#fff' }}>Floor {x}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
                {filtered.map(r => {
                    const full = r.students.length >= r.totalBeds;
                    return (
                        <TouchableOpacity key={`${r.building}-${r.room}`}
                            onPress={() => navigation.navigate('RoomProfile', { ...r, roomKey: r.room })}
                            style={{
                                width: '47%', backgroundColor: full ? '#ff6b6b' : '#4cd964',
                                borderRadius: 14, padding: 12, borderWidth: full ? 2 : 1,
                                borderColor: full ? '#c0392b' : colors.chip
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: '800' }}>
                                {r.building}-{r.room}
                            </Text>
                            <Text style={{ color: '#fff' }}>
                                {r.students.length}/{r.totalBeds} ใช้งาน
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
}
