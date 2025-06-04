// Este código é para o seu projeto mobile React Native.
// Copie e cole no seu projeto mobile no caminho src/context/SelectedLocationContext.ts

import React, { createContext, useContext, useState, ReactNode } from 'react'; // Importar ReactNode explicitamente
import { LocalDeRisco } from '../types'; // Importe a interface LocalDeRisco

// Define o tipo para o valor do contexto
interface SelectedLocationContextType {
  selectedLocation: LocalDeRisco | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocalDeRisco | null>>;
}

// Cria o contexto com um valor inicial undefined.
// O `undefined` inicial é para indicar que o contexto não foi usado dentro de um Provider.
const SelectedLocationContext = createContext<SelectedLocationContextType | undefined>(undefined);

// Hook customizado para usar o contexto facilmente e garantir que ele está dentro de um Provider
export const useSelectedLocationContext = () => {
  const context = useContext(SelectedLocationContext);
  if (context === undefined) {
    // Mensagem de erro mais clara
    throw new Error('useSelectedLocationContext must be used within a SelectedLocationProvider');
  }
  return context;
};

// CORREÇÃO AQUI: Definindo o componente Provider como uma função regular
// e usando parênteses para envolver o JSX retornado em múltiplas linhas
export function SelectedLocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<LocalDeRisco | null>(null);

  return ( // Parênteses aqui para indicar que o JSX continua na próxima linha
    <SelectedLocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </SelectedLocationContext.Provider>
  ); // Fechamento dos parênteses
} // Fechamento da função do componente Provider

// Exporte o contexto também, caso precise acessá-lo diretamente (menos comum)
export default SelectedLocationContext;