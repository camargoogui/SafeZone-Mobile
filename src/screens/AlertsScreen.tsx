import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLocations } from '../services/api';
import { Location } from '../types';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const AlertsScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [criticalLocations, setCriticalLocations] = useState<Location[]>([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
      setCriticalLocations(data.filter(loc => loc.status === 'crítico'));
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
    }
  };

  const barData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        data: [3, 5, 2, 4, 6, 3, 2]
      }
    ]
  };

  const pieData = [
    {
      name: 'Crítico',
      population: 3,
      color: '#f44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Alerta',
      population: 5,
      color: '#ff9800',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Normal',
      population: 12,
      color: '#4caf50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Alertas</Text>

        {/* Linha do tempo dos alertas */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Linha do Tempo</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: '#f44336' }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Alerta Crítico - Rio Tietê</Text>
                <Text style={styles.timelineDate}>Hoje, 14:30</Text>
                <Text style={styles.timelineDesc}>Nível da água atingiu 2.5m</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: '#ff9800' }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Alerta Moderado - Córrego do Limoeiro</Text>
                <Text style={styles.timelineDate}>Hoje, 12:15</Text>
                <Text style={styles.timelineDesc}>Nível da água atingiu 1.8m</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Gráficos de estatísticas */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Estatísticas de Alertas</Text>
          <BarChart
            data={barData}
            width={Dimensions.get('window').width - 64}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={styles.chart}
          />
          <PieChart
            data={pieData}
            width={Dimensions.get('window').width - 64}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </View>

        {/* Ranking dos locais mais críticos */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Locais Mais Críticos</Text>
          {criticalLocations.map((location, index) => (
            <View key={location.id} style={styles.rankingItem}>
              <View style={styles.rankingNumber}>
                <Text style={styles.rankingText}>{index + 1}</Text>
              </View>
              <View style={styles.rankingInfo}>
                <Text style={styles.rankingTitle}>{location.nome}</Text>
                <Text style={styles.rankingLevel}>Nível: {location.nivel}m</Text>
              </View>
              <View style={[styles.rankingStatus, { backgroundColor: '#f44336' }]}> 
                <Text style={styles.rankingStatusText}>Crítico</Text>
              </View>
            </View>
          ))}
        </View>
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
    alignItems: 'center',
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginTop: 56,
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionCard: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: 8,
    textAlign: 'center',
  },
  timeline: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 6,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timelineDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  timelineDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rankingNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rankingLevel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rankingStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rankingStatusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default AlertsScreen; 