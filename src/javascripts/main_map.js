var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
	level: 1 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


////////////////////////////////////////////////////////////////////////////////////
function locationLoadSuccess(pos){
    // 현재 위치 받아오기
    var currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);

    // 마커 생성
    var marker = new kakao.maps.Marker({
        position: currentPos
    });

    // 기존에 마커가 있다면 제거
    marker.setMap(null);
    marker.setMap(map);
};

function locationLoadError(pos){
    alert('위치 정보를 가져오는데 실패했습니다.');
};

// 위치 가져오기
navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);



////////////////////////////////////////////////////////////////////////////////////
// 필터링 -> 포트홀, 방지턱 gps 좌표 설정

// 포트홀 마커 표시 좌표 배열
var potholePositions = [
    new kakao.maps.LatLng(37.55155, 127.0735099491861),
    new kakao.maps.LatLng(37.5509, 127.0738),
    new kakao.maps.LatLng(37.5509, 127.075)
]

// 방지턱 마커가 표시 좌표 배열
var bumpPositions = [
    new kakao.maps.LatLng(37.5509, 127.0736),
];


var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
    potholeMarkers = [], // 포트홀 마커 객체를 가지고 있을 배열
    bumpMarkers = [],

    
createPotholeMarkers(); // 포트홀 마커를 생성하고 포트홀 마커 배열에 추가
createBumpMarkers();

changeMarker('all'); // 기본값 : 모두 


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
		center : new kakao.maps.LatLng(37.5529, 127.0726),  // 원의 중심좌표
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

var circle;

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