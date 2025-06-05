import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import { colors, spacing, fontSizes } from '../theme/theme';
import { getLocaisDeRisco, createSensor, createLeituraSensor, Sensor } from '../services/api';

const AlertFormScreen = ({ navigation }: any) => {
  const [locais, setLocais] = useState<{ id: number; nome: string }[]>([]);
  const [localDeRiscoId, setLocalDeRiscoId] = useState<number | null>(null);
  const [tipoSensor, setTipoSensor] = useState('Boia');
  const [nivelAgua, setNivelAgua] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocaisDeRisco().then(res => setLocais(res.data.map((l: any) => ({ id: l.id, nome: l.nome }))));
  }, []);

  const handleSubmit = async () => {
    if (!localDeRiscoId || !tipoSensor || !nivelAgua) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      // 1. Criar sensor
      const sensorResp = await createSensor({ tipo: tipoSensor, ativo: true, localDeRiscoId });
      const sensor: Sensor = sensorResp.data;
      // 2. Criar leitura do sensor
      await createLeituraSensor({ sensorId: sensor.id, nivelAgua: Number(nivelAgua) });
      Alert.alert('Sucesso', 'Leitura criada! Se o nível for maior que 80, um alerta será gerado automaticamente.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível criar a leitura/sensor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Novo Alerta (via Leitura)" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Local de Risco</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={localDeRiscoId}
            onValueChange={v => setLocalDeRiscoId(v)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione..." value={null} />
            {locais.map(local => (
              <Picker.Item key={local.id} label={`${local.nome} (ID: ${local.id})`} value={local.id} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Tipo do Sensor</Text>
        <TextInput style={styles.input} value={tipoSensor} onChangeText={setTipoSensor} />
        <Text style={styles.label}>Nível da Água (cm)</Text>
        <TextInput style={styles.input} value={nivelAgua} onChangeText={setNivelAgua} keyboardType="numeric" />
        <Button title="Criar Leitura e Gerar Alerta" onPress={handleSubmit} disabled={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.md },
  label: { fontWeight: 'bold', marginTop: spacing.md, fontSize: fontSizes.medium },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, padding: spacing.sm, marginTop: spacing.xs, backgroundColor: '#fff', marginBottom: spacing.sm },
  pickerWrapper: { borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, marginTop: spacing.xs, marginBottom: spacing.md, backgroundColor: '#fff' },
  picker: { width: '100%' },
});

export default AlertFormScreen;