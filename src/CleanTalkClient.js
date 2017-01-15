import request from 'superagent';

class CleanTalkClient {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
  }

  backlinks({ email = '', nickname = '', ip = '127.0.0.1', jsOn = 1, submitTime = 2 } = {}) {
    const data = {
      auth_key: this.apiKey,
      sender_email: email,
      sender_nickname: nickname,
      sender_ip: ip,
      js_on: jsOn,
      submit_time: submitTime,
    };
    request
      .post('/api/pet')
      .send(data)
      .end((err, res) => {
        // Calling the end function will send the request
      });
  }
}

export default CleanTalkClient;
