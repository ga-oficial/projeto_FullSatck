import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/get.users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setName(userData.name);
        setEmail(userData.email);
        setBio(userData.bio);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Permita o acesso à galeria para selecionar uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Perfil atualizado', 'Suas alterações foram salvas.');
  };

  return (
    <SafeAreaView style={styles.profileScreenContainer}>
      <View style={styles.profileContentWrapper}>
        <View style={styles.profileHeaderWrapper}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../../../assets/images/avatar.png')}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              placeholder='Digite seu nome'
              style={styles.nameInputField}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          ) : (
            <Text style={styles.userNameText}>{name}</Text>
          )}
          <Text style={styles.userEmailText}>{email}</Text>
        </View>

        <View style={styles.profileBodyWrapper}>
          <Text style={styles.bioLabelText}>Bio</Text>
          {isEditing ? (
            <TextInput
              placeholder='Digite sua bio'
              style={styles.bioInputField}
              value={bio}
              onChangeText={(text) => setBio(text)}
              multiline
            />
          ) : (
            <Text style={styles.userBioText}>{bio}</Text>
          )}
        </View>
        <TouchableOpacity onPress={isEditing ? handleSave : () => setIsEditing(true)} style={styles.editButtonWrapper}>
          <Text style={styles.editButtonText}>{isEditing ? "Salvar" : "Editar Perfil"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileScreenContainer: {
    flex: 1,
    backgroundColor: '#0314FF',
    padding: 20,
    justifyContent: 'center',
  },
  profileContentWrapper: {
    margin: 20,
  },
  profileHeaderWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userNameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  nameInputField: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  userEmailText: {
    fontSize: 16,
    color: 'gray',
  },
  profileBodyWrapper: {
    marginVertical: 20,
  },
  bioLabelText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  userBioText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  bioInputField: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#0314FF',
    textAlignVertical: 'top',
  },
  profileHeaderContainer: {
    borderRadius: 10,
    marginHorizontal: 200,
    backgroundColor: '#4578F2',
  },
  editButtonWrapper: {
    backgroundColor: '#0314FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
