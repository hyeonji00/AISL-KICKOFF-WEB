"use strict";

const loginId = document.getElementById('LOGIN_ID');
const loginPw = document.getElementById('LOGIN_PW');
const loginBtn = document.getElementById('LOGIN_BTN');

function color() {
    if(loginId.value.length>0 && loginPw.value.length>=5){
        loginBtn.style.backgroundColor = "#ffd53b";
        loginBtn.disabled = false;
    }
    else{
        loginBtn.style.backgroundColor = "#e9ce6d";
        loginBtn.disabled = true;
    }
}

function moveToMain(){
    if (loginId.value == "kickoffadmin") {
        if (loginPw.value == "aisl1234!") {
            alert('관리자 아이디로 로그인 되었습니다.')
            location.replace("./main.html");
        }
        else {
            alert('아이디와 비밀번호를 다시 한 번 확인해주세요.')
            errStack ++;
        }
    }
    else {
        alert('존재하지 않는 계정입니다.')
    }
    if (errStack >= 5) {
        alert('비밀번호를 5회 이상 틀리셨습니다. 비밀번호 찾기를 권장드립니다.')
    }
}

loginId.addEventListener('keyup', color);
loginPw.addEventListener('keyup', color);
loginBtn.addEventListener('click',moveToMain);
