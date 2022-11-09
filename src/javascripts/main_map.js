// 임의의 킥보드 gps 생성
/*
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("X-M2M-RI", "12345");
myHeaders.append("X-M2M-Origin", "{{aei}}");
myHeaders.append("Content-Type", "application/vnd.onem2m-res+json; ty=4");

var raw = "{\n    \"m2m:cin\": {\n        \"con\" : \"aisl 37.5518018 127.0736345 23.2135\"\n    }\n}";

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};  

var string
var arr
var lat
var long

fetch("http://203.253.128.161:7579/Mobius/kick/gps", requestOptions)
    .then(result => {
        console.log(result)
        console.log(string = result["m2m:cin"].con)
        arr = string.split(" ")
        console.log("lat:", lat = Number(arr[1]))
        console.log("long:", long = Number(arr[2]))
    })
    .then(result => {
        // 킥보드 위치 받아서 띄우기
        navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError)
    })
.catch(error => console.log('error', error));
*/

// 임의의 킥보드 gps 불러오기
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("X-M2M-RI", "12345");
myHeaders.append("X-M2M-Origin", "SOrigin");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

var string
var arr
var lat
var long

fetch("http://203.253.128.161:7579/Mobius/kick/gps/la", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        console.log(string = result["m2m:cin"].con)
        arr = string.split(" ")
        console.log("lat:", lat = Number(arr[1]))
        console.log("long:", long = Number(arr[2]))
    })
    .then(result => {
        // 킥보드 위치 받아서 띄우기
        navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError)
    })
    .catch(error => console.log('error', error));



// 그룹 데이터 불러오기
/*
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("X-M2M-RI", "12345");
myHeaders.append("X-M2M-Origin", "SOrigin");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
*/
var pothole_lat
var pothole_long
var buff_lat
var buff_long
var school_lat
var school_long

var potholePositions
var bumpPositions
var circle


