// import axios from 'axios';

// const API_KEY = '8ce42a6141194a38bbe18cb8a76af320';
// const BASE_URL = 'https://newsapi.org/v2';

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export interface ArticleSource {
//   id: string | null;
//   name: string;
// }

// export interface Article {
//   source: ArticleSource;
//   author: string | null;
//   title: string;
//   description: string | null;
//   url: string;
//   urlToImage: string | null;
//   publishedAt: string;
//   content: string | null;
// }

// export interface NewsApiResponse {
//   status: string;
//   totalResults: number;
//   articles: Article[];
// }

// export const getTopHeadlines = async (country: string = 'us'): Promise<Article[]> => {
//   try {
//     const response = await apiClient.get<NewsApiResponse>('/top-headlines', {
//       params: {
//         country,
//         apiKey: API_KEY,
//       },
//     });

//     if (response.data.status === 'ok') {
//       return response.data.articles;
//     }
//     return [];
//   } catch (error) {
//     console.error('Error fetching top headlines:', error);
//     throw error;
//   }
// };

// export default apiClient;

import axios from "axios"

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY || ""

export const fetchNews = async() => {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  )
  return res.data
}