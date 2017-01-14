$(document).ready(function(){
	var selection1 = "";
	var selection2 = "";

	$(document).on('click', '.dataSet', function() {
		// console.log('you clicked: ' + $(this).text().trim());

		if ($(this).text().trim() == selection1) {
			$(this).css('background-color', '#A0BAAA');
			$(this).css('color', 'black');
      $(this).css('padding', '0px');
			selection1 = "";
		} else if ($(this).text().trim() == selection2) {
			$(this).css('background-color', '#A0BAAA');
			$(this).css('color', 'black');
      $(this).css('padding', '0px');
			selection2 = "";
		} else if ((selection1 != "") && (selection2 != "")) {
			// do nothing-> show popover:
			// 'You must deselect one item before you can select this one.'
		} else if (selection1 == "") {
			$(this).css('background-color', '#5BC0DE');
			$(this).css('color', 'white');
      $(this).css('padding', '5px');
			selection1 = $(this).text().trim();
			// console.log("selection1 set to: " + selection1);			
		} else if (selection2 == "") {
			$(this).css('background-color', '#5BC0DE');
			$(this).css('color', 'white');
      $(this).css('padding', '5px');
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

			drawGraph(db);
		});
	};

	// Need single word to act as key in hashtable.
	function getFirstWord(selection) {
        if (selection.indexOf(' ') === -1)
            return selection;
        else
            return selection.substr(0, selection.indexOf(' '));
    };


	function drawGraph(db) {
    	var arrDataSets = db.responseJSON.values;
    	var hash = {
    		Palmer : arrDataSets[1],
    		Precipitation : arrDataSets[2].map(Number),
    		Human : arrDataSets[3].map(Number),
    		Plant : arrDataSets[4].map(Number),
    		Rabbit : arrDataSets[5].map(Number),
    		Soil : arrDataSets[6].map(Number),
    		Mean : arrDataSets[7].map(Number)
    	};

    	var key1 = getFirstWord(selection1);
    	var key2 = getFirstWord(selection2);

		Highcharts.chart('graph-well', {
			chart: {
				type: 'line',
				zoomType: 'xy'
        	},
	        xAxis: {
	            categories: db.responseJSON.values[0] // this is the years
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
		getSpreadsheetData();
		drawGraph();
	}); // #graphBtn on-click


	$(document).on('click', '#pdfButton', function() {
		console.log('Clicked DownloadPDF button.');

        var chart = $('#graph-well').highcharts();
		// POSSIBLY COULD APPEND THE CAPTION TO chart HERE. **************************
        chart.exportChart({
            type: 'application/pdf',
    	});
	}); // #pdfButton on-click

}); // document.ready