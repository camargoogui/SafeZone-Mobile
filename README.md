# SafeZone - Aplicativo Mobile

O SafeZone é um aplicativo mobile desenvolvido com React Native e Expo Go para monitoramento de níveis de água em áreas urbanas, ajudando na prevenção de enchentes.

## 🚀 Tecnologias Utilizadas

- React Native
- Expo Go
- React Navigation
- Axios
- AsyncStorage

## 👥 Integrantes

- RM556270 - **Bianca Vitoria** - 2TDSPZ  
- RM555166 - **Guilherme Camargo** - 2TDSPM  
- RM555131 - **Icaro Americo** - 2TDSPM

## 📱 Funcionalidades

- Visualização de locais monitorados
- Alertas em tempo real
- Histórico de eventos
- Cadastro de novos locais
- Detalhes de cada local monitorado

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/safezone-mobile.git
```

2. Instale as dependências:
```bash
cd safezone-mobile
npm install
```

3. Inicie o projeto:
```bash
npx expo start
```

4. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR Code que aparecerá no terminal.

## 📦 Estrutura do Projeto

```
/safezone-app
├── /screens
│   ├── HomeScreen.js
│   ├── LocationsScreen.js
│   ├── DetailsScreen.js
│   ├── AddLocationScreen.js
│   └── AlertsHistoryScreen.js
├── /components
│   ├── Header.js
│   ├── LocationCard.js
│   └── AlertBadge.js
├── /services
│   └── api.js
├── App.js
└── package.json
```

## 🔗 API

O aplicativo consome uma API REST para obter os dados dos sensores IoT. Os endpoints principais são:

- GET /locais - Lista todos os locais monitorados
- GET /locais/:id - Dados de um local específico
- GET /alertas - Histórico de alertas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 
