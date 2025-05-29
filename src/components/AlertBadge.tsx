import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AlertBadgeProps {
  status: 'crítico' | 'alerta' | 'normal';
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ status }) => {
  const getColor = () => {
    if (status === 'crítico') return '#f44336';
    if (status === 'alerta') return '#ff9800';
    return '#4caf50';
  };
  return (
    <View style={[styles.badge, { backgroundColor: getColor() }]}> 
      <Text style={styles.text}>{status.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default AlertBadge; 