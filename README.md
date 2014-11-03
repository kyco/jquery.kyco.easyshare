kyco.easyShare
==============
####Version: 1.0.1

The simplest way to handle social media buttons.

Take a look at the [demo](http://www.kycosoftware.com/projects/demo/easyshare).

How to install
--------------

Bower: `bower install jquery.kyco.easyshare -D`

Manual: Download or clone and include the minified js file after including jquery (prefarably include it before your closing body tag):

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="jquery.kyco.easyshare.min.js"></script>

For default styling include the CSS file in the HEAD:

	<link rel="stylesheet" href="jquery.kyco.easyshare.css">

Sweet, that's it. Now all you need is some specific markup (PS: leave `data-easyshare-url` empty to make it use the current URL instead of a specific one, use `data-easyshare-tweet-text` to pre-populate the tweet):

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


Support
-------

For bugs or improvements please use the [issues tab](https://github.com/kyco/jquery.kyco.easyshare/issues)
or email [support@kycosoftware.com](mailto:support@kycosoftware.com).
