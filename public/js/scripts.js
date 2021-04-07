let id;
let gameId;
let data = {};

let cellClick = (X,Y) => {
    send('click', [parseInt(X), parseInt(Y)],function (data1) {
        setErrorMessage(data1.message);
        data = data1.data;
        showChess();
    });
}
let setErrorMessage = (message) => {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerText = message;
}
let send = (message, params, callback) => {
    const messageBox = {};
    messageBox.id  = id;
    messageBox.message = message;
    messageBox.parameters = params;
    messageBox.gameId = gameId;
    let xhr = new XMLHttpRequest();
    let url = 'http://127.0.0.1:3000';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            if(xhr.responseText){
                let json = JSON.parse(xhr.responseText);
                if(callback){
                    callback(json);
                }

            }
        }
    };
    let data = JSON.stringify(messageBox);
    xhr.send(data);
}
register = () => {
    let email = document.forms["registerForm"]["email"].value;
    send("register", [email], function (data) {
        if (data.message == "OK") {
            id = email;
            setErrorMessage("");
        }
        else {
            setErrorMessage(data.message);
        }
        showChess();
    });
}
let newGame = () => {
    send("newGame", [], function (data1) {
        gameId = data1.gameId;
        setErrorMessage(data1.message);
        data = data1.data;
        showChess();
    });
}

let showChess = () => {
    if(data.cellPieces){
        for(row = 0; row < 8; row++){
            for(col = 0; col < 8; col++){
                const chosenTd = document.getElementById('cell_'+row+'_'+col);
                const w = chosenTd.offsetWidth;
                chosenTd.classList.remove('BeingMove');
                let piece = data.cellPieces[row][col];
                if(piece){
                    chosenTd.innerHTML = `<img height = ${w}px src = 'image/${piece.type}_${piece.color}.png'>`;
                }else{
                    chosenTd.innerHTML = "";
                }
                if(data.legalMoves){
                    data.legalMoves.forEach(function(lm){
                        if(lm.X == row && lm.Y == col){
                            chosenTd.classList.add('LegalMove');
                        }
                    });
                }
            }
        }
    }
}

let connect = () => {
    send("connect", [], function (data1) {
        gameId = data1.gameId;
        setErrorMessage(data1.message);
        data = data1.data;
        showChess();
    });
}

setInterval(function () {
    let active;
    let s = Date.now();
    s = Math.floor(s / 60);//each 60 seconds
    if (s % 2 == 0) {
        active = true;
    }
    else {
        active = false;
    }

    send("Refresh", [data.lastUpdate], function (data1) {
        if (data1.message == "OK") {
            data = data1.data;
            showChess();
        }
        else {
            //board.errorMessage = data.message;
        }
    });

    if (!data.beingMove || !data.beingMove.X)
        return;
    let cellName = `cell_${data.beingMove.X}_${data.beingMove.Y}`;
    let cell = document.getElementById(cellName);
    if (active) {
        cell.classList.add('BeingMove');
    }
    else {
        cell.classList.remove('BeingMove');
    }

}, 100);
