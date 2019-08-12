
// 전역.
// var comScore = 0;
// var comPercent2 = 0.5;
// var comPercent3 = 0.33;

// var userScore = 0;
// var userPercent2 = 0.5;
// var userPercent3 = 0.33;
// var isComputerTurn = true;
// var shotsLeft = 15;

var computer = {
    score : 0,
    percent2 : 0.5,
    percent3 : 0.33
}

var user = {
    score : 0,
    percent2 : 0.5,
    percent3 : 0.33
}

var game = {
    isComputerTurn : true,
    shotsLeft : 15
}



function showText(ment) {

    //var textElem = document.getElementById('text');
    //textElem.innerHTML = ment;
    
    var $textElem = $('#text');
    
    // $textElem.fadeOut();
    // $textElem.html(ment);
    // $textElem.fadeIn();

    $textElem.fadeOut(400, function() { // 콜백함수.
        $textElem.html(ment);
        $textElem.fadeIn(100);
    });

}

function updateComputerScore(score) {
    //var comScoreElem = document.getElementById('computer-score'); 
    var $comScoreElem = $('#computer-score');
    
    computer.score += score;
    //comScoreElem.innerHTML = computer.score;
    //$comScoreElem.html(computer.score);

    $comScoreElem.animateNumber({
        number: computer.score
    });
}

function updateUserScore(score) {
    //var userScoreElem = document.getElementById('user-score');
    var $userScoreElem = $('#user-score');

    user.score += score;
    //userScoreElem.innerHTML = user.score;
    //$userScoreElem.html(user.score);

    $userScoreElem.animateNumber({
        number : user.score
    });

}

function disableComputerButtons(flag) {
    // var computerButtons = document.getElementsByClassName('btn-computer');

    // for(var i = 0; i < computerButtons.length; i++) {

    //     computerButtons[i].disabled = flag;

    // }

    $('.btn-computer').prop('disabled',flag);

}

function disableUserButtons(flag) {
    // var userButtons = document.getElementsByClassName('btn-user');

    // for(var i = 0; i < userButtons.length; i++) {
    //     userButtons[i].disabled = flag;
    // }

    $('.btn-user').prop('disabled',flag);
}

// 점수별 확률 적용.
function updateAI() {

    var diff = user.score - computer.score;

    if (diff >= 6 ) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if (diff >= 10) {
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if (diff <= -6) {
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    } else if (diff <= -10) {
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    }

}

// 컴퓨터 슛 기능.
function onComputerShoot() {

    console.log('컴퓨터 슛!');

    if(!game.isComputerTurn) {
        
        return;

    }  
    
    updateAI();

    var shootType = Math.random() < 0.5 ? 2 : 3; // 컴퓨터가 2점슛을 쏠지 3점 슛을 쏠지 결정.

    if(shootType === 2) { // 2점 슛을 쏘면.
        if(Math.random() < computer['percent'+shootType]) {
            showText('컴퓨터가 '+shootType+'점슛을 성공 시켰습니다!');
            updateComputerScore(2);
           
        } else {

            showText('컴퓨터가 '+shootType+'점슛을 실패 했습니다!');
        }

    } else { // 3점 슛을 쏘면.

        if(Math.random() < computer['percent'+shootType]) { 
            showText('컴퓨터가 '+shootType+'점슛을 성공 시켰습니다!');
            updateComputerScore(3);
            
        } else {

            showText('컴퓨터가 '+shootType+'점슛을 실패 했습니다!');
        }

    }

    game.isComputerTurn = false;

    disableComputerButtons(true);
    disableUserButtons(false);
    
}

function onUserShoot(shootType) {

    if(game.isComputerTurn) {
        
        return;

    }

    var shootType = Math.random() < 0.5 ? 2 : 3;

    if(shootType === 2) {
        if(Math.random() < user['percent'+shootType]) {
            showText(shootType+'점슛이 성공 했습니다!');
            updateUserScore(2);
            
        } else {

            showText(shootType+'점슛이 실패 했습니다!');
        }

    } else {

        if(Math.random() < user['percent'+shootType]) {
            showText(shootType+'점슛이 성공 했습니다!');
            updateUserScore(3);
           
        } else {

            showText(shootType+'점슛이 실패 했습니다!');
        }

    }

    game.isComputerTurn = true;

    disableComputerButtons(false);
    disableUserButtons(true);

    game.shotsLeft--;

    //var shotsLeftElem = document.getElementById('shots-left');
    var $shotsLeftElem = $('#shots-left');

    //shotsLeftElem.innerHTML = game.shotsLeft;
    $shotsLeftElem.html(game.shotsLeft);


    if(game.shotsLeft === 0) { // 슛 횟수 0 번이면? 게임 종료.

        if(user.score > computer.score) {
            showText('승리했습니다!');
        } else if(user.score < computer.score) {
            showText('패배했습니다!');
        } else {
            showText('비겼습니다');
        }

        disableComputerButtons(true);
        disableUserButtons(true);

    }

}