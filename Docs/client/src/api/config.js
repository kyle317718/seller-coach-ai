import axios from 'axios';
import { analyzeProduct as mockAnalyzeProduct } from './mockApi';

const BASE_URL = process.env.REACT_APP_API_URL || '/mock-api';

export const analyzeProduct = (productInfo) => {
  if (BASE_URL === '/mock-api') {
    // 개발 환경: mockApi 사용
    return mockAnalyzeProduct(productInfo);
  } else {
    // 프로덕션: 실제 API 호출
    return axios.post(`${BASE_URL}/analyze`, productInfo);
  }
};
