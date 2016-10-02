// ==UserScript==
// @name           YouTube Livestream Chatbot
// @namespace      whproc
// @include        https://www.youtube.com/watch?v=*
// ==/UserScript==
'use strict';
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		var toSend = replyTo(mutation.addedNodes[0].getElementsByClassName('comment-text')[0].firstChild.nodeValue.trim());
		if (toSend) {
			document.getElementById('live-comments-input-field').textContent = toSend;
			var event = new MouseEvent('click');
			document.querySelector('.yt-uix-button-opacity[type=submit]').dispatchEvent(event);
		}
	});
});
var interval = setInterval(function() {
	var target = document.getElementById('all-comments');
	if (target) {
		observer.observe(target, {childList: true});
		clearInterval(interval);
	}
}, 100);

function replyTo(input) { //This is an example. Put your code here.
	if (input.match(/[^a-z' ]/)) return false; //Return false to say nothing, return a string to say the string.
	return 'Haha, "' + input + '"? You\'re opinion is completely invalid.';
}