fetch("http://203.253.128.161:7579/Mobius/kick/web_map/fopt", requestOptions)
    .then(response => response.json())
    .then(result => {
    console.log(pothole_lat = result["m2m:agr"]["m2m:rsp"][0]["pc"]["m2m:cin"].con.split(" ")[0])
    console.log(pothole_long = result["m2m:agr"]["m2m:rsp"][0]["pc"]["m2m:cin"].con.split(" ")[1])

    console.log(buff_lat = result["m2m:agr"]["m2m:rsp"][1]["pc"]["m2m:cin"].con.split(" ")[1])
    console.log(buff_long = result["m2m:agr"]["m2m:rsp"][1]["pc"]["m2m:cin"].con.split(" ")[2])

    console.log(school_lat = result["m2m:agr"]["m2m:rsp"][2]["pc"]["m2m:cin"].con.split(" ")[1])
    console.log(school_long = result["m2m:agr"]["m2m:rsp"][2]["pc"]["m2m:cin"].con.split(" ")[2])
    })
    .then(result => {
    ////////////////////////////////////////////////////////////////////////////////////
    // 필터링 -> 포트홀, 방지턱 gps 좌표 설정

    // 포트홀 마커 표시 좌표 배열
    potholePositions = [
        new kakao.maps.LatLng(pothole_lat, pothole_long),
    ]

    // 방지턱 마커가 표시 좌표 배열
    bumpPositions = [
        new kakao.maps.LatLng(buff_lat, buff_long),
    ];


    var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
        potholeMarkers = [], // 포트홀 마커 객체를 가지고 있을 배열
        bumpMarkers = [],

        
    createPotholeMarkers(); // 포트홀 마커를 생성하고 포트홀 마커 배열에 추가
    createBumpMarkers();



    // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴
    function createMarkerImage(src, size, options) {
        var markerImage = new kakao.maps.MarkerImage(src, size, options);
        return markerImage;            
    }

    // 좌표와 마커이미지를 받아 마커를 생성하여 리턴
    function createMarker(position, image) {
        var marker = new kakao.maps.Marker({
            position: position,
            image: image
        });
        
        return marker;  
    }   

    // 포트홀 마커를 생성하고 포트홀 마커 배열에 추가
    function createPotholeMarkers() {
        
        for (var i = 0; i < potholePositions.length; i++) {  
            
            var imageSize = new kakao.maps.Size(26, 26); 
            
            var markerSrc = '../../assets/pothole_color.png'

            // 마커이미지와 마커 생성
            var markerImage = createMarkerImage(markerSrc, imageSize),    
                marker = createMarker(potholePositions[i], markerImage);  
            
            // 생성된 마커를 포트홀 마커 배열에 추가
            potholeMarkers.push(marker);
        }     
    }

    // 포트홀 마커들의 지도 표시 여부를 설정
    function setPotholeMarkers(map) {        
        for (var i = 0; i < potholeMarkers.length; i++) {  
            potholeMarkers[i].setMap(map);
        }        
    }

    function createBumpMarkers() {
        for (var i = 0; i < bumpPositions.length; i++) {
            
            var imageSize = new kakao.maps.Size(26, 26);       

            var markerSrc = '../../assets/bump_color.png'

            var markerImage = createMarkerImage(markerSrc, imageSize),    
                marker = createMarker(bumpPositions[i], markerImage);  

            bumpMarkers.push(marker);    
        }        
    }

    function setBumpMarkers(map) {        
        for (var i = 0; i < bumpMarkers.length; i++) {  
            bumpMarkers[i].setMap(map);
        }        
    }

    ///////////////////////////////////////////////////////////////////////////////////
    // 어린이 보호 구역 : gps 제대로 설정
    function createSchoolZone(){
        if (circle) {
            circle.setMap(null);
        }

        circle = new kakao.maps.Circle({
            center : new kakao.maps.LatLng(school_lat, school_long),  // 원의 중심좌표
            radius: 300, // 미터 단위의 원의 반지름
            strokeWeight: 1, // 선 두께
            strokeColor: '#75B8FA', // 선 색깔
            strokeOpacity: 1, // 선의 불투명도 (1에서 0 사이의 값이며 0에 가까울수록 투명)
            strokeStyle: 'dashed', // 선의 스타일
            fillColor: '#CFE7FF', // 채우기 색깔
            fillOpacity: 0.5  // 채우기 불투명도   
        }); 
        circle.setMap(map);
    }

    // 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일, 지도에 표시되는 마커 변경
    function changeMarker(type){
        
        var allMenu = document.getElementById('allMenu');
        var potholeMenu = document.getElementById('potholeMenu');
        var bumpMenu = document.getElementById('bumpMenu');
        var schoolMenu = document.getElementById('schoolMenu');


        if (type === 'all'){
            allMenu.className = 'menu_selected';
            potholeMenu.className = '';
            bumpMenu.className = '';
            schoolMenu.className = '';
            
            // 모두 표시
            setPotholeMarkers(map);
            setBumpMarkers(map);

            createSchoolZone();
        }
        else if (type === 'pothole') {
        
            allMenu.className = '';
            potholeMenu.className = 'menu_selected';
            bumpMenu.className = '';
            schoolMenu.className = '';
            
            setPotholeMarkers(map);
            setBumpMarkers(null);

            circle.setMap(null);
        } 
        else if (type === 'bump') {

            allMenu.className = '';
            potholeMenu.className = '';
            bumpMenu.className = 'menu_selected';
            schoolMenu.className = '';
            
            setPotholeMarkers(null);
            setBumpMarkers(map);

            circle.setMap(null);
            
        } 
        else if (type === 'school'){
            allMenu.className = '';
            potholeMenu.className = '';
            bumpMenu.className = '';
            schoolMenu.className = 'menu_selected';

            setPotholeMarkers(null);
            setBumpMarkers(null);

            createSchoolZone();
        }
    } 
    changeMarker('all')
    
    })
.catch(error => console.log('error', error));



// 실시간으로 킥보드 gps 불러오기
/*
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("X-M2M-RI", "12345");
myHeaders.append("X-M2M-Origin", "SOrigin");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


var string
var arr
var lat
var long

setInterval(function(){
    fetch("http://203.253.128.161:7579/Mobius/kick/gps/la", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        console.log(string = result["m2m:cin"].con)
        arr = string.split(" ")
        console.log("lat:", lat = Number(arr[1]))
        console.log("long:", long = Number(arr[2]))
    })
    .then(result => {
        // 킥보드 위치 받아서 띄우기
        navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError)
    })
    .catch(error => console.log('error', error));
}, 1000)
*/

////////////////////////////////////////////////////////////////////////////////////

// 맵 기본틀 띄우기

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.5511, 127.0738), //지도의 중심좌표
	level: 1 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


////////////////////////////////////////////////////////////////////////////////////

// 킥보드 위치 띄우기

function locationLoadSuccess(pos){
    // 현재 위치 받아오기
    //var currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

    // 킥보드 현재 위치 받아오기
    // 37.5518018 127.0736345
 
    //var currentPos = new kakao.maps.LatLng(lat, long);

    var currentPos = new kakao.maps.LatLng(37.5518018, 127.0736345);

    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);
    
    var imageSrc = '../../assets/logo_img.png', // 마커이미지의 주소  
        imageSize = new kakao.maps.Size(26, 26), // 마커이미지 크기
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션
        
    // 마커의 이미지정보를 가지고 있는 마커이미지 생성
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: currentPos, 
        image: markerImage // 마커이미지 설정 
    });

    
    // 기존에 마커가 있다면 제거
    marker.setMap(null);
    marker.setMap(map);
    
};

