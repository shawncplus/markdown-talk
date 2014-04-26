document.addEventListener('markdownrender', function ()
{
	// append the subtitle element to the navbar
	var subel = document.querySelector('subtitle');
	if (subel)
	{
		var subtitle = document.createElement('div');
		subtitle.innerHTML = subel.innerHTML;
		subtitle.classList.add('subtitle');
		document.querySelector('div.container').appendChild(subtitle);
	}

	var focus_selector = (window.MarkdownTalk && window.MarkdownTalk.focusSelector) || 'ol > li';
	var focusPoints = document.querySelectorAll(focus_selector);
	if (!focusPoints.length)
	{
		// no need for the legend if they have nothing to navigate
		document.querySelector('legend').style.display = 'none';
		return;
	}

	var focusIndex = 0;
	focusPoints[focusIndex].classList.add('focus_point');

	var hideLegend = false;
	var spans = document.querySelectorAll('legend > span');
	var initialLegendWidth = document.querySelector('legend').offsetWidth;

	function toggleLegend(el)
	{
		el = el ? el.target : document.querySelector('legend > a');
		hideLegend = !hideLegend;
		Array.prototype.map.call(spans, function (span)
		{
			span.style.display = hideLegend ? 'none' : '';
		});
		el.innerHTML = hideLegend ? '⊞' : '⊟';
		el.parentNode.style.width = hideLegend ? el.offsetWidth + 'px' : initialLegendWidth + 'px';
	};

	document.querySelector('legend > a').onclick = toggleLegend;

	var topcontainer = document.querySelector('div.navbar-fixed-top');
	window.onscroll = function ()
	{
		document.querySelector('legend').style.top = Math.max(topcontainer.scrollHeight - scrollY, 0) + 'px';
	};

	document.onkeydown = function (e)
	{
		var keys = [71, 74, 75, 76];
		if (keys.indexOf(e.keyCode) < 0)
		{
			return;
		}

		if (e.keyCode === 76) // l
		{
			return toggleLegend(); 
		}

		if (e.keyCode === 71) // g
		{
			window.scrollTo(0, 0);
			focusPoints[focusIndex].classList.remove('focus_point');
			focusIndex = 0;
			focusPoints[focusIndex].classList.add('focus_point');
			return;
		}

		var direction = e.keyCode === 74 ? 1 : -1;

		if (focusPoints[focusIndex + direction])
		{
			focusPoints[focusIndex].classList.remove('focus_point');
			focusIndex += direction;
			var focusPoint = focusPoints[focusIndex];
			focusPoint.classList.add('focus_point');

			var top = focusPoint.offsetTop - ( window.innerHeight / 2 ) + (focusPoint.offsetHeight / 2);
			window.scrollTo(0, Math.min(top, focusPoint.offsetTop));
		}
	};
});
