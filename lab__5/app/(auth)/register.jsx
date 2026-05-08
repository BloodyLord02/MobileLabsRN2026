import {View, Text, TextInput, TouchableOpacity,} from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useAuth();
    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Паролі не співпадають');
            return;
        }
        const success = register(email, password, name);
        if (success) {
            router.replace('/');
        }
    };
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f2f2f2',
                padding: 20,
            }}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 25,
                    borderRadius: 20,

                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,

                    elevation: 5,
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 30,
                    }}
                >
                    Реєстрація
                </Text>

                <Text
                    style={{
                        marginBottom: 5,
                        fontWeight: '600',
                    }}
                >
                    Ім’я
                </Text>

                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Введіть ім’я"
                    style={{
                        borderWidth: 1,
                        borderColor: '#ddd',
                        marginBottom: 20,
                        padding: 15,
                        borderRadius: 12,
                        backgroundColor: '#fafafa',
                    }}
                />
                <Text
                    style={{
                        marginBottom: 5,
                        fontWeight: '600',
                    }}
                >
                    Email
                </Text>
                <TextInput
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Введіть email"
                    style={{
                        borderWidth: 1,
                        borderColor: '#ddd',
                        marginBottom: 20,
                        padding: 15,
                        borderRadius: 12,
                        backgroundColor: '#fafafa',
                    }}
                />
                <Text
                    style={{
                        marginBottom: 5,
                        fontWeight: '600',
                    }}
                >
                    Пароль
                </Text>
                <TextInput
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Введіть пароль"
                    style={{
                        borderWidth: 1,
                        borderColor: '#ddd',
                        marginBottom: 20,
                        padding: 15,
                        borderRadius: 12,
                        backgroundColor: '#fafafa',
                    }}
                />
                <Text
                    style={{
                        marginBottom: 5,
                        fontWeight: '600',
                    }}
                >
                    Підтвердження паролю
                </Text>

                <TextInput
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Повторіть пароль"
                    style={{
                        borderWidth: 1,
                        borderColor: '#ddd',
                        marginBottom: 25,
                        padding: 15,
                        borderRadius: 12,
                        backgroundColor: '#fafafa',
                    }}
                />
                <TouchableOpacity
                    onPress={handleRegister}
                    style={{
                        backgroundColor: '#007AFF',
                        padding: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        Зареєструватися
                    </Text>
                </TouchableOpacity>
                <Link
                    href="/login"
                    style={{
                        marginTop: 20,
                        textAlign: 'center',
                        color: '#007AFF',
                        fontWeight: '600',
                    }}
                >
                    Вже є акаунт? Увійти
                </Link>
            </View>
        </View>
    );
}