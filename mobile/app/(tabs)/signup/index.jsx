import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  const [name, setName] = useState("");
  const [bday, setBday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !bday || !email || !password) {
      return alert('Todos os campos devem ser preenchidos');
    }

    const formData = { name, bday, email, password };

    try {
      const res = fetch("http://localhost:8000/registro", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      switch (res.status) {
        case 201:
          alert("Usuário criado");
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
      alert("Erro ao tentar registrar");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.logoSection}>
          <Image source={require('../../../assets/images/spotyfake.png')} style={styles.logo} />
          <Text style={styles.appTitle}>SpotyFake</Text>
          <Text style={styles.tagline}>Cadastre-se e crie suas playlists!</Text>
        </View>

        <View style={styles.formSection}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={(text) => setName(text)}
          />
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
            placeholder="Data de nascimento (dd/mm/aaaa)"
            placeholderTextColor="#fff"
            value={bday}
            onChangeText={(text) => setBday(text)}
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
            <Link href="/">
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Cadastre-se</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Já tem conta?</Text>
            <Link href="/">
              <Text style={styles.loginLink}>Entre</Text>
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
  contentWrapper: {
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
  appTitle: {
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
    width: 480,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#0314FF',
    color: 'white',
  },
  buttonWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#0314FF',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginPromptText: {
    fontSize: 14,
    color: 'white',
    marginRight: 5,
  },
  loginLink: {
    color: '#0314FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
