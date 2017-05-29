 $('#question-form').submit(


                  function(event){

                    alert( "Handler for .submit() called." );
                    event.preventDefault();

                    var qContent = $('#questionContent').val();
                    var op1 = $('#option1').val();
                    var op2 = $('#option2').val();
                    var op3 = $('#option3').val();
                    var op4 = $('#option4').val();

                    alert(qContent);

                    var jsonObj = 

                              {
                                  "head": "Electrostatics",
                                  "lesson": "Coulomb's law",
                                  "topic": "Electric potential",
                                  "syllabus": "AP state board",
                                  "exam": "iit-jee",
                                  "questionContent": qContent,
                                  "optionList": [
                                    {
                                      "optionText": op1,
                                      "isAnswer": false
                                    },
                                    {
                                      "optionText": op2,
                                      "isAnswer": false
                                    },
                                    {
                                      "optionText": op3,
                                      "isAnswer": false
                                    },
                                    {
                                      "optionText": op4,
                                      "isAnswer": true
                                    }
                                  ],
                                  "diagramRef": "http://link",
                                  "questionType": "SINGLE",
                                  "solutionDiagramRef": "http://link2",
                                  "difficulty": "MODERATE"
                                };
                                alert(JSON.stringify(jsonObj));

                                $.ajax({
                                url: "/question/add",
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                processData : false,
                                type : "POST",
                                data: JSON.stringify(jsonObj)

                             }).done(alert("success")); 



                  } );

$(document).ready(function() {

 				
               $.getJSON('question/byTopic/equations', function(jd) {

                  //var qListJson = $.parseJson(jd);
                  var qstring = '';
                  var qNo=1;
                  var qBody = '';
                  $.each(jd,function(i,item){

                    qBody+= '<div class="panel panel-default"> <div class="panel-body"> <div class="row"> <div class="col-md-1"><b>'
                      +qNo+
                      '</b></div> <div class="col-md-11">'
                      +item.questionContent+
                      '</div> </div> <div class="filler-small"></div> <div class="row"> <div class="col-md-1"></div> <div class="col-md-1">a)</div> <div class="col-md-10">'
                      +item.optionList[0].optionText+
                      '</div> </div> <div class="row"> <div class="col-md-1"></div> <div class="col-md-1">b)</div> <div class="col-md-10">'
                      +item.optionList[1].optionText+
                      '</div> </div> <div class="row"> <div class="col-md-1"></div> <div class="col-md-1">c)</div> <div class="col-md-10">'
                      +item.optionList[2].optionText+
                      '</div></div> <div class="row"> <div class="col-md-1"></div> <div class="col-md-1">d)</div> <div class="col-md-10">'
                      +item.optionList[3].optionText+
                      '</div> </div> </div> </div>';

                    qNo+= 1;
                    

                  });
                  
                  $('#question-list').html(qBody);
                  
                  
               });
					
           
         });