import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getLocations } from '../services/api';
import LocationCard from '../components/LocationCard';
import AlertBadge from '../components/AlertBadge';
import { Location, AlertCounts, SelectedLocationContext } from '../types';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [alertCounts, setAlertCounts] = useState<AlertCounts>({
    crítico: 0,
    alerta: 0,
    normal: 0,
  });
  const { setSelectedLocation } = useContext(SelectedLocationContext);

  const loadLocations = async (): Promise<void> => {
    try {
      const data = await getLocations();
      setLocations(data);
      const counts = data.reduce((acc: AlertCounts, loc: Location) => {
        acc[loc.status.toLowerCase() as keyof AlertCounts] = 
          (acc[loc.status.toLowerCase() as keyof AlertCounts] || 0) + 1;
        return acc;
      }, { crítico: 0, alerta: 0, normal: 0 });
      setAlertCounts(counts);
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await loadLocations();
    setRefreshing(false);
  };

  // Ordena por nível e pega os dois mais críticos
  const topCritical = locations
    .filter((loc) => loc.status.toLowerCase() !== 'normal')
    .sort((a, b) => b.nivel - a.nivel)
    .slice(0, 2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Título centralizado */}
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>SafeZone</Text>
        </View>

        {/* Banner de boas-vindas */}
        <View style={styles.banner}>
          <Ionicons name="shield-checkmark" size={36} color="#fff" style={{ marginRight: 12 }} />
          <View>
            <Text style={styles.bannerTitle}>Bem-vindo ao SafeZone</Text>
            <Text style={styles.bannerSubtitle}>Monitoramento inteligente de enchentes urbanas</Text>
          </View>
        </View>

        {/* Resumo dos alertas */}
        <View style={styles.header}>
          <Text style={styles.title}>Resumo de Alertas</Text>
          <View style={styles.badgesRow}>
            <View style={styles.badgeCol}>
              <Ionicons name="alert-circle" size={28} color="#f44336" style={{ marginBottom: 2 }} />
              <Text style={styles.badgeLabel}>Crítico</Text>
            </View>
            <View style={styles.badgeCol}>
              <Ionicons name="warning" size={28} color="#ff9800" style={{ marginBottom: 2 }} />
              <Text style={styles.badgeLabel}>Alerta</Text>
            </View>
            <View style={styles.badgeCol}>
              <Ionicons name="checkmark-circle" size={28} color="#4caf50" style={{ marginBottom: 2 }} />
              <Text style={styles.badgeLabel}>Normal</Text>
            </View>
          </View>
        </View>

        {/* Locais mais críticos */}
        <Text style={styles.sectionTitle}>Locais em Alerta Crítico</Text>
        {topCritical.length === 0 ? (
          <Text style={styles.noCritical}>Nenhum local em alerta no momento.</Text>
        ) : (
          topCritical.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onPress={() => {
                setSelectedLocation(location);
                (navigation as any).navigate('Locais');
              }}
            />
          ))
        )}

        {/* Botão para histórico de alertas */}
        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => (navigation as any).navigate('Alertas')}
        >
          <MaterialIcons name="history" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.historyBtnText}>Ver Histórico de Alertas</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 56,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e88e5',
    letterSpacing: 1,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e88e5',
    padding: 18,
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
    elevation: 2,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerSubtitle: {
    color: '#e3f2fd',
    fontSize: 14,
    textAlign: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    alignItems: 'center',
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e88e5',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  badgeCol: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  badgeLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 16,
    color: '#333',
  },
  noCritical: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 16,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e88e5',
    padding: 14,
    borderRadius: 8,
    margin: 16,
    justifyContent: 'center',
    elevation: 2,
  },
  historyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen; 