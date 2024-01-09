let ids = [];
let score = 0;
let countScore = document.querySelector(".score");
let svgs = [];
let canPressButton = true;

document.addEventListener('DOMContentLoaded', function() {
    const startPopup = document.getElementById('startPopup');
    const startButton = document.getElementById('startButton');

    startPopup.style.display = 'flex';

    startButton.addEventListener('click', function () {
        startPopup.style.display = 'none';
        timer();
    });

    const tryAgainBtn = document.querySelector(".try");
    let timeOver = document.querySelector(".timeover");
    tryAgainBtn.addEventListener("click", function() {
        hidePicture(svgs)
        ids = [];
        let btns = document.querySelectorAll('.cell');
        for (let btn of btns) {
            btn.classList.remove('disabled');
            btn.removeAttribute('disabled')
        }
        timeOver.style.display = 'none';
        score = 0;
        countScore.textContent = `score: ${score}`;
        timer();
    });

    document.querySelector(".container")
        .addEventListener("click", (event) => {
            if (canPressButton){
                const clickedButton = event.target;
                
                let svg = clickedButton.querySelector("svg");
                svgs.push(svg);

                if (svgs.length > 0) {
                    showPicture(svgs);
                }

                //to get data-id
                let id = clickedButton.getAttribute("data-id");
                
                // showPicture(svg);
                ids.push(id);

                let timetoCount = (ids.length === 2);
                if (timetoCount){
                    let [firstId, secondId] = ids;
                    handleId(firstId, secondId, svgs);
                    canPressButton = false; 
                }
            }
        });
})

function showPicture(list) {
    for (let svg of list) {
        svg.classList.remove("hidden");
    }
}

function hidePicture(list) {
    for (let svg of list) {
        svg.classList.add("hidden");
    }
    svgs = [];
}

function handleId (firstId, secondId,list) {
    if (firstId === secondId) {
        score = score + 2;
        countScore.textContent = `score: ${score}`;
        setTimeout(() => {
            hidePicture(list);
        }, 1000);
        let buttons = document.querySelectorAll(`[data-id="${firstId}"]`);
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
          buttons[i].classList.add('disabled');
        }

    } else {
        setTimeout(() => {
            hidePicture(list);
        }, 1000);
    }
    ids = [];
    setTimeout(() => {
        canPressButton = true; 
    }, 1000);
}

function timer(){
    let sec = 10;
    let timer = setInterval(function(){
        sec--;
        if (sec === 0) {
            clearInterval(timer);
            displayTimeOverPopup();
        } 
        document.getElementById('safeTimerDisplay').innerHTML='00:'+sec;
    }, 1000);
};

function displayTimeOverPopup() {
    let timeOver = document.querySelector(".timeover");
    timeOver.style.display = 'flex';
}


// function handleButtons(a) {
//     console.log(a);
//     let [firstBtn, secondBtn] = a;
//     for (let i = 0; i < a.length; i++) {
//         if (a[i].getAttribute("data-id") !== firstBtn.getAttribute("data-id") && a[i].getAttribute("data-id") !== secondBtn.getAttribute("data-id")) {
//             a[i].disabled = false;
//         }
//     }