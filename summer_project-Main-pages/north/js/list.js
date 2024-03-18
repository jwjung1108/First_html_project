// 전역 변수로 activeInfoWindow 추가
let activeInfoWindow = null;
let position = null;

function updatePlaceLists(placeList,po) {
  position = po;
  const foodList = document.getElementById('foodList');
  const activityList = document.getElementById('activityList');

  // Clear previous entries
  foodList.innerHTML = '';
  activityList.innerHTML = '';

  // Populate the lists with the names of the markers
  placeList.forEach((place, index) => {
    const listItem = document.createElement('li');
    const listWindow = document.createElement('li');
    listItem.textContent = place.name;
    listItem.setAttribute('data-marker-id', index); // data-marker-id 속성에 id 부여
    listWindow.setAttribute('data-infowindow-id', index); //data-infowindow-id 속성에 id 부여

    if (activeCategory === '먹거리') {
      foodList.appendChild(listItem);
    } else if (activeCategory === '즐길거리') {
      activityList.appendChild(listItem);
    }


    // 마커 객체들의 기본 이미지를 저장하는 배열
    const defaultMarkerImages = markers.map(marker => marker.getImage());

    // Add mouseover event to highlight the marker when hovering over the list item
    listItem.addEventListener('mouseover', () => {
      const markerId = listItem.getAttribute('data-marker-id');
      if (markerId !== null) {
        const markerIndex = parseInt(markerId);
        // Change marker image to custom marker image
        const marker = markers[markerIndex];
        const customMarkerImage = createCustomMarkerImage('red');
        marker.setImage(customMarkerImage);

        // Close the activeInfoWindow if it exists
        if (activeInfoWindow !== null) {
          activeInfoWindow.close();
        }

        const infowindow = infowindows[markerIndex]; // Get the corresponding info window
        infowindow.open(map, marker);

        // Set the activeInfoWindow to the current infowindow
        activeInfoWindow = infowindow;
      }

      

    });

    // Add mouseout event to reset the marker image when leaving the list item
    listItem.addEventListener('mouseout', () => {
      const markerId = listItem.getAttribute('data-marker-id');
      if (markerId !== null) {
        const markerIndex = parseInt(markerId);
        // Reset marker image to the default marker image
        const marker = markers[markerIndex];
        const defaultMarkerImage = defaultMarkerImages[markerIndex];
        marker.setImage(defaultMarkerImage);

        // map.setLevel(6);
        // map.panTo(position);

      }
    });

    listItem.addEventListener('click', () => {
      const markerId = listItem.getAttribute('data-marker-id');
      if (markerId !== null) {
        const markerIndex = parseInt(markerId);
        const marker = markers[markerIndex];

        // Move the map's center to the clicked marker's position
        map.setLevel(3);
        map.panTo(marker.getPosition());
       
      }
    });

  });
}