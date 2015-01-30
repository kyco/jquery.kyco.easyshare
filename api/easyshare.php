<?php
	header('Access-Control-Allow-Origin: *');

	if (!empty($_SERVER['HTTP_REFERER']))
	{
		if (filter_var($_GET['url'], FILTER_VALIDATE_URL) === FALSE)
		{
			exit('There is nothing for you here...');
		}

		function get_fb_shares_count($url = FALSE)
		{
			define('FACEBOOK_API_URL', 'http://graph.facebook.com/?ids=');

			if (!$url)
			{
				$url = ee()->TMPL->fetch_param('url');
			}

			$file_contents = @file_get_contents(FACEBOOK_API_URL . $url);
			$response      = json_decode($file_contents, true);

			if (isset($response[$url]['shares']))
			{
				return intval($response[$url]['shares']);
			}

			return 0;
		}

		function get_tweet_count($url = FALSE)
		{
			define('TWITTER_API_URL', 'http://urls.api.twitter.com/1/urls/count.json?url=');

			if (!$url)
			{
				$url = ee()->TMPL->fetch_param('url');
			}

			$file_contents = @file_get_contents(TWITTER_API_URL . urlencode($url));
			$response      = json_decode($file_contents, true);

			if (isset($response['count']))
			{
				return intval($response['count']);
			}

			return 0;
		}

		function get_plusone_count($url = FALSE)
		{
			define('GOOGLE_API_URL', 'https://plusone.google.com/_/+1/fastbutton?url=');

			if (!$url)
			{
				$url = ee()->TMPL->fetch_param('url');
			}

			$file_contents = @file_get_contents(GOOGLE_API_URL . urlencode($url));

			preg_match('/window\.__SSR = {c: ([\d]+)/', $file_contents, $response);

			if (isset($response[0]))
			{
				$total = intval(str_replace('window.__SSR = {c: ', '', $response[0]));

				return $total;
			}

			return 0;
		}

		function get_social_count($url = FALSE)
		{
			if (!$url)
			{
				$url = ee()->TMPL->fetch_param('url');
			}

			$fb_shares = get_fb_shares_count($url);
			$tweets    = get_tweet_count($url);
			$plusones  = get_plusone_count($url);
			$total     = $fb_shares + $tweets + $plusones;

			$response = array(
				'URL'      => $_GET['url'],
				'Facebook' => $fb_shares,
				'Twitter'  => $tweets,
				'Google'   => $plusones,
				'Total'    => $total
			);

			return json_encode($response);
		}

		echo get_social_count($_GET['url']);
	}
	else
	{
		// Request is not from a valid source...
		echo 'There is nothing for you here...';
	}
?>
