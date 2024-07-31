import React, { useEffect, useState } from 'react';
import { Alert, ScrollView ,StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { db } from '@/utils/firebase' ;
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/customButton';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface Dados{
    id: string;
    name: string;
    description: string;

}

export default function CadastroItem() {
    const [selectedAdubo, setSelectedAdubo] = React.useState();
    const [selectedFungicida, setSelectedFungicida] = React.useState();
    console.log('Cadastro de itens loaded');

    
    const router = useRouter();
    const [dados, setDados] = useState<Dados[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const querySnapShot = await getDocs(collection(db, 'itens'));
                const items: Dados[] = [];
                querySnapShot.forEach((doc) => {
                    items.push({id: doc.id, ...doc.data() } as Dados);
                });
                setDados(items);
            } catch (error) {
                console.error('Error fetching data', error);
            };
        };
        fetchData();
    }, []);

    const handleAddItem = async () => {
        if (name ==='' || description ===''){
            Alert.alert('Erro', 'Por favor preencha os campos');
            return;
        }
        try {
            if (isEditing && editId) {
                const docRef = doc(db, 'itens', editId);
                await updateDoc(docRef, {
                    name,
                    description,
                });
                setDados(dados.map(item => item.id === editId ? { id: editId, name, description } : item));
                setIsEditing(false);
                setEditId(null);
            }else {
                const docRef = await addDoc(collection(db, 'itens'), {
                    name,
                    description,
                });
                setDados([...dados, { id: docRef.id, name, description }]);
            }
        setName('');
        setDescription('');
        Alert.alert('Sucesso', 'Item adicionado/atualizado com sucesso');
        router.push('../../');
        }catch (error) {
            console.error('Erro ao adicionar/atualizar:', error);
        }
    };
    const handleEditItem = (item: Dados) => {
        setName(item.name);
        setDescription(item.description);
        setEditId(item.id);
        setIsEditing(true);
    };

    const handleDeleteItem = async (id:string) => {
        try {
            await deleteDoc(doc(db, 'itens', id));
            setDados(dados.filter(item => item.id !== id));
            Alert.alert('Sucesso', 'Item excluido com sucesso');
        } catch(error) {
            console.error('Erro ao excluir: ', error )
            Alert.alert('Erro', 'Erro ao excluir o item');
        }
    };

    return(
        <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rastreia Agro</Text>
        <View style={styles.icons}>
          <Ionicons name="notifications-outline" size={30} color="#4CAF50" style={styles.icon} />
          <Ionicons name="person-circle-outline" size={30} color="#4CAF50" style={styles.icon} />
        </View>
      </View>

      <Text style={styles.title}>Cadastro de itens</Text>

      <Text style={styles.sectionTitle}>Identificação</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Nome do produto*</Text>
        <TextInput style={styles.input} placeholder="Nome do produto" value={name} onChangeText={setName} />

        <Text style={styles.label}>Tipo do produto*</Text>
        <Picker
          selectedValue={selectedAdubo}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedAdubo(itemValue)}
        >
          <Picker.Item label="Selecione o tipo do produto" value="" />
          <Picker.Item label="Tipo 1" value="tipo1" />
          <Picker.Item label="Tipo 2" value="tipo2" />
        </Picker>

        <Text style={styles.label}>Foto do produto*</Text>
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Uso de adubos e/ou fertilizantes</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Fez o uso de adubos e/ou fertilizantes?</Text>
        <Picker
          selectedValue={selectedAdubo}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedAdubo(itemValue)}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Sim" value="sim" />
          <Picker.Item label="Não" value="nao" />
        </Picker>

        <Text style={styles.label}>Nome do produto usado*</Text>
        <TextInput style={styles.input} placeholder="Nome do produto usado" />

        <Text style={styles.label}>Foto do produto usado*</Text>
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>

        <Text style={styles.label}>Descrição*</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Text style={styles.sectionTitle}>Uso de fungicidas</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Fez o uso de fungicidas?</Text>
        <Picker
          selectedValue={selectedFungicida}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedFungicida(itemValue)}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Sim" value="sim" />
          <Picker.Item label="Não" value="nao" />
        </Picker>

        <Text style={styles.label}>Nome do produto usado*</Text>
        <TextInput style={styles.input} placeholder="Nome do produto usado" />

        <Text style={styles.label}>Foto do produto usado*</Text>
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>

        <Text style={styles.label}>Descrição*</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição"
          multiline
          numberOfLines={4}
        />
      </View>

      <Text style={styles.sectionTitle}>Datas</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Data do Plantio</Text>
        <TextInput style={styles.input} placeholder="Data do Plantio" />

        <Text style={styles.label}>Data da colheita</Text>
        <TextInput style={styles.input} placeholder="Data da colheita" />

        <Text style={styles.label}>Data do envio</Text>
        <TextInput style={styles.input} placeholder="Data do envio" />
      </View>

      <CustomButton func={handleAddItem} title='Cadastrar item'/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#4CAF50',
      paddingBottom: 10,
    },
    headerText: {
      fontSize: 24,
      color: '#4CAF50',
      fontWeight: 'bold',
    },
    icons: {
      flexDirection: 'row',
    },
    icon: {
      marginLeft: 10,
    },
    title: {
      fontSize: 28,
      color: '#4CAF50',
      textAlign: 'center',
      marginVertical: 20,
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 20,
      color: '#4CAF50',
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#4CAF50',
      paddingBottom: 10,
    },
    label: {
      fontSize: 16,
      color: '#4CAF50',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#4CAF50',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    picker: {
      borderWidth: 1,
      borderColor: '#4CAF50',
      borderRadius: 5,
      marginBottom: 10,
    },
    cameraButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#4CAF50',
      borderRadius: 5,
      marginBottom: 10,
    },
    textArea: {
      height: 80,
    },
    submitButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 20,
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
  });
  