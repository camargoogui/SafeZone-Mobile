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
git clone https://github.com/camargoogui/SafeZone-Mobile.git
```

2. Instale as dependências:
```bash
cd SafeZone-Mobile
npm install
```

3. Inicie o projeto:
```bash
npx expo start
```

4. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR Code que aparecerá no terminal.

## 📦 Estrutura do Projeto

```
/SAFEZONE-MOBILE
├── .expo
├── assets
├── node_modules
├── src
│   ├── components
│   │   ├── AlertBadge.tsx
│   │   ├── Header.tsx
│   │   └── LocationCard.tsx
│   ├── context
│   │   └── SelectedLocationContext.tsx
│   ├── screens
│   │   ├── AlertFormScreen.tsx
│   │   ├── AlertsScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LocationDetailsScreen.tsx
│   │   └── LocationFormScreen.tsx
│   ├── services
│   │   └── api.ts
│   ├── theme
│   │   └── theme.ts
│   └── types
│       └── index.ts
├── .gitignore
├── app.json
├── App.tsx
├── package-lock.json
├── package.json
└── README.md

```

## 🔗 API

O aplicativo consome uma API REST para obter os dados. Os endpoints principais são:

- GET /LocalDeRisco - Lista todos os locais monitorados
- GET /locais/:id - Dados de um local específico
- GET /alertas - Histórico de alertas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 
