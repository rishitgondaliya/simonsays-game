let gameSeq = [];
        let userSeq = [];
        let scoreSeq = [];
        let btns = ["maroon", "sky", "green", "yellow"];
        let started = false;
        let level = 0;

        let h2 = document.querySelector("h2");

        document.addEventListener("keypress", function () {
            if (started == false) {
                console.log("game is started");
                started = true;
                levelUp();

                let storedMaxScore = localStorage.getItem("maxScore");
                if (storedMaxScore) {
                    scoreSeq.push(parseInt(storedMaxScore)); // Convert retrieved string to number
                }
            }
        });

        function levelUp() {
            userSeq = [];
            level++;
            h2.innerText = `Level ${level}`;

            let randInd = Math.floor(Math.random() * 3);
            let randColor = btns[randInd];
            let randBtn = document.querySelector(`.${randColor}`);
            gameSeq.push(randColor);
            console.log(gameSeq);
            btnFlash(randBtn);
        }

        function btnFlash(btn) {
            btn.classList.add("flash");
            setTimeout(function () {
                btn.classList.remove("flash");
            }, 200);
        }

        let btnAll = document.querySelectorAll(".btn");
        for (btn of btnAll) {
            btn.addEventListener("click", btnPress);
        }

        function btnPress() {
            let btn = this;
            btnFlash(btn);
            let userColor = btn.getAttribute("id");
            userSeq.push(userColor);
            checkAns(userSeq.length - 1);
        }

        function checkAns(idx) {
            if (userSeq[idx] === gameSeq[idx]) {
                if (userSeq.length == gameSeq.length) {
                    setTimeout(levelUp, 500);
                }
            } else {
                scoreSeq.push(level);
                let max_score = Math.max(...scoreSeq); // Spread syntax for Math.max

                // Update Local Storage with new max score (if higher)
                let storedMaxScore = localStorage.getItem("maxScore");
                if (!storedMaxScore || max_score > parseInt(storedMaxScore)) {
                    localStorage.setItem("maxScore", max_score);
                }
                h2.innerHTML = `Game over! Your score is <b>${level}<b>. <br> Your highest score so far is 
                    <b>${max_score}<b>. <br> Press any key to restart.`;
                document.querySelector("body").style.backgroundColor = "red";
                setTimeout(function () {
                    document.querySelector("body").style.backgroundColor = "white";
                }, 150);
                reset();
            }
        }

        function reset() {
            started = false;
            gameSeq = [];
            userSeq = [];
            level = 0;
        }