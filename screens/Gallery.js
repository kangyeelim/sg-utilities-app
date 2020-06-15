import React from 'react';
import { View, Image, ScrollView, Text } from 'react-native';

import styles from './PhotoScreen.js';

export default ({captures}) => (
    <ScrollView
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]}
    >
        {captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri}>
                <Text>{ uri }</Text>
                <Image source={{uri}} style={styles.galleryImage} />
            </View>
        ))}
    </ScrollView>
);
