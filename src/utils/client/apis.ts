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
    }
  },
};

export default apiKeys;
