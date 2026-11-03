import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ value, onChangeText, placeholder = 'Search...' }) {
    return (
        <View style={{
            flexDirection: 'row', alignItems: 'center', backgroundColor: '#171924',
            borderRadius: 14, paddingHorizontal: 12, height: 46, borderWidth: 1, borderColor: '#222533'
        }}>
            <Ionicons name="search" size={18} color="#9AA3B2" />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#667085"
                style={{ flex: 1, color: '#E6E8F2', marginLeft: 8 }}
            />
        </View>
    );
}
