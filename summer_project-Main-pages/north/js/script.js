// 먹거리와 즐길거리 항목을 저장할 객체
const places = {
  '먹거리': [
    {
	  order: 1,	
      name: '25시 참숯구이',
      latitude: 35.2105915,
      longitude: 126.8767707
    },
    {
	  order: 2,
      name: '대성콩물 광주일곡점',
      latitude: 35.2020734,
      longitude: 126.8973351
    },
   {
	  order:3, 
      name: '행량채',
      latitude: 35.210503,
      longitude: 126.892125
    },
    {
	  order:4,	
      name: '뼈다귀촌',
      latitude: 35.204780,
      longitude: 126.896705
    },
	{
	  order:5,	
      name: '진식당',
      latitude: 35.163628,
      longitude: 126.903891
    },
    // 먹거리 항목들을 추가로 작성
  ],
  '즐길거리': [
    {
	  order:6,
      name: '광주 패밀리랜드',
      latitude: 35.2237581,
      longitude: 126.8915714
    },
    {
	  order:7,	
      name: '비엔날레',
      latitude: 35.1833176,
      longitude: 126.8892118
    },
    {
	  order:8,	
      name: '중외공원',
      latitude: 35.180427,
      longitude: 126.882568
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
arr[0][i]= 'img/roasting/roasting'+(i+1)+'.jpg';
arr[1][i] = 'img/noodle/noodle'+(i+1)+'.jpg';
arr[2][i] = 'img/house/house'+(i+1)+'.png';
arr[3][i] = 'img/bone/bone'+(i+1)+'.png';
arr[4][i] = 'img/real/real'+(i+1)+'.png';
arr[5][i] = 'img/land/land'+(i+1)+'.jpg';
arr[6][i] = 'img/m/m'+(i+1)+'.jpg';
arr[7][i] = 'img/park/park'+(i+1)+'.jpg';


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
		ad: " 광주 북구 양산동 1043 ",
		st: " 양산초교입구 , 양산택지사거리 하차 ",
		ti: " 16:30 ~ 24:00 ",
		pa: " 양산동주민센터 주차장 ",
		de: " 매주 일요일 정기휴무 ",
	}
			,
	{
		ad: " 광주 북구 제봉로 272 ",
		st: " 버스 : 향토음식박물관 하차 ",
		ti: " 11:00 ~ 19:40 ",
		pa: " 일곡공용주차장 - 주말 무료 ",
		de: " 포장 가능 , 설탕은 기호에 맞게 따로 넣을수 있습니다. ",
	}
	,
	{
		ad: " 광주광역시 북구 일곡마을로 165 ",
		st: " 버스 : 일동초교 , 일신초교 하차 ",
		ti: " 11:00 ~ 21:00 , 브레이크 타임 : 16:00 ~ 17:00, 라스트오더 20:30 ",
		pa: " 일곡중앙교회제 1~2주차장 ",
		de: " 추석 설 명절 당일 전날과 다음날 3일간 휴무 ",
	}
	,
	{
		ad: " 광주 북구 양일로305번길 26 ",
		st: " 버스 : 일곡사거리 하차",
		ti: " 11:00 ~ 21:30, 브레이크타임 15:00 ~ 16:30",
		pa: " 일곡공용주차장 - 주말무료 ",
		de: " 일요일에는 재료 공급을 위해 오후 4시부터 영업합니다! ",
	}
	,
	{
		ad: " 광주광역시 북구 중흥로 88",
		st: " 지하철: 금남로4가역-1호선 , 버스: 신안사거리 ",
		ti: " 11:00 ~ 22:00 , 라스트오더 21:30 ",
		pa: " 식당 전용주차장이 있음 ",
		de: " 매주 월요일 정기휴무 ",
	}
	,
	{
		ad: " 광주 북구 우치로 677 광주패밀리랜드 ",
		st: " 우치공원 하차 ",
		ti: " 10:00 ~ 18:00 ",
		pa: " 패밀리랜드 주차장 ",
		de: " 기상상황에 따라 휴장 및 조기 폐장 될 수 있습니다. ",
	}
	,
	{
		ad: " 광주 북구 비엔날레로 111 ",
		st: " 비엔날레 입구 하차 ",
		ti: " 09:00~18:00 ",
		pa: " 비엔날레전시관 주차장 ",
		de: " 매주 월요일 정기휴무,관람종료 30분전까지만 입장 가능 ",
	}
	,
	{
		ad: " 광주 북구 하서로 52 ",
		st: " 우치공원정류소 하차 ",
		ti: " 공원이라 따로 제한 없음 ",
		pa: " 광주시립미술관 주차장, 광주광역시문화예술회관 주차장 ",
		de: " 주변에 문화예술회관 공연장 등 전시공연시설과 어린이대공원, 테니스장, 케이트볼장등 운동체육 유희시설이 있다 ",
	}
	,
			]



function back()
{
	location.replace("../entrance_page/index.html");
}