import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import colors from '../theme/colors';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === '1234') {
            navigation.replace('Home');
        } else {
            Alert.alert('เข้าสู่ระบบไม่สำเร็จ', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Dormitory Admin Login</Text>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor={colors.sub} value={username} onChangeText={setUsername} />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor={colors.sub} secureTextEntry value={password} onChangeText={setPassword} />
                <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg, padding: 16 },
    card: { backgroundColor: colors.surface, width: '100%', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border },
    input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 10, backgroundColor: colors.input, color: colors.text },
    label: { marginBottom: 6, fontWeight: '600', color: colors.text },
    title: { fontSize: 22, fontWeight: '800', marginBottom: 16, textAlign: 'center', color: colors.text },
    button: { backgroundColor: colors.text, padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
    buttonText: { color: colors.bg, fontWeight: '800' },
});
