
var list = JSON.parse(localStorage.getItem("todolist"));
// $("input[type='update']").attr("disabled", true); 

// Checks to see if the todolist exists in localStorage and is an array currently
// If not, set a local list variable to an empty array
// Otherwise list is our current list of todos
if (!Array.isArray(list)) {
  list = [];
}

function putOnPage() {
  $("#todo-list").empty(); // empties out the html
  var insideList = JSON.parse(localStorage.getItem("todolist"));
  // Checks to see if we have any todos in localStorage
  // If we do, set the local insideList variable to our todos
  // Otherwise set the local insideList variable to an empty array
  if (!Array.isArray(insideList)) {
    insideList = [];
  }

  // render our insideList todos to the page
  for (var i = 0; i < insideList.length; i++) {
    var p = $("<p>").text(insideList[i]);
    var b = $("<button class='delete'>").text("Delete").attr("data-index", i);
    var d = $("<button class='edit'>").text("Edit").attr("data-index", i);

    p.append(b);
    p.append(d);
    $("#todo-list").append(p);
    $(':button').css ({
      "display": "inline-block",
      "font-family": "TimesNewRoman",
      "background-color": "#F0F0F0",
      "color":" black",
      "cursor": "pointer",
      "border": "0.5px solid black",
      "border-radius": "2px",
      "text-align": "center",
      "color": "black",
      "font-size": "0.5em",
      "float": "right",
      "width":"10%",
      "height": "65%",
      "margin-right": "0.3%"
  })
  
  p.css({
        "display": "block",
        "max-height": "5%",
        "border": "0.5px solid black",
        "border-radius": "4px",
        "background-color": "#e6edf4",
        "padding-top": "2%",
        "padding-left":"3%",
        "color": "black",
        "font-size": "0.8em"
    })
  }
}

// render our todos on page load
putOnPage();
$(document).on("click", "button.delete", function() {
  var todolist = JSON.parse(localStorage.getItem("todolist"));
  var currentIndex = $(this).attr("data-index");
  // Deletes the item marked for deletion
  todolist.splice(currentIndex, 1);
  list = todolist;
  localStorage.setItem("todolist", JSON.stringify(todolist));
  putOnPage();
}); 

$(document).on("click", "button.edit", function(){
  var todolist = JSON.parse(localStorage.getItem("todolist"));
  var currentIndex = $(this).attr("data-index");
  // Edits the item marked for update
  $("input:text").val(todolist[currentIndex]);
  todolist.splice(currentIndex, 1);
  list = todolist;
  localStorage.setItem("todolist", JSON.stringify(list));
  $("input[type='update']").attr("disabled", false); 
});

$("input[type='update']").on("click", function(event) {
  event.preventDefault();
  var todolist = JSON.parse(localStorage.getItem("todolist"));
  var currentIndex = $(this).attr("data-index");
 // delete the selected item

 // add the new item
 var val = $("input[type='text']").val();
 $("input[type='text']").val("");
 // Adding our new todo to our local list variable and adding it to local storage
 list.push(val);
 localStorage.setItem("todolist", JSON.stringify(list));
 putOnPage();
 $("input[type='update']").attr("disabled", true); 
});


$("input[type='submit']").on("click", function(event) {
  event.preventDefault();
  // Setting the input value to a variable and then clearing the input
  var val = $("input[type='text']").val();
  if (val ==""){
    alert ("Please enter a value before submitting.");
    return false; 
  } 

  $("input[type='text']").val("");
  // Adding our new todo to our local list variable and adding it to local storage
  list.push(val);
  localStorage.setItem("todolist", JSON.stringify(list));
  putOnPage();
});

