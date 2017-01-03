function getSentiment() {
	var sentiment = [];
	var anger = [];
	var fear = [];
	var joy = [];
	var sadness = [];
	var surprise = [];
	var xAxis = [];

	var data = $('#essayInput').val().split(/[.|!|?]\s/gi);
	console.log(data);
	
	// batch example
	$.post(
	  'https://apiv2.indico.io/sentiment/batch',
	  JSON.stringify({
	    'api_key': "8c5e5e1cb0a0269de30b1ae12ee61f40",
	    'data': data
	  })
	).then(function(res) { 
		res = JSON.parse(res);
		sentiment = res['results']
		console.log(res) 
	});		

	// batch example
	$.post(
	  'https://apiv2.indico.io/emotion/batch',
	  JSON.stringify({
	    'api_key': "8c5e5e1cb0a0269de30b1ae12ee61f40",
	    'data': data
	  })
	).then(function(res) {
		res = JSON.parse(res);
		for(var i = 0; i < res["results"].length; i++) {
			anger.push(res["results"][i]['anger']);
			fear.push(res["results"][i]['fear']);
			joy.push(res["results"][i]['joy']);
			sadness.push(res["results"][i]['sadness']);
			surprise.push(res["results"][i]['surprise']);
			xAxis.push(i);
		}
		console.log(res); 
		console.log(anger);
		console.log(fear);
		console.log(joy);
		console.log(sadness);
		console.log(surprise);
	
    // plot the graphs
    var sentimentPlot = {
      x: xAxis,
      y: sentiment,
      mode: 'lines+markers',
      name: 'Positivity'
    };

    var angerPlot = {
      x: xAxis,
      y: anger,
      mode: 'lines+markers',
      name: 'Anger'
    };

    var fearPlot = {
      x: xAxis,
      y: fear,
      mode: 'lines+markers',
      name: 'Fear'
    };

    var joyPlot = {
      x: xAxis,
      y: joy,
      mode: 'lines+markers',
      name: 'Joy'
    };

    var sadnessPlot = {
      x: xAxis,
      y: sadness,
      mode: 'lines+markers',
      name: 'Sadness'
    };

    var surprisePlot = {
      x: xAxis,
      y: surprise,
      mode: 'lines+markers',
      name: 'Surprise'
    };

    var data = [ sentimentPlot, angerPlot, fearPlot, joyPlot, sadnessPlot, surprisePlot ];

    var layout = {
      title:'Emotions By Sentence',
      xaxis: {
        title: 'Sentences #',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Score',
        showline: false
      }
    };

    graphSection = document.getElementById('graphs');
    Plotly.newPlot(graphSection, data, layout);
    });
  }
