/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa',
	density: 20000,
	proximity: 150
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});