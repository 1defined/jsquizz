//1-Saber qual é o total de questões
//2-exibir a questão atual
//3-ao clicar em alternativa, salva e vai pra proxima pergunta até q acabe as questões
//4-Fazer evento de click na opção. Mas como as opções são inseridas dinâmicamente, deve-se colocar o comando dentro do if

/////////////////////////////////////////////////INICIO/////////////////////////////////////////////////////////

let currentQuestion = 0; //questão atual
let correctAnswers = 0; //contador de corretas

//events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent); //se clicar no botão, reseta o quizz


showQuestion(); //executa p mostrar primeira questao

//exibir a questão e verificar se n é a última
function showQuestion() {
    if(questions[currentQuestion]){
        //verifica a questão
        let q = questions[currentQuestion];
        
        
        /////pintar barrinha
                 //arredondando numero
        let pct = Math.floor((currentQuestion / questions.length)*100);   //calcula porcentagem de acertos para barrinha, posso manter o currentQuestion como está pois se ele for 0 a barrinha n aparece. E quando tiver na ultima pergunta, ela estará posicionada em 75% da tela, então faremos com que os 100% atinja só ao exibir a ultima tela com os resultados
        document.querySelector('.progress--bar').style.width = `${pct}%`;
        ////
        
        
        
        document.querySelector('.scoreArea').style.display='none'; //esconde o score se ele estiver exibindo
        document.querySelector('.questionArea').style.display='block'; //mostra a pergunta 

        document.querySelector('.question').innerHTML = q.question; //acessa array e traz a questão baseada na questão atual
        document.querySelector('.options').innerHTML = ''; //limpando o campo de opções

        //há 2 maneiras de exibir as opções na tela:
        //1 opção: fazer um for in q.options inserindo as opções na tela.
        //for(let i in q.options){ document.querySelector('.options').innerHTML += `<div>${q.options[i]}<\div>`}
        // Assim funcionaria, eu pegaria as opções do loop MAS teria que processar todas as opções e inserir elas na tela 4x (4 opções) pesando assim + o site

        //outra forma de fazer
        let optionsHTML = ''; //Criar uma variável para armazenar o pedaço todo do HTML que diz respeito as opções

      //gravando as opções na variável
        for(let i in q.options){
           //nro da posição + artificio para n começar do 0        //posição
            optionsHTML += `<div data-op = "${i}" class="option correct"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
            //data-op vai servir para identificar o item clicado
            };
            //inserindo as opções = melhor performance
            document.querySelector('.options').innerHTML= optionsHTML;


            //Fazer evento de click na opção. Mas como as opções são inseridas dinâmicamente, deve-se colocar o comando dentro do if
            document.querySelectorAll('.options .option').forEach(item => {
                //se clicar, executa a função        
                item.addEventListener('click', optionClickEvent);
            });




    } else {
        //acabar questões
        finishQuiz();


    }
}


//função que sinaliza a opção clicada
function optionClickEvent(e){

    //pega o atributo do elemento que foi clicado indicado pelo evento de click

    let clickedOption =  parseInt(e.target.getAttribute('data-op'));
    let q = questions[currentQuestion];
    //remover classe correct dos itens
    for(let i in q.options){
        document.querySelectorAll('.options .option')[i].classList.remove('correct');
    }
    
    //selecionar a resposta correta 
    let correctHtml = document.querySelectorAll('.options .option')[questions[currentQuestion].answer]; //resposta correta
   
    correctHtml.classList.add('correct'); //dando a classe correta pra ela
        for(let i in q.options){
            document.querySelectorAll('.options .option:not(correct)')[i].classList.add('wrong');
            document.querySelectorAll('.wrong')[i].style.backgroundColor = 'rgb(242, 38, 38)';
        }
        correctHtml.style.backgroundColor = 'green'; //adicionando verde na resposta correta
        
    //teste se a resposta da pergunta é igual a posição que o usuário clicou, se for, marca como correta
if(questions[currentQuestion].answer === clickedOption){

//marcar como questão correta
correctAnswers++;

} 

currentQuestion++; //vai para próxima pergunta
setTimeout(showQuestion,'1000') ; //mostra próxima questão

}


function finishQuiz() {
    
    //definir porcentagem de acerto
    let points = Math.floor((correctAnswers / questions.length)*100); 
    
    //modificar a porc de acerto
    document.querySelector('.scorePct').innerHTML = `${points}%`

    //modificar numero de questões acertas x erradas
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    //Avaliar o desempenho das respostas usando if. -30% = frase de ruim e cor vermelha de 30% a 70% ta bom amarelo e >70% parabens e verde
    if(points <30){
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!';
        document.querySelector('.scorePct').style.color='red';

    } else if (points >=30 && points<70){

        document.querySelector('.scoreText1').innerHTML = 'Muito bom';
        document.querySelector('.scorePct').style.color='yellow';

    }else if (points >=70){

        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color='green';

    }

    //esconder área de questões pq acabou
    document.querySelector('.scoreArea').style.display='block'; //esconde a pergunta
    
    //mostrar área de resultados (scoreArea)
    document.querySelector('.questionArea').style.display='none'; //mostra o score 
   
    //completa barra
    document.querySelector('.progress--bar').style.width = '100%';
    
}

function resetEvent() {
    correctAnswers = 0; //resetando variaveis
    currentQuestion = 0; 
    showQuestion();//mostra 1 questão
}