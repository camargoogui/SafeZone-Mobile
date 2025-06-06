# SafeZone - Aplicativo Mobile

O SafeZone é um aplicativo mobile desenvolvido com React Native e Expo Go para monitoramento de níveis de água em áreas urbanas, ajudando na prevenção de enchentes.

## 🎥 Demonstração

[Assista ao vídeo de demonstração do projeto](https://youtu.be/dLIv7c3L3ic)

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
- Monitoramento de sensores
- Registro de leituras de nível de água

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

O aplicativo consome uma API REST desenvolvida em .NET. O repositório da API pode ser encontrado em: [SafeZone-DotNet](https://github.com/camargoogui/SafeZone-DotNet.git)

### Endpoints Principais

#### Locais de Risco
- `GET /LocalDeRisco` - Lista todos os locais monitorados
- `GET /LocalDeRisco/:id` - Dados de um local específico
- `POST /LocalDeRisco` - Cria um novo local
- `PUT /LocalDeRisco/:id` - Atualiza um local existente
- `DELETE /LocalDeRisco/:id` - Remove um local

#### Alertas
- `GET /Alerta` - Lista todos os alertas
- `GET /Alerta/:id` - Dados de um alerta específico
- `GET /Alerta/ativos` - Lista apenas alertas ativos
- `POST /Alerta` - Cria um novo alerta
- `PUT /Alerta/:id` - Atualiza um alerta
- `DELETE /Alerta/:id` - Remove um alerta

#### Sensores
- `GET /Sensor` - Lista todos os sensores
- `POST /Sensor` - Cria um novo sensor

#### Leituras de Sensor
- `POST /LeituraSensor` - Registra uma nova leitura de nível de água

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 
