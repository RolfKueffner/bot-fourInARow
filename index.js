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
      "connectfourvs": "Play connect four vs someone; Usage !connectfour @user"

    };
  };
  this.commands = {};

  var gametester;
  var opponent;
  var bottomRow = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:"];
  var userTurn;
  var player;
  var boardTemp = [[":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:"],
    [":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:"],
    [":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:"],
    [":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:"],
    [":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:"],
    [":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:",":white_circle:"]];
  var board;
  var boardLogic;

  function clearBoard(){

    board = boardTemp.slice(0);
    for(i=0;i<board.length;i++){
      board[i] = board[i].join("");
    }
  }

  this.commands.connectfourvs = function(channel, args, user) {
    if (gametester === 1){
      bot.postMessage(channel, "Wait for the other game to end "+user.name);
    }
    else {
      gametester = 1;
      opponent = _.find(bot.allUsers, {id: args.substring(2, args.length-1)}).name;
      userTurn = opponent;
      player = user.name;
      clearBoard();
      bot.postMessage(channel, board.join("\n") +"\n"+ bottomRow.join("") + "\n " + userTurn + ", your turn. Choose with !column number.");
      setTimeout(function() {
        bot.postMessage(channel, "Times up for " + opponent + " and " + player + ".");
        board = boardTemp.slice(0);
        boardLogic = boardTemp.slice(0);
        gametester = 0;}, 3600000);
    }
  };

  this.commands.column = function(channel, args, user) {
    var ballSet = false;
    var x;
    var y;
    var ballColor;
    if(gametester != 1){
      bot.postMessage(channel, "No game running!");
    }
    else if(user.name != userTurn){
      bot.postMessage(channel, "its not your turn");
    }
    else{
      var column = args;
      if(!column){
        bot.postMessage(channel, "no valid column");
      }
      else{
        switch(column) {
          case "1":
            column = 1;
            break;
          case "2":
            column = 2;
            break;
          case "3":
            column = 3;
            break;
          case "4":
            column = 4;
            break;
          case "5":
            column = 5;
            break;
          case "6":
            column = 6;
            break;
          case "7":
            column = 7;
            break;
          default:
            column = -1;
        }

        if (column === -1){
          bot.postMessage(channel, "no valid column");
        }
        else{
          boardLogic = boardTemp.slice(0);
          for (i = 5; i >= 0; i--) {
            if (boardLogic[i][column - 1] === ":white_circle:") {
              if (userTurn === opponent) {
                boardLogic[i][column - 1] = ":red_circle:";
                userTurn = player;
                ballColor = ":red_circle:";
              }
              else {
                boardLogic[i][column - 1] = ":large_blue_circle:";
                userTurn = opponent;
                ballColor = ":large_blue_circle:";
              }
              ballSet = true;
              x = i;
              y = column -1;
              break;
            }
          }
          if(!ballSet){
            bot.postMessage(channel, "no valid column");
          }
          else {
            board = boardLogic.slice(0);
            for (i = 0; i < board.length; i++) {
              board[i] = board[i].join("");
            }
            //checking winner vertical
            var winCounter = 0;
            var xTemp = x;
            var yTemp = y;
            var won = false;
            while (xTemp <= 5 && boardLogic[xTemp][yTemp] === ballColor){
              winCounter++;
              xTemp++;
            }
            xTemp = x;
            while (xTemp >= 0  && boardLogic[xTemp][yTemp] === ballColor){
              winCounter++;
              xTemp--;
            }
            //console.log("Vertikal ", xTemp, yTemp, winCounter);

            if(winCounter >= 5){
              bot.postMessage(channel, userTurn + " lost!");
              won = true;
            }
            else{
              //check winner horizontal
              winCounter = 0;
              xTemp = x;
              yTemp = y;
              while (yTemp <= 6 && boardLogic[xTemp][yTemp] === ballColor){
                winCounter++;
                yTemp++;
              }
              yTemp = y;
              while (yTemp >= 0 && boardLogic[xTemp][yTemp] === ballColor){
                winCounter++;
                yTemp--;
              }
              //console.log("Horizontal ", xTemp, yTemp, winCounter);
            }
            if(winCounter >= 5 && !won){
              bot.postMessage(channel, userTurn + " lost!");
              won = true;
            }
            else{
              //check winner diagonal left
              winCounter = 0;
              xTemp = x;
              yTemp = y;
              while (xTemp <= 5 && yTemp <= 6 && boardLogic[xTemp][yTemp] === ballColor){
                winCounter++;
                yTemp++;
                xTemp++
              }
              xTemp = x;
              yTemp = y;
              while (xTemp >= 0 && yTemp >= 0 && boardLogic[xTemp][yTemp] === ballColor){
                winCounter++;
                yTemp--;
                xTemp--
              }
            }
            if(winCounter >= 5 && !won ){
              bot.postMessage(channel, userTurn + " lost!");
              won = true;
            }
            else{
              //check winner diagonal right
              winCounter = 0;
              xTemp = x;
              yTemp = y;
              while (xTemp <= 5 && yTemp >= 0 && boardLogic[xTemp][yTemp] === ballColor){
                winCounter++;
                yTemp--;
                xTemp++
              }
              xTemp = x;
              yTemp = y;
              while (xTemp >= 0 && yTemp <= 6 && boardLogic[xTemp][yTemp] === ballColor){
                winCounter++;
                yTemp++;
                xTemp--
              }
            }
            if(winCounter >= 5 && !won ){
              bot.postMessage(channel, userTurn + " lost!");
              won = true;
            }

            if(won){
              bot.postMessage(channel, board.join("\n") + "\n" + bottomRow.join(""));
              board = boardTemp.slice(0);
              boardLogic = boardTemp.slice(0);
              gametester = 0;
            }
            else {
              bot.postMessage(channel, board.join("\n") + "\n" + bottomRow.join("") + "\n " + userTurn + ", your turn. Choose with !column number.");
            }
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