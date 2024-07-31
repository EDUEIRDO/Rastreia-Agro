import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/utils/firebase';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleRegister = () => {

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            Alert.alert("Sucesso", "Usuário registrado com sucesso");
            router.push('../')
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert("Erro ao criar usuário", errorMessage);
            console.error(errorCode);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar</Text>
            <TextInput 
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Registrar" onPress={handleRegister}/>
            <Link href='/' style={styles.link}>Ir para a Página de login</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 32,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
    },
});
