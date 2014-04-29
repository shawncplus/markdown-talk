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

	var focus_query = window.location.search.match(/[\?&]focus=([^&#]*)/);
	focus_query = focus_query ? decodeURIComponent(focus_query[1]) : null;
	var focus_selector =
		focus_query ||
		(window.MarkdownTalk && window.MarkdownTalk.focusSelector) ||
		'ol > li';

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

	function toggleLegend(el)
	{
		el = el ? el.target : document.querySelector('legend > a');
		hideLegend = !hideLegend;
		Array.prototype.map.call(spans, function (span)
		{
			span.style.display = hideLegend ? 'none' : '';
		});
		el.innerHTML = hideLegend ? '⊞' : '⊟';
		el.parentNode.style.width = hideLegend ? el.offsetWidth + 'px' : 'auto';
	};

	document.querySelector('legend > a').onclick = toggleLegend;

	var topcontainer = document.querySelector('div.navbar-fixed-top');
	window.onscroll = function ()
	{
		document.querySelector('legend').style.top = Math.max(topcontainer.scrollHeight - scrollY, 0) + 'px';
	};

	if (window.MarkdownTalk && window.MarkdownTalk.buildOutline === true)
	{
		// Rebuild the document to be fluid
		var oldcontainer = document.querySelector('body > div.container');
		var newcontainer = document.createElement('div');
		newcontainer.classList.add('container-fluid');

		var row = document.createElement('div');
		row.classList.add('row-fluid');
		newcontainer.appendChild(row);
		oldcontainer.parentNode.removeChild(oldcontainer);

		oldcontainer.classList.remove('container');
		oldcontainer.classList.add('span10');
		row.appendChild(oldcontainer);
		document.body.appendChild(newcontainer);

		// setup the nav
		var navcontainer = document.createElement('div');
		row.insertBefore(navcontainer, oldcontainer);
		navcontainer.classList.add('span2');
		navcontainer.classList.add('outline');

		var navlist = document.createElement('ul');
		navcontainer.appendChild(navlist);

		for (var i = 0; i < focusPoints.length; i++)
		{
			var focusPoint = focusPoints[i];
			var focus_id = focusPoint.id || ('focus_point_' + i);
			focusPoint.id = focus_id;

			var li = document.createElement('li');
			var link = document.createElement('a');
			li.appendChild(link);

			!i && li.classList.add('active');

			var linktext = focusPoint.firstChild.innerText;
			if (linktext.length > 100 && linktext.indexOf('('))
			{
				linktext = linktext.slice(0, linktext.indexOf('(')).replace(/^\s*|\s*$/, '');
			}
			link.innerText = linktext;
			link.setAttribute('href', '#' + focus_id);
			link.setAttribute('data-target', focus_id);
			navlist.appendChild(li);

			link.onclick = function (e)
			{
				focusPoints[focusIndex].classList.remove('focus_point');
				var target = document.querySelector(this.hash);
				var index = parseInt(target.id.replace(/\D/g, ''), 10);

				document.querySelector('a[data-target=' + focusPoints[focusIndex].id + ']').parentNode.classList.remove('active');
				this.parentNode.classList.add('active');
				focusIndex = index;
				target.classList.add('focus_point');

				var top = target.offsetTop - ( window.innerHeight / 2 ) + (target.offsetHeight / 2);
				window.scrollTo(0, Math.min(top, target.offsetTop));
				e.preventDefault();
			};
		}
	}

	// Set the scroll listeners
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
			document.querySelector('a[data-target=' + focusPoints[focusIndex].id + ']').parentNode.classList.remove('active');
			focusIndex = 0;
			focusPoints[focusIndex].classList.add('focus_point');
			document.querySelector('a[data-target=' + focusPoints[focusIndex].id + ']').parentNode.classList.add('active');
			return;
		}

		var direction = e.keyCode === 74 ? 1 : -1;

		if (focusPoints[focusIndex + direction])
		{
			focusPoints[focusIndex].classList.remove('focus_point');
			document.querySelector('a[data-target=' + focusPoints[focusIndex].id + ']').parentNode.classList.remove('active');
			focusIndex += direction;
			var focusPoint = focusPoints[focusIndex];
			document.querySelector('a[data-target=' + focusPoint.id + ']').parentNode.classList.add('active');
			focusPoint.classList.add('focus_point');

			var top = focusPoint.offsetTop - ( window.innerHeight / 2 ) + (focusPoint.offsetHeight / 2);
			window.scrollTo(0, Math.min(top, focusPoint.offsetTop));
		}
	};
});
