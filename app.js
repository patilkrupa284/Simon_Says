    let gameSeq = [];
        let userSeq = [];
        let btns = ["yellow", "red", "purple", "green"];
        let started = false;
        let level = 0;

        let h2 = document.querySelector("h2");

        document.addEventListener("keypress", function () {
            if (!started) {
                console.log("Game is started");
                started = true;
                levelUp();
            }
        });

        function gameFlash(btn) {
            btn.classList.add("flash");
            setTimeout(function () {
                btn.classList.remove("flash");
            }, 250);
        }

        function userFlash(btn) {
            btn.classList.add("userFlash");
            setTimeout(function () {
                btn.classList.remove("userFlash");
            }, 250);
        }

        function levelUp() {
            userSeq = []; // Reset user sequence at the start of each level
            level++;
            h2.innerText = `Level ${level}`;

            let randIdx = Math.floor(Math.random() * 4);
            let randColor = btns[randIdx];
            let randBtn = document.querySelector(`#${randColor}`);

            gameSeq.push(randColor);
            console.log(gameSeq);

            gameFlash(randBtn);

            // Play the game sequence for the user
            playGameSequence();
        }

        function playGameSequence() {
            let i = 0;
            let interval = setInterval(() => {
                if (i < gameSeq.length) {
                    let btnColor = gameSeq[i];
                    let btn = document.querySelector(`#${btnColor}`);
                    gameFlash(btn);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 1000); // Flash each button in the sequence with a delay
        }

        function checkAns() {
            let idx = userSeq.length - 1; // Last index in userSeq

            if (userSeq[idx] === gameSeq[idx]) {
                console.log("Same value");
                if (userSeq.length === gameSeq.length) {
                    // User completed the sequence for this level
                    setTimeout(levelUp, 1000); // Wait before advancing to the next level
                }
            } else {
                h2.innerText = "Game Over";
                resetGame();
            }
        }

        function btnPress() {
            let btn = this;
            userFlash(btn);

            let userColor = btn.getAttribute("id");
            userSeq.push(userColor);
            console.log(userSeq); // Log the user's sequence

            checkAns();
        }

        function resetGame() {
            gameSeq = [];
            userSeq = [];
            level = 0;
            started = false;
            h2.innerHTML = "Game over ! Press any key to start";
            document.querySelector("body").style.backgroundColor ="red";
             setTimeout(function () {
                document.querySelector("body").style.backgroundColor="white";
             },150);
            reset();
        }

        // Correctly select all buttons by their existing IDs
        let allBtns = document.querySelectorAll(".red, .yellow, .green, .purple");
        for (let btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }
        function reset(){
            started = false;
            gameSeq=[];
            userSeq=[];
            level = 0;
                }
    