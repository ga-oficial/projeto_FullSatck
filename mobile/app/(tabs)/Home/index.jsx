import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
    } else {
      Alert.alert('Sucesso', `Bem-vindo, ${email}!`);
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>SpotyFake</Text>
      </View>
      
      <View style={styles.buttonWrapper}>
        <Link href="/Profile" >
          <Button title="Perfil" color="#4578F2" />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0314FF',
    justifyContent: 'center',
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4578F2',
  },
  buttonWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
