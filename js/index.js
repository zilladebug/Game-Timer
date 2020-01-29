var minutesel = 0, secondsel = 20, secondInterval = 5; //interval number
var starttime = -1, time = -1, running = false, played = false;
var redirect = 'particles.html';//"https://www.sopitas.com/wp-content/uploads/2017/01/explosion-nuclear.gif"; // Target URL


$(".switcher[type=\"minutes\"] .time").text(minutesel);
//10 is smaller than 0
//0 adds a 0 to the minutes, if 10 is changed
//if 20 is = to secondsel number (same number), then it will work fine.
$(".switcher[type=\"seconds\"] .time").text((secondsel < 20 ? "0" : "") + secondsel);

//how fast it counts the seconds
setInterval(timer, 1000); 

//the select function for up and down
$(".switcher:not([type=\"none\"]) .up, .switcher:not([type=\"none\"]) .down").click(function(){
  if($(this).attr("class") == "up") {
    if ($(this).parent().attr("type") == "minutes") { // type equals minutes
      minutesel++; //increment, added AFTER UP!
      $(this).parent().find(".time").text(minutesel);

    } else {
      secondsel+=secondInterval;
      secondsel = (60 + secondsel) % 60;
      $(this).parent().find(".time").text((secondsel < 10 ? "0" : "") + secondsel);
    }

  } else {

    if ($(this).parent().attr("type") == "minutes") {
      minutesel--; //decrement, remove AFTER DOWN!
      minutesel = minutesel < 0 ? 0 : minutesel;
      $(this).parent().find(".time").text(minutesel);

    } else {
      secondsel-=secondInterval;
      secondsel = (60 + secondsel) % 60;
      $(this).parent().find(".time").text((secondsel < 10 ? "0" : "") + secondsel);
    }
  }
  if (minutesel + secondsel == 0) {
    $(".begin").hide(); 
  } else {
    $(".begin").show();
  }
  starttime = minutesel*60 + secondsel;
  time = starttime + 1;
});

//The starter button - begin
$(".begin").click(function(){
  if(!running) {
    $(this).text("Stop");
    starttime = minutesel*60 + secondsel;
    time = starttime + 1;
    running = true;
    $(".switcher").addClass("active");
  } else {
    $(this).text("Begin");
    running = false;
    $(".switcher[type=\"minutes\"] .time").text(minutesel);
    $(".switcher[type=\"seconds\"] .time").text((secondsel < 10 ? "0" : "") + secondsel);
    $(".show").css("height", "100%");
    $(".show").removeClass("timeup");
    $(".switcher").removeClass("active");
  }
});

$("*:not(.begin)").click(function(){
  time = starttime + 1;
});

function timer() {
  console.log(time);
  if(running) {
    time -= 1;
    //if changed to 10 and 20 the countdown will stop at 10 and begin again
    time = time < 0 ? 0 : time;
    //Calculates the time, so that it removes some of the bottom and top
    //Time * 100 divided på starttime in %
    $(".show").css("height", ((time * 100)/starttime) + "%");
    $(".switcher[type=\"minutes\"] .time").text(Math.floor(time/60));
    $(".switcher[type=\"seconds\"] .time").text((time%60 < 10 ? "0" : "") + time%60);
    if(time == 0) {
      if (played) {
        $(".show").addClass("timeup");
        //redirecting to particles.html
        window.location.href = redirect;
        $(".show").css("height", "100%");
      }
      if (!played) {
        played = true;
        //If its played then redirect to the window location.
        //$.playSound('http://freesound.org/data/previews/135/135125_2337290-lq.mp3');
      }
    } else {
      played = false;
      //Activate the red timeup function
      //$(".show").removeClass("timeup");

    }
  }
}

(function($){

  $.extend({
    playSound: function(){
      return $(
        '<audio autoplay="autoplay" style="display:none;"><source src="' + arguments[0] + '" /><embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false" class="playSound" /></audio>'
      ).appendTo('body');
    }
  });

})(jQuery);