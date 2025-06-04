import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../theme/theme';

interface AlertBadgeProps {
  status: 'Crítico' | 'Alerta' | 'Normal';
}

const getColor = (status: string) => {
  if (status === 'Crítico') return colors.danger;
  if (status === 'Alerta') return colors.secondary;
  return colors.success;
};

const AlertBadge: React.FC<AlertBadgeProps> = ({ status }) => (
  <View style={[styles.badge, { backgroundColor: getColor(status) }]}>
    <Text style={styles.text}>{status.toUpperCase()}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.small,
  },
});

export default AlertBadge;