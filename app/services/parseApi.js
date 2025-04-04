import axios from 'axios';

const APP_ID = '2EDwlzMt8druW7zlheor3aVohJLl5LLhu4fhZgHi';
const REST_API_KEY = '1UxHee6CeoKXqKEXhKonJVREOd7LlXWMUBkeRepc';

const api = axios.create({
  baseURL: 'https://parseapi.back4app.com/classes/Tarefa',
  headers: {
    'X-Parse-Application-Id': APP_ID,
    'X-Parse-REST-API-Key': REST_API_KEY,
    'Content-Type': 'application/json',
  },
});

export const listarTarefas = async () => {
  const response = await api.get('/');
  return response.data.results;
};

export const criarTarefa = async (descricao: string) => {
  const response = await api.post('/', {
    descricao,
    concluida: false,
  });
  return response.data;
};

export const atualizarTarefa = async (id: string, concluida: boolean) => {
  const response = await api.put(`/${id}`, { concluida });
  return response.data;
};

export const deletarTarefa = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
