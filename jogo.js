function criaOnda(canvas, cor) {
    const ctx = canvas.getContext('2d');
    const larguraCanvas = canvas.width;
    const alturaCanvas = canvas.height;
    const decimo = larguraCanvas/100;
    var i = decimo;
    
    //limpa o retangulo e define o pincel
    ctx.clearRect(0, 0, larguraCanvas, alturaCanvas);
    ctx.strokeStyle = cor;
    ctx.lineWidth = 2;
    
    //desenha as linhas horizontais
    ctx.beginPath();
    ctx.moveTo(0, alturaCanvas / 2);
    ctx.lineTo(larguraCanvas, alturaCanvas/2);
    ctx.stroke();
    
    //desenha as linhas verticais
    for(var i = decimo; i < larguraCanvas; i = i + decimo){
        var alturaOnda = Math.floor(Math.random() * 50);
        ctx.beginPath();
        ctx.moveTo(i, alturaOnda);
        ctx.lineTo(i, (alturaCanvas)-alturaOnda);
        ctx.stroke();
    }
    
}

function setupGame() {
    const referenceCanvas = document.getElementById('referenceCanvas');
    const optionCanvases = [
        document.getElementById('optionCanvas1'),
        document.getElementById('optionCanvas2'),
        document.getElementById('optionCanvas3')
    ];

    referenceCanvas.width = 300;
    referenceCanvas.height = 100;
    optionCanvases.forEach(canvas => {
        canvas.width = 300;
        canvas.height = 100;
        canvas.classList.add('clickable');
    });

    let score = 0;
    let correctOption;

    function startNewRound() {
        criaOnda(referenceCanvas, 'blue');

        correctOption = Math.floor(Math.random() * 3);
        optionCanvases.forEach((canvas, index) => {
            if (index === correctOption) {
                criaOnda(canvas, 'red');
            } else {
                criaOnda(canvas, 'red');
            }

            canvas.onclick = () => {
                if (index === correctOption) {
                    score++;
                    document.getElementById('score').innerText = score;
                    startNewRound();
                } else {
                    document.getElementById('result').innerText = 'Errado! Jogo terminado.';
                    optionCanvases.forEach(canvas => canvas.onclick = null);
                }
            };
        });
    }

    startNewRound();
}

window.onload = setupGame;