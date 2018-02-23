 //$('#question-form').submit(

$('#questionSubmit').click(function(event){
  event.preventDefault();
  if($('#question-form').smkValidate()){
    var quesId = $('#quesId').val();
    var qContent = $('#questionContent').val();
    var op1 = $('#option1').val();
    var op2 = $('#option2').val();
    var op3 = $('#option3').val();
    var op4 = $('#option4').val();
    var head = $('#head').val();
    var lesson = $('#lesson').val();
    var topic = $('#topic').val();
    var syllabus = $('#syllabus').val();
    var exam = $('#exam').val();
    var difficulty = $('#difficulty').val();
    var idKey = 'id';

    var jsonObj = 

            {
                
                "head": head,
                "lesson": lesson,
                "topic": topic,
                "syllabus": syllabus,
                "exam": "iit-jee",
                "questionContent": qContent,
                "optionList": [
                  {
                    "optionText": op1,
                    "isAnswer": false,
                    "opAlpha" : "a"
                  },
                  {
                    "optionText": op2,
                    "isAnswer": false,
                    "opAlpha" : "b"
                  },
                  {
                    "optionText": op3,
                    "isAnswer": false,
                    "opAlpha" : "c"
                  },
                  {
                    "optionText": op4,
                    "isAnswer": true,
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
            	
              /*var subQ='';
              subQ+='<h5>Submitted following question successfully</h5><div class="panel panel-default"> <div class="panel-body"> <div class="row"> <div class="col-md-1"><b>'
              +
              '</b></div> <div class="col-md-11">'
              +data.questionContent+
              '</div> </div> <div class="filler-small"></div> <div class="row"> <div class="col-md-1"></div> <div class="col-md-1">a)</div> <div class="col-md-10">'
              +data.optionList[0].optionText+
              '</div> </div> <div class="row"> <div class="col-md-1"></div> <div class="col-md-1">b)</div> <div class="col-md-10">'
              +data.optionList[1].optionText+
              '</div> </div> <div class="row"> <div class="col-md-1"></div> <div class="col-md-1">c)</div> <div class="col-md-10">'
              +data.optionList[2].optionText+
              '</div></div> <div class="row"> <div class="col-md-1"></div> <div class="col-md-1">d)</div> <div class="col-md-10">'
              +data.optionList[3].optionText+
              '</div> </div> </div> </div>';
              $('#submitted-question').html(subQ);*/

            }else{
            	
            	var alertText = 'Successfully submitted question with id:'+data.id;
            	alert(alertText);
            	$("#question-form")[0].reset();
            	$("#MathPreview").empty();
            	$("#MathBuffer").html('');
            	$('#submission-alert').css({"display":"block"});
            	
            	
            	$('#submission-alert').append(alertText);
            
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

    });


});


$(document).ready(function() {

   enableTypeAhead();

   loadAllQuestions();
    
 	
					
});

function enableTypeAhead(){

  $('#head').typeahead({
        onSelect:function(item){
          //alert(item+'selected');
          console.log(item.value);
          loadChildrenDropdown(item.value,'#lesson');
        },
        ajax: '/categoryTag/path/head',
        displayField: 'id'

  });


  /*$('#lesson').typeahead({

        ajax: '/categoryTag/type/lesson',
        displayField: 'id'

  });*/

   $('#lesson').change(function(){
    var lesson = $(this).val();
    console.log($(this).val());
    loadChildrenDropdown(lesson,'#topic');
  });

  /*$('#topic').typeahead({

        ajax: '/categoryTag/type/topic',
        displayField: 'id'

  });*/

  $('#head-query').typeahead({
        onSelect:function(item){
          //alert(item+'selected');
          console.log(item.value);
          loadChildrenDropdown(item.value,'#lesson-query');
        },

        ajax: '/categoryTag/path/head',
        displayField: 'id'

  });

  /*$('#lesson-query').typeahead({
        onSelect:function(item){
          //alert(item+'selected');
          console.log(item.value);
          loadChildrenDropdown(item.value,'#topic-query');
        },
        ajax: '/categoryTag/type/lesson',
        displayField: 'id'

  });*/

  $('#lesson-query').change(function(){
    var lesson = $(this).val();
    console.log($(this).val());
    loadChildrenDropdown(lesson,'#topic-query');
  });

  /*$('#topic-query').typeahead({

        ajax: '/categoryTag/type/topic',
        displayField: 'id'

  });*/

}

function enableQuestionModal(){

  $(".modbut").click(function(){
        //alert("modal click");
        var qId=$(this).attr("data-id");
        //alert(qId);
        $("#questionEditModal").modal('show');

        $.getJSON('question/byId/'+qId,function(question){
          $("#quesId").val(question.id);
          $("#head").val(question.head);
          $("#lesson").val(question.lesson);
          $("#topic").val(question.topic);
          $("#questionContent").val(question.questionContent);
          $("#option1").val(question.optionList[0].optionText);
          $("#option2").val(question.optionList[1].optionText);
          $("#option3").val(question.optionList[2].optionText);
          $("#option4").val(question.optionList[3].optionText);
          $("#syllabus").val(question.syllabus);
          $("#exam").val(question.exam);
          $("#difficulty").val(question.difficulty);


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

  //load questions      
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
   //load questions


}


function loadChildrenDropdown(parent,type){
  console.log('inside loadChildrenDropdown');
  var selectId = type;
  $.getJSON('/categoryTag/byParent/'+parent,function(data){
    console.log(data);
    var template = $('#dropdownTemplate').html();
    var dropdownHTML = '';
    dropdownHTML = Mustache.to_html(template,data);
    $(selectId).html(dropdownHTML);

  });

}


