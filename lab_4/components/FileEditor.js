import React from 'react';

import {
    Modal,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

export default function FileEditor({ visible, selectedFile, setSelectedFile, saveFile, close,}) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                    Редагування файлу
                </Text>

                <Text style={styles.modalPath}>
                    {selectedFile?.name}
                </Text>

                <ScrollView
                    style={{ flex: 1, width: '100%' }}
                >
                    <TextInput
                        multiline
                        value={selectedFile?.content}
                        onChangeText={(text) =>
                            setSelectedFile({
                                ...selectedFile,
                                content: text,
                            })
                        }
                        style={styles.editor}
                        textAlignVertical="top"
                    />
                </ScrollView>

                <TouchableOpacity
                    style={styles.button}
                    onPress={saveFile}
                >
                    <Text style={styles.buttonText}>
                        Зберегти
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={close}
                >
                    <Text style={styles.buttonText}>
                        Закрити
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}