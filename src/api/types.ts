export interface ChatApiClient {
  sendMessage(text: string): Promise<string>;
}
