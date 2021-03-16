function showNumberWithAnimation( i , j , randNumber){
    let numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color",getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width:  cellSideLength,
        height: cellSideLength,
        top: getTop(i,j),
        left: getLeft(i,j)
    } , 70);
}

function showMoveAnimation( fromx , fromy , tox , toy ){
    let numberCell = $("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top:getTop(tox,toy),
        left:getLeft(tox,toy)
    },100);
}

function addAnimation(i,j,){
    let numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.animate({
        width:1.1*cellSideLength,
        height:1.1*cellSideLength,
        top:"-="+0.05*cellSideLength,
        left:"-="+0.05*cellSideLength
    },60);
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength
    },60);
}