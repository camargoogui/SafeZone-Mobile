export interface LocalDeRisco {
  id: number;
  nome: string;
  bairro: string;
  cidade: string;
  statusAlerta: 'Normal' | 'Alerta' | 'Crítico';
}

export interface Alerta {
  id: number;
  localDeRiscoId: number;
  tipoAlerta: string;
  dataHora: string;
  status: string;
}

export interface LocationCardData extends LocalDeRisco {
  nivel?: number;
  ultimaAtualizacao?: string;
}