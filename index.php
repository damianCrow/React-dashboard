<?php include('includes/races.php'); ?>

<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BMD - v2.0</title>
    <link rel="stylesheet" href="css/foundation.css" />
	<link rel="stylesheet" href="css/style.css" />
    <script src="js/vendor/modernizr.js"></script>
	<link rel="stylesheet" type="text/css" href="//cloud.typography.com/6172892/801604/css/fonts.css" />
	
  </head>
  <body>
	<div id="particles">
	  <div class="intro">
	    <h1><img src="img/new-icon.png"></h1>
	  </div>
	</div>
	
	<div class="large-12 row top-row">
		<div class="large-4 top-left">
			<div class="large-12 time-row">
				<div class="time" id="time"><?php echo date('H:i'); ?></div>
				
	  			<div class="date">
					<?php echo date('D'); ?><br />
					<span><?php echo date('M'); ?></span><br />
					<span><?php echo date('d'); ?></span>
				</div>
			</div>
			<div class="large-6">
				<div id="email" class="email">
					<div class="inner">
						<div class="page top email-logo"><p><img src="img/mail.png" /></p></div>
						<div class="page panel1"><p><span>2,299</span><b>emails sent</b><i>this month</i></p></div>
						<div class="page panel2"><p><span>16,641</span><b>emails received</b><i>this month</i></p></div>
						<div class="page panel3"><p><span>5,027</span><b>spam emails</b><i>this month</i></p></div>
					</div>
				</div>
			</div>
			
			<div class="large-6">
				<div class="temp" id="temp">
					<div class="loader"></div>
				</div>
			</div>
		</div>
		<div class="large-4 spotify" id="spotify">
  			<div class="loader"></div>
			<img class="spotify-logo" src="img/spotify-logo.png" />
		</div>
		<div class="large-4 instagram" id="instagram">
  			<div class="loader"></div>
		</div>
	</div>
    
	<div class="large-12 row races cycle-slideshow" data-cycle-slides="> div" data-cycle-fx="scrollHorz" data-cycle-timeout="6000" data-cycle-swipe="true">
		
			<?php
			foreach ($countdown as $title => $section) {
				echo '<div class="'.$title.'">
					<div class="race-content">';
				foreach ($section as $i => $event) {
					
					$start = strtotime($event['start']);
				
					if (time() > $start) {
						continue;
					}
				
					$end = strtotime($event['end']);
					$days = ceil(($start-time())/(60*60*24));
			
					echo '<span class="event-until">'.$days.' day'.($days>1?'s':'').' until</span> ';
					echo '<span class="event-name">'.$event['name'].'</span> ';
				
					break;
				}
				echo '</div>
				</div>';
			}
			?>
			
	</div>
	
	<div class="large-12 row calendar">
		<!-- <div class="events-grad"></div> -->
		<div class="large-6 columns">
			<h3>Meetings</h3>
			<div id="meetings" class="meetings">
				<div class="loader"></div>
			</div>
		</div>
		<div class="large-6 columns">
			<h3>Out of office</h3>
			<div id="outofoffice" class="outofoffice">
				<div class="loader"></div>
			</div>
		</div>
	</div>
    
	<?php
	$now = date('M j, Y');
	$month_ago = date('M j, Y', strtotime( '-1 month', time()));
	?>
	
	<!-- <div class="large-12 row report-title">
		Interstateteam.com reports for <span><?php echo $month_ago; ?> - <?php echo $now; ?></span>
	</div> -->
	
	
	
	<div class="large-12 row bar-chart">
		<canvas id="myChart" width="1080" height="385"></canvas>
		<!-- <div class="bar-chart-num-box"></div> -->
		
		<div class="chart-top">
			<div class="chart-site">interstateteam.com</div>
			<p>Reports: <span><?php echo date('d M', strtotime( '-1 month', time())); ?> - <?php echo date('d M'); ?></span></p>
		</div>
	</div>
	
	<div class="large-12 row progress-circles stats">
		<div class="large-4 columns sessions-users">
			<div class="large-6 columns">
				<p>Sessions</p>
				<span id="sessions"></span>
			</div>
			<div class="large-6 columns">
				<p>Users</p>
				<span id="users"></span>
			</div>
		</div>
		<div class="large-4 columns new-visitors">
			<div id="new-visitors"></div>
		</div>
		<div class="large-4 columns returning-visitors">
			<div id="returning-visitors"></div>
		</div>
		
	</div>
	
	<div class="large-12 row">
		<!-- <img src="img/harvestofsorrow.png" /> -->
		<div class="large-6 columns country-visits">
			<h2>Most visits by country</h2>
			<div class="visits-country-graph" id="visits-country-graph">
				<svg viewBox="0 0 120 120">
			        <g fill="none" stroke-width="4" transform="translate(60,60)">
					<circle cx="0" cy="0" r="58" stroke="#006c7e" />
			        </g>
			        <g fill="none" stroke-width="9" transform="translate(60,60)">
					<circle cx="0" cy="0" r="51" stroke="#00a09a" />
			        </g>

					<path id="arc0"></path>
					<path id="arc1"></path>
					<path id="arc2"></path>
					<path id="arc3"></path>
				</svg>
			</div>
		</div>
		<div class="large-6 columns harvest" id="harvest">
			<div class="harvest-top">
				<img src="img/harvest-logo.png">
				<p>Week: <span><?php echo date("d M",strtotime('monday this week')); ?> - <?php echo date("d M",strtotime('friday this week')); ?></span></p>
			</div>
		</div>
	</div>
	
	<div class="large-12 row twitter">
		<div class="large-8 columns tweet-wrapper">
			<div class="twitter-interstate">
				<img src="img/twitter-interstate-logo.png">
				<span>@interstateteam</span>
			</div>
			<div id="tweets" class="tweets"></div>
		</div>
		<div class="large-4 columns twitter-stats stats">
			<div class="large-6 columns">
				<p>Followers</p>
				<span id="twitter-followers"></span>
			</div>
			<div class="large-6 columns">
				<p>Following</p>
				<span id="twitter-following"></span>
			</div>
		</div>
	</div>
	
	<div class="large-12 row">
		<div id="tfl">
			
		</div>
	</div>
	
	
    <script src="js/vendor/jquery.js"></script>
    <script src="js/foundation.min.js"></script>
    <script>
		$(document).foundation();
    </script>
    <!--<script src="js/landing/jquery.particleground.min.js"></script>
    <script src="js/landing/demo.js"></script>-->
	<script src="js/vendor/jquery.cycle2.js"></script>
	<script src="js/vendor/jquery.cycle2.swipe.min.js"></script>
	<script src="js/vendor/Chart.js"></script>
	<script src="js/vendor/jquery.simpleWeather.min.js"></script>
	<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart','geochart']}]}"></script>
	<script src="js/scripts.js"></script>
	
	<?php
	$date = date("H,i,s");
	$t = explode(",",$date);
	?>
	<script>
	$(function() {
		var h = parseInt(<?php echo $t[0]; ?>),
			m = parseInt(<?php echo $t[1]; ?>),
			s = parseInt(<?php echo $t[2]; ?>);
	
		var start = (new Date).getTime();
	
		startTime();
	
		function startTime() {
			var time = new Date(0, 0, 0, h, m, s);
		
			var now = (new Date).getTime();
			var diff = Math.floor((now - start)/1000);
		
			s+=diff;
			if (s>=60) {
				s=s-60;
				m++;
				if (m>=60) {
					m=0;
					h++;
					if (h>=24) {
						h=0;
					}
				}
			}
		
			if (diff>0)
				start = now;
		
			$('#time').html(checkTime(h)+':'+checkTime(m));
		
			var t = setTimeout(function(){startTime()},500);
		}
	
		function checkTime(i) {
		    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
		    return i;
		}
	
		/*setInterval(function() {
			$.ajax({
				url: "{site_url}/api/current-weather",
				dataType: "json"
			}).done(function(weather) {
				$('#weather-temp').html(weather.temp);
				$('#weather-humidity').html(weather.humidity);
			});
		}, 600000);*/
	
	});

	</script>
	
  </body>
</html>
