import axios from 'axios';

const apiKeys = {
  getApiKeyConfirm: async (apiKey: string) => {
    try {
      const { data } = await axios.post('/api/check-key', {
        apiKey,
      });

      return data;
    } catch (error) {
      console.log(error);

      return false;
    }
  },
  postMessage: async (message: string) => {
    try {
      const { data } = await axios.post('/api/chat', {
        message,
      });

      return data;
    } catch (error) {
      console.log(error);

      return false;
    }
  },
};

export default apiKeys;
