//Jogo de comparação de ondas.

//gerador de seed para construção da onda
function waveSeed() {
    let wave_seed = [];
    for (let i = 0; i < 300; i++) {
        wave_seed.push(Math.floor(Math.random() * 50))
    } return wave_seed;
}

//construtor da onda.
function waveBuilder(canvas, seed, color) {
    //define o pincel, as dimensões do canvas e o meio do canvas
    const ctx = canvas.getContext('2d');
    const canvas_width = canvas.width;
    const canvas_height = canvas.height;
    const line_point = canvas_width / 100;

    //limpa o canvas, define a cor do pincel e a espessura
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    //desenha a linha horizontal
    ctx.beginPath();
    ctx.moveTo(0, canvas_height / 2);
    ctx.lineTo(canvas_width, (canvas_height / 2));
    ctx.stroke();

    //desenha as linhas verticais
    for (let i = line_point; i < canvas_width; i = i + line_point) {
        var alturaOnda = seed[i];
        ctx.beginPath();
        ctx.moveTo(i, alturaOnda);
        ctx.lineTo(i, (canvas_height) - alturaOnda);
        ctx.stroke();
    }

}

//cria sistema de pontuação
var score = 0;
var highScore = 0;
var correctOption;

//cria os efeitos sonoros
var correct = new Audio("./src/correct.wav");
var incorrect = new Audio("./src/incorrect.wav");

//define a pontuação mais alta
function setHighScore() {
    if (score > highScore) {
        highScore = score;
        document.getElementById('highScore').innerText = highScore;
    }
}


//inicia a sessão do jogo
function startGame() {

    //inicia o valor do timer
    var timer = 14;
    document.getElementById('timer').innerText = timer + 1;

    //botão replay
    function replay() {
        incorrect.play();
        clearInterval(downTimer);
        if (confirm("Fim de jogo! Deseja jogar novamente?")) {
            score = 0;
            document.getElementById('score').innerText = score;
            clearInterval(downTimer);
            startGame();
        } else {
            timer = 0;
            document.getElementById('timer').innerText = timer;

        }
        /* swal({
            title: "Fim de jogo!",
            text: "Deseja jogar novamente?",
            icon: "warning",
            buttons: ["Não", "Sim"]
        })
            .then((willDelete) => {
                if (willDelete) {
                    score = 0;
                    document.getElementById('score').innerText = score;
                    clearInterval(downTimer);
                    startGame();
                } else {
                    timer = 0;
                    document.getElementById('timer').innerText = timer;
                }
            }); */
    }

    //reduz o tempo do timer
    const downTimer = setInterval(function () {
        document.getElementById('timer').innerText = timer;
        if (timer > 0) {
            timer = timer - 1;
            console.log(timer);
        } else {
            clearInterval(downTimer);

            if (replay()) {
                score = 0;
                document.getElementById('score').innerText = score;
                startNewRound();
            }
        }
    }, 1000);

    //cria o canvas de referencia
    const referenceCanvas = document.getElementById('reference');
    referenceCanvas.width = 300;
    referenceCanvas.height = 100;

    //cria os canvas de escolha
    const optionCanvasArray = [
        document.getElementById('optionCanvas1'),
        document.getElementById('optionCanvas2'),
        document.getElementById('optionCanvas3')
    ];

    optionCanvasArray.forEach(canvas => {
        canvas.width = 300;
        canvas.height = 100;
    });

    //inicia um novo round
    function startNewRound() {

        //cria a seed da onda de referencia no canvas e a onda
        var referenceWave = waveSeed();
        waveBuilder(referenceCanvas, referenceWave, 'blue')

        //sorteia qual das opções será a correta
        let correctOption = Math.floor(Math.random() * 3);
        optionCanvasArray.forEach((canvas, i) => {
            if (i === correctOption) {
                waveBuilder(canvas, referenceWave, 'red');
            } else {
                waveBuilder(canvas, waveSeed(), 'red');
            }

            //verifica se a opção escolhida pelo jogador é a correta. Caso seja, o jogo começa um novo round e aumenta a pontuação. 
            //Caso não seja, o jogo mostra a mensagem de fim de jogo.
            canvas.onclick = () => {
                if (i === correctOption && timer != 0) {
                    correct.play();
                    score++;
                    document.getElementById('score').innerText = score;
                    setHighScore();
                    startNewRound();
                    timer += 1;
                    document.getElementById('timer').innerText = timer + 1;

                } else {
                    correctOption = (optionCanvasArray.length + 1);
                    incorrect.play();
                    replay();
                }
            };
        });
    }

    //começa o primeiro round do jogo
    startNewRound();
}
//ao carregar a página começa uma nova sessão de jogo
window.onload = startGame();
