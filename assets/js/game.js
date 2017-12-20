$(document).ready(function(){

let intervalId;
let clockRunning = false;

const stopwatch = {

  time: 120,

  reset: function() {
    stopwatch.time = 120;
    $("#display").text("2:00");
  },

  start: function() {
    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },

  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;
  },

  count: function() {
    stopwatch.time--;
    const converted = stopwatch.timeConverter(stopwatch.time);

    $("#display").text(converted);

    if(stopwatch.time == 0){
    	stopwatch.stop();   	
    }
    return clockRunning;
  },

  timeConverter: function(t) {
    let minutes = Math.floor(t / 60);
    let seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
	

let answeredCountArr=[];
let correctCount = 0;
let incorrectCount = 0;
let unansweredCount = 0;


function getResults(){

	for(let i = 0; i < answeredCountArr.length; i++){
		let qid = answeredCountArr[i].id;

		let ans = answeredCountArr[i].ans;
		let rightAns = questionBank[qid].ansIndex;

		if(ans === rightAns){
			correctCount++;
		}else{
			incorrectCount++;
		}

		unansweredCount = questionBank.length - answeredCountArr.length;

	}

	return 	"<h4> Correct Answers : " + correctCount + "</h4>" + 
			"<h4> Incorrect Answers : " + incorrectCount + "</h4>" + 
			"<h4> Unanswered Questions : " + unansweredCount + "</h4>";		
}


function displayResults(){
	let results = getResults();
	$('.results-body').html(results);
}

function init(){

	reset();

	for(var index = 0; index < questionBank.length; index++){

		let qnDivSection = $('<div>');
		qnDivSection.attr("class", "col-md-12 div-qa");

		let qnaInformation =

		"<h4 class='qn'" + "data-id=" + questionBank[index].id + ">" + questionBank[index].qn + '</h4>';

		for (var i = 0; i < 4; i++)
		{
			qnaInformation += "<span class='ans'><input type='radio' name='ans-radio-" + index + "' data-aid=" + i + ">&nbsp;&nbsp;&nbsp;" +  questionBank[index].ans[i] + "</span>";
		}

		qnDivSection.html(qnaInformation);
		$(".row-main").append(qnDivSection);
	}
}

function reset(){
	correctCount = 0;
	incorrectCount = 0;
	unansweredCount = questionBank.length;

	stopwatch.reset();
	setTimeout(stopwatch.start, 2000);

	//reset radio buttons
	$('input[type="radio"]').prop('checked', false);
}

$('#wrapper').on( 'click', '.ans', function() {
	$thisSpan = $(this);  // (to learn - event delegataion)	
	
	//capture selected answer
	let selectedAns = $thisSpan.children().data('aid');

	//capture the qn Id of the answer
	let questionId = $thisSpan.siblings("h4").data('id');

	//if same question is answered again replace it in the array	
	let index = answeredCountArr.findIndex(function(el){
		return el.id == questionId;
	});

	if(index > -1){
		answeredCountArr.splice(index, 1);
	}

	//save the questions answered in an array
	answeredCountArr.push({id: questionId, ans : selectedAns});

});

$('.submitA').on('click', function(){
	stopwatch.stop();
	displayResults();
});

$('#replay').on('click', function(){
	init();
});

setTimeout(function(){
	stopwatch.stop();	
	// let returnVal = triviaGame.getResults.bind(triviaGame);
	let returnVal = displayResults();
	$('.results-body').html(returnVal);
	$('#resultsModal').modal('show');
}, 1000 * 120);

//begin game
init();

});