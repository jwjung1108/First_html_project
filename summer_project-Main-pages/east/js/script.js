// 먹거리와 즐길거리 항목을 저장할 객체
const places = {
  '먹거리': [
    {
	  order:1,	
      name: '쇼바쿄다이',
      latitude: 35.149484,
      longitude: 126.924386
    },
    {
	  order:2,	
      name: '연어쁘다',
      latitude: 35.149262,
      longitude: 126.927085
    },
    {
	  order:3,	
      name: '동명돈',
      latitude: 35.1476396,
      longitude: 126.925694
    },
    // 먹거리 항목들을 추가로 작성
  ],
  '즐길거리': [
    {
	  order:4,
      name: '국립아시아문화전당',
      latitude:  35.1478799,
      longitude:  126.9205703
    },
    {
	  order:5,	
      name: '하늘마당',
      latitude: 35.148803,
      longitude:  126.921433
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
for(let i=0;i<5;i++)
	{
		if(i==1)
			{
				arr[i] = new Array(2);
			}
		else{
			arr[i] = new Array(3);
		}
	}
for(let i = 0; i< 3; i++){
arr[0][i]= 'img/noodle/noodle'+(i+1)+'.jpg';
arr[2][i] = 'img/dong/dong'+(i+1)+'.jpg';
arr[3][i] = 'img/asia/asia'+(i+1)+'.jpg';
arr[4][i] = 'img/sky/sky'+(i+1)+'.jpg';
	}
for(let i =0;i<2;i++){
	arr[1][i] = 'img/salmon/salmon'+(i+1)+'.jpg';
}

let index=0;

let location_type = 0;

function init(location_count){
    index =0;
	location_type = parseInt(location_count);
    document.getElementById("img").src = arr[location_type][0];
}


function right_changeimg() {
    index = (index +1)%(arr[location_type].length);
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
		ad: "광주 동구 동계천로 163 2층",
		st: "버스 : 동구노인종합복지관 하차",
		ti: "11:30 ~ 21:00 / 20:45 라스트오더" ,
		pa: '<a href = "https://www.acc.go.kr/main/contents.do?PID=060103"target="_blank" >국립아시아문화전당 부설주차장 - 07:00~24:00 연중무휴' ,
		de: "여름에는 시즌 메뉴인 냉소바 판매.",
	}
	,
	{
		ad: "광주 동구 동계천로 163 2층",
		st: "버스 : 살레시오여고 또는 농장다리 하차",
		ti: "11:30 ~ 21:00 / 15:00~17:00 브레이크타임 / 20:00 라스트오더",
		pa: "중앙도서관옆주차장 공영",
		de: "네이버 예약 시 2,000원 할인 쿠폰 증정 이벤트 올해 진행 중.",
	}
	,
	{
		ad:"광주광역시 동구 동명동 139-14",
		st:"버스: 살레시오여고 하차",
		ti:"오전 10:00~오후 11:00/일요일 휴무",
		pa:"중앙도서관옆주차장 공영",
		de:"사장님이 개발한 소스가 맛있음",
	}
	,
	{		
		ad: "광주광역시 동구 문화전당로 38",
		st: "버스 : 문화전당역, 동구청 하차",
		ti: "10:00 ~ 18:00",
		pa: '<a href = "https://www.acc.go.kr/main/contents.do?PID=060103"target="_blank" >A, B 주차장 - 08:00~22:00, 1월 1일과 월요일은 휴관일</a>',
		de: '<a href = "https://www.acc.go.kr/main/exhibition.do?PID=0202"target="_blank" >전시 일정</a> ',
	}
	,
	{
		ad: "광주 동구 광산동 113",
		st: "버스 : 문화전당역, 동구청 하차",
		ti: "24시간",
		pa: '<a href = "https://www.acc.go.kr/main/contents.do?PID=060103"target="_blank" >A, B 주차장 - 08:00~22:00, 1월 1일과 월요일은 휴관일',
		de: "3월에서 5월 말에는 잔디 보호 기간으로 잔디밭 피크닉을 할 수 없음.",
	}
	,
			]



function back()
{
	location.replace("../entrance_page/index.html");
}