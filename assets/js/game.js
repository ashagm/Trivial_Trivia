$(document).ready(function(){

var triviaGame = {

	correctCount : 0,
	incorrectCount : 0,


	init : function(){

		for(var index=0; index< questionBank.length; index++){

			let qnDivSection = $('<div>');
			qnDivSection.attr("class", "col-md-12 div-qa");
			qnDivSection.attr("data-id", questionBank[index].id);

			let qnaInformation =

			'<h4 class="qn">' + questionBank[index].qn + '</h4><p>' +
			'<span class="ans">' + questionBank[index].ans[0] + '</span>' + 
			'<span class="ans">' + questionBank[index].ans[1] + '</span>'+ 
			'<span class="ans">' + questionBank[index].ans[2] + '</span>' + 
			'<span class="ans">' + questionBank[index].ans[3] + '</span></p>';

			qnDivSection.html(qnaInformation);

			$(".row-main").append(qnDivSection);

		}
	}
}

$('.data-id').on('click',function(){
	console.log($(this).data());
})


function checkAnswer(qn, ans){

}

triviaGame.init();

});