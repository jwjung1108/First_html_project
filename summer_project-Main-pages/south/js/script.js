// 먹거리와 즐길거리 항목을 저장할 객체
const places = {
  '먹거리': [
    {
	  order:1 ,	
      name: '카엔',
      latitude: 35.125061,
      longitude: 126.910100
    },
    
    // 먹거리 항목들을 추가로 작성
  ],
  '즐길거리': [
    {
      order: 2,
      name: '우일선선교사사택',
      latitude: 35.138342,
      longitude:  126.911868
    },
    {
	  order:3,	
      name: '이이남 스튜디오',
      latitude: 35.139056, 
      longitude: 126.912768
    },
    {
      order:4,
      name: '펭귄마을',
      latitude: 35.140517, 
      longitude: 126.917558
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
for(let i=0;i<2;i++)
	{
		arr[i] = new Array(3);
	}
for(let i=2;i<4;i++)
	{
		arr[i] = new Array(8);		
	}

for(let i = 0; i< 3; i++){
arr[0][i]= 'img/fork/fork'+(i+1)+'.jpg';
arr[1][i] = 'img/woo/woo'+(i+1)+'.jpg';
	}
for(let i = 0; i<8; i++){
arr[2][i] = 'img/lee/lee'+(i+1)+'.jpg';
arr[3][i] = 'img/penguin/penguin'+(i+1)+'.jpg';
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
		ad: "광주광역시 남구 봉선2동 480-1",
		st: "버스 : 봉선라인아파트 하차",
		ti: "16:00 ~ 24:00",
		pa: "봉선동공영주차장 - 09:00~18:00 / 기본요금: 30분에 300원, 추가요금 15분당 150원",
		de: "금, 토, 일 18시부터 19시까지는 예약이 있을 확률이 높으므로 3-4일 전에 예약을 권장합니다.",
	}
			,
	{
		ad: "광주 남구 제중로47번길 20" ,
		st: "버스 : 기독병원 하차" ,
		ti: "평균 18:00 ~ 00:00 - 월요일 휴무",
		pa: "백운1동 노상 공영 주차장 - 24시간, 백운로26번길20 노상 공영 주차장 - 24시간",
		de: "여름에는 모기가 많이 물릴 수 있음, 선선할 때 가는 것을 추천",
	
	}
	,
	{
		ad: "광주광역시 남구 제중로47번길 10",
		st: "버스 : 기독병원 하차",
		ti: "평일-11:00 ~ 21:00, 주말-10:00~21:00 / 20:30 라스트오더",
		pa: "자체 주차장 보유",
		de: "갤러리 카페로 먹거리 즐길거리 둘 다 가능하여 데이트 코스로 적당.",
	}
	,
	{
		ad: "광주 남구 천변좌로446번길 7",
		st: "버스 : 양림교 하차",
		ti: "공방-10:00 ~ 21:00(월화 휴무)",
 		pa: "양림동역사문화마을관광자원화 주차장",
		de: "포토 스팟이 많고, 지역빵인 펭귄빵과 체험할 수 있는 공예거리가 있다.",
	}
	,
	
			]



function back()
{
	location.replace("../entrance_page/index.html");
}