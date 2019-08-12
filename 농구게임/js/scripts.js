// var comScore = 0;
// var comPercent2 = 0.5;
// var comPercent3 = 0.33;

// var userScore = 0;
// var userPercent2 = 0.5;
// var userPercent3 = 0.33;

// var isComputerTurn = true;
// var shotsLeft = 15;

var computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

var user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

var game = {
    isComputerTurn: true,
    shotsLeft: 15
}

// 컴퓨터가 슛 쏘는 확률 구현.
function onComputerShoot() {
    if(!game.isComputerTurn) {
        return;
    }

    updateAI();

    var shootType = Math.random() < 0.5 ? 2 : 3;
    
    if(Math.random() < computer['percent'+shootType]) {
        // 2점슛 50% 확률로 성공.
        showText('컴퓨터가 '+shootType+'점슛을 성공시켰습니다!');
        updateComputerScore(shootType);
    } else {
        // 실패.
        showText('컴퓨터가 '+shootType+'점슛을 실패했습니다.');
    }

    game.isComputerTurn = false;

    // 컴퓨터 btn disabled on.
    disableComputerButtons(true);

    // 유저 btn disabled off.
    disableUserButtons(false);

}

// 유저가 슛을 쏘는 기능 구현.
function onUserShoot(shootType) {
          
    if(Math.random() < user['percent'+shootType]) {
        showText(shootType+'점 슛이 성공했습니다!');
        updateUserScore(shootType);
    } else {
        showText(shootType+'점 슛이 실패했습니다');
    }
    
    game.isComputerTurn = true;

    // 컴퓨터 btn off.
    disableComputerButtons(false);

    // 유저 btn on.
    disableUserButtons(true);

    game.shotsLeft--;

    //var shotsLeftElem = document.getElementById('shots-left');
    //shotsLeftElem.innerHTML = game.shotsLeft;
    var $shotsLeftElem = $('#shots-left');
    $shotsLeftElem.html(game.shotsLeft);

    // 게임이 끝났을 때.
    if(game.shotsLeft === 0) {
        if(user.score > computer.score) {
            showText('승리했습니다!');
        } else if(user.score < computer.score) {
            showText('아쉽게도.. 패배했습니다.');
        } else {
            showText('비겼습니다.');
        }

        disableComputerButtons(true);
        disableUserButtons(true);
    }

}

function showText(s) {
    //var textElem = document.getElementById('text');
    // textElem.innerHTML = s;
    var $textElem = $('#text');

    console.log('$textElem', $textElem);

    $textElem.fadeOut(300, function() {
        $textElem.html(s);
        $textElem.fadeIn(100);
    });
}

function updateComputerScore(score) {
    computer.score += score;

    //var comScoreElem = document.getElementById('computer-score');
    //comScoreElem.innerHTML = computer.score;
    var $comScoreElem = $('#computer-score');
    //$comScoreElem.html(computer.score);

    $comScoreElem.animateNumber({
        number: computer.score
    });

}

function updateUserScore(score) {
    user.score += score;
    
    //var userScoreElem = document.getElementById('user-score');
    //userScoreElem.innerHTML = user.score;
    var $userScoreElem = $('#user-score');
    //$userScoreElem.html(user.score);

    $userScoreElem.animateNumber({
        number: user.score
    });
}

function disableComputerButtons(flag) {

    // var computerButtons = document.getElementsByClassName('btn-computer');

    // for(var i = 0; i < computerButtons.length; i++) {
    //     computerButtons[i].disabled = flag;
    // }

    $('.btn-computer').prop('disabled', flag);

}

function disableUserButtons(flag) {

    // var userButtons = document.getElementsByClassName('btn-user');

    // for(var i = 0; i < userButtons.length; i++) {
    //     userButtons[i].disabled = flag;
    // }

    $('.btn-user').prop('disabled',flag);

}

function updateAI() {
    var diff = user.score - computer.score;

    if(diff >= 6) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if (diff >= 10) {
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if(diff <= -10) {
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    }

}

$(function() {
    showText(3);

    setTimeout(function(){
        showText(2);

        setTimeout(function(){
            showText(1);

            setTimeout(function(){
                showText('컴퓨터 부터 시작 합니다!');
                disableComputerButtons(false);
            }, 1000);
        }, 1000);
    }, 1000);


});