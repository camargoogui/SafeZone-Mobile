import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen: React.FC = () => {
  const [reportText, setReportText] = useState('');

  const reports = [
    {
      id: 1,
      user: 'Maria Silva',
      location: 'Rio Tietê - Ponte do Limão',
      time: '2h atrás',
      text: 'Nível da água subiu muito rápido nas últimas horas. Cuidado ao passar pela região.',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      user: 'João Santos',
      location: 'Córrego do Limoeiro',
      time: '4h atrás',
      text: 'Água começou a invadir a calçada. Recomendo evitar a área.',
      likes: 8,
      comments: 2
    }
  ];

  const tips = [
    {
      id: 1,
      title: 'Como se preparar para enchentes',
      content: '• Mantenha documentos importantes em local seguro\n• Tenha um kit de emergência\n• Conheça as rotas de fuga'
    },
    {
      id: 2,
      title: 'Dicas de segurança',
      content: '• Evite áreas alagadas\n• Não tente atravessar ruas com água corrente\n• Mantenha-se informado'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Comunidade</Text>

        {/* Campo para reportar problema */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Reportar Problema</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o problema que você observou..."
            multiline
            numberOfLines={4}
            value={reportText}
            onChangeText={setReportText}
          />
          <TouchableOpacity style={styles.reportBtn}>
            <Ionicons name="add-circle" size={22} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.reportBtnText}>Enviar Relato</Text>
          </TouchableOpacity>
        </View>

        {/* Feed de relatos */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Relatos Recentes</Text>
          {reports.map(report => (
            <View key={report.id} style={styles.reportItem}>
              <View style={styles.reportHeader}>
                <Text style={styles.reportUser}>{report.user}</Text>
                <Text style={styles.reportTime}>{report.time}</Text>
              </View>
              <Text style={styles.reportLocation}>{report.location}</Text>
              <Text style={styles.reportText}>{report.text}</Text>
              <View style={styles.reportActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="heart-outline" size={20} color="#666" />
                  <Text style={styles.actionText}>{report.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="chatbubble-outline" size={20} color="#666" />
                  <Text style={styles.actionText}>{report.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Dicas da comunidade */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Dicas da Comunidade</Text>
          {tips.map(tip => (
            <View key={tip.id} style={styles.tipItem}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipContent}>{tip.content}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginTop: 56,
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionCard: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'center',
  },
  reportBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  reportItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reportUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reportTime: {
    fontSize: 14,
    color: '#666',
  },
  reportLocation: {
    fontSize: 14,
    color: '#1e88e5',
    marginBottom: 8,
  },
  reportText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
  },
  reportActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
  tipItem: {
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tipContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default CommunityScreen; 