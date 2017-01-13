var highchartsOptions = Highcharts.setOptions(Highcharts.theme = {
   colors: ['#058DC7', '#eaab1d']
});

Highcharts.setOptions({
  chart: {
    defaultSeriesType: 'column',
    backgroundColor: '#fff',
    shadow: true
  }
});

$('#container').highcharts({
    data: {
        googleSpreadsheetKey: '0AqZ_B1kuWqhjdHNNdURJeS1XZDFrZGM4d1J2Zl9IRGc',
        googleSpreadsheetWorksheet: 1
    },
    title: {
      text: 'System Transaction Trends'

    },
    yAxis: {
      min: 1.5,
      title: {
        text: 'Transaction Trends (in millions)'
      }
    }
});

$('#container2').highcharts({
    data: {
        googleSpreadsheetKey: '0AqZ_B1kuWqhjdHNNdURJeS1XZDFrZGM4d1J2Zl9IRGc',
        googleSpreadsheetWorksheet: 2
    },
    title: {
      text: 'System Revenue Trends'
    },
    yAxis: {
      min: 1.5,
      title: {
        text: 'Toll Revenues (in millions USD)'
      }
    }
});