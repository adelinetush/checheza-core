var Memory = function(){
	var tileSize =  100;
	var tilesArray = [];
  var selectedArray = [];
  var tilesLeft = 0 ;
	var game = new Phaser.Game($(window).width(), $(window).height());
  var timeLeft= 0;
	var playGame = function(game){}
	playGame.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/assets/card_sprites/tiles1_100z-0.png", tileSize, tileSize);
            game.load.image("exit", "widgets/memory/assets/imgs/exit.png")
            //game.load.image("background", "widgets/memory/assets/imgs/background.png")
            game.load.audio("pair","widgets/memory/assets/sounds/good.wav");
		},
		create: function(){
            this.scale.pageAlignVertically = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //game.add.sprite(0,0,'background');
			this.placeTiles();
            sound=game.add.audio("pair");
            //this.exitbutton = this.game.add.sprite(this.game.world.width-80,60,"exit")
            //this.exitbutton.inputEnabled = true;
            //this.exitbutton.input.pixelPerfectClick = true;
            //this.exitbutton.events.onInputDown.add(this.exit, this);
		},
        //exit: function () {
        //    this.WidgetLoader.loadWidget('treehouse');
        //    console.log('pushed')
        //},
		placeTiles: function(){
                var numRows = 1;
	            var numCols = 2;
	            var tileSpacing = 10;
                var lastTile=1;
                tilesLeft = numRows * numCols;
                lastTile=(numRows*numCols);
		    	var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * 	tileSpacing))/2;
		    	var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * 	tileSpacing))/2;
			for(var i = 0; i < numRows * numCols; i++){
				tilesArray.push(Math.floor(i / 2));
			}
               for(i = 0; i < numRows * numCols; i++){
                    var from = game.rnd.between(0,tilesArray.length-1);
                    var to = game.rnd.between(0, tilesArray.length-1);
                    var temp = tilesArray[from];
                    tilesArray[from] = tilesArray[to];
                    tilesArray[to] = temp;
               }
			for(i = 0; i < numCols; i++){
		     	for(var j = 0; j < numRows; j++){  
		          	var tile = game.add.button(leftSpace + i * (tileSize +	tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
		               tile.frame = 1;
		               tile.value = tilesArray[j * numCols + i];
		          }   
		     }     
		},
		showTile: function(target){
               if(selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                    target.frame = target.value;
                    selectedArray.push(target);
                    if(selectedArray.length == 2){
                         game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
                    }
               }
          },
          checkTiles: function(){          
               if(selectedArray[0].value == selectedArray[1].value){
                   sound.play();
                    selectedArray[0].destroy();
                    selectedArray[1].destroy();
                    tilesLeft-=2;
                   console.log(tilesLeft);
                   if(tilesLeft <= 0){
                      console.log(tilesLeft);
                       tilesArray.length = 0;
                       selectedArray.length = 0;
                      game.state.start("Level1");  
                   }
               }
               else{
                    selectedArray[0].frame = 1;
                    selectedArray[1].frame = 1;          
               }
               selectedArray.length = 0;
          }          
	}
    //----------------------------------------level1---------------------------------------------
    var level1 = function(game){}
    level1.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/assets/card_sprites/tiles2_100z-0.png", tileSize, tileSize);	
            game.load.image("exit", "widgets/memory/assets/imgs/exit.png")
            game.load.audio("pair","widgets/memory/assets/sounds/good.wav");

		},
		create: function(){
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            sound=game.add.audio("pair");
            timeLeft = 15;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
		    //this.exitbutton = this.game.add.sprite(this.game.world.width-80,60,"exit")
        },
		placeTiles: function(){
                var numRows = 2;
	            var numCols = 2;
	            var tileSpacing = 10;
                var lastTile = 2;
                tilesLeft = numCols*numRows;
		    	var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * 	tileSpacing))/2;
		    	var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * 	tileSpacing))/2;
			for(var i = 0; i < numRows * numCols; i++){
				tilesArray.push(Math.floor(i / 2));
			}
               for(i = 0; i < numRows * numCols; i++){
                    var from = game.rnd.between(0,tilesArray.length-1);
                    var to = game.rnd.between(0, tilesArray.length-1);
                    var temp = tilesArray[from];
                    tilesArray[from] = tilesArray[to];
                    tilesArray[to] = temp;
               }
			for(i = 0; i < numCols; i++){
		     	for(var j = 0; j < numRows; j++){  
		          	var tile = game.add.button(leftSpace + i * (tileSize +	tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
		               tile.frame = 2;
		               tile.value = tilesArray[j * numCols + i];
		          }   
		     }     
		},
        decreaseTime: function(){
        timeLeft --;
        console.log(timeLeft);
            if(timeLeft == 0){
                tilesArray.length = 0;
                selectedArray.length = 0;
          		game.state.start("Level1");  	
     		}
        },
        showTile: function(target){
               if(selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                    target.frame = target.value;
                    selectedArray.push(target);
                    if(selectedArray.length == 2){
                         game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
                    }
               }
        },
        checkTiles: function(){          
               if(selectedArray[0].value == selectedArray[1].value){
                  sound.play(); 
                   selectedArray[0].destroy();
                    selectedArray[1].destroy(); 
                   tilesLeft-=2;
                   console.log(tilesLeft);
                   if(tilesLeft <= 0){
                      console.log(tilesLeft);
                       tilesArray.length = 0;
                       selectedArray.length = 0;
                      game.state.start("Level2");  
                   }
               }
               else{
                    selectedArray[0].frame = 2;
                    selectedArray[1].frame = 2;          
               }
               selectedArray.length = 0;
          }
        
	}
    
    //----------------------------------------level2---------------------------------------------
    var level2 = function(game){}
    level2.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/assets/card_sprites/tiles3_100z-0.png", tileSize, tileSize);	
            game.load.image("exit", "widgets/memory/assets/imgs/exit.png")
            game.load.audio("pair","widgets/memory/assets/sounds/good.wav");
		},
		create: function(){
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            sound=game.add.audio("pair");
            timeLeft = 20;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);            
            //this.exitbutton = this.game.add.sprite(this.game.world.width-80,60,"exit")
		},
		placeTiles: function(){
                var numRows = 2;
	            var numCols = 3;
	            var tileSpacing = 10;
                var lastTile = 3;
                tilesLeft = numCols*numRows;
		    	var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * 	tileSpacing))/2;
		    	var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * 	tileSpacing))/2;
			for(var i = 0; i < numRows * numCols; i++){
				tilesArray.push(Math.floor(i / 2));
			}
               for(i = 0; i < numRows * numCols; i++){
                    var from = game.rnd.between(0,tilesArray.length-1);
                    var to = game.rnd.between(0, tilesArray.length-1);
                    var temp = tilesArray[from];
                    tilesArray[from] = tilesArray[to];
                    tilesArray[to] = temp;
               }
			for(i = 0; i < numCols; i++){
		     	for(var j = 0; j < numRows; j++){  
		          	var tile = game.add.button(leftSpace + i * (tileSize +	tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
		               tile.frame = 3;
		               tile.value = tilesArray[j * numCols + i];
		          }   
		     }     
		},
        decreaseTime: function(){
        timeLeft --;
        console.log(timeLeft);
            if(timeLeft == 0){
                tilesArray.length = 0;
                selectedArray.length = 0;
          		game.state.start("Level2");  	
     		}
        },
        showTile: function(target){
               if(selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                    target.frame = target.value;
                    selectedArray.push(target);
                    if(selectedArray.length == 2){
                         game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
                    }
               }
        },
        checkTiles: function(){          
               if(selectedArray[0].value == selectedArray[1].value){
                   sound.play();
                    selectedArray[0].destroy();
                    selectedArray[1].destroy(); 
                   tilesLeft-=2;
                   console.log(tilesLeft);
                   if(tilesLeft <= 0){
                      console.log(tilesLeft);
                       tilesArray.length = 0;
                       selectedArray.length = 0;
                      game.state.start("Level3");  
                   }
               }
               else{
                    selectedArray[0].frame = 3;
                    selectedArray[1].frame = 3;          
               }
               selectedArray.length = 0;
          }
        
	}
 
    //----------------------------------------level3---------------------------------------------

    var level3 = function(game){}
    level3.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/assets/card_sprites/tiles5_100z-0.png", tileSize, tileSize);	
            game.load.image("exit", "widgets/memory/assets/imgs/exit.png")
            game.load.audio("pair","widgets/memory/assets/sounds/good.wav");
		},
		create: function(){
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            sound=game.add.audio("pair");
            timeLeft = 35;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);         
            //this.exitbutton = this.game.add.sprite(this.game.world.width-80,60,"exit")
		},
		placeTiles: function(){
                var numRows = 2;
	            var numCols = 5;
	            var tileSpacing = 10;
                var lastTile=5;
                tilesLeft = numCols*numRows;
		    	var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * 	tileSpacing))/2;
		    	var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * 	tileSpacing))/2;
			for(var i = 0; i < numRows * numCols; i++){
				tilesArray.push(Math.floor(i / 2));
			}
               for(i = 0; i < numRows * numCols; i++){
                    var from = game.rnd.between(0,tilesArray.length-1);
                    var to = game.rnd.between(0, tilesArray.length-1);
                    var temp = tilesArray[from];
                    tilesArray[from] = tilesArray[to];
                    tilesArray[to] = temp;
               }
			for(i = 0; i < numCols; i++){
		     	for(var j = 0; j < numRows; j++){  
		          	var tile = game.add.button(leftSpace + i * (tileSize +	tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
		               tile.frame = 5;
		               tile.value = tilesArray[j * numCols + i];
		          }   
		     }     
		},
        decreaseTime: function(){
        timeLeft --;
        console.log(timeLeft);
            if(timeLeft == 0){
                tilesArray.length = 0;
                selectedArray.length = 0;
          		game.state.start("Level3");  	
     		}
        },
		showTile: function(target){
               if(selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                    target.frame = target.value;
                    selectedArray.push(target);
                    if(selectedArray.length == 2){
                         game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
                    }
               }
          },
          checkTiles: function(){          
               if(selectedArray[0].value == selectedArray[1].value){
                    sound.play();
                   selectedArray[0].destroy();
                    selectedArray[1].destroy(); 
                   tilesLeft-=2;
                   console.log(tilesLeft);
                   if(tilesLeft <= 0){
                      console.log(tilesLeft);
                       tilesArray.length = 0;
                       selectedArray.length = 0;
                      game.state.start("Level4");  
                   }
               }
               else{
                    selectedArray[0].frame = 5;
                    selectedArray[1].frame = 5;          
               }
               selectedArray.length = 0;
          }          
	}
    
        //----------------------------------------level4---------------------------------------------
    
    var level4 = function(game){}
    level4.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/assets/card_sprites/tiles8_100z-0.png", tileSize, tileSize);	
            game.load.image("exit", "widgets/memory/assets/imgs/exit.png")
            game.load.audio("pair","widgets/memory/assets/sounds/good.wav");            
		},
		create: function(){
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            sound=game.add.audio("pair");
            timeLeft = 45;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);  
            //this.exitbutton = this.game.add.sprite(this.game.world.width-80,60,"exit")
		},
		placeTiles: function(){
                var numRows = 4;
	            var numCols = 4;
	            var tileSpacing = 10;
                var lastTile=8;
                tilesLeft = numCols*numRows;
		    	var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * 	tileSpacing))/2;
		    	var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * 	tileSpacing))/2;
			for(var i = 0; i < numRows * numCols; i++){
				tilesArray.push(Math.floor(i / 2));
			}
               for(i = 0; i < numRows * numCols; i++){
                    var from = game.rnd.between(0,tilesArray.length-1);
                    var to = game.rnd.between(0, tilesArray.length-1);
                    var temp = tilesArray[from];
                    tilesArray[from] = tilesArray[to];
                    tilesArray[to] = temp;
               }
			for(i = 0; i < numCols; i++){
		     	for(var j = 0; j < numRows; j++){  
		          	var tile = game.add.button(leftSpace + i * (tileSize +	tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
		               tile.frame = 8;
		               tile.value = tilesArray[j * numCols + i];
		          }   
		     }     
		},
        decreaseTime: function(){
        timeLeft --;
        console.log(timeLeft);
            if(timeLeft == 0){
                tilesArray.length = 0;
                selectedArray.length = 0;
          		game.state.start("Level4");  	
     		}
        },
		showTile: function(target){
               if(selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                    target.frame = target.value;
                    selectedArray.push(target);
                    if(selectedArray.length == 2){
                         game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
                    }
               }
          },
          checkTiles: function(){          
               if(selectedArray[0].value == selectedArray[1].value){
                      sound.play();
                 selectedArray[0].destroy();
                    selectedArray[1].destroy(); 
                   tilesLeft-=2;
                   console.log(tilesLeft);
                   if(tilesLeft <= 0){
                      console.log(tilesLeft);
                       tilesArray.length = 0;
                       selectedArray.length = 0;
                      game.state.start("Level5");  
                   }
               }
               else{
                    selectedArray[0].frame = 8;
                    selectedArray[1].frame = 8;          
               }
               selectedArray.length = 0;
          }          
	}
    
    
    
    //----------------------------------------level5---------------------------------------------
    
    var level5 = function(game){}
    level5.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/assets/card_sprites/tiles12_100z-0.png", tileSize, tileSize);	
            game.load.image("exit", "widgets/memory/assets/imgs/exit.png")  
            game.load.audio("pair","widgets/memory/assets/sounds/good.wav");            
		},
		create: function(){
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            sound=game.add.audio("pair");
            timeLeft = 100;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
            //this.exitbutton = this.game.add.sprite(this.game.world.width-80,60,"exit")
		},
		placeTiles: function(){
                var numRows = 4;
	            var numCols = 6;
	            var tileSpacing = 10;
                var lastTile=12;
                tilesLeft = numCols*numRows;
		    	var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * 	tileSpacing))/2;
		    	var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * 	tileSpacing))/2;
			for(var i = 0; i < numRows * numCols; i++){
				tilesArray.push(Math.floor(i / 2));
			}
               for(i = 0; i < numRows * numCols; i++){
                    var from = game.rnd.between(0,tilesArray.length-1);
                    var to = game.rnd.between(0, tilesArray.length-1);
                    var temp = tilesArray[from];
                    tilesArray[from] = tilesArray[to];
                    tilesArray[to] = temp;
               }
			for(i = 0; i < numCols; i++){
		     	for(var j = 0; j < numRows; j++){  
		          	var tile = game.add.button(leftSpace + i * (tileSize +	tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
		               tile.frame = 12;
		               tile.value = tilesArray[j * numCols + i];
		          }   
		     }     
		},
        decreaseTime: function(){
        timeLeft --;
        console.log(timeLeft);
            if(timeLeft == 0){
                tilesArray.length = 0;
                selectedArray.length = 0;
          		game.state.start("Level5");  	
     		}
        },
		showTile: function(target){
               if(selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                    target.frame = target.value;
                    selectedArray.push(target);
                    if(selectedArray.length == 2){
                         game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
                    }
               }
          },
          checkTiles: function(){          
               if(selectedArray[0].value == selectedArray[1].value){
                       sound.play();
                selectedArray[0].destroy();
                    selectedArray[1].destroy(); 
                   tilesLeft-=2;
                   console.log(tilesLeft);
                   if(tilesLeft <= 0){
                      console.log(tilesLeft);
                       tilesArray.length = 0;
                       selectedArray.length = 0;
                      game.state.start("Level6");  
                   }
               }
               else{
                    selectedArray[0].frame = 12;
                    selectedArray[1].frame = 12;          
               }
               selectedArray.length = 0;
          }          
	}
    
        
    //----------------------------------------level6---------------------------------------------
    
    var level6 = function(game){}
    level6.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/assets/card_sprites/tiles16_100z-0.png", tileSize, tileSize);
            game.load.image("exit", "widgets/memory/assets/imgs/exit.png")
            game.load.audio("pair","widgets/memory/assets/sounds/good.wav");
		},
		create: function(){
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            sound=game.add.audio("pair");
            timeLeft = 130;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);     
            //this.exitbutton = this.game.add.sprite(this.game.world.width-80,60,"exit")
		},
		placeTiles: function(){
                var numRows = 8;
	            var numCols = 4;
	            var tileSpacing = 10;
                var lastTile= 16;
                tilesLeft = numCols*numRows;
		    	var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * 	tileSpacing))/2;
		    	var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * 	tileSpacing))/2;
			for(var i = 0; i < numRows * numCols; i++){
				tilesArray.push(Math.floor(i / 2));
			}
               for(i = 0; i < numRows * numCols; i++){
                    var from = game.rnd.between(0,tilesArray.length-1);
                    var to = game.rnd.between(0, tilesArray.length-1);
                    var temp = tilesArray[from];
                    tilesArray[from] = tilesArray[to];
                    tilesArray[to] = temp;
               }
			for(i = 0; i < numCols; i++){
		     	for(var j = 0; j < numRows; j++){  
		          	var tile = game.add.button(leftSpace + i * (tileSize +	tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
		               tile.frame = 16;
		               tile.value = tilesArray[j * numCols + i];
		          }   
		     }     
		},
        decreaseTime: function(){
        timeLeft --;
        console.log(timeLeft);
            if(timeLeft == 0){
                tilesArray.length = 0;
                selectedArray.length = 0;
          		game.state.start("Level6");  	
        }
        },
		showTile: function(target){
               if(selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                    target.frame = target.value;
                    selectedArray.push(target);
                    if(selectedArray.length == 2){
                         game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
                    }
               }
          },
          checkTiles: function(){          
               if(selectedArray[0].value == selectedArray[1].value){
                      sound.play();
                 selectedArray[0].destroy();
                    selectedArray[1].destroy(); 
                   tilesLeft-=2;
                   console.log(tilesLeft);
                   if(tilesLeft <= 0){
                      console.log(tilesLeft);
                       tilesArray.length = 0;
                       selectedArray.length = 0;
                      game.state.start("LevelFinal");  
                   }
               }
               else{
                    selectedArray[0].frame = 16;
                    selectedArray[1].frame = 16;          
               }
               selectedArray.length = 0;
          }          
	}
    
    //----------------------------------------levelfinal---------------------------------------------
    
    var levelFinal = function(game){}
    levelFinal.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/assets/card_sprites/tiles20_100z-0.png", tileSize, tileSize);
            game.load.image("exit", "widgets/memory/assets/imgs/exit.png")
            game.load.audio("pair","widgets/memory/assets/sounds/good.wav");
		},
		create: function(){
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            sound=game.add.audio("pair");
            timeLeft = 160;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
            //this.exitbutton = this.game.add.sprite(this.game.world.width-80,60,"exit");
		},
		placeTiles: function(){
                var numRows = 8;
	            var numCols = 5;
	            var tileSpacing = 10;
                var lastTile= 20;
                tilesLeft = numCols*numRows;
		    	var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * 	tileSpacing))/2;
		    	var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * 	tileSpacing))/2;
			for(var i = 0; i < numRows * numCols; i++){
				tilesArray.push(Math.floor(i / 2));
			}
               for(i = 0; i < numRows * numCols; i++){
                    var from = game.rnd.between(0,tilesArray.length-1);
                    var to = game.rnd.between(0, tilesArray.length-1);
                    var temp = tilesArray[from];
                    tilesArray[from] = tilesArray[to];
                    tilesArray[to] = temp;
               }
			for(i = 0; i < numCols; i++){
		     	for(var j = 0; j < numRows; j++){  
		          	var tile = game.add.button(leftSpace + i * (tileSize +	tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
		               tile.frame = 20;
		               tile.value = tilesArray[j * numCols + i];
		          }   
		     }     
		},
        decreaseTime: function(){
        timeLeft --;
        console.log(timeLeft);
            if(timeLeft == 0){
                tilesArray.length = 0;
                selectedArray.length = 0;
          		game.state.start("LevelFinal");  	
     		}
        },
		showTile: function(target){
               if(selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                    target.frame = target.value;
                    selectedArray.push(target);
                    if(selectedArray.length == 2){
                         game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
                    }
               }
          },
          checkTiles: function(){          
               if(selectedArray[0].value == selectedArray[1].value){
                      sound.play();
                 selectedArray[0].destroy();
                    selectedArray[1].destroy(); 
                   tilesLeft-=2;
                   console.log(tilesLeft);
                   if(tilesLeft <= 0){
                      console.log(tilesLeft);
                      console.log("Done");
                   }
               }
               else{
                    selectedArray[0].frame = 20;
                    selectedArray[1].frame = 20;          
               }
               selectedArray.length = 0;
          }          
	}
    
    game.state.add("LevelFinal", levelFinal);
    game.state.add("Level6", level6);
    game.state.add("Level5", level5);
    game.state.add("Level4", level4);
    game.state.add("Level3", level3);
    game.state.add("Level2", level2);
    game.state.add("Level1", level1);
	game.state.add("PlayGame", playGame);
	game.state.start("PlayGame");
    
}
