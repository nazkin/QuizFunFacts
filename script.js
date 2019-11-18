//TODO: 1) Change the ternary operator to if statement because you need 2 statements after condition
    //  2) Transfer the value of the max score to the DOM 
    //  3) Add the new if statement into the init function
    //  4) Add sound ??? why not 



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


// If the MaxScore key exists in local storage -condition1 else -condition2
if(localStorage.getItem("MaxScore")) {
    
    retrieveTopScore = JSON.parse(localStorage.getItem("MaxScore"));
}

else {
    retrieveTopScore = 0;
    localStorage.setItem("MaxScore", JSON.stringify(retrieveTopScore));
    retrieveTopScore = JSON.parse(localStorage.getItem("MaxScore"));
}





//Write our data structure to local memory and capture it back
var memoryData = localStorage.setItem("questions", JSON.stringify(dataArr));
var retrieveFromMemory;
retrieveFromMemory = JSON.parse(localStorage.getItem("questions"));

var start;//The start of time countdown
var timer;//the time interval function that is used globally and counts down from the start variable
var questionCounter = 0; //Counts the number of the question

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
    wrong: document.querySelector('#wrong'),
    record: document.querySelector('.badge'),
    reset: document.querySelector('#reset-btn')
};

function init(){
    identsDOM.displayA.textContent = "";
    identsDOM.displayB.textContent = "";
    identsDOM.displayC.textContent = "";
    identsDOM.displayQuestion.textContent = "";
    identsDOM.userScore.textContent = "";
    questionCounter = 0;
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
            identsDOM.displayQuestion.textContent = "YOU RAN OUT OF TIME " ;
        }

        }, 1000);
}; 
//Start click event 
 identsDOM.startBtn.addEventListener('click', runningQuiz);


var endingConditions = function() {
    identsDOM.displayQuestion.style.fontSize = "32px";
    identsDOM.displayQuestion.style.color = "darkorange";
    identsDOM.counter.textContent = "";
    identsDOM.displayA.textContent = "";
    identsDOM.displayB.textContent = "";
    identsDOM.displayC.textContent = "";
    identsDOM.record.textContent = retrieveTopScore;
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
      identsDOM.displayQuestion.textContent = "END OF QUIZ: YOUR SCORE IS:  " + start + "...........TRY AGAIN?";
      }
           
  }
  
}
//Capturing the click event from the user choice to progress with the quiz
 identsDOM.answer.addEventListener('click', userChoice);


 //Event listener for the reset button 

identsDOM.reset.addEventListener('click', init);















