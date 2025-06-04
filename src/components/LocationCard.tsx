import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LocationCardData } from '../types';
import { colors, spacing, fontSizes } from '../theme/theme';
import AlertBadge from './AlertBadge';

interface LocationCardProps {
  location: LocationCardData;
  onPress: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{location.nome}</Text>
        <AlertBadge status={location.statusAlerta} />
      </View>
      <Text style={styles.level}>Nível da água: {location.nivel !== undefined ? location.nivel + 'cm' : 'N/A'}</Text>
      <Text style={styles.update}>Última atualização: {location.ultimaAtualizacao || 'N/A'}</Text>
      <Text style={styles.city}>{location.cidade} - {location.bairro}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: spacing.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.md,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  level: {
    fontSize: fontSizes.medium,
    marginBottom: spacing.xs,
    color: colors.text,
  },
  update: {
    fontSize: fontSizes.small,
    color: colors.muted,
  },
  city: {
    fontSize: fontSizes.small,
    color: colors.muted,
    marginTop: spacing.xs,
  },
});

export default LocationCard;