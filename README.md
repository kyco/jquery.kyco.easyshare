kyco.easyShare
==============
####Version: 1.3.1

The simplest way to handle your social media buttons. All you need is one script!

Forget loading those clunky SDKs for Facebook, Twitter and Google+. This plugin
loads your social media buttons in the background, unobtrusively and simultaneously.
And the best part, you get to fully customise the styling.

Take a look at the [demo](https://www.kycosoftware.com/code/easyshare/demo).

_Note: Twitter has discontinued their tweet count. There is no official means of getting the tweet count and hence it will most probably be removed from this plugin as well._

_Note: The v1.0.2 API has been discontinued. Users of v1.0.2 will have to migrate to the latest version._

How to install
--------------

Bower: `bower install jquery.kyco.easyshare --save-dev`

Include the minified JS file after including jQuery (preferably before the closing BODY tag).

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="jquery.kyco.easyshare.min.js"></script>

Optionally include Font Awesome and the provided CSS in the HEAD.

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="jquery.kyco.easyshare.css">

Now, copy the `easyshare.php` file to your server and remember the path. Open
`jquery.kyco.easyshare.min.js` and replace `kyco.API_PATH` with the path to where
you copied the file, e.g. `//my.website.com/path/to/easyshare.php`.

![Replace kyco.apiPath to make sure you connect to the API](https://www.kycosoftware.com/uploads/easyshare/easyshare.png?v=2)

Finally copy & paste the markup below to fire it up.

```
<div data-easyshare data-easyshare-url="https://www.kycosoftware.com/">
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

#####Tips:
1. Leave `data-easyshare-url` empty or completely remove it to get share counts for the current URL.
2. For twitter, use `data-easyshare-tweet-text` to pre-populate the tweet.
3. In `api/easyshare.php` change `header('Access-Control-Allow-Origin: *');` to `header('Access-Control-Allow-Origin: http://your.domain.here');` for better security.

#####HTTP vs HTTPS:
1. By default the plugin retrieves share counts for both HTTP and HTTPS.
2. Increase plugin speed by explicitly setting `data-easyshare-http` or `data-easyshare-https`
on the main div to force getting share counts for the specified protocol only.
3. If your site is running HTTP then it is a good idea to add `data-easyshare-http`.
4. If your site has always been running on HTTPS then add `data-easyshare-https`.
5. If your site has migrated from HTTP to HTTPS then ignore or add both.

Support
-------

For bugs or improvements please use the [issues tab](https://github.com/kyco/jquery.kyco.easyshare/issues)
or email [support@kycosoftware.com](mailto:support@kycosoftware.com).
