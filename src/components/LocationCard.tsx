import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Location } from '../types';

interface LocationCardProps {
  location: Location;
  onPress: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onPress }) => {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'crítico':
        return '#f44336';
      case 'alerta':
        return '#ff9800';
      default:
        return '#4caf50';
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{location.nome}</Text>
          <View
            style={[
              styles.status,
              { backgroundColor: getStatusColor(location.status) },
            ]}
          >
            <Text style={styles.statusText}>{location.status}</Text>
          </View>
        </View>
        <Text style={styles.level}>Nível da água: {location.nivel}cm</Text>
        <Text style={styles.update}>
          Última atualização: {location.ultimaAtualizacao}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  level: {
    fontSize: 16,
    marginBottom: 4,
  },
  update: {
    fontSize: 12,
    color: '#666',
  },
});

export default LocationCard; 