var rest = require('restler')
  , _    = require('lodash')
;

module.exports = {
  init: function() {
  }
  , run: function(step, dexter) {
      var postData = {
          token     : dexter.environment('slack_app_token') 
          , channel : step.input('channel_id').first()
        }
        , url = "https://slack.com/api/channels.history"
        , self = this
      ;

      rest.post(url, { data: postData }).on('complete', function(result, response) {
          var data = {};

          //_.reduce(result.messages, function(result, message) {
          //  _.each(['text', 'attachments', 'username', 'bot_id', 'icons.emoji', 'type', 'subtype', 'ts'], function(key) {
          //      var val = _.get(message, key);
          //      result[key] = result[key] || [];
          //      result[key].push(val);
          //  });
          //  return result;
          //}, data);

          return self.complete(result.messages);
      });
  }
};
