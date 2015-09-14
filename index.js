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
          return self.complete({
              channel_history: result.messages
          });
      });
  }
};
