function modal(id) {
	var zIndex = 9999;
	var modal = document.getElementById(id);

	// 모달 div 뒤에 희끄무레한 레이어
	var bg = document.createElement('div');
	bg.setStyle({
		position: 'fixed',
		zIndex: zIndex,
		left: '0px',
		top: '0px',
		width: '100%',
		height: '100%',
		overflow: 'auto',
		// 레이어 색갈은 여기서 바꾸면 됨
		backgroundColor: 'rgba(0,0,0,0.4)'
	});
	document.body.append(bg);

	// 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
	modal.querySelector('.modal_close_btn').addEventListener('click', function() {
		bg.remove();
		modal.style.display = 'none';
	});

	modal.setStyle({
		position: 'fixed',
		display: 'block',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

		// 시꺼먼 레이어 보다 한칸 위에 보이기
		zIndex: zIndex + 1,

		// div center 정렬
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		msTransform: 'translate(-50%, -50%)',
		webkitTransform: 'translate(-50%, -50%)'
	});
}

// Element 에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function(styles) {
	for (var k in styles) this.style[k] = styles[k];
	return this;
};

document.getElementById('user').onclick = function() { modal('my_modal');}


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
				// console.log(rst_list)
				document.getElementById("u"+String(j+1)+"_1").innerHTML = rst_list[0]
				document.getElementById("u"+String(j+1)+"_2").innerHTML = rst_list[1]
				document.getElementById("u"+String(j+1)+"_3").innerHTML = rst_list[2]
				document.getElementById("u"+String(j+1)+"_4").innerHTML = rst_list[4]
				document.getElementById("u"+String(j+1)+"_5").innerHTML = rst_list[5]
				document.getElementById("u"+String(j+1)+"_6").innerHTML = rst_list[6]

				if (j == 0){
					document.getElementById("m_1").innerHTML = rst_list[0]
					document.getElementById("m_2").innerHTML = rst_list[1]
					document.getElementById("m_3").innerHTML = rst_list[2]
					document.getElementById("m_4").innerHTML = rst_list[4]
					document.getElementById("m_5").innerHTML = rst_list[5]
					document.getElementById("m_6").innerHTML = rst_list[6]

					document.getElementById("rating").innerHTML = rst_list[6]
					document.getElementById("safety_danger").innerHTML = rst_list[7]

					document.getElementById("sudden_stop").innerHTML = rst_list[9]
					document.getElementById("buff_speed").innerHTML = rst_list[10]
					document.getElementById("schoolzone_speed").innerHTML = rst_list[11]
				}

				j++
			})
			.catch(error => console.log('error', error));
		}
	})
	.catch(error => console.log('error', error));
