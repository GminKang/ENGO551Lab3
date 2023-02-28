var map = L.map('mapid').setView([51.0447, -114.0719], 13);



function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?

      var popupContent = "<p><b>Isued Date (in UTC format):</b> " + feature.properties.issueddate + "</p>" +
      "<p><b>workclassgroup:</b> " + feature.properties.workclassgroup + "</p>" +"</p>"+"<p><b>Contractoer Name:</b> "
      + feature.properties.contractorname + "<p><b>Community Name :</b> " +feature.properties.communityname + "</p>" + "<p><b>Original Address:</b> "
      + feature.properties.originaladdress;

      layer.bindPopup(popupContent);

}


var myStyle = {
  "color": "#ff7800",
  "weight": 5,
  "opacity": 0.65
};



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

//L.marker([51.0447, -114.0719]).addTo(map)
  //.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

const form = document.getElementById('dates');


form.addEventListener('submit',event=> {
  map.eachLayer(function(layer) {
    map.removeLayer(layer);
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  }).addTo(map);



  const startdate = window.S_Date.slice(0,-1);
  const enddate = window.E_Date.slice(0,-1);

  var markers = L.markerClusterGroup();

  fetch(`https://data.calgary.ca/resource/c2es-76ed.geojson?$where=issueddate > \'${startdate}\' and issueddate< \'${enddate}\'`)
  .then(response =>

    response.json()).then(data => {
    // Use the GeoJSON data here
         var temp= L.geoJSON(data,{
            style: myStyle,
            onEachFeature: onEachFeature
           }).addTo(map);

         markers.addLayer(temp);
         map.addLayer(markers);



    });

  console.log('I get it: '+ startdate);
  console.log('I get:', enddate);

})


  
