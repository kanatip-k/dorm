import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import FAB from '../components/FAB';
import { getStudents, deleteStudent, addHistoryEventPersist } from '../services/api';

export default function StudentList({ navigation }) {
    const [students, setStudents] = useState([]);
    const [q, setQ] = useState('');

    const load = useCallback(async () => {
        try { setStudents(await getStudents()); } catch { }
    }, []);

    useFocusEffect(useCallback(() => { load(); }, [load]));
    useEffect(() => {
        const unsub = navigation.addListener('focus', load);
        return unsub;
    }, [navigation, load]);

    const filtered = students.filter(s =>
        (s.fullname || '').toLowerCase().includes(q.toLowerCase()) ||
        (String(s.studentId) || '').toLowerCase().includes(q.toLowerCase())
    );

    const onCheckout = (st) => {
        Alert.alert(
            'ยืนยันการลบ',
            `ยืนยันลบรายการ\n${st.fullname} (${st.studentId}) ?`,
            [
                { text: 'ยกเลิก', style: 'cancel' },
                {
                    text: 'ลบ',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteStudent(st.id);
                            await addHistoryEventPersist(st, 'Check-out');
                            await load();
                        } catch (e) {
                            Alert.alert('ผิดพลาด', 'ลบไม่สำเร็จ');
                        }
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View
            style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 14,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.chip,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={{
                        width: 44, height: 44, borderRadius: 22,
                        backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
                        marginRight: 12,
                    }}
                >
                    <Ionicons name="person" size={22} color="#fff" />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontWeight: '800' }} numberOfLines={1}>
                        {item.fullname}
                    </Text>
                    <Text style={{ color: colors.subtext, marginTop: 3 }}>
                        รหัส {item.studentId} • ห้อง {item.room} {item.building}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditStudent', { student: item })}
                    style={{
                        paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10,
                        borderWidth: 1, borderColor: colors.warn, backgroundColor: 'transparent',
                        flexDirection: 'row', alignItems: 'center',
                    }}
                >
                    <Ionicons name="create" size={16} color={colors.warn} />
                    <Text style={{ color: colors.warn, fontWeight: '700', marginLeft: 6 }}>แก้ไข</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onCheckout(item)}
                    style={{
                        paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10,
                        backgroundColor: colors.danger, flexDirection: 'row', alignItems: 'center',
                    }}
                >
                    <Ionicons name="log-out" size={16} color="#fff" />
                    <Text style={{ color: '#fff', fontWeight: '700', marginLeft: 6 }}>ลบ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 18 }}>
            <SearchBar value={q} onChangeText={setQ} placeholder="ค้นหาชื่อหรือรหัสนักศึกษา" />
            <FlatList
                data={filtered}
                keyExtractor={(it) => String(it.id ?? it.studentId)}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: 12, paddingBottom: 100 }}
                ListEmptyComponent={
                    <EmptyState title="ยังไม่มีรายการ" subtitle="เพิ่มนักศึกษาหรือเปลี่ยนคำค้นหา" />
                }
            />
            <FAB onPress={() => navigation.navigate('AddStudent')} />
        </View>
    );
}
