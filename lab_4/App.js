import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';

import FileItem from './components/FileItem';
import FileEditor from './components/FileEditor';
import StorageInfo from './components/StorageInfo';

import styles from './styles/styles';

import {
  formatDate,
  formatSize,
} from './utils/fileHelpers';

export default function App() {
  const ROOT = FileSystem.documentDirectory;

  const [currentPath, setCurrentPath] = useState(ROOT);

  const [items, setItems] = useState([]);

  const [folderName, setFolderName] = useState('');

  const [fileName, setFileName] = useState('');

  const [fileContent, setFileContent] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  const [editorVisible, setEditorVisible] = useState(false);

  const [storageInfo, setStorageInfo] = useState(null);

  useEffect(() => {
    loadDirectory(currentPath);
    loadStorageInfo();
  }, [currentPath]);

  const loadStorageInfo = async () => {
    try {
      const free =
          await FileSystem.getFreeDiskStorageAsync();

      const total =
          await FileSystem.getTotalDiskCapacityAsync();

      setStorageInfo({
        free,
        total,
        used: total - free,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const loadDirectory = async (path) => {
    try {
      const files =
          await FileSystem.readDirectoryAsync(path);

      const detailed = await Promise.all(
          files.map(async (name) => {
            const fullPath = path + name;

            const info =
                await FileSystem.getInfoAsync(fullPath);

            return {
              name,
              path: fullPath,
              isDirectory: info.isDirectory,
              size: info.size || 0,
              modificationTime:
                  info.modificationTime || 0,
            };
          })
      );

      detailed.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory)
          return -1;

        if (!a.isDirectory && b.isDirectory)
          return 1;

        return a.name.localeCompare(b.name);
      });

      setItems(detailed);
    } catch (e) {
      console.log(e);
    }
  };

  const createFolder = async () => {
    if (!folderName.trim()) {
      Alert.alert(
          'Помилка',
          'Введіть назву папки'
      );

      return;
    }

    try {
      const path = currentPath + folderName;

      await FileSystem.makeDirectoryAsync(path);

      setFolderName('');

      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert(
          'Помилка',
          'Не вдалося створити папку'
      );
    }
  };

  const createFile = async () => {
    if (!fileName.trim()) {
      Alert.alert(
          'Помилка',
          'Введіть назву файлу'
      );

      return;
    }

    try {
      const path =
          currentPath + fileName + '.txt';

      await FileSystem.writeAsStringAsync(
          path,
          fileContent || 'Новий файл'
      );

      setFileName('');

      setFileContent('');

      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert(
          'Помилка',
          'Не вдалося створити файл'
      );
    }
  };

  const openFile = async (item) => {
    try {
      const content =
          await FileSystem.readAsStringAsync(
              item.path
          );

      setSelectedFile({
        ...item,
        content,
      });

      setEditorVisible(true);
    } catch (e) {
      Alert.alert(
          'Помилка',
          'Не вдалося відкрити файл'
      );
    }
  };

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(
          selectedFile.path,
          selectedFile.content
      );

      Alert.alert('Успіх', 'Файл збережено');

      setEditorVisible(false);

      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert(
          'Помилка',
          'Не вдалося зберегти файл'
      );
    }
  };

  const deleteItem = async (item) => {
    Alert.alert(
        'Підтвердження',
        `Видалити "${item.name}"?`,
        [
          {
            text: 'Скасувати',
            style: 'cancel',
          },
          {
            text: 'Видалити',
            style: 'destructive',

            onPress: async () => {
              try {
                await FileSystem.deleteAsync(
                    item.path,
                    {
                      idempotent: true,
                    }
                );

                loadDirectory(currentPath);
              } catch (e) {
                Alert.alert(
                    'Помилка',
                    'Не вдалося видалити'
                );
              }
            },
          },
        ]
    );
  };

  const openDirectory = (item) => {
    setCurrentPath(item.path + '/');
  };

  const goBack = () => {
    if (currentPath === ROOT) return;

    let trimmed = currentPath;

    if (trimmed.endsWith('/')) {
      trimmed = trimmed.slice(0, -1);
    }

    const parts = trimmed.split('/');

    parts.pop();

    const newPath = parts.join('/') + '/';

    setCurrentPath(newPath);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Файловий менеджер
        </Text>

        <Text style={styles.label}>
          Поточний шлях:
        </Text>

        <Text style={styles.path}>
          {currentPath}
        </Text>

        <StorageInfo
            storageInfo={storageInfo}
            formatSize={formatSize}
        />

        <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
        >
          <Text style={styles.buttonText}>
            ⬅ Назад
          </Text>
        </TouchableOpacity>

        <FlatList
            data={items}
            keyExtractor={(item) => item.path}
            renderItem={({ item }) => (
                <FileItem
                    item={item}
                    openDirectory={openDirectory}
                    openFile={openFile}
                    deleteItem={deleteItem}
                    formatSize={formatSize}
                    formatDate={formatDate}
                />
            )}
        />

        <TextInput
            placeholder="Назва папки"
            value={folderName}
            onChangeText={setFolderName}
            style={styles.input}
        />

        <TouchableOpacity
            style={styles.button}
            onPress={createFolder}
        >
          <Text style={styles.buttonText}>
            Створити папку
          </Text>
        </TouchableOpacity>

        <TextInput
            placeholder="Назва файлу"
            value={fileName}
            onChangeText={setFileName}
            style={styles.input}
        />

        <TextInput
            placeholder="Початковий текст"
            value={fileContent}
            onChangeText={setFileContent}
            style={styles.input}
        />

        <TouchableOpacity
            style={styles.button}
            onPress={createFile}
        >
          <Text style={styles.buttonText}>
            Створити TXT файл
          </Text>
        </TouchableOpacity>

        <FileEditor
            visible={editorVisible}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            saveFile={saveFile}
            close={() => setEditorVisible(false)}
        />
      </View>
  );
}