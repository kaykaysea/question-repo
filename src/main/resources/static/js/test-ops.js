
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
	
	var testState = sessionStorage.getItem("testState");
	console.log('testState'+testState);
	var testStateJSON = JSON.parse(testState);
	
	
	console.log('activeQNo'+testStateJSON.testId);
	$("#prevQ").removeAttr('disabled');
	if(qNo==noOfQuestions-1){
		console.log('lastquestion');
		$("#nextQ").attr('disabled','disabled');
	}
	
	$.getJSON('test/id/'+testId+'/qNo/'+qNo, function(data){
		var testQuestionHTML = '';
		var template = $('#testQuestionTemplate').html();
		var testQNo = 'qNo';
		var qState = JSON.parse(sessionStorage.getItem('qNo_'+qNo+'_state'));
		console.log('question state: '+JSON.parse(sessionStorage.getItem('qNo_'+qNo+'_state')))
		data[testQNo]=qNo+1;
		$('#testQuestion').data('qno',qNo+1);
		testQuestionHTML = Mustache.to_html(template,data);
		$('#testQuestion').html(testQuestionHTML);
		
		$.each(qState,function(index,value){

				$($('.list-group li .row div input')[index]).prop("checked",value);
			
		});
		
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		
		
		
	});

	
	
});

$("#prevQ").click(function(){
	
	var qNo=$("#testQuestion").data('qno');
	var prevQNo=qNo-2;
	var testId=$('#testQuestion').data('testId');
	var testState = sessionStorage.getItem("testState");
	var testStateJSON = JSON.parse(testState);
	
	$("#nextQ").removeAttr('disabled');
	if(qNo==2){
		console.log('firstquestion');
		$("#prevQ").attr('disabled','disabled');
	}
	
	$.getJSON('test/id/'+testId+'/qNo/'+prevQNo, function(data){
		
		var testQuestionHTML = '';
		var template = $('#testQuestionTemplate').html();
		var testQNo = 'qNo';
		var qState = JSON.parse(sessionStorage.getItem('qNo_'+prevQNo+'_state'));
		data[testQNo]=prevQNo+1;
		$('#testQuestion').data('qno',prevQNo+1);
		testQuestionHTML = Mustache.to_html(template,data);
		$('#testQuestion').html(testQuestionHTML);
		
		$.each(qState,function(index,value){

			$($('.list-group li .row div input')[index]).prop("checked",value);
		
		});
		
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			
	});
	
	
});




function loadTest(testId){
	
	$.ajax({
		url:'test/'+testId+'/state',
		type:'get',
		success:function(data){
			sessionStorage.setItem("testState",JSON.stringify(data));
			var activeQNo = data.activeQNo;
			var noOfQuestions = data.noOfQuestions;
			
			$.each(data.optionsState,function(index,value){
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
			
			
			$.getJSON('test/id/'+testId+'/qNo/'+activeQNo, function(data){
				var testQuestionHTML = '';
				var template = $('#testQuestionTemplate').html();
				var qNo = 'qNo';
				var qState = JSON.parse(sessionStorage.getItem('qNo_'+activeQNo+'_state'));
				data[qNo]=activeQNo+1;
				testQuestionHTML = Mustache.to_html(template,data);
				$('#testQuestion').html(testQuestionHTML);
				
				$.each(qState,function(index,value){

					$($('.list-group li .row div input')[index]).prop("checked",value);
				
				});
				
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				
			});
		
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

function populateExamDropdown(){
	
	$.ajax({
		url:'/exam/all',
		type:'get',
		success:function(response){
			
			var len = response.length;
			
			for( var i = 0; i<len; i++){
                var id = response[i]['id'];
                var name = response[i]['name'];
                
                $("#exam").append("<option value='"+name+"'>"+name+"</option>");

            }
		}
	
	});
	
}

function populateExamYear(){
	
	for(var i=2018;i>=1960;i--){
		
		$("#exam-year").append("<option value='"+i+"'>"+i+"</option>");
		
	}
}

