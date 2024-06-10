
function waveSeed() {
    let wave_seed = [];
    for (let i = 0; i < 300; i++) {
        wave_seed.push(Math.floor(Math.random() * 50))
    } return wave_seed;
}

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

function startGame() {
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
        canvas.classList.add('clickable');
    });

    //cria sistema de pontuação
    let score = 0;
    let correctOption;

    //inicia um novo round
    function startNewRound() {

        //cria a seed da onda de referencia no canvas e a onda
        var referenceWave = waveSeed();
        waveBuilder(referenceCanvas, referenceWave, 'blue')

        //sorteia qual das opções será a correta
        correctOption = Math.floor(Math.random() * 3);

        optionCanvasArray.forEach((canvas, i) => {
            if (i === correctOption) {
                waveBuilder(canvas, referenceWave, 'red');
            } else {
                waveBuilder(canvas, waveSeed(), 'red');
            }

            canvas.onclick = () => {
                if (i === correctOption) {
                    score++;
                    document.getElementById('score').innerText = score;
                    startNewRound();
                } else {
                    optionCanvasArray.forEach(canvas => canvas.onclick = null);
                }
            };
        });
    }

    startNewRound();
}

window.onload = startGame();
