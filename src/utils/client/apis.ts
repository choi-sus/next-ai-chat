import axios from 'axios';

const apiKeys = {
  checkApiKeyValidity: async (apiKey: string) => {
    const response = await axios.post('/api/check-key', {
      apiKey,
    });

    return response;
  },
};

export default apiKeys;
