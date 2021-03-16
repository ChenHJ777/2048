var board = [];
var score = 0;
var hasConflicted = [];
var bestScore = 0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


$(document).ready(function(){
    prepareForMobile();
    newgame();  
});
console.log(window.screen.availWidth);
function prepareForMobile(){
    if(documentWidth > 500){
        girdContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
        $("#h1").css({
            fontSize: 70,
            left: 2*girdContainerWidth-300,
            top: 0
        });
        $("#newgamebutton").css({
            left: 2*girdContainerWidth+20
        });
        $("#single-score").css({
            left: 2*girdContainerWidth-40
        });
        $("#best").css({
            left: 2*girdContainerWidth+80
        });
        $("#identify").css({
            fontSize: 20,
            left: 2*girdContainerWidth-240,
            top: 6*cellSpace
        });
    }else{
        $("#h1").css({
            fontSize: 60,
            left: cellSideLength-70,
            top: -25
        });
        $("#newgamebutton").css({
            left: 3.3*cellSideLength
        });
        $("#single-score").css({
            left: 3.3*cellSideLength-120
        });
        $("#best").css({
            left: 3.3*cellSideLength
        });
        $("#identify").css({
            top: -0.4*cellSideLength,
            left: 4*cellSideLength 
        });
    }

    $("#gird-container").css("width" , girdContainerWidth - 2 * cellSpace);
    $("#gird-container").css("height" , girdContainerWidth - 2 * cellSpace);
    $("#gird-container").css("border-radius" , 0.02 * girdContainerWidth);
    $("#gird-container").css("padding" , cellSpace);


    $(".gird-cell").css("width" , cellSideLength);
    $(".gird-cell").css("height" , cellSideLength);
    $(".number-cell").css("font-size" , 0.3*cellSideLength)
}

function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for( let i = 0 ; i < 4 ; i ++ )
        for( let j = 0 ; j < 4 ; j ++ ){

            let girdCell = $('#gird-cell-'+i+"-"+j);
            girdCell.css('top', getTop( i , j ) );
            girdCell.css('left', getLeft( i , j ) );
        }

    //原生js部分
    // for(var i = 0 ; i < 4 ; i++){
    //     idArr[i] = [];
    //     for(var j = 0 ; j < 4 ; j++){
    //         id = "gird-cell-"+i+"-"+j; 
    //         idArr[i][j] = id;
    //     }
    // }

    // for(let i = 0 ; i < idArr.length ; i ++){
    //     for(let j = 0 ;j < idArr.length ; j ++){
    //         let girdCell = document.getElementById(idArr[i][j]);
    //         girdCell.style.top = getTop(i,j) + "px";
    //         girdCell.style.left = getLeft(i,j) + "px";
    //     }
    // }

    for(let i = 0 ; i < 4 ; i ++){
        board[i] = [];
        hasConflicted[i] = [];
        for(let j = 0 ; j < 4 ; j ++){
           board[i][j] = 0;
           hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    $("#score").text(0);
}

function updateBoardView(){
    $(".number-cell").remove();
    for( let i = 0 ; i < 4 ; i ++){
        for(let j = 0 ; j < 4 ; j ++){
            $("#gird-container").append('<div id = "number-cell-'+i+'-'+j+'" class = "number-cell" ></div>')
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getTop(i,j) + 0.5*cellSideLength);
                theNumberCell.css('left',getLeft(i,j) + 0.5*cellSideLength);
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getTop(i,j));
                theNumberCell.css('left',getLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $(".number-cell").css("line-height" , cellSideLength + "px");
    $(".number-cell").css("font-size" , 0.36*cellSideLength + "px");
}

function generateOneNumber(){
    if(nospace(board)){
        return false;
    }

//随机生成位置
    let randx = parseInt(Math.floor(Math.random()*4));
    let randy = parseInt(Math.floor(Math.random()*4));
    let time = 0;
    while( time < 50){
        if(board[randx][randy] == 0) break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
        time ++;
    }
    if(time == 50){
    	for( let i = 0 ; i < 4 ; i ++ )
    		for(let j = 0 ; j < 4 ; j ++){
    			if(board[i][j] = 0){
    				randx = i ;
    				randy = j ;
    			}
    		}
    }

//随机生成一个数字
    let randNumber = Math.random() < 0.5 ? 2 : 4;

//随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );
    return true;
}

$(document).keydown(function(event){

    switch(event.keyCode){
        case 37 :
            event.preventDefault();
            if( moveLeft() ){
                setTimeout("generateOneNumber()", 200);
                setTimeout("isgameOver()", 300);
            }
            break;
        case 38 :
            event.preventDefault();
            if( moveUp() ){
                setTimeout("generateOneNumber()", 200);
                setTimeout("isgameOver()", 300);
            }
            break;
        case 39 :
            event.preventDefault();
            if( moveRight() ){
                setTimeout("generateOneNumber()", 200);
                setTimeout("isgameOver()", 300);
            }
            break;
        case 40 :
            event.preventDefault();
            if( moveDown() ){
                setTimeout("generateOneNumber()", 200);
                setTimeout("isgameOver()", 300);
            }
            break;            
            
    }
});

document.addEventListener("touchstart" , function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
})

//document.addEventListener("touchmove" , function(event){
//  event.preventDefault();
//})

document.addEventListener("touchend" , function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    let deltax = endx - startx;
    let deltay = endy - starty;

    if (Math.abs(deltax) < 0.5*cellSideLength && Math.abs(deltay) < 0.5*cellSideLength) {
        return;
    }

    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
        //right
        if( moveRight() ){
            setTimeout("generateOneNumber()", 160);
            setTimeout("isgameOver()", 300);
        }
        }else{
        //left
        if( moveLeft() ){
            setTimeout("generateOneNumber()", 160);
            setTimeout("isgameOver()", 300);
        }
        }
    }else{
        if (deltay > 0) {
        //down
        if( moveDown() ){
            setTimeout("generateOneNumber()", 160);
            setTimeout("isgameOver()", 300);
        }
        }else{
        //up
        if( moveUp() ){
            setTimeout("generateOneNumber()", 160);
            setTimeout("isgameOver()", 300);
        }
        }
    }
})

