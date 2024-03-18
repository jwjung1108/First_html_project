// 커스텀 오버레이 생성 함수
function createCustomMarkerImage(color) {
    const imageSize = new kakao.maps.Size(30, 40); // 마커 이미지의 크기
    const imageOptions = {
      offset: new kakao.maps.Point(15, 35) // 마커 이미지의 중심점
    };
  
    const markerImageURL = `/north/redMarker.png`;
  
    const customMarkerImage = new kakao.maps.MarkerImage(
      markerImageURL,
      imageSize,
      imageOptions
    );
  
    return customMarkerImage;
  }
  