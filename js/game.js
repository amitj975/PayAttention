/*
    Complied file of all game states 
    generated by running grunt on all js file  

*/



(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  
    var game = new Phaser.Game(800, 432, Phaser.AUTO, 'attention');

    // Game States
    game.state.add('boot', require('./states/boot'));
    game.state.add('gameover', require('./states/gameover'));
    game.state.add('menu', require('./states/menu'));
    game.state.add('play', require('./states/play'));
    game.state.add('preload', require('./states/preload'));


      game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

    
//*******************boot*********************************************
'use strict';
function Boot() {
}

Boot.prototype = {
 
    preload: function() {
    
        this.load.image('preloader', 'assets/preloader.gif');
  },
 
    create: function() {
    
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
  }
    
};

module.exports = Boot;

},{}],3:[function(require,module,exports){
    
//****************************gameover*******************************************
'use strict';
function GameOver() {}

GameOver.prototype = {
  
    preload: function () {

    },
  
    create: function () {
       
        //Layout of gameover Screen
        var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
        this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
        this.titleText.anchor.setTo(0.5, 0.5);
        this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'Better luck next time', { font: '32px Arial', fill: '#ffffff', align: 'center'});
        this.congratsText.anchor.setTo(0.5, 0.5);
        this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
        this.instructionText.anchor.setTo(0.5, 0.5);
        

      },
    update: function () {
    
        if(this.game.input.activePointer.justPressed()) {
            // TO start the game again
            this.game.state.start('menu');
        }
        
    }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

//************menu**********************
    
// Menu state for instruction of the game  
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
      
        // Setting up the background
        this.stage.backgroundColor = '#71c5cf';
        this.instruction=this.game.add.sprite(300,0,'instruction');
      
        //Adding the player and starts the animation
        this.dude = this.game.add.sprite(100, 120, 'dude');
        this.dude.animations.add('r',  [5, 6, 7, 8], 10, true);
        this.dude1 = this.game.add.sprite(100, 265, 'dude');
        this.dude1.animations.add('r',  [5, 6, 7, 8], 10, true);
        this.bar =this.game.add.sprite(0,185, 'ground');
        this.bar.scale.setTo(2, 2);
        this.dude.animations.play('r');
        this.dude1.animations.play('r');

        this.instructionup=this.game.add.sprite(135,125,'up');
        this.instructiondown=this.game.add.sprite(135,270,'down');
        this.clickme=this.game.add.sprite(105,208,'clickme');
      
        //Adding function on up arrow key and down arrow key
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up.onDown.add(this.player1, this);   
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        down.onDown.add(this.player2, this); 
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
            
  },
    
    // Altering the road of first player
    player1: function() {
        
        if(this.dude.position.y == 30)
        {
            this.dude.position.y = 120;
            this.instructionup.y=128; 
        }
        else{
            this.dude.position.y = 30;
            this.instructionup.y=38;
        }
        
    },
    
    // Altering the road of second player
    player2: function() {
        
        if(this.dude1.position.y == 265)
        {
            this.dude1.position.y = 350;
            this.instructiondown.y=358;
        }
        else{
            this.dude1.position.y = 265;
             this.instructiondown.y=273;
        }
    },
    
    // starting the game as player click 
  update: function() {
    
      if(this.game.input.activePointer.justPressed()) 
      {
        this.game.state.start('play');
      }
      else if(this.space.isdown){
          this.game.state.start('play');
      }
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

    
//**********************Play*************    
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Display the dude on the screen and starting the animation
        this.dude = this.game.add.sprite(100, 120, 'dude');
        this.game.physics.arcade.enable(this.dude);
        this.audio=this.game.add.audio("scorep");
        this.dude.animations.add('r',  [5, 6, 7, 8], 10, true);
        this.dude1 = this.game.add.sprite(100, 265, 'dude');
        this.game.physics.arcade.enable(this.dude1);
        this.dude1.animations.add('r',  [5, 6, 7, 8], 10, true);
        this.bar =this.game.add.sprite(0,185, 'ground');
        this.bar.scale.setTo(2, 2);
        this.dude.animations.play('r');
        this.dude1.animations.play('r');
        

        //Adding function on up arrow key and down arrow key
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up.onDown.add(this.player1, this);   
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        down.onDown.add(this.player2, this); 
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
            
        // Create a group of 20 obstacles
        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.obstacles.createMultiple(20, 'obstacle');
        
        // Create a group of 20 star
        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        this.stars.createMultiple(20, 'star');
               
        // Timer that calls 'addRowOfobstacles' ever 1.5 seconds
        this.timer = this.game.time.events.loop(1000, this.addRowOfobstacles, this); 
        
        this.timer = this.game.time.events.loop(1000, this.addRowOfobstacles2, this); 

        // Add a score label on the top left of the screen
        this.score = 0
        this.count=0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });    
    },


   // Altering the road of first player
    player1: function() {
        
        if(this.dude.position.y == 30)
        {
            this.dude.position.y = 120;
        }
        else{
            this.dude.position.y = 30;
        }
        
    },
    
    // Altering the road of second player
    player2: function() {
        
        if(this.dude1.position.y == 265)
        {
            this.dude1.position.y = 350;
        }
        else{
            this.dude1.position.y = 265;
        }
    },
    

    // Add a obstacle on the screen
    addOneobstacle: function(x, y) {
        
        // Get the first dead obstacle of our group
        var obstacle = this.obstacles.getFirstDead();
        // Set the new position of the obstacle
        obstacle.reset(x, y);  
        // Add velocity to the obstacle to make it move left
        obstacle.body.velocity.x = -250-this.score*6; 
        // Kill the obstacle when it's no longer visible 
        obstacle.checkWorldBounds = true;
        obstacle.outOfBoundsKill = true;
        
    },
    
    addOnestar: function(x, y) {

        // Get the first dead obstacle of our group
        var star = this.stars.getFirstDead();
        // Set the new position of the obstacle
         star.reset(x, y);
        // Add velocity to the obstacle to make it move left
        star.body.velocity.x = (-250-this.score*6); 
        // Kill the obstacle when it's no longer visible 
        star.checkWorldBounds = true;
        star.outOfBoundsKill = true;
        
    },

    addRowOfobstacles: function() {
        
        var hole = Math.floor(Math.random()*40);
        var c=8;
        c=c+this.score/5;
            
        if(hole<=c){
            this.addOneobstacle(800, 10);
        }
        else if(hole<=2*c){
            this.addOneobstacle(800, 100);
        }
        else if(hole<=3*c){
            this.addOnestar(800,15)
        }
        
    
        this.score += 1;
        this.labelScore.text = 'stars:'+this.count;  
    },
    
     addRowOfobstacles2: function() {
        
        var hole1 = Math.floor(Math.random()*40);
        var c=8;
        c=c+this.score/5;
         
        if(hole1<=c){
            this.addOneobstacle(800, 270);
        }
        else if(hole1<=2*c){
            this.addOneobstacle(800, 365);
        }
         else if(hole1<=3*c){
            this.addOnestar(800,275)
        }
        
        this.score += 1;
        this.labelScore.text = 'stars:'+this.count;  
    },

      
    
     // This function is called 60 times per second
    update: function() {

        // If the dude overlap any obstacles, call 'restartGame'
        this.game.physics.arcade.overlap(this.dude, this.obstacles, this.restartGame, null, this);      
        this.game.physics.arcade.overlap(this.dude1, this.obstacles, this.restartGame, null, this);         
        this.game.physics.arcade.overlap(this.dude, this.stars, this.scoreup, null, this);      
        this.game.physics.arcade.overlap(this.dude1, this.stars, this.scoreup, null, this);     
    },
      
         // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
          this.game.state.start('gameover');
    },
    
     scoreup: function(player,star) {
        // Start the 'main' state, which restarts the game  
        this.audio.play();
        star.kill();
        this.count+=1;
         
    
    }

  };
  
  module.exports = Play;
},{}],6:[function(require,module,exports){

    
//***********Preload*******************************************************************
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
   preload: function() {
       
    // loading the aseets which are used in game   
    this.asset = this.add.sprite(598,432, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('ground', 'assets/platform.png');
    this.load.image('up', 'assets/up.png');
    this.load.image('down', 'assets/down.png');
    this.load.image('clickme', 'assets/clickme.png');
    this.load.image('star', 'assets/diamond.png',30,30);
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.audio('scorep', 'assets/score.wav');
    this.load.image('obstacle', 'assets/bird.png',32,48); 
    this.load.image('instruction', 'assets/instruction.png');
    this.load.image('tux4kids','assets/title.png');
    this.load.image('background_menu','assets/background_menu.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])
