import CleanTalkClient from './CleanTalkClient';

describe('CleanTalkClient', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  it('should be a class', () => {
    const client = new CleanTalkClient({});
    expect(client instanceof CleanTalkClient).toBe(true);
  });

  it('should have api key', () => {
    const apiKey = 'testApiKey';
    const client = new CleanTalkClient({ apiKey });
    expect(client.apiKey).toBe(apiKey);
  });

  describe('Method blacklisted', () => {
    const apiKey = 'testApiKey';
    const client = new CleanTalkClient({ apiKey });
    it('should have method named blacklisted', () => {
      expect(client.blacklisted).toBeTruthy();
    });

    it('should add query to check', () => {
      const data = {
        email: 'test@test.com',
        ip: '8.8.8.8',
        nickname: 'spammer',
        jsOn: 10,
        submitTime: 1,
      };
      expect(client.blacklisted(data).queue)
        .toEqual([{
          auth_key: apiKey,
          method_name: 'check_message',
          js_on: data.jsOn,
          sender_email: data.email,
          sender_ip: data.ip,
          sender_nickname: data.nickname,
          submit_time: data.submitTime,
        }]);
    });

    it('should make reset', () => {
      client.reset();
      expect(client.queue).toEqual([]);
    });
  });

  describe('Method spam', () => {
    const apiKey = 'testApiKeySpam';
    const client = new CleanTalkClient({ apiKey });
    it('should have method named spam', () => {
      expect(client.spam).toBeTruthy();
    });

    it('should add query to check', () => {
      const data = {
        method_name: 'spam_check',
        auth_key: apiKey,
        ip: '9.9.9.9',
        email: 'email.for@testing.com',
        date: 'YYYY-MM-DD',
      };
      expect(client.spam(data).queue)
        .toEqual([data]);
    });

    it('should make reset', () => {
      client.reset();
      expect(client.queue).toEqual([]);
    });
  });

  describe('Method callOne', () => {
    const apiKey = 'tugeqy3u5equ';
    const client = new CleanTalkClient({ apiKey });
    it('should return an error with clear messge', () => {
      const spy = jest.fn();
      client.checkOne(spy);
      expect(spy).toHaveBeenCalledWith(new Error('Query queue is empty'));
    });

    it.skip('should make spam check and return result', () =>
      client.spam({
        ip: '127.0.0.1',
        email: 'example@example.com',
        date: '',
      }).checkOne((data) => {
        client.reset();
        return expect(data).toEqual({});
      }),
    );

    it('should make spam check and return blacklisted', () => {
      client.blacklisted({
        email: 'test@test.com',
        ip: '8.8.8.8',
        nickname: 'spammer',
        jsOn: 1,
        submitTime: 12,
      });
      return client.checkOne(data =>
        expect(JSON.parse(data).blacklisted).toBe(1),
      );
    });

    it('should make spam check and return not blacklisted', () => {
      client.reset();
      client.blacklisted({
        email: 'support@mail.ru',
        ip: '217.69.139.199',
        nickname: 'support',
        jsOn: 1,
        submitTime: 1,
      });
      return client.checkOne(data =>
        expect(JSON.parse(data).blacklisted).toBe(0),
      );
    });
  });
});
