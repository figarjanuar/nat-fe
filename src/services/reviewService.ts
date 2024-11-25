import axios from 'axios';

const API_URL = 'http://localhost:3000/reviews';

export interface Criterion {
  name: string;
  score: number;
  feedback: string;
}

export interface Review {
  id?: number;
  employeeName: string;
  position: string;
  criteria: Criterion[];
  totalScore?: number;
  generalFeedback: string;
}

export function getAllReviews() {
  return axios.get<Review[]>(API_URL);
}

export function getReviewById(id: number) {
  return axios.get<Review>(`${API_URL}/${id}`);
}

export function createReview(data: Review) {
  return axios.post(API_URL, data);
}

export function updateReview(id: number, data: Review) {
  return axios.put(`${API_URL}/${id}`, data);
}

export function deleteReview(id: number) {
  return axios.delete(`${API_URL}/${id}`);
}

export function getPDF(id: number) {
  return axios.get(`${API_URL}/${id}/pdf`, { responseType: 'blob' });
}
