document.addEventListener('click', function (event) {
	if (!event.target.matches('.toggle')) return;
	if (event.target.style.backgroundImage.replace(/"/g, "") == event.target.dataset.imgoff) {
		event.target.style.backgroundImage = event.target.dataset.imgon;
	} else {
		event.target.style.backgroundImage = event.target.dataset.imgoff;
	}
});

document.getElementById('seed').addEventListener('change', function () {
	document.getElementById('seedtext').innerHTML = document.getElementById('seed').value;
});

document.getElementById('flags').addEventListener('change', function () {
	document.getElementById('flagstext').innerHTML = document.getElementById('flags').value;
});

document.getElementById('reset').addEventListener('click', function () {
	document.getElementById('seed').value = '';
	document.getElementById('seedtext').innerHTML = '';
	document.getElementById('flags').value = '';
	document.getElementById('flagstext').innerHTML = '';
	setIconsOff();
});

document.getElementById('clipboard').addEventListener('click', function () {
	if (document.getElementById('seed').value.length != 8 || document.getElementById('flags').value.length != 4) return;
	let seed = document.getElementById('seed').value;
	let flags = document.getElementById('flags').value;
	let link = "http://sml2r.download/?s=" + seed + "&f=" + flags;
	copyToClipboard(link);
});

function setIconsOff() {
	let icons = document.querySelectorAll('.toggle');
	icons.forEach(icon => {
		icon.style.backgroundImage = icon.dataset.imgoff;
	});
}

const copyToClipboard = str => {
	let el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}