<?php
$api_key = "62c0ccbc8151ba857c8f17a930d3801b";
$city_id = "2643743";
	
$url = "http://api.openweathermap.org/data/2.5/weather?id=".$city_id."&units=metric&APPID=".$api_key;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$data = json_decode(curl_exec($ch), true);
curl_close($ch);

if ($data != '' && isset($data['cod'])) {
	if ($data['cod'] == 200) {
		echo json_encode(array(
			'temp' => round($data['main']['temp']),
			'humidity' => round($data['main']['humidity'])
		));
	}
}
?>