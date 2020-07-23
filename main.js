document.addEventListener("DOMContentLoaded", () => {
    let url = new URL(window.location.href);
    if (url.searchParams.has('s') && url.searchParams.has('f')) {
        let cleanFlags = flagSubmit => {
            let flagArray = flagSubmit.split('+');
            let flags = flagArray[0];
            //strip out extraneous characters
            flags = flags.replace(/[^lwbDdceupBgixXsfFmMho+]/g, '');
            //strip out duplicate characters
            flags = flags.split('').filter((x, n, s) => s.indexOf(x) == n).join('');
            //disallow and strip out one-of settings
            if (flags.includes('w') && !flags.includes('l')) flags = 'l' + flags;
            if (flags.includes('D') && flags.includes('d')) flags = flags.replace(/[dD]/g, '');
            if (flags.includes('x') && flags.includes('X')) flags = flags.replace(/[xX]/g, '');
            if (flags.includes('f') && flags.includes('F')) flags = flags.replace(/[fF]/g, '');
            if (flags.includes('Z') && (flags.includes('M') || flags.includes('m'))) flags = flags.replace(/[ZMm]/g, '');
            flags = flagArray.length > 1 ? flags + '+' + flagArray[1] : flags; //expand later
            return flags;
        }
        let seed = url.searchParams.get('s');
        if (seed.length === 8 && ("00000000" + parseInt(seed, 16).toString(16).toUpperCase()).substr(-8) === seed) {
            document.getElementById('seed').value = seed;
            document.getElementById('seedtext').innerHTML = seed;
        }
        let flags = cleanFlags(url.searchParams.get('f').replace(' ', '+'));
        document.getElementById('flags').value = flags;
        document.getElementById('flagstext').innerHTML = flags;
    }
});

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
	if (document.getElementById('seed').value.length != 8 || document.getElementById('flags').value.length === 0) return;
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
