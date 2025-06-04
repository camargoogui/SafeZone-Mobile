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

export default api;