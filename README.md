kyco.easyShare
==============
####Version: 1.1.0

The simplest way to handle your social media buttons. All you need is one script!

Forget loading those clunky SDKs for Facebook, Twitter or Google+. Forget having ugly
share buttons on your page that appear whenever they choose to, because they load
at different times. This plugin loads your social media buttons in the background,
unobtrusively and simultaneously. And the best part, you get to fully customise the
styling.

Take a look at the [demo](http://www.kycosoftware.com/projects/demo/easyshare).

_Note: Users using v1.0.2 will have to migrate to the latest version. The v1.0.2 API has been discontinued._

How to install
--------------

Bower: `bower install jquery.kyco.easyshare -D`

Manual: Download or clone repo.

Include the minified js file after including jquery (preferably include it before your closing body tag):

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="jquery.kyco.easyshare.min.js"></script>

For default styling include Font Awesome and the CSS file in the HEAD:

	<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" href="jquery.kyco.easyshare.css">

Before you continue, copy the `easyshare.php` API file to your server and remember the path.
Open `jquery.kyco.easyshare.min.js` and replace `kyco.apiPath` with the path to the copied API file.

![Replace kyco.apiPath to make sure you connect to the API](http://www.kycosoftware.com/uploads/easyshare/easyshare.png)

Copy & paste the markup below to fire it up.

#####Hot tips:
1. `data-easyshare-url` - leave empty to make it use the current URL
2. `data-easyshare-tweet-text` - use this to pre-populate the tweet

```
<div data-easyshare data-easyshare-url="http://www.kycosoftware.com/">
	<!-- Total -->
	<button data-easyshare-button="total">
		<span>Total</span>
	</button>
	<span data-easyshare-total-count>0</span>

	<!-- Facebook -->
	<button data-easyshare-button="facebook">
		<span class="fa fa-facebook"></span>
		<span>Share</span>
	</button>
	<span data-easyshare-button-count="facebook">0</span>

	<!-- Twitter -->
	<button data-easyshare-button="twitter" data-easyshare-tweet-text="">
		<span class="fa fa-twitter"></span>
		<span>Tweet</span>
	</button>
	<span data-easyshare-button-count="twitter">0</span>

	<!-- Google+ -->
	<button data-easyshare-button="google">
		<span class="fa fa-google-plus"></span>
		<span>+1</span>
	</button>
	<span data-easyshare-button-count="google">0</span>

	<div data-easyshare-loader>Loading...</div>
</div>
```

Support
-------

For bugs or improvements please use the [issues tab](https://github.com/kyco/jquery.kyco.easyshare/issues)
or email [support@kycosoftware.com](mailto:support@kycosoftware.com).
