import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSizes } from '../theme/theme';
import Header from '../components/Header';

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
      <Header title="Comunidade" />
      <ScrollView contentContainerStyle={styles.container}>
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
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { alignItems: 'center', paddingBottom: spacing.xl },
  sectionCard: { width: '92%', backgroundColor: colors.card, borderRadius: spacing.md, padding: spacing.md, marginBottom: spacing.md, elevation: 2, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 4, alignSelf: 'center' },
  sectionTitle: { fontSize: fontSizes.large, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.sm, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, padding: spacing.md, marginBottom: spacing.md, minHeight: 100, textAlignVertical: 'top' },
  reportBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: spacing.sm, alignSelf: 'center' },
  reportBtnText: { color: '#fff', fontWeight: 'bold', fontSize: fontSizes.medium },
  reportItem: { borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.md },
  reportHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  reportUser: { fontSize: fontSizes.medium, fontWeight: 'bold', color: colors.text },
  reportTime: { fontSize: fontSizes.small, color: colors.muted },
  reportLocation: { fontSize: fontSizes.small, color: colors.primary, marginBottom: spacing.xs },
  reportText: { fontSize: fontSizes.medium, color: colors.text, marginBottom: spacing.sm },
  reportActions: { flexDirection: 'row', gap: spacing.md },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  actionText: { fontSize: fontSizes.small, color: colors.muted },
  tipItem: { marginBottom: spacing.md },
  tipTitle: { fontSize: fontSizes.medium, fontWeight: 'bold', color: colors.text, marginBottom: spacing.xs },
  tipContent: { fontSize: fontSizes.small, color: colors.muted, lineHeight: 20 },
});

export default CommunityScreen