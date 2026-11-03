import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

export default function HeroHeader({ children }) {
    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d' }}
            style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden' }}
        >
            <View style={{ backgroundColor: 'rgba(12,12,20,0.55)' }}>
                {children}
            </View>
        </ImageBackground>
    );
}
