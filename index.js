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
  var board = ":white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: \n:white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: \n:white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: \n:white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: \n:white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: \n:white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle: :white_circle:"
  this.commands.connectfour = function(channel, args, user) {
    bot.postMessage(channel, board);

  };
};

Module.prototype.toString = function() {
  return this.name;
};


var exports = module.exports = Module;