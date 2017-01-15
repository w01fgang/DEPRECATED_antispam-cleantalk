import CleanTalkClient from './CleanTalkClient';

describe('CleanTalkClient', () => {
  it('should be a class', () => {
    const client = new CleanTalkClient({});
    expect(client instanceof CleanTalkClient).toBe(true);
  });

  it('should have api key', () => {
    const apiKey = 'testApiKey';
    const client = new CleanTalkClient({ apiKey });
    expect(client.apiKey).toBe(apiKey);
  });

  describe('Method backlinks', () => {
    const client = new CleanTalkClient({});
    it('should have method named backlinks', () => {
      expect(client.backlinks).toBeTruthy();
    });
  });

  describe('Method spam', () => {
    const client = new CleanTalkClient({});
    it.skip('should have method named spam', () => {
      expect(client.spam).toBeTruthy();
    });
  });
});
