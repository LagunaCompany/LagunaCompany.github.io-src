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

	// Points chart vars
	var chartData = [],
		chartContext = document.getElementById('treehouse-scorecard-points').getContext('2d'),
		chart = null;

	// Badges vars
	var badgeTemplate = Handlebars.compile($('#template-treehouse-badge').html()),
		badgeWrapper = $('.treehouse-badge-wrapper');

	// Points processing
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

	// Badges processing
	for (var i = data.badges.length-12; i < data.badges.length; i++) {

		/* jshint ignore:start */
		var badgeDate = new Date(data.badges[i].earned_date),
			badgeDateFormatted = badgeDate.toLocaleDateString();

		data.badges[i].earned_date = badgeDateFormatted;
		/* jshint ignore:end */

		var html = badgeTemplate(data.badges[i]);

		badgeWrapper.append(html);

	}

});

(function(){

  /*globals Flickity*/

  // Init Flickity for slider functionality
  new Flickity('.carousel', {});

})();
