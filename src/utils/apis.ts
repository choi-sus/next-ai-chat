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
  postMessage: async ({
    members,
    message,
  }: {
    members: {
      id: string;
      nickname: string;
      personalityTraits: string[];
      imageUrl: string;
      position?: string;
    }[];
    message: string;
  }) => {
    try {
      const { data } = await axios.post('/api/chat', {
        members,
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
