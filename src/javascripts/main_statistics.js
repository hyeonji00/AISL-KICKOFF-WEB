var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("X-M2M-RI", "12345");
myHeaders.append("X-M2M-Origin", "SOrigin");

var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow'
};

ID_list = []

var all = 0
var sudden = 0
var buff = 0
var school = 0

fetch("http://203.253.128.161:7579/Mobius/kick_user/Account?fu=1&ty=4", requestOptions)
	.then(response => response.json())
	.then(result => {

		for (var i = 0; i < result["m2m:uril"].length; i++) {
			if (i == 6){
				break
			}
			ID_list[i] = result["m2m:uril"][i].split("/")[3]

			var j = 0
			
			fetch("http://203.253.128.161:7579/Mobius/kick_user/Account/" + ID_list[i], requestOptions)
			.then(response => response.json())
			.then(result => {
				var rst_list = result["m2m:cin"]["con"].split(" ")
				//console.log(rst_list)
				
				if (rst_list.length == 12){
					all += Number(rst_list[8])
					sudden += Number(rst_list[9])
					buff += Number(rst_list[10])
					school += Number(rst_list[11])
				}

				j++

				if (j == ID_list.length && all != 0) {
					document.getElementById("sudden").value = sudden / all * 100
					document.getElementById("sudden_ment").innerHTML = "급정거 " + Math.round(sudden / all * 100 * 10) / 10 + "%"
					document.getElementById("sudden_bar").style = "height:" + (sudden / all).toFixed(2) * 100 + "%"
					document.getElementById("sudden_bar_").innerHTML = Math.round(sudden / all * 100 * 10) / 10 + "%"

					document.getElementById("buff").value = buff / all * 100
					document.getElementById("buff_ment").innerHTML = "방지턱 과속 " + Math.round(buff / all * 100 * 10) / 10 + "%"
					document.getElementById("buff_bar").style = "height:" + (buff / all).toFixed(2) * 100 + "%"
					document.getElementById("buff_bar_").innerHTML = Math.round(buff / all * 100 * 10) / 10 + "%"

					document.getElementById("school").value = school / all * 100
					document.getElementById("school_ment").innerHTML = "보호구역 과속 " + Math.round(school / all * 100 * 10) / 10 + "%"
					document.getElementById("school_bar").style = "height:" + (school / all).toFixed(2) * 100 + "%"
					document.getElementById("school_bar_").innerHTML = Math.round(school / all * 100 * 10) / 10 + "%"

					document.getElementById("all_bar").style = "height:" + 100 + "%"
					document.getElementById("all_bar_").innerHTML = String(100) + "%"
				}
			})
			.catch(error => console.log('error', error));
		}
	})
	.catch(error => console.log('error', error));