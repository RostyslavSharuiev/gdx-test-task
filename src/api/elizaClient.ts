import { client } from './client';
import type { ChatApiClient } from './types';

export class ElizaApiClient implements ChatApiClient {
  async sendMessage(text: string): Promise<string> {
    const response = await client.say({ sentence: text });

    return response.sentence;
  }
}

export const elizaClient = new ElizaApiClient();
