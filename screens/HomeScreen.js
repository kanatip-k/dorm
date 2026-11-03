import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { getStudents } from '../services/api';
import TopBar from '../components/TopBar';
import HeroHeader from '../components/HeroHeader';
import StatPill from '../components/StatPill';

function assignBedsByFloor(floor) {
    if (floor >= 1 && floor <= 3) return 2;
    if (floor === 4) return 3;
    if (floor === 5) return 4;
    return 2;
}

export default function HomeScreen({ navigation }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const unsub = navigation.addListener('focus', async () => {
            try { setStudents(await getStudents()); } catch { }
        });
        return unsub;
    }, [navigation]);

    const stats = useMemo(() => {
        const total = students.length;

        const floors = [1, 2, 3, 4, 5];
        const ROOMS_PER_FLOOR = 20;
        const BUILDING_COUNT = 2;
        const bedsPerAllFloors = floors.reduce((sum, f) => sum + assignBedsByFloor(f), 0);
        const totalBeds = bedsPerAllFloors * ROOMS_PER_FLOOR * BUILDING_COUNT;

        const occ = totalBeds ? Math.round((total / totalBeds) * 100) : 0;
        return { total, totalBeds, occ };
    }, [students]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
            <HeroHeader>
                <TopBar title="Dormitory Dashboard" />
                <View style={{ paddingHorizontal: 18, paddingBottom: 18 }}>
                    <Text style={{ color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 8 }}>
                        สรุปภาพรวมหอพัก
                    </Text>
                    <Text style={{ color: '#E6E8F2' }}>
                        จัดการนักศึกษา ห้องพัก และประวัติการเข้า–ออก
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
                        <StatPill label="นักศึกษาทั้งหมด" value={stats.total} />
                        <StatPill label="เตียงทั้งหมด" value={stats.totalBeds} />
                        <StatPill label="อัตราใช้งาน" value={`${stats.occ}%`} note="used / capacity" />
                    </ScrollView>
                </View>
            </HeroHeader>

            <View style={{ padding: 18, gap: 12 }}>
                {[
                    { label: 'เพิ่มรายชื่อนักศึกษา', icon: 'person-add', screen: 'AddStudent', color: colors.success },
                    { label: 'ดูรายชื่อนักศึกษา', icon: 'list', screen: 'StudentList', color: colors.primary },
                    { label: 'ดูห้องพัก ', icon: 'home', screen: 'RoomView', color: colors.warn },
                    { label: 'ประวัติการเข้า-ออก', icon: 'time', screen: 'DormHistory', color: colors.danger },
                    { label: 'โปรไฟล์ผู้ดูแล', icon: 'person-circle', screen: 'AdminProfile', color: colors.primary },
                ].map(it => (
                    <TouchableOpacity
                        key={it.screen}
                        onPress={() => navigation.navigate(it.screen)}
                        style={{
                            backgroundColor: colors.card,
                            borderRadius: 16,
                            padding: 16,
                            borderWidth: 1,
                            borderColor: colors.chip,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 12,
                        }}
                    >
                        <View style={{
                            width: 42, height: 42, borderRadius: 12,
                            alignItems: 'center', justifyContent: 'center',
                            backgroundColor: it.color
                        }}>
                            <Ionicons name={it.icon} size={22} color="#fff" />
                        </View>
                        <Text style={{ color: colors.text, fontWeight: '700' }}>{it.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}
