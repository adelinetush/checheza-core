function test(tileimage,index,z){
    console.log(tileimage)
    console.log(index);
    console.log(z);
    z.src = 'widgets/memory/imgs/cards/'+tileimage;
}
var Memory = function() {
var tileImages = ["ape.png", "black.png", "chicken.png","dog.png","elephant.png","green.png","hippo.png","lamb.png","orange.png"]
var solutionArray = tileImages.concat(tileImages);
var gameboard = document.getElementById("gameboard");      
    
buildboard();
  
    
function buildboard() {
    console.log(solutionArray[1]);
    shuffle(solutionArray);
    gameboard.innerHTML = "";
  for (var i = 0; i <= ((solutionArray.length) - 1); i++)
  {
    
      gameboard.innerHTML += '<div class="col-md-3 col-xs-4 tile"><img src="widgets/memory/imgs/cardback.png" onclick="test(\''+solutionArray[i]+'\',\''+i+'\',this);return false" class="img-responsive"></div>';
      console.log(solutionArray[i])
  }
}
//fisherYates algorithm
function shuffle ( arr ) {
  var i = arr.length;
  while ( --i > 0 ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var temp = arr[i];
     arr[i] = arr[j];
     arr[j] = temp;  
    }
    return arr
    }
    
    
}
    