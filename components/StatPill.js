import React from 'react';
import { View, Text } from 'react-native';

export default function StatPill({ label, value, note }) {
    return (
        <View style={{
            backgroundColor: '#171924', padding: 14, borderRadius: 16, minWidth: 120,
            marginRight: 10, borderWidth: 1, borderColor: '#222533'
        }}>
            <Text style={{ color: '#9AA3B2', fontSize: 12 }}>{label}</Text>
            <Text style={{ color: '#E6E8F2', fontSize: 20, fontWeight: '800' }}>{value}</Text>
            {!!note && <Text style={{ color: '#9AA3B2', fontSize: 11 }}>{note}</Text>}
        </View>
    );
}
