import React from 'react';

export interface Location {
  id: number;
  nome: string;
  status: 'normal' | 'alerta' | 'crítico';
  nivel: number;
  ultimaAtualizacao: string;
  local_id: string;
}

export interface Alert {
  id: number;
  local: string;
  tipo: 'normal' | 'alerta' | 'crítico';
  nivel: number;
  data_hora: string;
}

export interface AlertCounts {
  crítico: number;
  alerta: number;
  normal: number;
}

export interface FormData {
  nome: string;
  local_id: string;
}

export type RootStackParamList = {
  Home: undefined;
  Locations: undefined;
  Details: { location: Location };
  AddLocation: undefined;
  AlertsHistory: undefined;
};

export interface SelectedLocationContextType {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}

export const SelectedLocationContext = React.createContext<SelectedLocationContextType>({
  selectedLocation: null,
  setSelectedLocation: () => {},
}); 