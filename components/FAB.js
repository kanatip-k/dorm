import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FAB({ icon = "add", onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                position: 'absolute', right: 18, bottom: 24, width: 58, height: 58, borderRadius: 29,
                backgroundColor: '#6C5CE7', alignItems: 'center', justifyContent: 'center',
                shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8, elevation: 6
            }}
        >
            <Ionicons name={icon} size={26} color="#fff" />
        </TouchableOpacity>
    );
}
