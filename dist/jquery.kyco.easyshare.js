/***************************************\

	jquery.kyco.easyshare
	=====================

	Version 1.0.1

	Brought to you by
	http://www.kycosoftware.com

	Copyright 2014 Cornelius Weidmann

	Distributed under the GPL

\***************************************/

var kyco = kyco || {};

kyco.easyShare = function() {
	if ($('[data-easyshare]').length > 0) {
		$('[data-easyshare]').each(function(index, element) {
			var _this     = $(this);
			var url       = _this.data('easyshare-url');
			var SHARE_URL = typeof url === 'undefined' || url === '' ? window.location.href : url;

			// Get share counts for Facebook, Twitter and Google+
			$.ajax({
				url: 'http://www.kycosoftware.com/api/easyshare',
				type: 'GET',
				data: {
					url: SHARE_URL
				},
				dataType: 'json',
				success: function(response) {
					_this.find('[data-easyshare-total-count]').html(response.ZeTotal);

					_this.find('[data-easyshare-button-count="facebook"]').html(response.Facebook);
					_this.find('[data-easyshare-button-count="twitter"]').html(response.Twitter);
					_this.find('[data-easyshare-button-count="google"]').html(response.Google);

					_this.find('[data-easyshare-loader]').fadeOut(500);
				}
			});

			// Facebook share button
			_this.find('[data-easyshare-button="facebook"]').click(function() {
				var width  = 500;
				var height = 400;
				var left   = ($(window).width() - width) / 2;
				var top    = ($(window).height() - height) / 2;

				var url    = 'https://www.facebook.com/sharer/sharer.php?u=' + SHARE_URL;
				var opts   = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

				window.open(url, 'facebook', opts);
			});

			// Twitter share button
			_this.find('[data-easyshare-button="twitter"]').click(function() {
				var text   = $(this).data('easyshare-tweet-text');
				var width  = 575;
				var height = 440;
				var left   = ($(window).width() - width) / 2;
				var top    = ($(window).height() - height) / 2;

				var url    = 'http://twitter.com/share?text=' + encodeURIComponent(text);
				var opts   = 'status=1,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

				window.open(url, 'twitter', opts);
			});

			// Google+ share button
			_this.find('[data-easyshare-button="google"]').click(function() {
				var width  = 500;
				var height = 400;
				var left   = ($(window).width() - width) / 2;
				var top    = ($(window).height() - height) / 2;

				var url    = 'https://plus.google.com/share?url=' + SHARE_URL;
				var opts   = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

				window.open(url, 'google+', opts);
			});
		});
	}
};

$(document).ready(function() {
	kyco.easyShare();
});
