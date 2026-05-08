import React from 'react';

import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import styles from '../styles/styles';

export default function FileItem({item, openDirectory, openFile, deleteItem, formatSize,formatDate,}) {
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() =>
                item.isDirectory
                    ? openDirectory(item)
                    : openFile(item)
            }
            onLongPress={() => deleteItem(item)}
        >
            <View>
                <Text style={styles.itemName}>
                    {item.isDirectory ? '📁' : '📄'}{' '}
                    {item.name}
                </Text>

                <Text style={styles.itemInfo}>
                    {item.isDirectory
                        ? 'Папка'
                        : 'Файл'}
                </Text>

                <Text style={styles.itemInfo}>
                    Розмір:
                    {' '}
                    {formatSize(item.size)}
                </Text>

                <Text style={styles.itemInfo}>
                    Оновлено:
                    {' '}
                    {formatDate(item.modificationTime)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}