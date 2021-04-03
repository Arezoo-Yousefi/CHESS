let id;
let gameId;
let data = {};

let cellClick = (X,Y) => {
    send('click', [parseInt(X)-1, parseInt(Y)-1]);
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
    console.log('newGame');
    send("newGame", [], function (data) {
        gameId = data.gameId;
        setErrorMessage(data.message);
        data = data.data;
        console.log(data);
        showChess();
    });
}

let showChess = () => {

}