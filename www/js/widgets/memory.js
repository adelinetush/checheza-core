var tileImages_flipped = 0;
flipArrayId = new Array();
flipArray = new Array();
function pickTile(tileimage, index, z) {
    if (tileImages_flipped<2){
    flipArray.push(tileimage)
    flipArrayId.push(z.id)
    tileImages_flipped++
    z.src = 'widgets/memory/imgs/cards/' + tileimage;
    if (tileImages_flipped==2) {
        if (flipArray[0]==flipArray[1]) {
            console.log("match");
        } 
        else {
        console.log("no match");
            setTimeout('hideTile(flipArrayId[0],flipArrayId[1])',500);
        }
        }
    }
}


function hideTile(id0,id1){
    if (id0) {
        document.getElementById(id0).src = "widgets/memory/imgs/cardback.png"; }
    if (id1) {
        document.getElementById(id1).src = "widgets/memory/imgs/cardback.png"; }
}


var Memory = function() {
    var tileImages = ["ape.png", "black.png", "chicken.png", "dog.png", "elephant.png", "green.png", "hippo.png", "lamb.png", "orange.png"]
    var solutionArray = tileImages.concat(tileImages);
    var gameboard = document.getElementById("gameboard");

    buildBoard();


    function buildBoard() {
        shuffle(solutionArray);
        gameboard.innerHTML = "";
        for (var i = 0; i <= ((solutionArray.length) - 1); i++) {

            gameboard.innerHTML += '<div class="col-md-3 col-xs-4 tile"><img id="tileid' + i + '" src="widgets/memory/imgs/cardback.png" onclick="pickTile(\'' + solutionArray[i] + '\',\'' + i + '\',this);return false;" class="img-responsive"></div>';
            console.log(solutionArray[i])
        }
    }

    //fisherYates algorithm
    function shuffle(arr) {
        var i = arr.length;
        while (--i > 0) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr
    }


}