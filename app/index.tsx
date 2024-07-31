import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import { auth } from '@/utils/firebase';
import { Link, useRouter } from "expo-router";

import CustomButton from '../components/customButton';



export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const imagem = "../assets/images/logo.png";

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
            router.push('/(produtor)/cadastroItem');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert('Erro ao realizar login', errorMessage);
        })
    }
    return (
        <View style={styles.container}>
            <Image source={require("@/assets/images/imagem.png")} style={styles.image} />
            <Text style={styles.title}>Bem Vinda(a) Ao</Text>
            <Text style={styles.titleText}>Rastreia Agro</Text>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="senha"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={handleLogin}/>
            <Link href='/signIn' style={styles.link}>Criar Conta</Link>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 40,
    },
    title: {
        fontSize: 32,
        marginBottom: 16,
        textAlign: 'center',
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
    },
    titleText: {
        color: '#4CAF50',
        fontSize: 36,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    forgotPassword: {
        paddingVertical: 10,
    },
    button: {
        width: '70%',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        textAlign: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    orText: {
        fontSize: 25,
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
    },
});