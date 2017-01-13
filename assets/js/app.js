$(document).ready(function(){

	// var db = {};
	// var series1;
	// var xAxLabel = [];

	var selection1 = "";
	var selection2 = "";

	$(document).on('click', '.dataSet', function() {
		console.log('you clicked: ' + $(this).text().trim());

		if ($(this).text().trim() == selection1) {
			$(this).css('background-color', 'white');
			$(this).css('color', 'black');
			selection1 = "";
		} else if ($(this).text().trim() == selection2) {
			$(this).css('background-color', 'white');
			$(this).css('color', 'black');
			selection2 = "";
		} else if ((selection1 != "") && (selection2 != "")) {
			// do nothing-> show popover 'You must deselect one item before you can select this one.'
		} else if (selection1 == "") {
			$(this).css('background-color', 'blue');
			$(this).css('color', 'white');
			selection1 = $(this).text().trim();
			// console.log("selection1 set to: " + selection1);			
		} else if (selection2 == "") {
			$(this).css('background-color', 'blue');
			$(this).css('color', 'white');
			selection2 = $(this).text().trim();
			// console.log("selection2 set to: " + selection2);
		}
		// console.log("selection1 set to: " + selection1);
		// console.log("selection2 set to: " + selection2);
	}); // .dataSet on-click selection function


	function getSpreadsheetData() {
		var url = 'https://sheets.googleapis.com/v4/spreadsheets/1swa7IJkys5J2UmZRswntYrvgo_lm7M9ADgW7W0mgC-o/values/Sheet1!A2:H115?majorDimension=COLUMNS&key=AIzaSyCWbVVxyblRIxU04_pxNh3g2WQXkXPAknE';

		$.getJSON(url).success(function(data) {


		}).error(function(message) {
			console.error('error' + message);
		}).complete(function(data) {
			console.log('completed!');
			db = data;
			console.log(db);

			series1 = db.responseJSON.values[1];
			xAxLabel = db.responseJSON.values[0];

			drawGraph(db);
		});
	};

	function getFirstWord(selection) {
        if (selection.indexOf(' ') === -1)
            return selection;
        else
            return selection.substr(0, selection.indexOf(' '));
    };

	function drawGraph(db) {
    // Create the chart'
    	var arrDataSets = db.responseJSON.values;
    	var hash = {
    		Precipitation : arrDataSets[1],
    		Human : arrDataSets[2].map(Number),
    		Plant : arrDataSets[3].map(Number),
    		Rabbit : arrDataSets[4].map(Number),
    		Soil : arrDataSets[5].map(Number),
    		Mean : arrDataSets[4].map(Number)
    	};

    	var key1 = getFirstWord(selection1);
    	var key2 = getFirstWord(selection2);

    	// selection1.substr(0,selection1.indexOf(' '));
    	
    	console.log(hash['Human']);

		Highcharts.chart('graph-well', {
			chart: {
				type: 'line',
				zoomType: 'xy'
        	},
	        xAxis: {
	            categories: xAxLabel
	        },

			title: {	
	            text: 'Highcharts data from Google Spreadsheets'
	        },
			series: [{
	            name: selection1,
	            data: JSON.parse("[" + hash[key1] + "]") 
	            
	        }, {
	        	name : selection2,
	        	data: JSON.parse("[" + hash[key2] + "]")
	        }]
	    });

	}; // drawGraph()



	$(document).on('click', '#graphBtn', function() {
		console.log("Clicked graphBtn.");
		getSpreadsheetData(selection1);
		drawGraph();
	}); // #graphBtn on-click


	$(document).on('click', '#pdfButton', function() {
		console.log('Clicked DownloadPDF button.');

        var chart = $('#graph-well').highcharts();
        chart.exportChart({
            type: 'application/pdf',
    	});

	}); // #pdfButton on-click

}); // document.ready