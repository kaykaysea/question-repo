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
    loadChildren(lessonHead);
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
    loadChildren(topicLesson);
    })
    .fail(function(xhr) {
    console.log('error', xhr);
    });


});


function loadHeads(){

    $.getJSON('/categoryTag/path/head', function(data) {

    var headList = '<ol>';
    $.each(data, function(i, item) {

      var itemName = item.id.replace(/\s+/g, '');
      headList += '<li><a class='+itemName+'>' + item.id + '</a></li>'

    });

    headList += '</ol>';

    $('#head-list').html(headList);

  });

}

function loadChildren(head){
    var url = '/categoryTag/byParent/'+head

    $.getJSON(url, function(data) {

    var lessonList = '<ol>';
    $.each(data, function(i, item) {

      var itemName = item.id.replace(/\s+/g, '');
      lessonList += '<li><a class='+itemName+'>' + item.id + '</a></li>'

    });

    lessonList += '</ol>';

    $('#lesson-list').html(lessonList);

  });

}

function enableTypeAhead(){

  $('#forHead').typeahead({

        ajax: '/categoryTag/path/head',
        displayField: 'id'

  });

}



