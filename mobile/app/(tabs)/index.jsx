import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      return alert('Todos os campos devem ser preenchidos');
    }

    const formData = { email: email, password: password };

    try {
      const res = fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      switch (res.status) {
        case 201:
          alert("Login realizado com sucesso");
          console.log(res.token);
          break;
        case 406:
          alert("Preencha todos os campos");
          break;
        case 418:
          alert("Email já cadastrado");
          break;
        default:
          alert("Erro ao se conectar com servidor");
          break;
      }
    } catch (error) {
      alert("Erro ao realizar o login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Image source={require('../../assets/images/spotyfake.png')} style={styles.logo} />
          <Text style={styles.appName}>SpotyFake</Text>
          <Text style={styles.tagline}>Viva a música como nunca!</Text>
        </View>

        <View style={styles.formSection}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonWrapper}>
            <Link href="/Home">
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.signupWrapper}>
            <Text style={styles.signupText}>Não tem uma conta?</Text>
            <Link href="/signup">
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0314FF',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginLeft: 350,
    marginRight: 20,
  },
  logo: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4578F2',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  formSection: {
    borderRadius: 10,
    marginRight: 300,
    flex: 1,
    backgroundColor: '#4578F2',
    gap: 5,
  },
  input: {
    margin: 10,
    width: 507,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#0314FF',
    color: 'white',
  },
  buttonWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#0314FF',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 14,
    color: 'white',
    marginRight: 5,
  },
  signupLink: {
    color: '#0314FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
