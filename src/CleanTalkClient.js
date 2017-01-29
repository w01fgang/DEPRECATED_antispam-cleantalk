import request from 'request-promise-native';

class CleanTalkClient {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
    this.queue = [];
  }

  blacklisted({
    email = 'stop_email@example.com',
    nickname = 'John Doe',
    ip = '127.0.0.1',
    jsOn = 1,
    submitTime = 12,
  } = {}) {
    this.queue.push({
      method_name: 'check_message',
      auth_key: this.apiKey,
      sender_email: email,
      sender_nickname: nickname,
      sender_ip: ip,
      js_on: jsOn,
      submit_time: submitTime,
    });
    return this;
  }

  spam({ ip = '', email = '', date = '' } = {}) {
    this.queue.push({
      method_name: 'spam_check',
      auth_key: this.apiKey,
      ip,
      email,
      date,
    });
    return this;
  }

  checkOne(callback) {
    if (this.queue.length === 0) return callback(new Error('Query queue is empty'));
    const url = this.queue[0].method_name === 'check_message' ? 'http://moderate.cleantalk.org/api2.0' : 'https://api.cleantalk.org/';
    const reqOptions = {
      method: 'POST',
      url,
      body: JSON.stringify(this.queue[0]),
    };
    return request(reqOptions)
      .then(res => callback(res));
  }

  checkAll() {
    return this.data.map(data =>
      new Promise((resolve, reject) => {
        request
          .post('https://moderate.cleantalk.org/api2.0')
          .send(data)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
      }),
    );
  }

  reset() {
    this.queue = [];
  }
}

export default CleanTalkClient;
