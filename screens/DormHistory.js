import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { getHistoryPersist, deleteHistoryPersist, clearHistoryPersist } from '../services/api';


const normalizeAction = (a = '') => {
    const t = String(a).toLowerCase().trim();
    if (['check-out', 'checkout', 'เช็คเอาท์', 'เช็คเอ้า', 'ออก', 'ลบ', 'delete', 'remove'].includes(t)) return 'Check-out';
    if (['check-in', 'checkin', 'เช็คอิน', 'เข้า', 'เพิ่ม', 'add', 'insert', 'create'].includes(t)) return 'Check-in';
    return 'Unknown';
};

export default function DormHistory() {
    const [filter, setFilter] = useState('All');
    const [historyData, setHistoryData] = useState([]);

    const load = useCallback(async () => {
        try {
            const list = await getHistoryPersist();
            const normalized = (Array.isArray(list) ? list : []).map(h => ({
                ...h,
                action: normalizeAction(h.action),
            }));
            setHistoryData(normalized);
        } catch {
            setHistoryData([]);
        }
    }, []);

    useFocusEffect(useCallback(() => { load(); }, [load]));

    const items = useMemo(() => {
        const sorted = [...historyData].sort((a, b) => new Date(b.time) - new Date(a.time));
        return filter === 'All' ? sorted : sorted.filter(h => h.action === filter);
    }, [historyData, filter]);

    const onDelete = (h) => {
        Alert.alert(
            'ลบประวัติ',
            `ต้องการลบรายการของ ${h.student ?? 'รายการนี้'} ?`,
            [
                { text: 'ยกเลิก', style: 'cancel' },
                {
                    text: 'ลบ',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteHistoryPersist(h.id);
                            load();
                        } catch {
                            Alert.alert('ผิดพลาด', 'ลบไม่สำเร็จ');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 18 }}>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                {['All', 'Check-in', 'Check-out'].map(x => (
                    <TouchableOpacity
                        key={x}
                        onPress={() => setFilter(x)}
                        style={{
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            borderRadius: 12,
                            backgroundColor: filter === x ? colors.primary : colors.card,
                            borderWidth: 1,
                            borderColor: colors.chip,
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '700' }}>{x}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {items.map(h => {
                const isIn = h.action === 'Check-in';
                const floor = h.floor ?? (String(h.room || '').charAt(0) || '-');
                return (
                    <View
                        key={h.id}
                        style={{
                            backgroundColor: isIn ? '#F5E6FF' : '#FFF2E5',
                            padding: 14,
                            borderRadius: 14,
                            marginBottom: 10,
                            borderLeftWidth: 5,
                            borderLeftColor: isIn ? colors.success : colors.danger,
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Ionicons name={isIn ? 'log-in' : 'log-out'} size={20} color={isIn ? colors.success : colors.danger} />
                                <Text style={{ fontWeight: '800' }}>{h.student ?? 'Unknown'}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => onDelete(h)}
                                hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                                style={{ padding: 6, borderRadius: 10 }}
                            >
                                <Ionicons name="trash" size={18} color="#B42318" />
                            </TouchableOpacity>
                        </View>

                        <Text>Room: {h.room} • {h.building} • Floor {floor}</Text>
                        <Text>Action: {h.action}</Text>
                        <Text style={{ color: '#667085' }}>{h.time}</Text>
                    </View>
                );
            })}

            {items.length === 0 && (
                <Text style={{ color: '#9AA3B2', textAlign: 'center', marginTop: 40 }}>No history</Text>
            )}
        </ScrollView>
    );
}
