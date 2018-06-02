

$('#questionSubmit').click(function(event){
  event.preventDefault();
  if($('#question-form').smkValidate()){
    var quesId = $('#quesId').val();
    var qContent = $('#questionContent').val();
    var op1 = $('#option1').val();
    var op1isAns = $('#op1isAns').is(":checked");
    var op2 = $('#option2').val();
    var op2isAns = $('#op2isAns').is(":checked");
    var op3 = $('#option3').val();
    var op3isAns = $('#op3isAns').is(":checked");
    var op4 = $('#option4').val();
    var op4isAns = $('#op4isAns').is(":checked");
    var head = $('#head').val();
    var lesson = $('#lesson').val();
    var topic = $('#topic').val();
    var syllabus = $('#syllabus').val();
    var exam = $('#exam').val();
    var examyear = $('#exam-year').val();
    var difficulty = $('#difficulty').val();
    var idKey = 'id';

    var jsonObj = 

            {
                
                "head": head,
                "lesson": lesson,
                "topic": topic,
                "syllabus": syllabus,
                "exam": exam,
                "year":examyear,
                "questionContent": qContent,
                "optionList": [
                  {
                    "optionText": op1,
                    "isAnswer": op1isAns,
                    "opAlpha" : "a"
                  },
                  {
                    "optionText": op2,
                    "isAnswer": op2isAns,
                    "opAlpha" : "b"
                  },
                  {
                    "optionText": op3,
                    "isAnswer": op3isAns,
                    "opAlpha" : "c"
                  },
                  {
                    "optionText": op4,
                    "isAnswer": op4isAns,
                    "opAlpha" : "d"
                  }
                ],
                "diagramRef": "http://link",
                "questionType": "SINGLE",
                "solutionDiagramRef": "http://link2",
                "difficulty": difficulty
              };
              
              if(quesId!=''){
                jsonObj[idKey]=quesId;
              }

              $.ajax({
              url: "/question/add",
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              processData : false,
              type : "POST",
              data: JSON.stringify(jsonObj)

           }).done(function(data){
            if(window.location.pathname==="/home"){
              $("#questionEditModal").modal('hide');
              $("#quesSuccess").attr('hidden',false);
              loadAllQuestions();
            }

            if(window.location.pathname==="/create"){
            	
            	var alertText = 'Successfully submitted question with id:'+data.id;
            	alert(alertText);
            	$("#question-form")[0].reset();
            	$("#MathPreview").empty();
            	$('#submission-alert').css({"display":"block"});
            	
            	
            	$('#submission-alert').append(alertText);
            	
              
            }else{
            	
            	var alertText = 'Successfully submitted question with id:'+data.id;
            	alert(alertText);
            	$("#question-form")[0].reset();
            	$("#MathPreview").empty();
            	$("#MathBuffer").html('');
            	$('#submission-alert').css({"display":"block"});
            	
            	
            	$('#submission-alert').append(alertText);
            	$("#questionEditModal").modal('hide');
            
            }

           }); 
    }

});

$("#querySubmit").click(function(event){
    event.preventDefault();
    var head = $("#head-query").val();
    var lesson = $("#lesson-query").val();
    var topic = $("#topic-query").val();

    var queryJson = {

      "head" : head,
      "lesson" : lesson,
      "topic" : topic  


    }
    console.log(queryJson);
    $.ajax({
      url: "question/query",
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      processData : false,
      type : "POST",
      data: JSON.stringify(queryJson)

    }).done(function(data){
      var qstring = '';
      var qNo=1;
      var questionHTML = '';
      var template = $('#questionTemplate').html();
      $.each(data,function(i,item){ 

          var qNoKey = 'qNo';
          item[qNoKey] = qNo;
          questionHTML+= Mustache.to_html(template,item);
          qNo+= 1;
        

      });
      
      $('#question-list').html(questionHTML);
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

    });
   

});


$(document).ready(function() {

   populateExamDropdown();
   populateExamYear();
   enableTypeAhead();

   if($(location).attr('pathname')==='/explore'){
	   
	   loadAllQuestions();
	   
   }	
   
    
 	
					
});




function enableTypeAhead(){

  $('#head').typeahead({
        onSelect:function(item){
          console.log(item.value);
          loadChildrenDropdown(item.value,'#lesson');
        },
        ajax: '/categoryTag/path/head',
        displayField: 'id'

  });


  $('#lesson').change(function(){
    var lesson = $(this).val();
    console.log($(this).val());
    loadChildrenDropdown(lesson,'#topic');
  });



  $('#head-query').typeahead({
        onSelect:function(item){
          console.log(item.value);
          loadChildrenDropdown(item.value,'#lesson-query');
        },

        ajax: '/categoryTag/path/head',
        displayField: 'id'

  });

  $('#lesson-query').change(function(){
    var lesson = $(this).val();
    console.log($(this).val());
    loadChildrenDropdown(lesson,'#topic-query');
  });


}

function enableQuestionModal(){
  
  $(".modbut").click(function(){
        var qId=$(this).attr("data-id");
        $("#questionEditModal").modal('show');
        

        $.getJSON('question/byId/'+qId,function(question){
        	
          $("#quesId").val(question.id);
          $("#head").val(question.head);
          loadChildrenDropdown(question.head,'#lesson',question.lesson);
          loadChildrenDropdown(question.lesson,'#topic',question.topic);
      
          $("#questionContent").val(question.questionContent);
          $("#option1").val(question.optionList[0].optionText);
          $("#op1isAns").attr('checked',question.optionList[0].isAnswer);
          $("#option2").val(question.optionList[1].optionText);
          $("#op2isAns").attr('checked',question.optionList[1].isAnswer);
          $("#option3").val(question.optionList[2].optionText);
          $("#op3isAns").attr('checked',question.optionList[2].isAnswer);
          $("#option4").val(question.optionList[3].optionText);
          $("#op4isAns").attr('checked',question.optionList[3].isAnswer);
          $("#syllabus").val(question.syllabus);
          $("#exam").val(question.exam);
          $("#exam-year").val(question.year);
          $("#difficulty").val(question.difficulty);
          Preview.Update();

        });
        
        
        
        
    });

  $(".delbut").click(function(){
        var qId=$(this).attr("data-id");
        $("#questionDeleteModal").modal('show');  
        $("#questionDelete").click(function(){
          $.ajax({
              url: "/question/delete/"+qId,
              type:"DELETE"
          }).done(function(){
              console.log("question deleted");
              $("#questionDeleteModal").modal('hide');
              loadAllQuestions();
            });

        });


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

