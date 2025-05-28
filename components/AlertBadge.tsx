import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AlertBadgeProps {
  type: 'normal' | 'alerta' | 'crítico';
  count: number;
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ type, count }) => {
  const getBadgeStyle = (type: string): object => {
    switch (type.toLowerCase()) {
      case 'crítico':
        return styles.critical;
      case 'alerta':
        return styles.warning;
      default:
        return styles.normal;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle(type)]}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  critical: {
    backgroundColor: '#f44336',
  },
  warning: {
    backgroundColor: '#ff9800',
  },
  normal: {
    backgroundColor: '#4caf50',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default AlertBadge; 