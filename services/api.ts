import { Location, Alert } from '../src/types';

// Dados mockados para desenvolvimento
const mockLocations: Location[] = [
  {
    id: 1,
    nome: "Rua das Flores",
    status: "normal",
    nivel: 15,
    ultimaAtualizacao: "2024-03-20 10:30",
    local_id: "FL001"
  },
  {
    id: 2,
    nome: "Avenida Paulista",
    status: "alerta",
    nivel: 45,
    ultimaAtualizacao: "2024-03-20 10:25",
    local_id: "PA001"
  },
  {
    id: 3,
    nome: "Rua Augusta",
    status: "crítico",
    nivel: 80,
    ultimaAtualizacao: "2024-03-20 10:20",
    local_id: "AU001"
  }
];

const mockAlerts: Alert[] = [
  {
    id: 1,
    local: "Rua Augusta",
    tipo: "crítico",
    nivel: 80,
    data_hora: "2024-03-20 10:20"
  },
  {
    id: 2,
    local: "Avenida Paulista",
    tipo: "alerta",
    nivel: 45,
    data_hora: "2024-03-20 10:25"
  }
];

export const getLocations = async (): Promise<Location[]> => {
  // Simulando um delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockLocations;
};

export const getLocationById = async (id: number): Promise<Location> => {
  const location = mockLocations.find(loc => loc.id === id);
  if (!location) {
    throw new Error('Local não encontrado');
  }
  return location;
};

export const getAlerts = async (): Promise<Alert[]> => {
  // Simulando um delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAlerts;
}; 