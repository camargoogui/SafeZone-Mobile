import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLocations } from '../services/api';
import { Location } from '../types';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { SelectedLocationContext } from '../types';
import MapView, { Marker } from 'react-native-maps';

const LocationsScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const { selectedLocation, setSelectedLocation } = useContext(SelectedLocationContext);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      setModalVisible(true);
    }
  }, [selectedLocation]);

  const loadLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
    }
  };

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const handleLocationPress = (location: Location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedLocation(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Locais Monitorados</Text>

        {/* Mapa interativo real */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Mapa dos Locais</Text>
          <View style={{ height: 250, borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: -23.5505,
                longitude: -46.6333,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                  title={location.nome}
                  description={`Status: ${location.status} | Nível: ${location.nivel}m`}
                  pinColor={location.status === 'crítico' ? '#f44336' : location.status === 'alerta' ? '#ff9800' : '#4caf50'}
                  onPress={() => setSelectedLocation(location)}
                />
              ))}
            </MapView>
          </View>
        </View>

        {/* Lista de locais */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Lista de Locais</Text>
          {locations.map((location) => {
            let statusColor = '#4caf50';
            let statusIcon = 'checkmark-circle';
            if (location.status === 'crítico') {
              statusColor = '#f44336';
              statusIcon = 'alert-circle';
            } else if (location.status === 'alerta') {
              statusColor = '#ff9800';
              statusIcon = 'warning';
            }
            return (
              <TouchableOpacity
                key={location.id}
                style={[
                  styles.locationCard,
                  { borderLeftColor: statusColor },
                  selectedLocation?.id === location.id && styles.selectedLocation
                ]}
                onPress={() => handleLocationPress(location)}
                activeOpacity={0.85}
              >
                <Ionicons name={statusIcon as any} size={32} color={statusColor} style={styles.statusIcon} />
                <View style={styles.locationCardInfo}>
                  <Text style={styles.locationCardName}>{location.nome}</Text>
                  <View style={styles.locationCardRow}>
                    <Text style={styles.locationCardLabel}>Nível: <Text style={styles.locationCardValue}>{location.nivel} m</Text></Text>
                    <Text style={styles.locationCardLabel}>Atualização: <Text style={styles.locationCardValue}>{location.ultimaAtualizacao}</Text></Text>
                  </View>
                  <Text style={[styles.locationCardStatus, { color: statusColor }]}>{location.status.toUpperCase()}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Gráfico de evolução */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Evolução do Nível da Água</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 64}
            height={220}
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
        </View>

        {/* Modal de detalhes do local */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedLocation?.nome}</Text>
              <Text style={styles.modalLabel}>Status: <Text style={{color: selectedLocation?.status === 'crítico' ? '#f44336' : selectedLocation?.status === 'alerta' ? '#ff9800' : '#4caf50'}}>{selectedLocation?.status}</Text></Text>
              <Text style={styles.modalLabel}>Nível: <Text style={styles.modalValue}>{selectedLocation?.nivel} m</Text></Text>
              <Text style={styles.modalLabel}>Última atualização: <Text style={styles.modalValue}>{selectedLocation?.ultimaAtualizacao}</Text></Text>
              <Pressable style={styles.closeBtn} onPress={handleCloseModal}>
                <Text style={styles.closeBtnText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  mapContainer: {
    height: 200,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginBottom: 8,
    position: 'relative',
  },
  mapMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  mapMarkerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 14,
    padding: 14,
    borderLeftWidth: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  statusIcon: {
    marginRight: 14,
  },
  locationCardInfo: {
    flex: 1,
  },
  locationCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  locationCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  locationCardLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  locationCardValue: {
    fontWeight: 'bold',
    color: '#1e88e5',
  },
  locationCardStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 1,
  },
  selectedLocation: {
    backgroundColor: '#e3f2fd',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    textAlign: 'left',
    width: '100%',
  },
  modalValue: {
    fontWeight: 'bold',
    color: '#1e88e5',
  },
  closeBtn: {
    marginTop: 18,
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LocationsScreen; 