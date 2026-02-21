import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ScrollView, Image, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();


const Header = () => (
  <View style={styles.header}>
    <View style={styles.logoContainer}>
      <Image
        source={require('./assets/ZTU.png')}
        style={styles.logoImage}
      />
    </View>
    <Text style={styles.headerTitle}>FirstMobileApp</Text>
  </View>
);
const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Айсін Владислав Сергійович, ІПЗ-23-1</Text>
  </View>
);
const HomeScreen = () => {
  const newsData = Array(10).fill({
    title: 'Заголовок новини',
    date: 'Дата новини',
    text: 'Короткий текст новини'
  });

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Новини</Text>
      <FlatList
        data={newsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image 
              source={require('./assets/dog1.png')} 
              style={styles.newsImage} 
            />
            <View style={styles.newsTextContainer}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const GalleryScreen = () => {
  const galleryData = Array(12).fill({}); 

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={galleryData}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <View style={styles.galleryItem}>
            <Image
              source={require('./assets/dog1.png')}
              style={styles.galleryImage}
            />
          </View>
        )}
        columnWrapperStyle={styles.galleryRow}
      />
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Реєстрація</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Пароль</Text>
        <TextInput style={styles.input} secureTextEntry={true} />

        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput style={styles.input} secureTextEntry={true} />

        <Text style={styles.label}>Прізвище</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Ім'я</Text>
        <TextInput style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name === 'Головна') iconName = focused ? 'home' : 'home-outline';
              else if (route.name === 'Фотогалерея') iconName = focused ? 'images' : 'images-outline';
              else if (route.name === 'Профіль') iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: '#007BFF',
            tabBarInactiveTintColor: 'gray',
            tabBarShowIcon: true,
            tabBarIndicatorStyle: { backgroundColor: '#007BFF' },
            tabBarLabelStyle: { fontSize: 10, textTransform: 'none' },
          })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5, 
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 60, 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120, 
    height: 40,  
    resizeMode: 'contain', 
  },
  logoText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  footerText: {
    fontStyle: 'italic',
    color: '#666',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  newsItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  newsTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDate: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 2,
  },
  newsText: {
    fontSize: 14,
    color: '#333',
  },
  galleryRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  galleryItem: {
    flex: 1,
    height: 120,
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden', 
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 5,
  },
});