import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Button, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { getLocalDeRisco, deleteLocalDeRisco } from '../services/api';
import { LocalDeRisco } from '../types';
import { colors, spacing, fontSizes } from '../theme/theme';
import Header from '../components/Header';

type DetailsRouteProp = RouteProp<{ params: { localId: number } }, 'params'>;

const LocationDetailsScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<any>();
  const localId = route.params?.localId;
  const [local, setLocal] = useState<LocalDeRisco | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const localResp = await getLocalDeRisco(localId);
      setLocal(localResp.data);
      setLoading(false);
    }
    load();
  }, [localId]);

  const handleDelete = async () => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente deletar este local?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            await deleteLocalDeRisco(localId);
            Alert.alert('Sucesso', 'Local deletado!');
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (loading || !local) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Detalhes do Local" />
        <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary} /></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={local.nome} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{local.nome}</Text>
          <Text style={styles.status}>Status: {local.statusAlerta}</Text>
          <Text style={styles.info}>Cidade: {local.cidade}</Text>
          <Text style={styles.info}>Bairro: {local.bairro}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            title="Editar"
            onPress={() => navigation.navigate('LocationForm', { mode: 'edit', localId: local.id })}
          />
          <Button
            title="Deletar"
            color="red"
            onPress={handleDelete}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: spacing.md },
  card: { backgroundColor: colors.card, borderRadius: spacing.md, padding: spacing.md, marginBottom: spacing.md, elevation: 2 },
  title: { fontSize: fontSizes.xlarge, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.sm },
  status: { fontSize: fontSizes.medium, color: colors.danger, marginBottom: spacing.xs },
  info: { fontSize: fontSizes.medium, color: colors.text, marginBottom: spacing.xs },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md, gap: spacing.md },
});

export default LocationDetailsScreen;