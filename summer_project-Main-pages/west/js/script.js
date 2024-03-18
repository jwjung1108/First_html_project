// 먹거리와 즐길거리 항목을 저장할 객체
const places = {
  '먹거리': [
    {
	  order:1,	
      name: '상무초밥',
      latitude: 35.1550331,
      longitude: 126.8544585
    },
    // 먹거리 항목들을 추가로 작성
  ],
  '즐길거리': [
    {
	  order:2,	
      name: '기아 챔피언스 필드',
      latitude: 35.168303,
      longitude: 126.8885938
    },
    {
	  order:3,	
      name: '오월루',
      latitude: 35.1552401,
      longitude: 126.8569647
    },
    // 즐길거리 항목들을 추가로 작성
  ]
};


// 카카오맵 초기화
const mapContainer = document.getElementById('map');
const mapOptions = {
  center: new kakao.maps.LatLng(35.1651523, 126.752968), // 지도 초기 중심 좌표 (위도, 경도)
  level: 9 // 지도 확대 레벨
};
const map = new kakao.maps.Map(mapContainer, mapOptions);

let markers = [];
let activeCategory = '먹거리';

let infowindows = [];


// 항목 클릭 시 해당하는 내용을 오른쪽 섹션에 표시하는 함수
function showPlace(category) {
  const placeList = places[category];
  if (placeList) {
    const bounds = new kakao.maps.LatLngBounds();

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    infowindows.forEach(iw => iw.close());
    infowindows = [];




    // 해당 항목들의 마커 추가 및 지도 중심 재조정
    placeList.forEach(place => {
      const markerPosition = new kakao.maps.LatLng(place.latitude, place.longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: true
      });
      marker.setMap(map);

		//여기서 buttonup으로 띄웁니다 a부분에 onclick으로 띄움
      var iwContent = `
    <div style="padding: 10px; width: 155px; text-align: center;">
      <div>${place.name}</div>
      <a onclick = 'buttonup(${place.order},"${place.name}");'  style="color: blue;" target="_blank">자세히보기</a>  
    </div>`
  ;
		
      var iwRemoveable = true;

  

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        position: markerPosition,
        content: iwContent,
        removable: iwRemoveable
      });

      // 마커를 클릭하면 인포윈도우를 표시합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });

      markers.push(marker);
      infowindows.push(infowindow);
      bounds.extend(markerPosition);
    });

    map.setBounds(bounds);
    activeCategory = category;

    // 음영 처리 추가
    const categoryElements = document.querySelectorAll('.category');
    categoryElements.forEach(element => {
      if (element.textContent === category) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
    updatePlaceLists(placeList,map.getCenter());
  }
}

// 페이지 로드 시 기본 항목으로 '먹거리' 표시
showPlace('먹거리');

// 여기서부터 모달창 구현 자스 공간

// 여기서 모달창 띄워유
function buttonup(location_number,location_name) {  
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
	let number = parseInt(location_number)-1;
	document.getElementById("topic").innerHTML = "";
	document.getElementById("topic").innerHTML = location_name;
	init(number);
    image_number(number);	
	dataSet(number);
}

function modaldown() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}


var arr = [];
for(let i=0;i<8;i++)
	{
		arr[i] = new Array(3);
	}
for(let i = 0; i< 3; i++){
arr[0][i]= 'img/rice/rice'+(i+1)+'.jpg';
arr[1][i] = 'img/baseball/baseball'+(i+1)+'.png';
arr[2][i] = 'img/five/five'+(i+1)+'.png';


	}

let index=0;

let location_type = 0;

function init(location_count){
    index =0;
	location_type = parseInt(location_count);
    document.getElementById("img").src = arr[location_type][0];
}


function right_changeimg() {
    index = (index +1)%3;
    document.getElementById("img").src = arr[location_type][index];
    image_number(location_type);
    
    
    

}
function left_changeimg(){
    if(index==0)
    {
        index = index + arr[location_type].length -1;
        document.getElementById("img").src = arr[location_type][index];
        image_number(location_type);
        
    }
    else{
        index--;
        document.getElementById("img").src = arr[location_type][index];
        image_number(location_type);
        
    }
    
    
}
 function image_number(location_count){
    document.getElementById("point_number").innerHTML = "";
    let text = "< " + (index+1) + " / " + arr[parseInt(location_count)].length + " > ";
    document.getElementById("point_number").innerHTML = text;
}







function dataSet(number)
{     
	const address = document.getElementById('address')
	const station = document.getElementById('station')
	const time = document.getElementById('time')
	const parking = document.getElementById('parking')
	const detail = document.getElementById('detail')

	address.innerHTML= '<img src="img/basic/location.png" class="relative" style="width:8%; height:auto; left:0;" >' +data[number].ad + '<br /> </img>'
	station.innerHTML= '<img src="img/basic/bus_stop.png" class="relative" style="width:8%; height:auto; left:0;" >' +data[number].st + '<br /></img>'
	time.innerHTML= '<img src="img/basic/information.png" class="relative" style="width:8%; height:auto; left:0;" >' +data[number].ti + '<br /></img>'
	parking.innerHTML= '<img src="img/basic/parking_pot.png" class="relative" style="width:8%; height:auto; left:0;" >' +data[number].pa + '<br /></img>'
	detail.innerHTML= '<img src="img/basic/special.png" class="relative" style="width:8%; height:auto; left:0;" >' +data[number].de + '<br /></img>'
	
}


const data =[
	
	{
		ad: " 광주 서구 운천로 253 ",
		st: " 버스 :  시청역 하차 , 운천역 3번 출구에서 796m 떨어져 있다. ",
		ti: " 11:00 ~ 22:00 ",
		pa: " 아이타워 주차장 ",
		de: " 매장: 11:00~21:20 포장배달: 10:00~21:50 ",
	}
			,
	{
		ad: "광주광역시 북구 서림로 10",
		st: "버스 : 무등 야구장",
		ti: "평균 18:00 ~ 00:00 - 월요일 휴무",
		pa: "임동공영주차장",
		de: "경기 일정을 참고하여 예매 부탁합니다.",
	}
	,
	{
		ad: " 광주 서구 상무민주로 61 ",
		st: " 버스 : 김대중컨벤션센터 하차 ",
		ti: " 이용시간 제한없음 ",
		pa: " 김대중컨벤션센터 주차장 ",
		de: " 저녁에 야경으로 보면 더욱 이쁜 광주 경치를 볼수있다. ",
	}
	,
	
			]



function back()
{
	location.replace("../entrance_page/index.html");
}