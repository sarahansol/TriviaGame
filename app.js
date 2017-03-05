
var correctAnswers = 0;
var wrongAnswers = 0;
var unAnswered = 0;
var number = 30;
var intervalId;
$(".questions").hide();
$(".endButton").hide();
$(".endTitle").hide();



// when the user clicks on start 
$(".startButton").on("click",function () {
	timer();

	


	
	$(".startButton").hide();
	$(".questions").show();
	$(".endButton").show();


		});

$(".endButton").on("click",showResults);




// timer
function timer(){

    function run() {
      intervalId = setInterval(decrement, 1000);
    }
    function decrement() {
      number--;
      $(".timer").html("Time remaining: " + number);
      if (number === 0) {
      	showResults();
        
      }
    }
    run();
}

function showResults () {
		calculateScore();
		clearInterval(intervalId);
        $(".questions").hide();
		$(".endButton").hide();
		$(".endTitle").show();
		// show the number of correct asnwers
		$(".correctAnswers").html("Correct Answers: "+ correctAnswers);
		// show the number of incorrect answers
		$(".wrongAnswers").html("Wrong Answers: "+ wrongAnswers);
		// show the number of unansered questions
		$(".unAnswered").html("unanswered: "+ unAnswered);
		//hide the questions 
		$(".questions").hide();
	}

function calculateScore () {
	if ($('.goodAnswer0').is(":checked")) {
		correctAnswers++;
	}else if($('.wrongAnswer0').is(":checked")){
		wrongAnswers++
	}else{
		unAnswered++
	}		

	if ($('.goodAnswer1').is(":checked")) {
		correctAnswers++;
	}else if($('.wrongAnswer1').is(":checked")){
		wrongAnswers++
	}else{
		unAnswered++
	}	

	if ($('.goodAnswer2').is(":checked")) {
		correctAnswers++;
	}else if($('.wrongAnswer2').is(":checked")){
		wrongAnswers++
	}else{
		unAnswered++
	}	

	if ($('.goodAnswer3').is(":checked")) {
		correctAnswers++;
	}else if($('.wrongAnswer3').is(":checked")){
		wrongAnswers++
	}else{
		unAnswered++
	}
}