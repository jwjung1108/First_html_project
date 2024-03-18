/*!
* Start Bootstrap - The Big Picture v5.0.6 (https://startbootstrap.com/template/the-big-picture)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-the-big-picture/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// 구에 따른 색 변경
// 자바 스크립트로 구현 function

//광주광역시 중심
var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
    staticMapOption = { 
        center: new kakao.maps.LatLng(35.1557433,126.8354071), // 이미지 지도의 중심좌표
        level: 9// 이미지 지도의 확대 레벨
    };

// 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

function ani(name) {
   
	const mainmap = document.getElementById("mainmap");
	
	mainmap.innerHTML = '<img src="map.png" class="img3"></img>'
	
	

   setTimeout('goTo(' + '"' + name + '"' + ')', 1000);
}

function goTo(name) {
	
    if (name == 'north') location.replace("../north/north.html");
	else if(name == 'east') location.replace("../east/east.html");
	else if(name == 'west') location.replace("../west/west.html");
	else if(name == 'center') location.replace("../center/center.html");
	else if(name == 'south') location.replace("../south/south.html"); 
}

