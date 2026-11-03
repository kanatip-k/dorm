import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import colors from '../theme/colors';
import { addStudent, getStudents, addHistoryEventPersist } from '../services/api';
import { addHistoryEvent } from '../services/historyStore';


function assignBedsByFloor(floor) {
    if (floor >= 1 && floor <= 3) return 2;
    if (floor === 4) return 3;
    if (floor === 5) return 4;
    return 2;
}

export default function AddStudent({ navigation }) {
    const [fullname, setFullname] = useState('');
    const [studentId, setStudentId] = useState('');
    const [room, setRoom] = useState('');
    const [building, setBuilding] = useState('B1');
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        getStudents().then(setCurrent).catch(() => { });
    }, []);

    const onSubmit = async () => {
        if (!fullname.trim() || !studentId.trim() || !room.trim())
            return Alert.alert('กรอกให้ครบ', 'ชื่อ/รหัส/ห้อง ต้องไม่ว่าง');
        if (!/^\d{8}$/.test(studentId.trim()))
            return Alert.alert('รูปแบบรหัสผิด', 'ต้องเป็นตัวเลข 8 หลัก');

        const floor = room.length >= 3 ? room[0] : '1';
        const limit = assignBedsByFloor(parseInt(floor, 10));
        const used = current.filter(s => s.building === building && s.room === room).length;
        if (used >= limit) return Alert.alert('ห้องเต็ม', `ห้อง ${room} อาคาร ${building} เต็มแล้ว`);

        try {
            await addStudent({ fullname, studentId, room, building, floor });
            addHistoryEvent({ fullname, studentId, room, building, floor }, 'Check-in');
            await addHistoryEventPersist({ fullname, studentId, room, building, floor }, 'Check-in');
            Alert.alert('สำเร็จ', 'เพิ่มนักศึกษาแล้ว');
        } catch (e) {
            Alert.alert('ผิดพลาด', 'เพิ่มข้อมูลไม่สำเร็จ');
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 18 }}>
            {[
                { ph: 'Full Name', v: fullname, set: setFullname, kb: 'default' },
                { ph: 'Student ID (8 digits)', v: studentId, set: setStudentId, kb: 'numeric' },
                { ph: 'Room (e.g., 203)', v: room, set: setRoom, kb: 'numeric' },
            ].map((x, i) => (
                <TextInput
                    key={i}
                    placeholder={x.ph}
                    value={x.v}
                    onChangeText={x.set}
                    placeholderTextColor="#667085"
                    keyboardType={x.kb}
                    style={{
                        backgroundColor: colors.card,
                        color: '#fff',
                        borderRadius: 14,
                        padding: 14,
                        marginBottom: 12,
                        borderWidth: 1,
                        borderColor: colors.chip,
                    }}
                />
            ))}

            <Text style={{ color: '#9AA3B2', marginBottom: 8 }}>Building</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                {['B1', 'B2'].map(b => (
                    <TouchableOpacity
                        key={b}
                        onPress={() => setBuilding(b)}
                        style={{
                            backgroundColor: building === b ? colors.primary : colors.card,
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: colors.chip,
                        }}
                    >
                        <Text style={{ color: '#fff' }}>{b}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                onPress={onSubmit}
                style={{
                    backgroundColor: colors.primary,
                    padding: 14,
                    borderRadius: 14,
                    marginTop: 18,
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '800' }}>Add Student</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
