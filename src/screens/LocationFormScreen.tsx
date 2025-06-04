import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createLocalDeRisco, updateLocalDeRisco, getLocalDeRisco } from '../services/api';
import { colors, spacing, fontSizes } from '../theme/theme';
import Header from '../components/Header';

const statusOptions = ['Normal', 'Alerta', 'Crítico'] as const;
type StatusAlerta = typeof statusOptions[number];

const LocationFormScreen = ({ route, navigation }: any) => {
  const { mode, localId } = route.params || {};
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [statusAlerta, setStatusAlerta] = useState<StatusAlerta>('Normal');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && localId) {
      setLoading(true);
      getLocalDeRisco(localId).then(res => {
        setNome(res.data.nome);
        setCidade(res.data.cidade);
        setBairro(res.data.bairro);
        setStatusAlerta(res.data.statusAlerta as StatusAlerta);
        setLoading(false);
      });
    }
  }, [mode, localId]);

  const handleSave = async () => {
    if (!nome || !cidade || !bairro) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'edit') {
        await updateLocalDeRisco(localId, { nome, cidade, bairro, statusAlerta });
        Alert.alert('Sucesso', 'Local atualizado!');
      } else {
        await createLocalDeRisco({ nome, cidade, bairro, statusAlerta });
        Alert.alert('Sucesso', 'Local criado!');
      }
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={mode === 'edit' ? 'Editar Local' : 'Novo Local'} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        <Text style={styles.label}>Cidade</Text>
        <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />
        <Text style={styles.label}>Bairro</Text>
        <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={statusAlerta}
            onValueChange={itemValue => setStatusAlerta(itemValue as StatusAlerta)}
            style={styles.picker}
          >
            {statusOptions.map(opt => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>
        <Button title={mode === 'edit' ? 'Salvar Alterações' : 'Criar Local'} onPress={handleSave} disabled={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.md },
  label: { fontWeight: 'bold', marginTop: spacing.md, fontSize: fontSizes.medium },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, padding: spacing.sm, marginTop: spacing.xs, backgroundColor: '#fff' },
  pickerWrapper: { borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, marginTop: spacing.xs, marginBottom: spacing.md, backgroundColor: '#fff' },
  picker: { width: '100%' },
});

export default LocationFormScreen;