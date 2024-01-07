let ids = [];
let score = 0;
let countScore = document.querySelector(".score");
let svgs = [];

document.querySelector(".container")
    .addEventListener("click",(event)=> {
        const stopPressing = ids.length >= 2;
        if (!stopPressing){
            const clickedButton = event.target;
            
            let svg = clickedButton.querySelector("svg");
            console.log(svg);
            svgs.push(svg);
            console.log(svgs);

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
            }
        }
});

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
    console.log(svgs);
}

function handleId (firstId, secondId,list) {
    if (firstId === secondId) {
        score = score + 2;
        countScore.textContent = `score: ${score}`;
        setTimeout(() => {
            hidePicture(list);
        }, 1000);
    } else {
        setTimeout(() => {
            hidePicture(list);
        }, 1000);
    }

    ids = [];
}