function moveLeft(){
    if( !canMoveLeft( board ) ) return false;
    for(let i = 0 ; i < 4 ; i ++){
        for(let j = 1 ; j < 4 ; j ++){
            if(board[i][j] !=0){      
                    for(let k = 0 ; k < j ; k ++){
                        if(board[i][k] == 0 && noBlockHorizontal( i , k , j , board)){
                            //move
                            showMoveAnimation( i , j , i , k );
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board) && !hasConflicted[i][k]){
                            //move
                            showMoveAnimation( i , j , i , k );
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            //add
                            score += board[i][k];
                            addAnimation(i,k);
                            setTimeout("updateScore(score)", 200);
                            if (score > bestScore) {
                                bestScore = score;
                                setTimeout("updateBestScore(bestScore)", 200);       
                            } 
                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
            }

        }
    }
    setTimeout( "updateBoardView()" , 100);
    return true;
}

function moveUp(){
    if( !canMoveUp( board ) ) return false;
    for(let j = 0 ; j < 4 ; j ++){
        for(let i = 1 ; i < 4 ; i ++){
            if(board[i][j] !=0){      
                    for(let k = 0 ; k < i ; k ++){
                        if(board[k][j] == 0 && noBlockVertical( j , k , i , board)){
                            //move
                            showMoveAnimation( i , j , k , j );
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[k][j] == board[i][j] && noBlockVertical( j , k , i , board) && !hasConflicted[k][j]){
                            //move
                            showMoveAnimation( i , j , k , j );
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            //add
                            score += board[k][j];
                            addAnimation(k,j);
                            setTimeout("updateScore(score)", 200);
                            if (score > bestScore) {
                                bestScore = score;
                                setTimeout("updateBestScore(bestScore)", 200);       
                            } 
                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
            }

        }
    }
    setTimeout( "updateBoardView()" , 100);
    return true;
}

function moveRight(){
    if( !canMoveRight( board ) ) return false;
    for(let i = 0 ; i < 4 ; i ++){
        for(let j = 2 ; j >= 0 ; j --){
            if(board[i][j] !=0){    
                    for(let k = 3 ; k > j  ; k -- ){
                        if(board[i][k] == 0 && noBlockHorizontal( i , j , k , board)){
                            //move
                            showMoveAnimation( i , j , i , k );
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board) && !hasConflicted[i][k]){
                            //move
                            showMoveAnimation( i , j , i , k );
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            //add
                            score += board[i][k];
                            addAnimation(i,k);
                            setTimeout("updateScore(score)", 200);
                            if (score > bestScore) {
                                bestScore = score;
                                setTimeout("updateBestScore(bestScore)", 200);        
                            } 
                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
            }

        }
    }
    setTimeout( "updateBoardView()" , 100);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) ) return false;
    for(let j = 0 ; j < 4 ; j ++){
        for(let i = 2 ; i >= 0 ; i --){
            if(board[i][j] !=0){      
                    for(let k = 3 ; k > i ; k --){
                        if(board[k][j] == 0 && noBlockVertical( j , i , k , board)){
                            //move
                            showMoveAnimation( i , j , k , j );
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[k][j] == board[i][j] && noBlockVertical( j , i , k , board) && !hasConflicted[k][j]){
                            //move
                            showMoveAnimation( i , j , k , j );
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            //add
                            score += board[k][j];
                            addAnimation(k,j);
                            setTimeout("updateScore(score)", 200);
                            if (score > bestScore) {
                                bestScore = score;
                                setTimeout("updateBestScore(bestScore)", 200);        
                            } 
                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
            }

        }
    }
    setTimeout( "updateBoardView()" , 100);
    return true;
}

function isgameOver(board){
    if( nospace( board ) && nomove( board )){
        if (score > bestScore) {
            bestScore = score;
            setTimeout("updateBestScore(bestScore)", 200);         
        } 
        gameOver();
    }
}

function gameOver(){
    alert("GameOver!");
}
