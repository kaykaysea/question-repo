
$(document).ready(function() {
	
	var testId = '5b1fff014854f01b41efc5fb';
	console.log('inside doc ready of test ops');
	loadTest(testId);
				
});

//TODO: Separate out the getJSON of the question as a function.

$("#nextQ").click(function(){
	
	var qNo=$("#testQuestion").data('qno');
	var testId=$('#testQuestion').data('testId');
	var noOfQuestions = $("#testQuestion").data('noOfQuestions');
	var qIndex = qNo-1;
	
	var optionArray = $($('.list-group li .row div input')).toArray();
	var answerArray = getAnswerStatefromDivArray(optionArray);
	sessionStorage.setItem('qNo_'+qIndex+'_state',JSON.stringify(answerArray));
	
	console.log("input array is: "+optionArray);
	
	console.log("option array is: "+getAnswerStatefromDivArray(optionArray));
	
	console.log("json:"+JSON.stringify(getAnswerStatefromDivArray(optionArray)));
	

    	$("#prevQ").removeAttr('disabled');

    	loadQuestion(testId,qNo);
	 

});

$("#prevQ").click(function(){
	
	var qNo=$("#testQuestion").data('qno');
	var prevQNo=qNo-2;
	var testId=$('#testQuestion').data('testId');
	var qIndex = qNo-1;
	
	var optionArray = $($('.list-group li .row div input')).toArray();
	var answerArray = getAnswerStatefromDivArray(optionArray);
	sessionStorage.setItem('qNo_'+qIndex+'_state',JSON.stringify(answerArray));
	
	$("#nextQ").removeAttr('disabled');
	$('#nextQ').show();
	$('#finishTest').hide();
	if(qNo==2){

		$("#prevQ").attr('disabled','disabled');
	}
	
	loadQuestion(testId,prevQNo);
	
});

function loadQuestion(testId,qNo){
	
	
		if(qNo==-2){
			
			var testFinishHTML = '';
			
			var body = {
				finishText : 'Looks like you have already taken the test. Please go back to home page to take another test'						
			}
				
			var template = $('#testFinishTemplate').html();
			testFinishHTML = Mustache.to_html(template,body);
			$('#testQuestion').html(testFinishHTML);
			
		} else{
			
			$.getJSON('test/id/'+testId+'/qNo/'+qNo, function(data){
				
				var testQuestionHTML = '';
				var template = $('#testQuestionTemplate').html();
				var testQNo = 'qNo';
				var qState = JSON.parse(sessionStorage.getItem('qNo_'+qNo+'_state'));
				var noOfQuestions = $("#testQuestion").data('noOfQuestions');
				data[testQNo]=qNo+1;
				$('#testQuestion').data('qno',qNo+1);
				testQuestionHTML = Mustache.to_html(template,data);
				$('#testQuestion').html(testQuestionHTML);
			
				$.each(qState,function(index,value){

					$($('.list-group li .row div input')[index]).prop("checked",value);
			
				});
			
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				
				$("#prevQ").show();
				
				if(qNo==noOfQuestions-1){
					$("#nextQ").hide();
					$('#finishTest').show();
					
				}
				else{
					$("#nextQ").show();
				}
				
				
				
				
				
		   });
			
			
		}
	

	
}


function loadTest(testId){
	
	$.ajax({
		url:'test/'+testId+'/state',
		type:'get',
		success:function(data){

			var activeQNo = data.activeQNo;
			var noOfQuestions = data.noOfQuestions;
			console.log('inside load test success active QNo'+ activeQNo);
			
			if(activeQNo===-2){
				console.log('inside -2 loop');
				$("#prevQ").hide();
				$("#nextQ").hide();
				
			}
			
			if(activeQNo===-1){
				
			}
			
			$.each(data.optionsState,function(index,value){
				console.log(JSON.stringify(value));
				sessionStorage.setItem('qNo_'+index+'_state',JSON.stringify(value));
			});
			
			
			$('#testQuestion').data('qno',activeQNo+1);
			$('#testQuestion').data('testId',testId);
			$('#testQuestion').data('noOfQuestions',noOfQuestions);
			console.log('activeQNo: '+activeQNo);
			
			if(activeQNo==0){
				console.log('firstquestion');
				$("#prevQ").attr('disabled','disabled');
			}
			
			if(activeQNo==noOfQuestions-1){
				console.log('firstquestion');
				$("#nextQ").attr('disabled','disabled');
			}
			
			loadQuestion(testId,activeQNo);
	
		}
	
	
	});

	
}







function loadAllQuestions(){
    
   $.getJSON('question/all', function(jd) {

      
      var qstring = '';
      var qNo=1;
      var questionHTML = '';
      var template = $('#questionTemplate').html();
      $.each(jd,function(i,item){ 

          var qNoKey = 'qNo';
          item[qNoKey] = qNo;
          questionHTML+= Mustache.to_html(template,item);
          qNo+= 1;
        

      });
      
      $('#question-list').html(questionHTML);
      enableQuestionModal();
      
   });

}


function loadChildrenDropdown(parent,type,selectedvalue){
  console.log('inside loadChildrenDropdown');
  var selectId = type;
  $.getJSON('/categoryTag/byParent/'+parent,function(data){
    console.log(data);
    var template = $('#dropdownTemplate').html();
    var dropdownHTML = '';
    dropdownHTML = Mustache.to_html(template,data);
    $(selectId).html(dropdownHTML);
    $(selectId).val(selectedvalue);

  });

}


	
function getAnswerStatefromDivArray(divArray){
	
	var booleanArray = $.map(divArray,function(i){
		
		return $(i).prop("checked");
	});
	
	return booleanArray;
	
	
}


$("#finishTest").click(function(){
	
	var qNo=$("#testQuestion").data('qno');
	var noOfQ = $("#testQuestion").data('noOfQuestions');
	var resultArray = [];
	var testId=$('#testQuestion').data('testId');
	var qIndex=qNo-1;
	
	var optionArray = $($('.list-group li .row div input')).toArray();
	var answerArray = getAnswerStatefromDivArray(optionArray);
	sessionStorage.setItem('qNo_'+qIndex+'_state',JSON.stringify(answerArray));
	
	
	for(i=0;i<noOfQ;i++){
		
		console.log("array item: "+JSON.parse(sessionStorage.getItem('qNo_'+i+'_state')));
		resultArray[i]=JSON.parse(sessionStorage.getItem('qNo_'+i+'_state'));
		
	}

	$.ajax({
    url: "test/update/"+testId,
    contentType: 'application/json; charset=utf-8',
    processData : false,
    type : "POST",
    dataType:"json",
    data: JSON.stringify(resultArray),
    success:
    	function(data){
    	console.log('inside finish done');
    	var testFinishHTML = '';
		
		var body = {
				
			finishText : 'Test submitted successfully. Please go back to home page to take another test'
				
		}
			
		var template = $('#testFinishTemplate').html();
		testFinishHTML = Mustache.to_html(template,body);
		console.log('inside final done');
		$('#testQuestion').html(testFinishHTML);
    }

    });
	
	
	
});
        



