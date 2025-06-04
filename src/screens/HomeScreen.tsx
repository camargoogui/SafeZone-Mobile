import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import LocationCard from '../components/LocationCard';
import Header from '../components/Header';
import { getLocaisDeRisco } from '../services/api';
import { LocalDeRisco } from '../types';
import { colors, spacing, fontSizes } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [locais, setLocais] = useState<LocalDeRisco[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const locaisResponse = await getLocaisDeRisco();
      setLocais(locaisResponse.data);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os locais.');
      setLocais([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);
  const onRefresh = useCallback(async () => { setRefreshing(true); await loadData(); }, [loadData]);

  const locaisFiltrados = locais.filter(local =>
    local.nome.toLowerCase().includes(search.toLowerCase()) ||
    local.cidade.toLowerCase().includes(search.toLowerCase()) ||
    local.bairro.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Locais Monitorados" />
      <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <TextInput
          style={styles.search}
          placeholder="Buscar por nome, cidade ou bairro..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Todos os Locais</Text>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : locaisFiltrados.length === 0 ? (
            <Text style={styles.noAlertsText}>Nenhum local cadastrado.</Text>
          ) : (
            locaisFiltrados.map(local => (
              <LocationCard
                key={local.id.toString()}
                location={local}
                onPress={() => navigation.navigate('Detalhes', { localId: local.id })}
              />
            ))
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('LocationForm', { mode: 'create' })}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { paddingVertical: spacing.md },
  search: { backgroundColor: '#fff', borderRadius: spacing.sm, padding: spacing.sm, marginHorizontal: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  sectionCard: { backgroundColor: colors.card, borderRadius: spacing.md, padding: spacing.md, marginHorizontal: spacing.md, marginVertical: spacing.sm, elevation: 2, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3.84 },
  sectionTitle: { fontSize: fontSizes.large, fontWeight: 'bold', marginBottom: spacing.sm, color: colors.primary },
  noAlertsText: { fontSize: fontSizes.medium, color: colors.muted, textAlign: 'center', paddingVertical: spacing.lg },
  fab: { position: 'absolute', bottom: 32, right: 32, backgroundColor: colors.primary, borderRadius: 32, padding: 16, elevation: 4 },
});

export default HomeScreen;