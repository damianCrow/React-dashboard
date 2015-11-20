<?php
require_once( dirname(__FILE__) . '/includes/HaPi/HarvestAPI.php' );
spl_autoload_register(array('HarvestAPI', 'autoload') );

$api = new HarvestAPI();
$api->setUser( "giulio.r@interstateteam.com" );
$api->setPassword( "d3stroyinter" );
$api->setAccount( "interstateteam" );

$api->setRetryMode( HarvestAPI::RETRY );

$range = Harvest_Range::thisWeek();

$result = $api->getUsers();
// If Harvest returns successful
if ($result->code == 200) {
	$people = $result->data;
	
	//$timesheets = array();
	
	echo '<pre>';
	
	foreach ($people as $person) {
		//var_dump($person);
		
		//echo $person->get('first-name').'<br />';
		
		$activity = $api->getUserEntries($person->id, $range);
		$hours = 0;
		
		foreach ($activity->data as $entry) {
			//var_dump($entry);
			$hours += $entry->hours;
		}
		
		$timesheets[] = array(
			"id" => $person->id,
			"name" => $person->get('first-name')." ".$person->get('last-name'),
			"hours" => $hours
		);
		
		//var_dump($activity);
	}
	
	
	//var_dump($timesheets);
	
	//var_dump($people);
	////test
}

?>