function locationLoadError(pos){
    alert('위치 정보를 가져오는데 실패했습니다.');
};





var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
        potholeMarkers = [], // 포트홀 마커 객체를 가지고 있을 배열
        bumpMarkers = [],

        
    createPotholeMarkers(); // 포트홀 마커를 생성하고 포트홀 마커 배열에 추가
    createBumpMarkers();



    // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴
    function createMarkerImage(src, size, options) {
        var markerImage = new kakao.maps.MarkerImage(src, size, options);
        return markerImage;            
    }

    // 좌표와 마커이미지를 받아 마커를 생성하여 리턴
    function createMarker(position, image) {
        var marker = new kakao.maps.Marker({
            position: position,
            image: image
        });
        
        return marker;  
    }   

    // 포트홀 마커를 생성하고 포트홀 마커 배열에 추가
    function createPotholeMarkers() {
        
        for (var i = 0; i < potholePositions.length; i++) {  
            
            var imageSize = new kakao.maps.Size(26, 26); 
            
            var markerSrc = '../../assets/pothole_color.png'

            // 마커이미지와 마커 생성
            var markerImage = createMarkerImage(markerSrc, imageSize),    
                marker = createMarker(potholePositions[i], markerImage);  
            
            // 생성된 마커를 포트홀 마커 배열에 추가
            potholeMarkers.push(marker);
        }     
    }

    // 포트홀 마커들의 지도 표시 여부를 설정
    function setPotholeMarkers(map) {        
        for (var i = 0; i < potholeMarkers.length; i++) {  
            potholeMarkers[i].setMap(map);
        }        
    }

    function createBumpMarkers() {
        for (var i = 0; i < bumpPositions.length; i++) {
            
            var imageSize = new kakao.maps.Size(26, 26);       

            var markerSrc = '../../assets/bump_color.png'

            var markerImage = createMarkerImage(markerSrc, imageSize),    
                marker = createMarker(bumpPositions[i], markerImage);  

            bumpMarkers.push(marker);    
        }        
    }

    function setBumpMarkers(map) {        
        for (var i = 0; i < bumpMarkers.length; i++) {  
            bumpMarkers[i].setMap(map);
        }        
    }

    ///////////////////////////////////////////////////////////////////////////////////
    // 어린이 보호 구역 : gps 제대로 설정
    function createSchoolZone(){
        if (circle) {
            circle.setMap(null);
        }

        circle = new kakao.maps.Circle({
            center : new kakao.maps.LatLng(school_lat, school_long),  // 원의 중심좌표
            radius: 300, // 미터 단위의 원의 반지름
            strokeWeight: 1, // 선 두께
            strokeColor: '#75B8FA', // 선 색깔
            strokeOpacity: 1, // 선의 불투명도 (1에서 0 사이의 값이며 0에 가까울수록 투명)
            strokeStyle: 'dashed', // 선의 스타일
            fillColor: '#CFE7FF', // 채우기 색깔
            fillOpacity: 0.5  // 채우기 불투명도   
        }); 
        circle.setMap(map);
    }



function changeMarker(type){
        
    var allMenu = document.getElementById('allMenu');
    var potholeMenu = document.getElementById('potholeMenu');
    var bumpMenu = document.getElementById('bumpMenu');
    var schoolMenu = document.getElementById('schoolMenu');


    if (type === 'all'){
        allMenu.className = 'menu_selected';
        potholeMenu.className = '';
        bumpMenu.className = '';
        schoolMenu.className = '';
        
        // 모두 표시
        setPotholeMarkers(map);
        setBumpMarkers(map);

        createSchoolZone();
    }
    else if (type === 'pothole') {
    
        allMenu.className = '';
        potholeMenu.className = 'menu_selected';
        bumpMenu.className = '';
        schoolMenu.className = '';
        
        setPotholeMarkers(map);
        setBumpMarkers(null);

        circle.setMap(null);
    } 
    else if (type === 'bump') {

        allMenu.className = '';
        potholeMenu.className = '';
        bumpMenu.className = 'menu_selected';
        schoolMenu.className = '';
        
        setPotholeMarkers(null);
        setBumpMarkers(map);

        circle.setMap(null);
        
    } 
    else if (type === 'school'){
        allMenu.className = '';
        potholeMenu.className = '';
        bumpMenu.className = '';
        schoolMenu.className = 'menu_selected';

        setPotholeMarkers(null);
        setBumpMarkers(null);

        createSchoolZone();
    }
}