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

  var gametester;
  var opponent;
  var board = [[]];
  var bottomRow = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:"];
  var userTurn;
  var player;

  this.commands.connectfour = function(channel, args, user) {
    if (gametester === 1){
      bot.postMessage(channel, "Wait for the other game to end "+user.name);
    }
    else {
      gametester = 1;
      opponent = args.substring(1, args.length);
      // todo if(opponent != _.find), timeout
      userTurn = opponent;
      player = user.name;
      for (i = 0; i < 6; i++) {
        for (j = 0; j < 7; i++) {
          board [i, j] = ":white_circle:";
        }
      }
      bot.postMessage(channel, board +"\n"+ bottomRow + "\n " + userTurn + ", your turn. Choose with !column number.");
    }
  };

  this.commands.column = function(channel, args, user) {
    if(gametester != 1){
      bot.postMessage(channel, "No game running!");
    }
    else{
      var column = args;
      if(!column){
        bot.postMessage(channel, "no valid column");
      }
      else{
        switch(column) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          case 6:
            break;
          case 7:
            break;
          default:
            column = -1;
        }
      }
      if (column === -1){
        bot.postMessage(channel, "no valid column");
      }
      else{
        for (i = 5; i >= 0; i--){
          if(board[i,column] === ":white_circle:"){
            if(userTurn === opponent){
              board[i,column] = ":red_circle:";
              userTurn = player;
            }
            else{
              board[i,column] = ":large_blue_circle:";
              userTurn = opponent;
            }
            break;
          }
          else{
            bot.postMessage(channel, "no valid column");
          }
        }
      }
    }
  };
};

Module.prototype.toString = function() {
  return this.name;
};


var exports = module.exports = Module;