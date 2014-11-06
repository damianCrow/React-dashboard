<?php
require_once '../lib/google-api/autoload.php'; // or wherever autoload.php is located

$client_id = '144402303580-ch3m9fadujte5ih89nosab79jtl78fvc.apps.googleusercontent.com';
$service_account_name = '144402303580-ch3m9fadujte5ih89nosab79jtl78fvc@developer.gserviceaccount.com';
$key_file_location = '../lib/google-api/key/API Project-fdff8afa6abb.p12';

$calName_meetings = 'interstateteam.com_qondup0hrj9n1n52e5r1plr1kk@group.calendar.google.com';
$calName_ooo = 'interstateteam.com_d8s8ru8nrc3ifri2vb0o6jesvc@group.calendar.google.com';

$client = new Google_Client();
$client->setApplicationName("Interstate calendars");

$service = new Google_Service_Calendar($client);

$key = file_get_contents($key_file_location);
$cred = new Google_Auth_AssertionCredentials(
 $service_account_name,
 array('https://www.googleapis.com/auth/calendar.readonly'),
 $key
);

$client->setAssertionCredentials($cred);

$optParams = array('orderBy' => 'startTime', 'singleEvents' => true, 'maxResults' => 10, 'timeMin' => date(DATE_W3C));

$events_meetings = $service->events->listEvents($calName_meetings, $optParams);
$events_ooo = $service->events->listEvents($calName_ooo, $optParams);

$data = array();

foreach ($events_meetings->getItems() as $event) {
	$start_time = '';
	$end_time = '';
	if (isset($event->start->dateTime)) {
		//$date = date('D j H:i',strtotime($event->getStart()->dateTime)).'-'.date('H:i',strtotime($event->getEnd()->dateTime));
		$date = date('D jS M',strtotime($event->getStart()->dateTime));
		$start_time = date('H:i',strtotime($event->getStart()->dateTime));
		$end_time = date('H:i',strtotime($event->getEnd()->dateTime));
	} else if (isset($event->start->date)) {
		$start_time = 'All day';
		if (strtotime($event->start->date) < time()) {
			$date = date('D jS M');
		} else {
			$date = date('D jS M',strtotime($event->start->date));
		}
	}
	
	$date = str_replace(date('D jS M'), 'Today', $date);
	
	$data['meetings'][] = array(
		'summary' => $event->summary,
		'date' => $date,
		'start_time' => $start_time,
		'end_time' => $end_time,
		'location' => $event->location
	);
}

foreach ($events_ooo->getItems() as $event) {
	$start_time = '';
	$end_time = '';
	if (isset($event->start->dateTime)) {
		//$date = date('D j H:i',strtotime($event->getStart()->dateTime)).'-'.date('H:i',strtotime($event->getEnd()->dateTime));
		$date = date('D jS M',strtotime($event->getStart()->dateTime));
		$start_time = date('H:i',strtotime($event->getStart()->dateTime));
		$end_time = date('H:i',strtotime($event->getEnd()->dateTime));
	} else if (isset($event->start->date)) {
		//$date = date('D j',strtotime($event->start->date));
		$start_time = 'All day';
		if (strtotime($event->start->date) < time()) {
			$date = date('D jS M');
		} else {
			$date = date('D jS M',strtotime($event->start->date));
		}
	}
	
	$date = str_replace(date('D jS M'), 'Today', $date);
	
	$data['outofoffice'][] = array(
		'summary' => $event->summary,
		'date' => $date,
		'start_time' => $start_time,
		'end_time' => $end_time,
		'location' => $event->location
	);
}

echo json_encode($data);

?>