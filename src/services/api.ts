import axios from 'axios';
import { LocalDeRisco, Alerta } from '../types';

const api = axios.create({
  baseURL: 'http://10.0.2.2:5180/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getLocaisDeRisco = () => api.get<LocalDeRisco[]>('/LocalDeRisco');
export const getLocalDeRisco = (id: number) => api.get<LocalDeRisco>(`/LocalDeRisco/${id}`);
export const createLocalDeRisco = (data: Partial<LocalDeRisco>) => api.post<LocalDeRisco>('/LocalDeRisco', data);
export const updateLocalDeRisco = (id: number, data: Partial<LocalDeRisco>) => api.put<void>(`/LocalDeRisco/${id}`, data);
export const deleteLocalDeRisco = (id: number) => api.delete<void>(`/LocalDeRisco/${id}`);

export const getAlertas = () => api.get<Alerta[]>('/Alerta');
export const getAlerta = (id: number) => api.get<Alerta>(`/Alerta/${id}`);
export const getAlertasAtivos = () => api.get<Alerta[]>('/Alerta/ativos');
export const createAlerta = (data: Partial<Alerta>) => api.post<Alerta>('/Alerta', data);
export const updateAlerta = (id: number, data: Partial<Alerta>) => api.put<void>(`/Alerta/${id}`, data);
export const deleteAlerta = (id: number) => api.delete<void>(`/Alerta/${id}`);

// Tipos para Sensor e LeituraSensor
export interface Sensor {
  id: number;
  tipo: string;
  ativo: boolean;
  localDeRiscoId: number;
}

export interface LeituraSensor {
  id: number;
  sensorId: number;
  nivelAgua: number;
  dataHora: string;
}

// Funções para Sensor
export const createSensor = (data: Partial<Sensor>) => api.post<Sensor>('/Sensor', data);
export const getSensores = () => api.get<Sensor[]>('/Sensor');

// Funções para LeituraSensor
export const createLeituraSensor = (data: { sensorId: number; nivelAgua: number }) => api.post<LeituraSensor>('/LeituraSensor', data);

export default api;