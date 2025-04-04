import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View
} from 'react-native';
import { atualizarTarefa, criarTarefa, deletarTarefa, listarTarefas } from './services/parseApi';

interface Tarefa {
    objectId: string;
    descricao: string;
    concluida: boolean;
}

export default function Index() {
    const [descricao, setDescricao] = useState('');
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const [fontsLoaded] = useFonts({
        'Gwendolyn-Regular': require('../assets/fonts/Gwendolyn-Regular.ttf'),
        'Gwendolyn-Bold': require('../assets/fonts/Gwendolyn-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }


    const carregarTarefas = async () => {
        try {
            const data = await listarTarefas();
            setTarefas(data);
        } catch (error) {
            Alert.alert('Erro ao carregar tarefas');
            console.log(error);
        }
    };

    const adicionarTarefa = async () => {
        if (!descricao.trim()) return;
        try {
            await criarTarefa(descricao);
            setDescricao('');
            carregarTarefas();
        } catch (error) {
            Alert.alert('Erro ao adicionar tarefa');
            console.log(error);
        }
    };

    const alternarConcluida = (tarefa: Tarefa) => {
        const novoStatus = !tarefa.concluida;

        setTarefas((prev) =>
            prev.map((t) =>
                t.objectId === tarefa.objectId ? { ...t, concluida: novoStatus } : t
            )
        );

        atualizarTarefa(tarefa.objectId, novoStatus).catch((err) => {
            Alert.alert('Erro ao salvar no servidor');
            console.log(err);
        });
    };

    const removerTarefa = (tarefaId: string) => {
        Alert.alert(
            'Deseja excluir esta tarefa?',
            'Essa ação não pode ser desfeita.',
            [
                {
                    text: 'Não',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            setTarefas((prev) => prev.filter((t) => t.objectId !== tarefaId));

                            await deletarTarefa(tarefaId);
                        } catch (error) {
                            Alert.alert('Erro ao apagar tarefa');
                            console.log(error);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Minhas Tarefas</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite uma tarefa"
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholderTextColor="#999"
                />
                <Pressable
                    onPress={adicionarTarefa}
                    style={({ pressed }) => [
                        styles.botao,
                        pressed && { opacity: 0.7 },
                    ]}
                    android_ripple={{ color: '#a3864d' }}
                >
                    <Text style={styles.botaoTexto}>Adicionar</Text>
                </Pressable>
            </View>

            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.objectId}
                renderItem={({ item }: { item: Tarefa }) => (
                    <View style={styles.itemContainer}>
                        <Text
                            style={[
                                styles.item,
                                item.concluida && { textDecorationLine: 'line-through', color: 'gray' },
                            ]}
                        >
                            {item.descricao}
                        </Text>

                        <View style={styles.actions}>
                            <Switch
                                trackColor={{ false: '#ccc', true: '#654E14' }}
                                thumbColor={item.concluida ? '#654E14' : '#654E14'}
                                onValueChange={() => alternarConcluida(item)}
                                value={item.concluida}
                            />

                            <Pressable onPress={() => removerTarefa(item.objectId)}>
                                <MaterialIcons name="delete-outline" size={20} color="#654E14" />
                            </Pressable>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa ainda.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B6AD90',
        padding: 20,
    },
    titulo: {
        fontSize: 45,
        fontFamily: 'Gwendolyn-Bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    form: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#fefae0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    botao: {
        backgroundColor: '#654E14',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    item: {
        fontSize: 18,
        flex: 1,
    },
    vazio: {
        textAlign: 'center',
        color: '#555',
        marginTop: 20,
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#B6AD90',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    trash: {
        fontSize: 20,
        paddingHorizontal: 6,
        color: '#654E14',
    },
});
