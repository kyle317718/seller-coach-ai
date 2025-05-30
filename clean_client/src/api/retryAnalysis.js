import { analyzeProduct } from './config';

export const retryAnalysis = async (retryCount = 3, productInfo) => {
  try {
    return await analyzeProduct(productInfo);
  } catch (error) {
    if (retryCount > 0) return retryAnalysis(retryCount - 1, productInfo);
    throw error;
  }
};
