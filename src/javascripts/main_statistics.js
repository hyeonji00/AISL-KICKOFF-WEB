function time() {
	var date = new Date();
	document.getElementById('today').innerHTML = date;
	console.log(date);
}

setInterval(time, 1000);