import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Header from '../components/Header';
import { getLocaisDeRisco } from '../services/api';
import { LocalDeRisco } from '../types';
import { colors, spacing, fontSizes } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import AlertBadge from '../components/AlertBadge';

const AlertsScreen: React.FC = ({ navigation }: any) => {
  const [locais, setLocais] = useState<LocalDeRisco[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadAlertData = async () => {
    setLoading(true);
    try {
      const locaisResponse = await getLocaisDeRisco();
      setLocais(locaisResponse.data.filter(l => l.statusAlerta !== 'Normal'));
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os locais em alerta.');
      setLocais([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAlertData(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAlertData();
    setRefreshing(false);
  };

  const locaisFiltrados = locais.filter(local =>
    local.nome.toLowerCase().includes(search.toLowerCase()) ||
    local.cidade.toLowerCase().includes(search.toLowerCase()) ||
    local.bairro.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Alertas" />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TextInput
          style={styles.search}
          placeholder="Buscar por local, cidade ou bairro..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Todos os Locais em Alerta</Text>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : locaisFiltrados.length === 0 ? (
            <Text style={{ textAlign: 'center', color: colors.muted }}>Nenhum local em alerta.</Text>
          ) : (
            locaisFiltrados.map(local => (
              <View key={local.id} style={styles.alertItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.alertTitle}>{local.nome}</Text>
                  <AlertBadge status={local.statusAlerta} />
                </View>
                <Text style={styles.alertDate}>{local.cidade} - {local.bairro}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AlertForm', { mode: 'create' })}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { alignItems: 'center', paddingBottom: spacing.xl, paddingTop: spacing.xl },
  search: { backgroundColor: '#fff', borderRadius: spacing.sm, padding: spacing.sm, marginHorizontal: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border, width: '92%' },
  sectionCard: { width: '92%', backgroundColor: colors.card, borderRadius: spacing.md, padding: spacing.md, marginBottom: spacing.md, elevation: 2, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 4, alignSelf: 'center' },
  sectionTitle: { fontSize: fontSizes.large, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.sm, textAlign: 'center' },
  alertItem: { backgroundColor: '#fff', borderRadius: spacing.sm, padding: spacing.sm, marginBottom: spacing.sm, elevation: 1 },
  alertTitle: { fontSize: fontSizes.medium, fontWeight: 'bold', color: colors.text },
  alertDate: { fontSize: fontSizes.small, color: colors.muted, marginBottom: spacing.xs },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm, gap: spacing.md },
  fab: { position: 'absolute', bottom: 32, right: 32, backgroundColor: colors.primary, borderRadius: 32, padding: 16, elevation: 4 },
});

export default AlertsScreen;