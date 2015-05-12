$(function() {
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

	  return {
	    x: centerX + (radius * Math.cos(angleInRadians)),
	    y: centerY + (radius * Math.sin(angleInRadians))
	  };
	}

	function describeArc(x, y, radius, startAngle, endAngle){

	    var start = polarToCartesian(x, y, radius, endAngle);
	    var end = polarToCartesian(x, y, radius, startAngle);

	    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

	    var d = [
	        "M", start.x, start.y, 
	        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
	    ].join(" ");

	    return d;       
	}
	
	
	var flip = false,
	c = 0,
	pages = $('.page','#email').length;
	
	setInterval(function() {
		c++;
		if (c==pages) c=0;
		
		flip = !flip;
		$('.rotate, .top', '#email').removeClass('rotate top');
		
		if (flip) {
			$('.page:eq('+c+')').addClass('rotate');
		}
		
		$('.page:eq('+c+')').addClass('top');
		$('#email').toggleClass('hover');
	}, 4000);
	
	/*$('#email').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});*/
	
	
	// TFL STATUS
	function updateTFL() {
		$.ajax({
			url: "api/tfl.php",
			dataType: "json"
		}).done(function(data) {
			//console.log(data);
			if (data.error) {
				console.log('Error: '+data.error);
				$('#tfl').hide();
				return;
			}
			
			var html = '<table><tr><th>Line</th><th>Status</th><th>Description</th></tr>';
			
			$(data.LineStatus).each(function(i, line) {
				html += '<tr><td class="'+line.Line.Name.replace(/ /g, '-')+'">'+line.Line.Name+'</td><td class="'+line.Status.CssClass+'">'+line.Status.Description+'</td><td>'+line.StatusDetails+'</td></tr>';
			});
			
			html += '</table>';
			
			$('#tfl').html(html).show();
		});
	}


	// check every 15 sec
	updateTFL();
	setInterval(function() {
		updateTFL();
	}, 30000);
	
	// SPOTIFY
	var spotify = {};
	
	function updateSpotify() {
		$.ajax({
			url: "api/spotify.php",
			dataType: "json"
		}).done(function(data) {		
			if ($.isEmptyObject(data)) {
				if (spotify !== "offline") {
					$('#spotify').html('<div class="offline">Offline</div>');
					spotify = "offline";
				}
				return;
			}
			
			if (spotify.artist == data.artist && spotify.name == data.name) {
				return;
			}
			spotify = data;
			//console.log(data.album_cover);
			var bg = data.album_cover?' background-image:url('+data.album_cover+');':' background-image:url(img/spotify-no-cover.gif);';
			
			var $old = $('#spotify > div');
			var $new = $('<div style="display:none;'+bg+'"><div class="album"><p>'+data.name+'</p><span>'+data.artist+'</span></div></div>').appendTo('#spotify');
		
			$old.fadeOut(400, function() {
				$(this).remove();
			});
			$new.fadeIn(400);
		});
	}
	
	
	// check every 15 sec
	updateSpotify();
	setInterval(function() {
		updateSpotify();
	}, 15000);
	
	
	var instagram_loaded = false,
		twitter_loaded = false;
	
	var instagram_dates = [];
	
	// INSTAGRAM
	$.ajax({
		url: "api/instagram.php",
		dataType: "json"
	}).done(function(data) {
		//console.log('instagram',data);
		
		var html = '';
		$(data).each(function(i, item) {
			instagram_dates.push(item.created_time_nice);
			if (item.image_video === "image") {
				html += '<div style="background-image:url('+item.standard_res+');"><span class="icon"><span></span>'+item.relative_time+'</span><span class="likes">'+item.likes+' likes</span></div>';
			}
		});
		
		$('#instagram').html(html).cycle({
			slides: '> div',
			timeout: 5000
		});
		
		instagram_loaded = true;
	});
	
	var twitter_dates = [];
	
	// TWITTER
	$.ajax({
		url: "api/twitter.php",
		dataType: "json"
	}).done(function(data) {
		//console.log(data);
		
		var html = '';
		$(data).each(function(i, item) {
			twitter_dates.push(item.created_time_nice);
			html += '<p>'+item.text+'<span>'+item.relative_time+'</span></p>';
		});
		
		$('#tweets').html(html).cycle({
			slides: '> p',
			timeout: 5000,
			autoHeight: 'calc'
		});
		
		twitter_loaded = true;
	});
	
	
	// TWITTER STATS
	$.ajax({
		url: "api/twitter_stats.php",
		dataType: "json"
	}).done(function(data) {
		$('#twitter-followers').html(data['followers']);
		$('#twitter-following').html(data['following']);
	});
	
	
	// HARVEST
	$.ajax({
		url: "api/harvest.php",
		dataType: "json"
	}).done(function(data) {
		//console.log(data);
		
		var html = '<ul>';
		$(data).each(function(i, item) {
			if (i>2) return;
			var w = 100 * item.hours / 37.5;
			if (w>100) w=100;
			
			var name_class = item.name.toLowerCase().replace(/ /g, "-");
			
			html += '<li><div class="harvest-pic '+name_class+'"></div><div class="harvest-name"><p>'+item.name+'</p><span><span style="width:'+w+'%;"></span></span></div><div class="harvest-time">'+Number(item.hours).toFixed(2)+'<small>hrs</small></div></li>';
		});
		html += '</ul>';
		
		$('#harvest').append(html);
	});
	
	
	// CALENDAR
	$.ajax({
		url: "api/calendar.php",
		dataType: "json"
	}).done(function(data) {
		//console.log(data);
		
		var html = '<div class="event-wrap"><ul>';
		$(data.meetings).each(function(i, item) {
			//console.log(item);
			
			var today = '';
			if (item.date === "Today") {
				today += ' class="today"';
			}
			
			var time = '';
			if (item.end_time === "") {
				time = item.start_time;
			} else {
				time = item.start_time+'-'+item.end_time;
			}
			
			html += '<li'+today+'><span class="event-date">'+item.date+': <span>'+time+'</span></span><span class="event-summary">'+item.summary+'</span>'+(item.location?'<span class="event-location">'+item.location+'</span>':'')+'</li>';
		});
		html += '</ul></div>';
		
		$('#meetings').html(html);
		
		var html = '<div class="event-wrap"><ul>';
		$(data.outofoffice).each(function(i, item) {
			var today = '';
			if (item.date === "Today") {
				today += ' class="today"';
			}
			
			var time = '';
			if (item.end_time === "") {
				time = item.start_time;
			} else {
				time = item.start_time+'-'+item.end_time;
			}
			
			html += '<li'+today+'><span class="event-date">'+item.date+': <span>'+time+'</span></span><span class="event-summary">'+item.summary+'</span>'+(item.location?'<span class="event-location">'+item.location+'</span>':'')+'</li>';
		});
		html += '</ul></div>';
		
		$('#outofoffice').html(html);
	});
	
	
	// WEATHER

	function weather() {
		/*$.ajax({
			url: "api/weather.php",
			dataType: "json"
		}).done(function(data) {
			$('#temp').html(data.temp+'C');
		});*/
			
		$.simpleWeather({
		    location: 'London, UK',
		    woeid: '',
		    unit: 'c',
		    success: function(weather) {
		      html = '<i class="icon-'+weather.code+'"></i><br /><span>'+weather.temp+'&deg;'+weather.units.temp+'<br /><span>LDN</span></span>';
  
		      $("#temp").html(html);
		    },
		    error: function(error) {
		      $("#temp").html('<p>'+error+'</p>');
		    }
		});
	}
	
	setInterval(function() {
		weather();
	}, 1800000);
	weather();
	
	
	// ANALYTICS

	$.ajax({
		url: "api/analytics.php",
		dataType: "json"
	}).done(function(data) {
		//console.log(data);
		
		// stats
		
		$('#sessions').html(numberWithCommas(data.stats.sessions));
		$('#users').html(numberWithCommas(data.stats.users));
		
		var total_visitors = parseInt(data.stats.new_visitors) + parseInt(data.stats.returning_visitors),
			new_visitor_perc = Math.round(((parseInt(data.stats.new_visitors) / total_visitors) * 1000)) / 10,
			returning_visitor_perc = Math.round(((parseInt(data.stats.returning_visitors) / total_visitors) * 1000)) / 10;
			
			//console.log(total_visitors, new_visitor_perc, returning_visitors_perc);
		
		/*$('.bar-in','#new-visitor').animate({width:new_visitor_perc+'%'}, 2000);
		$('span','#new-visitor').html(parseInt(data.stats.new_visitors)+' Sessions ('+new_visitor_perc+'%)');
		
		$('.bar-in','#returning-visitor').animate({width:returning_visitor_perc+'%'}, 2000);
		$('span','#returning-visitor').html(parseInt(data.stats.returning_visitors)+' Sessions ('+returning_visitor_perc+'%)');*/
		
		/* <path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="'+(629*new_visitor_perc/100)+'"></path> \ */
		
		/*var html = '<ul class="progress-circles"> \
		    <li data-name="Returning visitors" data-percent="'+new_visitor_perc+'%"> \
	        <svg viewBox="-10 -10 220 220"> \
	        <g fill="none" stroke-width="8" transform="translate(100,100)"> \
			<circle cx="0" cy="0" r="108" stroke="#359e8f" /> \
	        </g> \
	        </svg> \
		        <svg viewBox="-10 -10 220 220"> \
		        <g fill="none" stroke-width="6" transform="translate(100,100)"> \
				<circle cx="0" cy="0" r="100" stroke="#000" /> \
		        </g> \
		        </svg> \
		        <svg viewBox="-10 -10 220 220"> \
		        <path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="'+(629*new_visitor_perc/100)+'"></path> \
		        </svg> \
		    </li> \
			<li data-name="New visitors" data-percent="'+returning_visitor_perc+'%"> \
		        <svg viewBox="-10 -10 220 220"> \
		        <g fill="none" stroke-width="3" transform="translate(100,100)"> \
		        <circle cx="0" cy="0" r="100" stroke="#000" /> \
		        </g> \
		        </svg> \
		        <svg viewBox="-10 -10 220 220"> \
		        <path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="'+(629*returning_visitor_perc/100)+'"></path> \
		        </svg> \
		    </li> \
		</ul>';*/
		
		
		var html = '<svg viewBox="0 0 120 120"> \
	        <g fill="none" stroke-width="4" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="58" stroke="#006c7e" /> \
	        </g> \
	        <g fill="none" stroke-width="8" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="52" stroke="#00a09a" /> \
	        </g> \
	        <g fill="none" stroke-width="5" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="47" stroke="#ffffff" /> \
	        </g> \
	        </svg> \
	        <svg viewBox="-28 -28 256 256"> \
	        <path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="'+(629*new_visitor_perc/100)+'"></path> \
	        </svg> \
			<div class="circle-data"> \
				<p>New<br />visitors</p><span>'+numberWithCommas(parseInt(data.stats.new_visitors))+'</span> \
			</div> \
			<div class="circle-perc">'+new_visitor_perc+'<span>%</span></div>';
		$('#new-visitors').html(html);
			
			
		html = '<svg viewBox="0 0 120 120"> \
	        <g fill="none" stroke-width="4" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="58" stroke="#22606b" /> \
	        </g> \
	        <g fill="none" stroke-width="8" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="52" stroke="#359e8f" /> \
	        </g> \
	        <g fill="none" stroke-width="5" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="47" stroke="#ffffff" /> \
	        </g> \
	        </svg> \
	        <svg viewBox="-28 -28 256 256"> \
	        <path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="'+(629*returning_visitor_perc/100)+'"></path> \
	        </svg> \
			<div class="circle-data"> \
				<p>Returning<br />visitors</p><span>'+numberWithCommas(parseInt(data.stats.returning_visitors))+'</span> \
			</div> \
			<div class="circle-perc">'+returning_visitor_perc+'<span>%</span></div>';
		$('#returning-visitors').html(html);
		
		
		
		// bar chart

		var bar_data = [];
		var bar_labels = [];

		//var analytics_data = [['Date', 'Sessions']];
		$(data.sessions_by_day).each(function(i, item) {
			//analytics_data.push([item[0], parseInt(item[1])]);
			bar_data.push(parseInt(item[1]));
			bar_labels.push(item[0]);
		});
		
		//console.log(bar_data,bar_labels);

        /*var gdata = google.visualization.arrayToDataTable(analytics_data);

        var options = {
            title: '',
            bars: 'vertical',
            vAxis: {
                gridlines: {
                    count:0
                },
                baselineColor: 'transparent'
            },
            hAxis: {
                title: null,
                allowContainerBoundaryTextCufoff: true,
                maxAlternation:1,
                slantedText: false,
                showTextEvery: 5,
                textPosition: 'in',
				textStyle : {
					fontSize: 24
				}
            },
            bar: {groupWidth:'70%'},
            legend: { position: "none" },
            colors: ['#314e63'],
            chartArea: {left:'1%', width:'98%', height:'100%', top:'0%'},
            dataOpacity: 0.8
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));

        chart.draw(gdata, options);
		*/
		
		
		var ctx = $("#myChart").get(0).getContext("2d");
		//var myNewChart = new Chart(ctx);
	
		// BAR CHART //
		
		/*var data_points = {
		    labels: bar_labels,
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(49,78,99,0.8)",
		            strokeColor: "rgba(49,78,99,1)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: bar_data
		        }
		    ]
		};
	

		var options = {
			scaleLineColor: "rgba(0,0,0,0)",
			scaleShowLabels: false,
			scaleShowGridLines: false,
			barStrokeWidth : 1,
			scaleFontFamily: "'Gotham A','Gotham B'",
			scaleFontSize: 26,
			scaleFontColor: "#ffffff"
		};
	
		var myBarChart = new Chart(ctx).Bar(data_points, options);*/
		
		function check_social() {
			if (twitter_loaded === false || instagram_loaded === false) {
				setTimeout(function() {check_social()}, 500);
			} else {
				var data_points = {
				    labels: bar_labels,
				    datasets: [
				        {
				            label: "My First dataset",
				            fillColor: "rgba(0,108,126,1)",
				            strokeColor: "rgba(0,108,126,1)",
							pointColor: "rgba(0,108,126,1)",
							pointStrokeColor: "rgba(0,108,126,1)",
				            pointHighlightFill: "#fff",
				            pointHighlightStroke: "rgba(220,220,220,1)",
				            data: bar_data
				        }
				    ]
				};
			
		
		
				var	options = {
					scaleShowLabels: true,
					scaleLineColor: "rgba(255,255,255,0.3)",
					scaleLineWidth: 1,
					scaleFontColor: "#f9ec00",
					scaleFontFamily: "'Gotham A', 'Gotham B'",
					scaleFontSize: 16,
					scaleFontStyle: "normal",
					tooltipFontFamily: "'Gotham A', 'Gotham B'",
					tooltipFontSize: 16,
					tooltipXPadding: 20,
					tooltipCaretSize: 10,
					tooltipFontStyle: "normal",
					datasetFill: false,
					bezierCurve: false,
					datasetStrokeWidth : 3,
					pointDotRadius : 5,
					pointHitDetectionRadius : 12,
					animation: false,
					twitter: twitter_dates,
					instagram: instagram_dates
				};	
			
				var myLineChart = new Chart(ctx).Line(data_points, options);
			}
		}
			
		check_social();
		
		
		
		// map
		
		//console.log(data.map);
		
		var analytics_data = [['Country', 'Sessions']];
		
		var html = '<ul>';
		
		$(data.map).each(function(i, item) {
			//analytics_data.push([item[0], parseInt(item[1])]);

			if (i>=4) return;
			
			//$('#arc'+i).attr('d', describeArc(60, 60, 44-(i*6), 0, parseInt(item[1])/data.stats.sessions*360));
			
			$('#arc'+i).attr('d', describeArc(60, 60, 44-(i*6), 0, parseInt(item[1])/parseInt(data.map[0][1])*270));
			
			
			html += '<li><span class="country-colour"></span><span class="country-name">'+item[0]+'</span><span class="country-value">'+item[1]+'</span></li>';
		});
		
		html += '</ul>';
		
		$('#visits-country-graph').after(html);
		
		//console.log(analytics_data);
		
		/*var gdata = google.visualization.arrayToDataTable(analytics_data);

        var options = {
        	colorAxis: {
        		colors: ['#a4daf0', '#36aad1']
        	}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('map'));

        chart.draw(gdata, options);*/
		
		
		/*var html = '<svg viewBox="0 0 120 120"> \
	        <g fill="none" stroke-width="4" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="58" stroke="#22606b" stroke-dasharray="629" /> \
	        </g> \
	        <g fill="none" stroke-width="6" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="54" stroke="#359e8f" /> \
	        </g> \
	        <g fill="none" stroke-width="5" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="49" stroke="#fff" /> \
	        </g> \
	        <g fill="none" stroke-width="5" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="45" stroke="#cbcec9" /> \
	        </g> \
	        <g fill="none" stroke-width="5" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="41" stroke="#a0a4a1" /> \
	        </g> \
	        <g fill="none" stroke-width="5" transform="translate(60,60)"> \
			<circle cx="0" cy="0" r="37" stroke="#747976" /> \
	        </g> \
	        </svg>';
		
		$('#map-circle').html(html);*/
		
		
		
		
	});
	
	
	$('#particles h1 img').click(function(e) {
		$('#particles').fadeOut(500, function() {
			$('#particles').remove();
		});
	});
	
	//$('#myChart').width($(window).width());
	
});