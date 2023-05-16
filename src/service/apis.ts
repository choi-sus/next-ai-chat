import type { MembersTypes } from '@/app.features/chat/types/MembersTypes';

import appClient from './core';

const apiKeys = {
  getApiKeyConfirm: async (apiKey: string) => {
    try {
      const { data } = await appClient.post('/api/check-key', {
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
    members: MembersTypes[];
    message: string;
  }) => {
    try {
      const { data } = await appClient.post('/api/chat', {
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
