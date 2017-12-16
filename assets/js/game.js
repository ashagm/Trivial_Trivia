$(document).ready(function(){

var triviaGame = {


	init : function(){

		for(var i=0; i< questionBank.length; i++){

			let qnDivSection = $('<div>');
			qnDivSection.attr("class", "col-md-12 div-qa");
			qnDivSection.attr("data-id", questionBank[i].id);

			let qnaInformation =

			'<h4 class="qn">' + questionBank[i].qn + '</h4><p>' +
			'<span class="ans">' + questionBank[i].ans[0] + '</span>' + 
			'<span class="ans">' + questionBank[i].ans[1] + '</span>'+ 
			'<span class="ans">' + questionBank[i].ans[2] + '</span>' + 
			'<span class="ans">' + questionBank[i].ans[3] + '</span></p>';

			qnDivSection.html(qnaInformation);

			$(".row-main").append(qnDivSection);

		}
	}
}




function checkAnswer(qn, ans){

}

triviaGame.init();

});