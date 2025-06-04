import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Button, TextInput } from 'react-native';
import Header from '../components/Header';
import { getAlertasAtivos, getLocaisDeRisco } from '../services/api';
import { Alerta, LocalDeRisco } from '../types';
import { colors, spacing, fontSizes } from '../theme/theme';

const AlertsScreen: React.FC = ({ navigation }: any) => {
  const [activeAlerts, setActiveAlerts] = useState<Alerta[]>([]);
  const [locaisDeRisco, setLocaisDeRisco] = useState<LocalDeRisco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => { loadAlertData(); }, []);

  const loadAlertData = async () => {
    try {
      setLoading(true);
      setError(null);
      const alertsResponse = await getAlertasAtivos();
      setActiveAlerts(alertsResponse.data);
      const locaisResponse = await getLocaisDeRisco();
      setLocaisDeRisco(locaisResponse.data);
    } catch {
      setError('Não foi possível carregar os dados de alertas.');
    } finally {
      setLoading(false);
    }
  };

  const getLocalNome = (localId: number): string => {
    const local = locaisDeRisco.find(l => l.id === localId);
    return local ? local.nome : 'Local Desconhecido';
  };

  const alertasFiltrados = activeAlerts.filter(alerta =>
    getLocalNome(alerta.localDeRiscoId).toLowerCase().includes(search.toLowerCase()) ||
    alerta.tipoAlerta.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Alertas Ativos" />
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.search}
          placeholder="Buscar por local ou tipo de alerta..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Alertas Recentes</Text>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : error ? (
            <View>
              <Text style={styles.errorText}>{error}</Text>
              <Button title="Tentar Novamente" onPress={loadAlertData} />
            </View>
          ) : alertasFiltrados.length === 0 ? (
            <Text style={{ textAlign: 'center', color: colors.muted }}>Nenhum alerta ativo no momento.</Text>
          ) : (
            alertasFiltrados.map(alerta => (
              <View key={alerta.id} style={styles.timelineItem}>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Alerta - {getLocalNome(alerta.localDeRiscoId)}</Text>
                  <Text style={styles.timelineDate}>{new Date(alerta.dataHora).toLocaleString()}</Text>
                  <Text style={styles.timelineDesc}>{alerta.tipoAlerta}</Text>
                  <Button title="Ver Detalhes" onPress={() => navigation.navigate('Detalhes', { localId: alerta.localDeRiscoId })} />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { alignItems: 'center', paddingBottom: spacing.xl, paddingTop: spacing.xl },
  search: { backgroundColor: '#fff', borderRadius: spacing.sm, padding: spacing.sm, marginHorizontal: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border, width: '92%' },
  sectionCard: { width: '92%', backgroundColor: colors.card, borderRadius: spacing.md, padding: spacing.md, marginBottom: spacing.md, elevation: 2, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 4, alignSelf: 'center' },
  sectionTitle: { fontSize: fontSizes.large, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.sm, textAlign: 'center' },
  timelineItem: { flexDirection: 'row', marginBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.sm },
  timelineContent: { flex: 1 },
  timelineTitle: { fontSize: fontSizes.medium, fontWeight: 'bold', color: colors.text },
  timelineDate: { fontSize: fontSizes.small, color: colors.muted, marginTop: spacing.xs },
  timelineDesc: { fontSize: fontSizes.small, color: colors.muted, marginTop: spacing.xs },
  errorText: { color: colors.danger, textAlign: 'center', marginBottom: spacing.sm },
});

export default AlertsScreen;