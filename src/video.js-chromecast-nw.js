

var chromecast = require('chromecast-js');

console.log(chromecast);
(function(){
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };


	videojs.plugin("chromecast", function(options) {
    this.chromecastComponent = new vjs.ChromecastComponent(this, options);
    return this.controlBar.addChild(this.chromecastComponent);
  });


	vjs.ChromecastComponent = (function(_super) {
    __extends(ChromecastComponent, _super);
    
    function ChromecastComponent(player, settings) {
      this.settings = settings;
      vjs.Button.call(this, player, settings);
      // if (!player.controls()) {
      //   this.disable();
      // }
      // this.hide();
      // this.initializeApi();
      this.show();
    }

    ChromecastComponent.prototype.initializeApi = function() {
      var apiConfig, sessionRequest;
      if (!vjs.IS_CHROME) {
        return;
      }
      if (!chrome.cast || !chrome.cast.isAvailable) {
        vjs.log("Cast APIs not available. Retrying...");
        setTimeout(this.initializeApi.bind(this), 1000);
        return;
      }
      vjs.log("Cast APIs are available");
      sessionRequest = this.settings.appId ? new chrome.cast.SessionRequest(this.settings.appId) : new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
      apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionJoinedListener, this.receiverListener.bind(this));
      return chrome.cast.initialize(apiConfig, this.onInitSuccess.bind(this), this.castError);
    };

    ChromecastComponent.prototype.buildCSSClass = function() {
      return "vjs-chromecast-button " + (vjs.Button.prototype.buildCSSClass.call(this));
		};

    ChromecastComponent.prototype.buttonText = "Chromecast";

    ChromecastComponent.prototype.onClick = function() {
      vjs.Button.prototype.onClick.call(this);
      console.log('click chromecast');
    };

    return ChromecastComponent;

  })(vjs.Button);

}).call(this);
