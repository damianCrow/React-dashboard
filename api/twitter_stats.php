<?php
$url = "http://www.interstateteam.com/api/fetch_twitter_stats/";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$get = curl_exec($ch);
curl_close($ch);

echo $get;
?>