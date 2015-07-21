var settings = {
    rows: 8,
    cols: 8,
    width: 50,
    height: 50,
    fps: 30
}

var c;
var simpleSquare;
var mX;
var mY;
var clickX;
var clickY;
var mines = [];
var clickMine = false;
var minesAround = 0;


window.onload =  function fillCanvas(){
    var canvas = document.getElementById("gCanvas");
    c = canvas.getContext("2d");
    
    init();
}

window.onclick = function(event){
    mX = event.pageX;
    mY = event.pageY;
    
    if(Math.floor(mX/settings.width) < settings.cols && Math.floor(mY/settings.height) < settings.rows){
        clickX = Math.floor(mX/settings.width);
        clickY = Math.floor(mY/settings.height);
        console.log(clickX + "," + clickY);
    }
    
     for(var i=0; i<8; i++){
        if(clickX == mines[i][0] && clickY == mines[i][1]){
            clickMine = true;
            lost();
        }
    }
    
    if(clickMine == false){
        passed();
    }
}

function init(){
    simpleSquare = new Image();
    simpleSquare.src = "square.png";
/*    simpleSquare.onload = function(){
        drawCanvas();
    }*/
    drawCanvas();
    
}


function drawCanvas(){
    c.clearRect(0,0,800,800);
    
    for(var i=0; i<settings.rows; i++){
        for(var n=0; n<settings.cols; n++){
                var x = n*settings.width;
                var y = i*settings.height;
                c.drawImage(simpleSquare,x,y);
        }
    }
}

function checkMine(i,x,y){
    if(mines[i][0]==x && mines[i][1]==y){
        return true;
    }else{
        return false;
    }
}

function passed(){
    var squareClear = [
        [-1,-1],
        [-1,0],
        [0,-1],
        [0,0],
        [0,1],
        [1,-1],
        [1,0],
        [1,-1]
    ];
    
    for(i in squareClear){
        for(var n=0; n<8; n++){
           if(checkMine(n, clickX + squareClear[i][0], clickY + squareClear[i][1])==true){
                minesAround++;
           }
        }
    }
}

function lost(){
    
}