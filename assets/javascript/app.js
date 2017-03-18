// While it may not seem imperative for smaller programs, you should get in the habit
// linking to a separate js file and also wrapping your js code in either a 
// $(document).ready(function(){
//  // code goes here
// })
// or an IIFE (immediately invoked function expression)
// ;(function(){
//  // code goes here
// })()
// One of the most important reasons for that is security - because right now your global variables
// can be tampered with through the console by a malicious visitor to your trivia game 😮



  var questions = [{
    question: "Which actress has won the most Oscars?",
    choices: ["Meryl Streep", "Emma Watson", "Katharine Hepburn", "Audrey Hepburn", "Kate Winslet"],
    correctAnswer: 2
  }, {
    question: "Who is the 39th president of the U.S.?",
    choices: ["Donald Trump", "Ronald Reagan", "George H. W. Bush", "Gerald Ford", "Jimmy Carter"],
    correctAnswer: 4
  }, {
    question: "What is the world's longest river?",
    choices: ["Amazon River", "Nile River", "Yellow River", "Yangtze River", "Mekong River"],
    correctAnswer: 0
  }, {
    question: "What is the diameter of Earth?",
    choices: ["800 miles","8,000", "80,000 miles", "8,000 miles", "800,000 miles"],
    correctAnswer: 3
  }, {
    question: "What year was William Shakespeare born?",
    choices: ["1520", "1583", "1576", "1560", "1564"],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; 
  var selections = []; 
  var quiz = $('#quiz'); 
  
  displayNext();
  
 
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  
  function createRadios(index) {
    var radioList = $('<ul>');
    // var item;
    // var input = '';
    // since the question's choices is an array, you can actually use the native .forEach method here
    // this also allows you to scope your item and input variables within that functional context
    questions[index].choices.forEach(function(choice, idx) {
      var item = $('<li>');
      var input = '<input type="radio" name="answer" value=' + idx + ' />';
      input += choice;
      item.append(input);
      radioList.append(item);
    });

    // for (var i = 0; i < questions[index].choices.length; i++) {
    //   item = $('<li>');
    //   input = '<input type="radio" name="answer" value=' + i + ' />';
    //   input += questions[index].choices[i];
    //   item.append(input);
    //   radioList.append(item);
    // }
    return radioList;
  }
  
  
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  };