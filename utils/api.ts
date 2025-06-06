import axios from 'axios';

// Configuração base do axios
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  withCredentials: true // Importante para enviar/receber cookies
});

// Tipos
export interface LoginResponse {
  detail: string;
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
  };
}

export interface LoginError {
  detail?: string;
  non_field_errors?: string[];
  username?: string[];
  password?: string[];
}

// Função de login administrativo
export const adminLogin = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/admin/login/', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as LoginError;
    }
    throw new Error('Erro ao conectar com o servidor');
  }
}; 