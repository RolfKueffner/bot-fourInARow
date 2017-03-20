var package = require('./package.json');
var _ = require('lodash');

var Module = function (bot) {
  this.bot = bot;
  this.name = package.name;
  this.version = package.version;
  // add channel names as trings to only allow certain channels
  this.allowedChannels = [];
  this.help = function () {
    return {
      "connectfour": "Play connect four vs someone"

    };
  };
  this.commands = {};

  this.commands.connectfour = function(channel, args, user) {
    var board= [[]];
    for (i=0; i<6;i++){
      for(j=0; j<7;i++){
        board [i,j] = ":white_circle:";
      }
    }
    bot.postMessage(channel, board);

  };
};

Module.prototype.toString = function() {
  return this.name;
};


var exports = module.exports = Module;