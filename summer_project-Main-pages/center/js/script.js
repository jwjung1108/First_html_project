// 먹거리와 즐길거리 항목을 저장할 객체
const places = {
  '먹거리': [
    {
	  order:1,	
      name: '어등뼈해장국보쌈',
      latitude: 35.163238,
      longitude:  126.807305
    },
    {
	  order:2,
      name: '정동 수완지구점',
      latitude: 35.193825, 
      longitude: 126.830670
    },
    { 
	  order:3,	
      name: '남쪽마을 돌짜장',
      latitude: 35.214603,
      longitude: 126.790234
    },

    
    // 먹거리 항목들을 추가로 작성
  ],
  '즐길거리': [
    {
	  order:4,	
      name: '송산유원지',
      latitude: 35.159816,
      longitude:  126.736009
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
arr[0][i]= 'img/back/back'+(i+1)+'.jpg';
arr[1][i] = 'img/right/right'+(i+1)+'.jpg';
arr[2][i] = 'img/stone/stone'+(i+1)+'.jpg';
arr[3][i] = 'img/national/national'+(i+1)+'.jpg';


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
		ad: "전라남도 광주광역시 광산구 우산동 무진대로231번길",
		st: "버스 : 광산우산동행정복지센터 하차",
		ti: "24시간영업",
		pa: "빛고을국민체육센터 옆 공영주차장 - 24시간영업",
		de: "매일 24시간 영업합니다",
	}
	,
	{
		ad: "광주광역시 광산구 정동 수완로74번길 11-68 1층",
		st: "버스 : 은빛마을 하차",
		ti: "11:00 ~ 20:30, 브레이크타임 15:00 ~ 16:30",
		pa: "롯데쇼핑(주) 롯데마트수완점 주차장",
		de: "브레이크타임과 웨이팅이 길기 때문에 일찍오시는걸 권장드립니다.",
	}
	,
	{
		ad: "광주광역시 광산구 진곡동 339-13",
		st: "버스 : 진성 하차",
		ti: "11:00 ~ 18:00",
		pa: "주차장 x 주변 인근에 주차",
		de: "주차자리가 협소하여 주의 바랍니다.",
	}
	,
	{
		ad: "광주광역시 광산구 송산동 195",
		st: "버스 : 송산유원지 하차",
		ti: "24시간 개방",
		pa: "주차장x 주변 인근에 주차",
		de: "주차자리가 협소하여 주의 바랍니다.",
	}
	,
			]



function back()
{
	location.replace("../entrance_page/index.html");
}