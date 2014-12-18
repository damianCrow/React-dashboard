<?php
require_once '../lib/google-api/autoload.php'; // or wherever autoload.php is located

$client_id = '699460511655-kcn8ag150cs5hjphh671ti7m0r0vl7pq.apps.googleusercontent.com';
$service_account_name = '699460511655-kcn8ag150cs5hjphh671ti7m0r0vl7pq@developer.gserviceaccount.com';
$key_file_location = '../lib/google-api/key/Dashboard-d05b089cc214.p12';

$client = new Google_Client();
$client->setApplicationName("Interstate Analytics");

$service = new Google_Service_Analytics($client);

$key = file_get_contents($key_file_location);
$cred = new Google_Auth_AssertionCredentials(
	$service_account_name,
	array('https://www.googleapis.com/auth/analytics.readonly'),
	$key
);

$client->setAssertionCredentials($cred);



$now = date('Y-m-d');
$month_ago = date('Y-m-d', strtotime( '-1 month', time()));
$three_months_ago = date('Y-m-d', strtotime( '-3 months', time()));

// GOGO
//echo $month_ago.' - '.$now.'<br /><br />';

$stats = array();

$optParams = array('metrics' => 'ga:sessions');

$data = $service->data_ga->get(
	'ga:140214',
	$month_ago,
	$now,
	'ga:sessions',$optParams);
	
	/*echo '<pre>';
	var_dump($data);*/
	
// GOGO 
//echo 'Sessions: '.$data->rows[0][0].'<br />';
$stats['sessions'] = $data->rows[0][0];

$data = $service->data_ga->get(
	'ga:140214',
	$month_ago,
	$now,
	'ga:users');

// GOGO  
//echo 'Users: '.$data->rows[0][0].'<br />';
$stats['users'] = $data->rows[0][0];

$optParams = array('dimensions' => 'ga:userType');

$data = $service->data_ga->get(
	'ga:140214',
	$month_ago,
	$now,
	'ga:sessions',
	$optParams);
  
//echo 'Users: '.$data->rows[0][0].'<br />';

	  /*echo '<pre>';
 	  print_r($data);*/

// GOGO
//echo 'New: '.$data->rows[0][1].'<br />';
//echo 'Returning: '.$data->rows[1][1].'<br />';
$stats['new_visitors'] = $data->rows[0][1];
$stats['returning_visitors'] = $data->rows[1][1];

	  /*echo '<pre>';
 	  print_r($data);*/

/*$results = $service->data_ga;
echo '<pre>';
print_r($results);
echo '</pre>';*/
	  
	  
$optParams = array('dimensions' => 'ga:country', 'metrics' => 'ga:sessions', 'sort' => '-ga:sessions');

$map_data = $service->data_ga->get(
	'ga:140214',
	$month_ago,
	$now,
	'ga:sessions',
	$optParams);

	/*echo '<pre>';
	print_r($map_data);*/

	//echo 'threee motnhs:<br />';

	$optParams = array('dimensions' => 'ga:year,ga:month,ga:day', 'metrics' => 'ga:sessions');

	$data = $service->data_ga->get(
	'ga:140214',
	$month_ago,
	$now,
	'ga:sessions',$optParams);

	/*echo '<pre>';
	var_dump($data);*/

	//echo 'Sessions: '.$data->rows[0][0].'<br />';		  

	$return = array();
	foreach ($data->rows as $row) {
		$return[] = array(strtoupper(date('d M Y', mktime(0, 0, 0, $row[1], $row[2], $row[0]))), $row[3]);
	}

	echo json_encode(array("stats" => $stats, "sessions_by_day" => $return, "map" => $map_data->rows));
?>