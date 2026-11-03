import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function IconTile({ icon, color = colors.primary, label, onPress }) {
    return (
        <TouchableOpacity style={styles.iconButton} onPress={onPress} activeOpacity={0.85}>
            <View style={[styles.iconCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <View style={[styles.iconInner, { backgroundColor: color }]}>{icon}</View>
            </View>
            <Text style={styles.iconText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconButton: { alignItems: 'center', margin: 14, width: 124 },
    iconCircle: {
        width: 88, height: 88, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
        borderWidth: 1,
    },
    iconInner: {
        width: 64, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
        shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 6, elevation: 5,
    },
    iconText: { marginTop: 10, fontSize: 15, fontWeight: '700', color: colors.text, textAlign: 'center' }
});
