<?php
/*
**
**  jquery.kyco.easyshare
**  =====================
**
**  Version 1.2.2
**
**  Brought to you by
**  https://www.kycosoftware.com
**
**  Copyright 2015 Cornelius Weidmann
**
**  Distributed under the GPL
**
*/

header('Access-Control-Allow-Origin: *');

if (!empty($_SERVER['HTTP_REFERER'])) {
  define('SHARED_URL', $_GET['url']);
  define('FLAG_HTTP', $_GET['http'] == 'true' ? TRUE : FALSE);
  define('FLAG_HTTPS', $_GET['https'] == 'true' ? TRUE : FALSE);
  define('FACEBOOK_API_URL', 'https://graph.facebook.com/?ids=');
  define('TWITTER_API_URL', 'https://urls.api.twitter.com/1/urls/count.json?url=');
  define('GOOGLE_API_URL', 'https://plusone.google.com/_/+1/fastbutton?url=');

  if (filter_var(SHARED_URL, FILTER_VALIDATE_URL) === FALSE) {
    exit('There is nothing for you here... Seems like you supplied an invalid URL...');
  }

  function get_fb_shares_count($url) {
    $file_contents = @file_get_contents(FACEBOOK_API_URL . $url);
    $response      = json_decode($file_contents, true);

    if (isset($response[$url]['shares'])) {
      return intval($response[$url]['shares']);
    }

    return 0;
  }

  function get_tweet_count($url) {
    $file_contents = @file_get_contents(TWITTER_API_URL . urlencode($url));
    $response      = json_decode($file_contents, true);

    if (isset($response['count'])) {
      return intval($response['count']);
    }

    return 0;
  }

  function get_plusone_count($url) {
    $file_contents = @file_get_contents(GOOGLE_API_URL . urlencode($url));
    preg_match('/window\.__SSR = {c: ([\d]+)/', $file_contents, $response);

    if (isset($response[0])) {
      $total = intval(str_replace('window.__SSR = {c: ', '', $response[0]));
      return $total;
    }

    return 0;
  }

  $url_parts = parse_url(SHARED_URL);
  $http_url  = '';
  $https_url = '';

  if ($url_parts['scheme'] == 'https') {
    $http_url  = preg_replace("/^https:/i", "http:", SHARED_URL);
    $https_url = SHARED_URL;
  } else {
    $http_url  = SHARED_URL;
    $https_url = preg_replace("/^http:/i", "https:", SHARED_URL);
  }

  if ((FLAG_HTTP && FLAG_HTTPS) || (!FLAG_HTTP && !FLAG_HTTPS)) {
    $fb_shares = get_fb_shares_count($http_url) + get_fb_shares_count($https_url);
    $tweets    = get_tweet_count($http_url) + get_tweet_count($https_url);
    $plusones  = get_plusone_count($http_url) + get_plusone_count($https_url);
  } elseif (FLAG_HTTP) {
    $fb_shares = get_fb_shares_count($http_url);
    $tweets    = get_tweet_count($http_url);
    $plusones  = get_plusone_count($http_url);
  } else {
    $fb_shares = get_fb_shares_count($https_url);
    $tweets    = get_tweet_count($https_url);
    $plusones  = get_plusone_count($https_url);
  }

  $total = $fb_shares + $tweets + $plusones;

  $response = array(
    'URL'      => SHARED_URL,
    'Facebook' => $fb_shares,
    'Twitter'  => $tweets,
    'Google'   => $plusones,
    'Total'    => $total
  );

  echo json_encode($response);
} else {
  // Request is not from a valid source...
  echo 'There is nothing for you here...';
}
?>
