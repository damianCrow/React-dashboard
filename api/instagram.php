<?php
$url = "http://www.interstateteam.com/api/fetch_instagram_latest/";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$get = curl_exec($ch);
curl_close($ch);

$data = json_decode($get);
foreach ($data as &$item) {
	$item->created_time_nice = strtoupper(date('d M Y',$item->created_time));
}

echo json_encode($data);

//echo $get;
?>