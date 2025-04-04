// components/TarefaItem.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TarefaItem({ tarefa }) {
  return (
    <View style={styles.item}>
      <Text style={[styles.texto, tarefa.concluida && styles.concluida]}>
        {tarefa.descricao}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  texto: {
    fontSize: 18,
  },
  concluida: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
