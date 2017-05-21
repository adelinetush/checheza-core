var Memory = function(){
	var tileSize =  80;
  //test
	var tilesArray = [];
  var selectedArray = [];
  var tilesLeft = 0 ;
	var game = new Phaser.Game($(window).width(), $(window).height());
  var timeLeft= 0;
	var playGame = function(game){}
	playGame.prototype = {
		preload: function(){
			game.load.spritesheet("tiles", "widgets/memory/imgs/assets/tiles2z-0.png", tileSize, tileSize);	
		},
		create: function(){
			this.placeTiles();
		},
		placeTiles: function(){
                var numRows = 2;
	            var numCols = 2;
	            var tileSpacing = 10;
                var lastTile=2;
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
		               tile.frame = 2;
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
			game.load.spritesheet("tiles", "widgets/memory/imgs/assets/tiles3z-2-0.png", tileSize, tileSize);	
		},
		create: function(){
            timeLeft = 20;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
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
			game.load.spritesheet("tiles", "widgets/memory/imgs/assets/tiles5z-2-0.png", tileSize, tileSize);	
		},
		create: function(){
            timeLeft = 35;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
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
			game.load.spritesheet("tiles", "widgets/memory/imgs/assets/tiles8z-2-0.png", tileSize, tileSize);	
		},
		create: function(){
            timeLeft = 45;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
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
			game.load.spritesheet("tiles", "widgets/memory/imgs/assets/tiles12z-2-0.png", tileSize, tileSize);	
		},
		create: function(){
            timeLeft = 100;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
		},
		placeTiles: function(){
                var numRows = 6;
	            var numCols = 4;
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
			game.load.spritesheet("tiles", "widgets/memory/imgs/assets/tiles16z-2-0.png", tileSize, tileSize);	
		},
		create: function(){
            timeLeft = 130;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
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
			game.load.spritesheet("tiles", "widgets/memory/imgs/assets/tiles20z-2-0.png", tileSize, tileSize);	
		},
		create: function(){
            timeLeft = 160;
			this.placeTiles();
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
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
    game.state.start("Level2");
	game.state.add("PlayGame", playGame);
	game.state.start("PlayGame");
    
}
