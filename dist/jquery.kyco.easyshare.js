/***************************************\

	jquery.kyco.easyshare
	=====================

	Version 1.1.2

	Brought to you by
	http://www.kycosoftware.com

	Copyright 2015 Cornelius Weidmann

	Distributed under the GPL

\***************************************/

var kyco = kyco || {};

kyco.apiPath = '../api/easyshare.php';

kyco.easyShare = function() {
	if ($('[data-easyshare]').length > 0) {
		$('[data-easyshare]').each(function(index, element) {
			var _this     = $(this);
			var url       = _this.data('easyshare-url');
			var SHARE_URL = typeof url === 'undefined' || url === '' ? window.location.href : url;

			var countTotal    = _this.find('[data-easyshare-total-count]');
			var countFacebook = _this.find('[data-easyshare-button-count="facebook"]');
			var countTwitter  = _this.find('[data-easyshare-button-count="twitter"]');
			var countGoogle   = _this.find('[data-easyshare-button-count="google"]');
			var loader        = _this.find('[data-easyshare-loader]');

			// Get share counts for Facebook, Twitter and Google+
			$.ajax({
				url: kyco.apiPath,
				type: 'GET',
				data: {
					url: SHARE_URL
				},
				dataType: 'json',
				success: function(response) {
					countTotal.html(kyco.easyShareApproximate(response.Total));
					countFacebook.html(kyco.easyShareApproximate(response.Facebook));
					countTwitter.html(kyco.easyShareApproximate(response.Twitter));
					countGoogle.html(kyco.easyShareApproximate(response.Google));

					loader.fadeOut(500);
				},
				error: function() {
					countTotal.html(0);
					countFacebook.html(0);
					countTwitter.html(0);
					countGoogle.html(0);

					loader.fadeOut(500);
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
				var text   = $(this).data('easyshare-tweet-text') || '';
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

/*
**	kyco.easyShareAddCommas, kyco.easyShareFormatDecimals & kyco.easyShareApproximate
**	are adapted from https://github.com/nfriedly/approximate-number
**	Copyright (c) 2014 Nathan Friedly
**	Licensed under the MIT license
**	Modified by Cornelius Weidmann
*/
kyco.easyShareAddCommas = function(num) {
	var out    = [];
	var digits = Math.round(num).toString().split('');

	if (num < 1000) {
		return num.toString();
	}

	digits.reverse().forEach(function(digit, i){
		if (i && i%3 === 0) {
			out.push(',');
		}

		out.push(digit);
	});

	return out.reverse().join('');
};

kyco.easyShareFormatDecimals = function (num, base) {
	var workingNum = num/base;

	return workingNum < 10 ? (Math.round(workingNum * 10) / 10) : Math.round(workingNum);
};

kyco.easyShareApproximate = function(num) {
	var negative = num < 0;
	var numString;

	if (negative) {
		num = Math.abs(num);
	}

	if (num < 10000) {
		numString = kyco.easyShareAddCommas(num);
	} else if (num < 1000000) {
		numString =  kyco.easyShareFormatDecimals(num, 1000) + 'k';
	} else if (num < 1000000000) {
		numString =  kyco.easyShareFormatDecimals(num, 1000000) + 'm';
	} else {
		numString =  kyco.easyShareAddCommas(kyco.easyShareFormatDecimals(num,  1000000000)) + 'b';
	}

	if (negative) {
		numString = '-' + numString;
	}

	return numString;
};

$(document).ready(function() {
	kyco.easyShare();
});
