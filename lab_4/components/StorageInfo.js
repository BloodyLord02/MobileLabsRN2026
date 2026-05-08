import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import styles from '../styles/styles';

export default function StorageInfo({storageInfo, formatSize,}) {
    if (!storageInfo) return null;

    return (
        <View style={styles.storageBox}>
            <Text style={styles.storageText}>
                Загальна памʼять:
                {' '}
                {formatSize(storageInfo.total)}
            </Text>

            <Text style={styles.storageText}>
                Вільно:
                {' '}
                {formatSize(storageInfo.free)}
            </Text>

            <Text style={styles.storageText}>
                Зайнято:
                {' '}
                {formatSize(storageInfo.used)}
            </Text>
        </View>
    );
}