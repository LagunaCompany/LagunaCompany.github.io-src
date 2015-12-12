'use strict';

// Function from http://stackoverflow.com/questions/17359232/how-to-tell-jshint-to-ignore-all-undefined-variables-in-one-file
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var promise = $.getJSON('https://teamtreehouse.com/ajayprasannan.json');

promise.done(function(data) {

	/*globals Chart, Handlebars*/

	var chartData = [];
	var chartContext = document.getElementById('treehouse-scorecard-points').getContext('2d');
	var chart = null;

	for (var category in data.points) {

		var points = data.points[category];

		if(category !== 'total' && points !== 0) {

			var colour = getRandomColor();

			chartData.push({
				value: points,
		        color: colour,
		        highlight: '#02448a',
		        label: category
			});

		}

	}

	chart = new Chart(chartContext).Doughnut(chartData);

	for (var i = 0; i < data.badges.length; i++) {

		var source   = $('#template-treehouse-badge').html();
		var template = Handlebars.compile(source);
		var context = data.badges[i];
		var html    = template(context);

		$('.treehouse-badge-wrapper').append(html);

	}

	

});