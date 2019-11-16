//Create an array of objects to store all the multiple choice questions

var dataArr = [
    {
     quest: "Which one of these things superman couldn't do in the first editions of the comic?",
     choices: ["Fly", "Sleep", "Cook"],
     answer: "Fly"
    },
    {
     quest: "What is the number of species currenly known to inhabit the earth?",
     choices: ["8.7 million", "8.7 billion", "124.3 million"],
     answer: "8.7 million"
    },
    {
     quest: "While riding Disney World's Big Thunder Mountain Railroad ride there is a 64% chance that you will",
     choices: ["Pee Yourself", "Lose your voice", "Pass a kidney stone"],
     answer: "Pass a kidney stone"
    },
    {
     quest: "Aside of dogs, police in china use these animals during service",
     choices: ["Sheep", "Cats", "Geese"],
     answer: "Geese"
    },
    {
     quest: "The first iPhone was created by",
     choices: ["God", "Cisco", "Apple"],
     answer: "Cisco"
    }
];



var retrieveTopScore = 0;
localStorage.getItem("MaxScore") ? retrieveTopScore = JSON.parse(localStorage.getItem("MaxScore")) : localStorage.setItem("MaxScore", JSON.stringify(retrieveTopScore));
//Write our data structure to local memory 
var memoryData = localStorage.setItem("questions", JSON.stringify(dataArr));
var questionCounter = 0;
var retrieveFromMemory;
retrieveFromMemory = JSON.parse(localStorage.getItem("questions"));
var start;//The start of time countdown
var timer;//the time interval function that is used globally and counts down from the start variable
//Set up your DOM items
var identsDOM = {
    startBtn: document.querySelector('#start-btn'),
    displayQuestion: document.querySelector('.quizQuestion'),
    displayA: document.querySelector('.opt1'),
    displayB: document.querySelector('.opt2'),
    displayC: document.querySelector('.opt3'),
    counter: document.querySelector('#timer'),
    answer: document.querySelector('.bottom-ans'),
    userScore: document.querySelector('#final-score'),
    right: document.querySelector('#right'),
    wrong: document.querySelector('#wrong')
};

function init(){
    identsDOM.displayA.textContent = "";
    identsDOM.displayB.textContent = "";
    identsDOM.displayC.textContent = "";
    identsDOM.displayQuestion.textContent = "";
    identsDOM.userScore.textContent = "";
}
 init();
//Start Button to initiate the first question and the timer


var displayQuestions = function() {
    identsDOM.displayQuestion.textContent = retrieveFromMemory[questionCounter].quest;
    identsDOM.displayA.textContent = retrieveFromMemory[questionCounter].choices[0];
    identsDOM.displayB.textContent = retrieveFromMemory[questionCounter].choices[1];
    identsDOM.displayC.textContent = retrieveFromMemory[questionCounter].choices[2];
};

var runningQuiz = function() {
    displayQuestions();
        //Create a timer function to keep the count going- keep it stable for now 
    start = 75;
    identsDOM.counter.textContent = start;
    console.log(start);
    timer =  setInterval(function() {
        if(start > 0) {
            start--;
            identsDOM.counter.textContent = start;
        }
        else {
            clearInterval(timer);
            identsDOM.userScore.textContent = "-- 0";
            identsDOM.displayQuestion.style.fontSize = "32px";
            identsDOM.displayQuestion.style.color = "darkorange";
            identsDOM.displayQuestion.textContent = "YOU RAN OUT OF TIME SO YOU ARE NOT SMARTER THAN MY DOG" ;
        }

        }, 1000);

//Read questions from your data structure and display them 

}; 
 identsDOM.startBtn.addEventListener('click', runningQuiz);


var endingConditions = function() {
    identsDOM.displayQuestion.style.fontSize = "32px";
    identsDOM.displayQuestion.style.color = "darkorange";
    identsDOM.counter.textContent = "";
    identsDOM.displayA.textContent = "";
    identsDOM.displayB.textContent = "";
    identsDOM.displayC.textContent = "";
}; 
var userChoice = function(event){
    var userChoice;
    userChoice = event.target.firstChild.textContent;
    console.log(userChoice);
    
       if(userChoice === retrieveFromMemory[questionCounter].answer){
        identsDOM.right.style.opacity = "1.0";
        setTimeout(function(){identsDOM.right.style.opacity = "0.0";  }, 200);
       }
       else{
        identsDOM.wrong.style.opacity = "1.0";
        setTimeout(function(){identsDOM.wrong.style.opacity = "0.0";  }, 200);
        //Remove 15 seconds from the countdown
        start -= 15;
       }
       questionCounter++;
    
  if(questionCounter !== retrieveFromMemory.length){
    displayQuestions();    

  } 
  else if(questionCounter >= retrieveFromMemory.length)  {
      //Stop the timer 
      clearInterval(timer);
      //Set final score equal to timer
      identsDOM.userScore.textContent = "-- " + start;
      if(start > retrieveTopScore) {
        //Set a new highScore
        localStorage.setItem("MaxScore", JSON.stringify(start));
        endingConditions();
        identsDOM.displayQuestion.textContent = "NEW TOP SCORE:  " + start
      }
      else {
          //Display a the end of quiz banners
      endingConditions();
      identsDOM.displayQuestion.textContent = "END OF QUIZ: YOUR SCORE IS:  " + start + ".............ALMOST AS SMART AS MY DOG";
      }
           
  }
  
}
 identsDOM.answer.addEventListener('click', userChoice);


 
















