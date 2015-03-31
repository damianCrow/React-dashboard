<?php
/* Recursive function to remove '@attributes' keys */
function flatten($array) {
	$return = array();
	
	foreach($array as $key=>$value) {
		
		if ($key==="@attributes") {
			$return = array_merge($return,$value);
		} else if (is_array($value)) {
			$return[$key] = flatten($value);
		} else {
			$return[$key] = $value;
		}
	}
	
	return $return;
}


$url = "http://cloud.tfl.gov.uk/TrackerNet/LineStatus";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$get = curl_exec($ch);
curl_close($ch);

$xml = simplexml_load_string($get);
if ($xml === false) {
	echo '{"error":"Failed loading XML"}';
    /*echo "Failed loading XML: ";
    foreach(libxml_get_errors() as $error) {
        echo "<br>", $error->message;
    }*/
} else {
	// Quick and easy way to convert XML to array
	$json = json_encode($xml);
	$array = json_decode($json,TRUE);

	echo json_encode(flatten($array));
}
?>