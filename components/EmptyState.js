import React from 'react';
import { View, Text } from 'react-native';

export default function EmptyState({ title = 'No data', subtitle = 'Try adjusting filters.' }) {
    return (
        <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ color: '#E6E8F2', fontWeight: '700', fontSize: 16 }}>{title}</Text>
            <Text style={{ color: '#9AA3B2', marginTop: 6 }}>{subtitle}</Text>
        </View>
    );
}
