$(document).ready(function() {

  loadHeads();

  enableTypeAhead();


});

$('#category-form').submit(

function(event) {

	event.preventDefault();

	var headFormInput = $('#headInput').val();
	var headArray = headFormInput.split(",");

	var headArrayJson = [];
	for (var i = 0; i < headArray.length; i++) {

		headArrayJson.push({

			"id" : headArray[i],
			"parent" : "",
			"path" : ""

		});

	}

   $.ajax({
    url: "/categoryTag/add",
    contentType : 'application/json; charset=utf-8',
    type : "POST",
    data : JSON.stringify(headArrayJson),
    })
    .done(function(data) {
    console.log('success', data);
    $('#headInput').val('');
    loadHeads();
    })
    .fail(function(xhr) {
    console.log('error', xhr);
    });


});


$('#lesson-form').submit(

function(event) {

  event.preventDefault();

  var lessonFormInput = $('#lessonInput').val();
  var lessonArray = lessonFormInput.split(",");
  var lessonHead = $('#forHead').val();
  var lessonArrayJson = [];
  for (var i = 0; i < lessonArray.length; i++) {

    lessonArrayJson.push({
      "id" : lessonArray[i],
      "parent" : lessonHead,
      "path" : ""

    });

  }

   $.ajax({
    url: "/categoryTag/add",
    contentType : 'application/json; charset=utf-8',
    type : "POST",
    data : JSON.stringify(lessonArrayJson),
    })
    .done(function(data) {
    console.log('success', data);
    $('#lessonInput').val('');
    loadChildren(lessonHead,'h');
    })
    .fail(function(xhr) {
    console.log('error', xhr);
    });


});

$('#topic-form').submit(

function(event) {

  event.preventDefault();

  var topicFormInput = $('#topicInput').val();
  var topicArray = topicFormInput.split(",");
  var topicLesson = $('#forLesson').val();
  var topicArrayJson = [];
  for (var i = 0; i < topicArray.length; i++) {

    topicArrayJson.push({
      "id" : topicArray[i],
      "parent" : topicLesson,
      "path" : ""

    });

  }

   $.ajax({
    url: "/categoryTag/add",
    contentType : 'application/json; charset=utf-8',
    type : "POST",
    data : JSON.stringify(topicArrayJson),
    })
    .done(function(data) {
    console.log('success', data);
    $('#topicInput').val('');
    loadChildren(topicLesson,'l');
    })
    .fail(function(xhr) {
    console.log('error', xhr);
    });


});


$('#editExamModal').on('show.bs.modal', function(e) {
	
	loadExams();
	
	
	
});


$('#exam-form').submit(

		function(event) {

			event.preventDefault();

			var examFormInput = $('#examInput').val();

		   $.ajax({
		    url: "/exam/add/"+examFormInput,
		    contentType : 'application/json; charset=utf-8',
		    type : "GET",
		    })
		    .done(function(data) {
		    console.log('success', data);
		    $('#examInput').val('');
		    loadExams();
		    })
		    .fail(function(xhr) {
		    console.log('error', xhr);
		    });


		});


function loadExams(){
	$.getJSON('/exam/all', function(data) {

	    var examList = '<ol>';
	    $.each(data, function(i, item) {
	      var itemId = item.id.replace(/'/g, "&apos;");
	      var itemName = item.id.replace(/\s+/g, '');
	      examList += '<li>' + item.name + '</li>'

	    });

	    examList += '</ol>';

	    $('#exam-list').html(examList);

	  });
	
}






function loadHeads(){

    $.getJSON('/categoryTag/path/head', function(data) {

    var headList = '<ol>';
    $.each(data, function(i, item) {
      var itemId = item.id.replace(/'/g, "&apos;");
      var itemName = item.id.replace(/\s+/g, '');
      headList += '<li><a href=\'javascript:loadChildren("'+itemId+'","h");\' class='+itemName+'>' + item.id + '</a></li>'

    });

    headList += '</ol>';

    $('#head-list').html(headList);

  });

}



function loadChildren(head,flag){
    var url = '/categoryTag/byParent/'+head;
    var listIdentifier = '';

    if(flag==='h'){

      listIdentifier='#lesson-list';

      $.getJSON(url, function(data) {

        var lessonList = '<ol>';
        $.each(data, function(i, item) {
          var itemId = item.id.replace(/'/g, "&apos;");
          var itemName = item.id.replace(/\s+/g, '');
          lessonList += '<li><a href=\'javascript:loadChildren("'+itemId+'","l");\' class='+itemName+'>' + item.id + '</a></li>'

        });

        lessonList += '</ol>';

    
        $(listIdentifier).html(lessonList);
        $('#forHead').val(head);
    

      });
  }

    if(flag==='l'){

      listIdentifier='#topic-list';

      $.getJSON(url, function(data) {

        var lessonList = '<ol>';
        $.each(data, function(i, item) {
          var itemId = item.id.replace(/"/g, "&quot;");
          var itemName = item.id.replace(/\s+/g, '');
          lessonList += '<li><a class='+itemName+'>' + itemId + '</a></li>'

        });

        lessonList += '</ol>';

    
        $(listIdentifier).html(lessonList);
        $('#forLesson').val(head);

      });
  }

    

}

function enableTypeAhead(){

  $('#forHead').typeahead({

        ajax: '/categoryTag/path/head',
        displayField: 'id'

  });

  $('#forLesson').typeahead({

        ajax: '/categoryTag/type/lesson',
        displayField: 'id'

  });

}





