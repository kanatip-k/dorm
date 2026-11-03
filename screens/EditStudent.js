import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import colors from '../theme/colors';
import { updateStudent } from '../services/api';

export default function EditStudent({ route, navigation }) {
    const { student } = route.params;
    const [studentId, setStudentId] = useState(student.studentId || '');
    const [fullname, setFullname] = useState(student.fullname || '');
    const [room, setRoom] = useState(student.room || '');
    const [building, setBuilding] = useState(student.building || 'B1');

    const onSave = async () => {
        if (!studentId || !fullname || !room) return Alert.alert('กรอกให้ครบ', 'ต้องไม่เว้นว่าง');
        const floor = room.length >= 3 ? room[0] : '1';
        try {
            await updateStudent(student.id, { ...student, studentId, fullname, room, building, floor });
            Alert.alert('สำเร็จ', 'อัปเดตแล้ว'); navigation.goBack();
        } catch { Alert.alert('ผิดพลาด', 'บันทึกไม่สำเร็จ'); }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 18 }}>
            {[{ ph: 'Student ID', v: studentId, set: setStudentId, kb: 'numeric' },
            { ph: 'Full Name', v: fullname, set: setFullname, kb: 'default' },
            { ph: 'Room (e.g., 203)', v: room, set: setRoom, kb: 'numeric' }].map((x, i) => (
                <TextInput key={i} placeholder={x.ph} value={x.v} onChangeText={x.set}
                    placeholderTextColor="#667085" keyboardType={x.kb}
                    style={{ backgroundColor: colors.card, color: '#fff', borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: colors.chip }} />
            ))}
            <View style={{ flexDirection: 'row', gap: 10 }}>
                {['B1', 'B2'].map(b => (
                    <TouchableOpacity key={b} onPress={() => setBuilding(b)}
                        style={{ backgroundColor: building === b ? colors.primary : colors.card, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.chip }}>
                        <Text style={{ color: '#fff' }}>{b}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={onSave}
                style={{ backgroundColor: colors.primary, padding: 14, borderRadius: 14, marginTop: 18, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '800' }}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
