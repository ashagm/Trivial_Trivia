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

var triviaGame = {

	correctCount : 0,
	incorrectCount : 0,
	unansweredCount : questionBank.length,

	checkAnswers : function(questionId, selectedAns){

		let correctAns = questionBank[questionId].ansIndex;

		if(selectedAns === correctAns){
			this.correctCount++;
		}else{
			this.incorrectCount++;
		}

		this.unansweredCount = questionBank.length - (this.correctCount + this.incorrectCount);

		console.log("correct=", this.correctCount, "incorrect=", this.incorrectCount, "unanswered=", this.unansweredCount);
	},

	getResults : function(){
		console.log("getresults");
		return "<h4> Correct Answers : " + this.correctCount + "</h4>" + 
		"<h4> Incorrect Answers : " + this.incorrectCount + "</h4>" + 
		"<h4> Unanswered Questions : " + this.unansweredCount + "</h4>";
	},

	init : function(){

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
},

	reset: function(){
		this.correctCount = 0;
		this.incorrectCount = 0;
		this.unansweredCount = questionBank.length;
	}
};

$('.submitA').on('click', function(){
	stopwatch.stop();
	let results = triviaGame.getResults();
	$('.results-body').html(results);
});

$('#wrapper').on( 'click', '.ans', function() {
	$thisSpan = $(this);  // (to learn - event delegataion)	
	let selectedAns = $thisSpan.children().data('aid');
	let questionId = $thisSpan.siblings("h4").data('id');
	triviaGame.checkAnswers(questionId, selectedAns);
});

setTimeout(function(){
	stopwatch.stop();
	let returnVal = triviaGame.getResults.bind(triviaGame);
	$('.results-body').html(returnVal);
	$('#resultsModal').modal('show');
}, 1000 * 120);

triviaGame.init();
stopwatch.start();

});