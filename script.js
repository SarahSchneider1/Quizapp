let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": "3"
    },
    {
        "question": "Was ist die Hauptfunktion von CSS?",
        "answer_1": "Datenbankmanagement",
        "answer_2": "Styling von Webseiten",
        "answer_3": "Serverkonfiguration",
        "answer_4": "Programmierung von Spielekonsolen",
        "right_answer": "2"
    },
    {
        "question": "Was ist ein Array in JavaScript?",
        "answer_1": "Eine spezielle Art von Schleife",
        "answer_2": "Eine Sammlung von Werten",
        "answer_3": "Ein Bedingungsausdruck",
        "answer_4": "Ein grafisches Element",
        "right_answer": "2"
    },
    {
        "question": "Was ist die Dateiendung für eine Cascading Style Sheet Datei?",
        "answer_1": ".html",
        "answer_2": ".cs",
        "answer_3": ".js",
        "answer_4": ".css",
        "right_answer": "4"
    },
    {
        "question": "Was ist die Bedeutung von HTML?",
        "answer_1": "Hypertext Markup Language",
        "answer_2": "Hyperlink and Text Markup Language",
        "answer_3": "Home Tool Markup Language",
        "answer_4": "Hyper Transfer Markup Language",
        "right_answer": "1"
    },
    {
        "question": "Was bedeutet CSS?",
        "answer_1": "Computer Style Sheets",
        "answer_2": "Cascading Style Sheets",
        "answer_3": "Creative Style Sheets",
        "answer_4": "Colorful Style Sheets",
        "right_answer": "2"
    },
    {
        "question": "Was ist ein wichtiger Vorteil von JavaScript?",
        "answer_1": "Es kann verwendet werden, um interaktive Webseiten zu erstellen",
        "answer_2": "Es ist ausschließlich serverseitig",
        "answer_3": "Es wird nur für das Styling von Webseiten verwendet",
        "answer_4": "Es ist sehr langsam und ineffizient",
        "right_answer": "1"
    },
    {
        "question": "Welches JavaScript-Schlüsselwort wird verwendet, um eine Variable zu deklarieren?",
        "answer_1": "var",
        "answer_2": "let",
        "answer_3": "const",
        "answer_4": "def",
        "right_answer": "1"
    }
];

let rightQuestions = 0;
let currentQuestion = 0;
let audioWin = new Audio('audio/win.mp3');
let audioLose = new Audio('audio/lose.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestions();
}

function showQuestions() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateToNextQuestion();
        updateProgressbar();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function updateProgressbar() {
    let percent = (currentQuestion + 1) / questions.length * 100; 
    document.getElementById('progress-bar').style.width = percent + '%'; 
    document.getElementById('progress-bar').innerHTML = `${Math.round(percent)} %`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionsNumber = selection.slice(-1);
    let idofRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionsNumber, question)) {
        console.log('Richtige Antwort!');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioWin.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idofRightAnswer).parentNode.classList.add('bg-success');
        audioLose.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionsNumber, question) {
    return selectedQuestionsNumber === question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    showQuestions();
    document.getElementById('next-button').disabled = true;
    resetAnswerButton();
}

function resetAnswerButton() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = 'img/pencil.jpg';
    document.getElementById('questionBody').style = ''; 
    document.getElementById('endScreen').style.display = 'none'; 
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}

function showEndScreen() {
    document.getElementById('endScreen').style.display = '';
    document.getElementById('restart-button').style.display = ''; 
    document.getElementById('questionBody').style.display = 'none'; 

    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.png';
}
