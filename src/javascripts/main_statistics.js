let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
	if(xhttp.readyState == 4 && xhttp.status == 200){
		jsonfunc(this.responseText); //this = xhttp
//		jsonfunc(xhttp.responseText); // 둘다 가능
	}
}
xhttp.open("GET","../../public/user.json", true);
xhttp.send();

function jsonfunc( jsonText ) {

	let json = JSON.parse(jsonText); // String -> json으로 변환
	
	let txt = "";

    for(key in json[0]){
        txt += key +" "
    }
    txt += "<br>"

	for(i=0; i<json.length; i++){
		for(key in json[i]){ // key값 가져오기
			txt += json[i][key] + ""; 
		}
		txt += "<br>";
	} 
	document.getElementById('user_info').innerHTML = txt;
}

