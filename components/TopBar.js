import React from 'react';
import { View, Text } from 'react-native';
import colors from '../theme/colors';

export default function TopBar({ title, right = null }) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 18,
            paddingTop: 14,
            paddingBottom: 10,
        }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800' }}>{title}</Text>
            {right}
        </View>
    );
}
