// screens/AdminProfile.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';

export default function AdminProfile({ navigation, auth }) {
    const { admin, logout } = auth;

    useEffect(() => {

    }, [admin]);

    if (!admin) return null;

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 18 }}>
            <View
                style={{
                    backgroundColor: colors.card,
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: colors.chip,
                }}
            >
                <Text style={{ color: colors.text, fontWeight: '800', fontSize: 18 }}>
                    {admin.name}
                </Text>
                <Text style={{ color: colors.subtext, marginTop: 6 }}>
                    Username: {admin.username}
                </Text>
                <Text style={{ color: colors.subtext, marginTop: 2 }}>
                    Role: {admin.role}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => {
                    logout();
                }}
                style={{
                    marginTop: 16,
                    backgroundColor: colors.danger,
                    padding: 14,
                    borderRadius: 14,
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '800' }}>ออกจากระบบ</Text>
            </TouchableOpacity>
        </View>
    );
}
