import client from './client';
import { Agreement } from '../types/agreement';

export const getAgreements = async (): Promise<Agreement[]> => {
  const response = await client.get('/Agreement');
  return response.data;
};

export const getAgreementById = async (id: number): Promise<Agreement> => {
  const response = await client.get(`/Agreement/${id}`);
  return response.data;
};

export const addAgreement = async (agreement: Omit<Agreement, 'id'>): Promise<Agreement> => {
  const response = await client.post('/Agreement/add', agreement);
  return response.data;
};

export const editAgreement = async (id: number, agreement: Partial<Agreement>): Promise<Agreement> => {
  const response = await client.put(`/Agreement/edit/${id}`, agreement);
  return response.data;
};

export const deleteAgreement = async (id: number): Promise<void> => {
  await client.delete(`/Agreement/delete/${id}`);
};
