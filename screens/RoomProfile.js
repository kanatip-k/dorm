
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

function year(studentId) {
    if (!studentId) return '-';
    const p = String(studentId).slice(0, 2);
    if (p === '68') return 'ปี 1';
    if (p === '67') return 'ปี 2';
    if (p === '66') return 'ปี 3';
    if (p === '65') return 'ปี 4';
    return '-';
}

const initials = (name = '') =>
    name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('');

export default function RoomProfile({ route }) {
    const { roomKey, students = [], totalBeds = 0, building, floor } = route.params || {};
    const used = students.length;
    const occ = totalBeds ? Math.round((used / totalBeds) * 100) : 0;

    const { width } = Dimensions.get('window');
    const cardWidth = width >= 420 ? '30.5%' : '46.5%';

    const beds = useMemo(() => {
        return Array.from({ length: totalBeds }).map((_, i) => ({
            id: i + 1,
            student: students[i] || null,
            occupied: Boolean(students[i]),
        }));
    }, [students, totalBeds]);


    const [selected, setSelected] = useState(null);
    const closeModal = () => setSelected(null);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
            <View style={{
                backgroundColor: colors.primary,
                paddingTop: 28, paddingBottom: 18, paddingHorizontal: 18,
                borderBottomLeftRadius: 24, borderBottomRightRadius: 24
            }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800', textAlign: 'center' }}>
                    ห้อง {building}-{roomKey} | ชั้น {floor}
                </Text>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 12, flex: 1, marginRight: 8 }}>
                        <Text style={{ color: '#EAEAF5', fontSize: 12 }}>จำนวนเตียง</Text>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>{totalBeds}</Text>
                    </View>
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 12, flex: 1, marginLeft: 8 }}>
                        <Text style={{ color: '#EAEAF5', fontSize: 12 }}>ใช้งานอยู่</Text>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>{used} ({occ}%)</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 12, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: colors.success }} />
                        <Text style={{ color: '#fff' }}>ว่าง</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: colors.danger }} />
                        <Text style={{ color: '#fff' }}>มีผู้พัก</Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 18, gap: 12 }}>
                {beds.map(b => {
                    const bg = b.occupied ? colors.danger : colors.success;
                    return (
                        <TouchableOpacity
                            key={b.id}
                            activeOpacity={0.9}
                            onPress={() => setSelected(b)}
                            style={{
                                backgroundColor: bg,
                                borderRadius: 16,
                                padding: 16,
                                minHeight: 90,
                                shadowColor: '#000',
                                shadowOpacity: 0.2,
                                shadowRadius: 6,
                                elevation: 4,
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800' }}>
                                เตียง {b.id} {b.occupied ? '' : '(ว่าง)'}
                            </Text>

                            {b.student ? (
                                <View style={{ marginTop: 6 }}>
                                    <Text style={{ color: '#fff', fontWeight: '700' }}>{b.student.fullname}</Text>
                                    <Text style={{ color: '#fff' }}>รหัส: {b.student.studentId}</Text>
                                    <Text style={{ color: '#fff' }}>{year(b.student.studentId)}</Text>
                                </View>
                            ) : (
                                <Text style={{ color: '#fff', marginTop: 6, fontWeight: '700' }}>ยังไม่มีผู้พัก</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            <Modal visible={!!selected} transparent animationType="fade" onRequestClose={closeModal}>
                <View style={{
                    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: 'center', justifyContent: 'center', padding: 20
                }}>
                    <View style={{
                        width: '100%', borderRadius: 18, backgroundColor: colors.card,
                        padding: 18, borderWidth: 1, borderColor: colors.chip
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: colors.text, fontWeight: '800', fontSize: 18 }}>
                                เตียง {selected?.id} • ห้อง {building}-{roomKey}
                            </Text>
                            <TouchableOpacity onPress={closeModal} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                                <Ionicons name="close" size={22} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {selected?.student ? (
                            <View style={{ marginTop: 14 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{
                                        width: 54, height: 54, borderRadius: 27, backgroundColor: colors.primary,
                                        alignItems: 'center', justifyContent: 'center', marginRight: 12
                                    }}>
                                        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 18 }}>
                                            {initials(selected.student.fullname)}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: colors.text, fontWeight: '800', fontSize: 16 }} numberOfLines={1}>
                                            {selected.student.fullname}
                                        </Text>
                                        <Text style={{ color: colors.subtext, marginTop: 4 }}>
                                            รหัส: {selected.student.studentId} • {year(selected.student.studentId)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 12, gap: 6 }}>
                                    <Text style={{ color: colors.subtext }}>อาคาร: {building}</Text>
                                    <Text style={{ color: colors.subtext }}>ชั้น: {floor}</Text>
                                    <Text style={{ color: colors.subtext }}>ห้อง: {roomKey}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={{ marginTop: 14 }}>
                                <Text style={{ color: colors.text, fontWeight: '700', fontSize: 16 }}>
                                    เตียงว่าง
                                </Text>
                                <Text style={{ color: colors.subtext, marginTop: 6 }}>
                                    ยังไม่มีผู้เข้าพักในเตียงนี้
                                </Text>
                            </View>
                        )}

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16, gap: 10 }}>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, backgroundColor: colors.primary }}
                            >
                                <Text style={{ color: '#fff', fontWeight: '800' }}>ปิด</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
