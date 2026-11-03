import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import colors from '../theme/colors';

export default function AdminLogin({ navigation, auth }) {
    const { login } = auth;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        try {
            login(username, password);
        } catch (e) {
            Alert.alert('Login failed', 'Username หรือ Password ไม่ถูกต้อง');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 20, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 20 }}>
                Admin Login
            </Text>

            <TextInput
                placeholder="Username"
                placeholderTextColor="#9AA3B2"
                style={{ backgroundColor: colors.card, color: '#fff', padding: 14, borderRadius: 12, marginBottom: 12 }}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#9AA3B2"
                style={{ backgroundColor: colors.card, color: '#fff', padding: 14, borderRadius: 12, marginBottom: 12 }}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity onPress={handleLogin}
                style={{ backgroundColor: colors.primary, padding: 16, borderRadius: 12, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '800' }}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
        </View>
    );
}
