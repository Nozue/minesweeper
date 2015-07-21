var s = {
    rows: 8,
    cols: 8,
    width: 50,
    height: 50
};
              
var c;
var box;
var num;
var zero;
var clickedBomb = false;
var bombs = [];
var clickedBs = [];
var mX;
var mY;
var clickedX;
var clickedY;
var numOfBombsSurrouding = 0;


window.onload = function(){
    var canvas = document.getElementById("gCanvas");
    c = canvas.getContext("2d");

    init();
}

//Detecting click location 
//For simplicity's sake, he is doing it with page detection
//The "right" way to do it should be clicking in the inner element


//create a function with an event listener
//to tell where the user is clicking
window.onclick = function(e){
    mX = e.pageX;
    mY = e.pageY;

    if(Math.floor(mX/s.width) < s.cols && Math.floor(mY/s.height) < s.rows){
        clickedX = Math.floor(mX/s.width);
        clickedY = Math.floor(mY/s.height);
        console.log(clickedX + "," + clickedY); 
    }


    for(var i=0; i<10; i++){
        if(clickedX == bombs[i][0] && clickedY == bombs[i][1]){
            clickedBomb = true;
            lose();
        }
    }

    if(clickedBomb == false){
        clickPass(clickedX,clickedY);
    }
}

function init(){
    box = new Image();
    //update the onload statements for these variables
    num = new Image();
    zero = new Image();
    box.src = "square.png";
    num.src = "empty.png";
    zero.src = "mine.png";

    //generate 10 bombs at random
    //HOWEVER, WHAT IF 2 OR MORE BOMBS TAKE THE SAME PLACE?
    for(var j=0; j<10; j++){
        bombs[j] = [
            Math.floor(Math.random()*10),
            Math.floor(Math.random()*10)]
    } 
   drawCanvas();
}

function drawCanvas(){
    c.clearRect(0,0,400,400);

    for(var i=0; i < s.rows; i++){
        for(var n=0; n < s.cols; n++){
            var x = n*s.width;
            var y = i*s.height;


            var beenClicked = [0,false];

            //Check if x and y correspond to a value of the
            //clicked bombs in the array (clickedBs).
            //If they do, we are doing something extra, besides
            //just drawing a standard box
            if(clickedBs.length > 0){
                for(var k=0; k<clickedBs.length; k++){
                    if(clickedBs[k][0]==n && clickedBs[k][1] == i){
                        beenClicked = [k,true];
                    }
                }
            }

            if(beenClicked[1] == true){
                //This is a multidimensional array
                if(clickedBs[(beenClicked[0])] [2] >0){
                    c.drawImage(num,x,y);
                }else{
                    c.drawImage(zero,x,y);
                }
            //else just draw a standard box image
            }else{
                    c.drawImage(box,x,y); 
                 }

            }

        }
    
        for(i in clickedBs){
            if(clickedBs[i][2]>0){
                c.font = "30px verdana";
                c.fillText(clickedBs[i][2], clickedBs[i][0]*s.width+17, clickedBs[i][1]*s.height+35);
            }
        
        }
    }


function checkBomb(i,x,y){
    if(bombs[i][0] ==x && bombs[i][1] ==y){
        return true;
    }else{
        return false;
    }
}

//Checking the boxes according to the possibilities around their corners
//Added y,y parameters to "clickPass" function. 
function clickPass(x,y){
    var boxesToCheck = [[-1,-1],[0,1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0]];

    for(var i in boxesToCheck){
        for(var n=0; n<10;n++){
            if(checkBomb(n, clickedX + boxesToCheck[i][0], clickedY + boxesToCheck[i][1])==true){
                numOfBombsSurrouding++;
            }
        }
    }
    
    //if a box is clicked, we will add that box to an array of boxes that have been clicked.
    //And we will re-draw the canvas with new images
        //Give starting value of the bomb that was clicked
        clickedBs[(clickedBs.length)] = [clickedX, clickedY, numOfBombsSurrouding];

        drawCanvas();
}

    


function lose(){

}