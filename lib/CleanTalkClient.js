'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CleanTalkClient = function () {
  function CleanTalkClient(_ref) {
    var apiKey = _ref.apiKey;

    _classCallCheck(this, CleanTalkClient);

    this.apiKey = apiKey;
    this.queue = [];
  }

  _createClass(CleanTalkClient, [{
    key: 'blacklisted',
    value: function blacklisted() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$email = _ref2.email,
          email = _ref2$email === undefined ? 'stop_email@example.com' : _ref2$email,
          _ref2$nickname = _ref2.nickname,
          nickname = _ref2$nickname === undefined ? 'John Doe' : _ref2$nickname,
          _ref2$ip = _ref2.ip,
          ip = _ref2$ip === undefined ? '127.0.0.1' : _ref2$ip,
          _ref2$jsOn = _ref2.jsOn,
          jsOn = _ref2$jsOn === undefined ? 1 : _ref2$jsOn,
          _ref2$submitTime = _ref2.submitTime,
          submitTime = _ref2$submitTime === undefined ? 12 : _ref2$submitTime;

      this.queue.push({
        method_name: 'check_message',
        auth_key: this.apiKey,
        sender_email: email,
        sender_nickname: nickname,
        sender_ip: ip,
        js_on: jsOn,
        submit_time: submitTime
      });
      return this;
    }
  }, {
    key: 'spam',
    value: function spam() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$ip = _ref3.ip,
          ip = _ref3$ip === undefined ? '' : _ref3$ip,
          _ref3$email = _ref3.email,
          email = _ref3$email === undefined ? '' : _ref3$email,
          _ref3$date = _ref3.date,
          date = _ref3$date === undefined ? '' : _ref3$date;

      this.queue.push({
        method_name: 'spam_check',
        auth_key: this.apiKey,
        ip: ip,
        email: email,
        date: date
      });
      return this;
    }
  }, {
    key: 'checkOne',
    value: function checkOne(callback) {
      if (this.queue.length === 0) return callback(new Error('Query queue is empty'));
      var url = this.queue[0].method_name === 'check_message' ? 'http://moderate.cleantalk.org/api2.0' : 'https://api.cleantalk.org/';
      var reqOptions = {
        method: 'POST',
        url: url,
        body: JSON.stringify(this.queue[0])
      };
      return (0, _requestPromiseNative2.default)(reqOptions).then(function (res) {
        return callback(res);
      });
    }
  }, {
    key: 'checkAll',
    value: function checkAll() {
      return this.data.map(function (data) {
        return new Promise(function (resolve, reject) {
          _requestPromiseNative2.default.post('https://moderate.cleantalk.org/api2.0').send(data).set('Accept', 'application/json').end(function (err, res) {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        });
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.queue = [];
    }
  }]);

  return CleanTalkClient;
}();

exports.default = CleanTalkClient;