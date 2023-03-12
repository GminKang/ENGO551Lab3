var map = L.map('mapid').setView([51.0447, -114.0719], 13);



function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
      

      var popupContent = "<p><b>Isued Date (in UTC format):</b> " + feature.properties.issueddate + "</p>" +
      "<p><b>workclassgroup:</b> " + feature.properties.workclassgroup + "</p>" +"</p>"+"<p><b>Contractoer Name:</b> " 
      + feature.properties.contractorname + "<p><b>Community Name :</b> " +feature.properties.communityname + "</p>" + "<p><b>Original Address:</b> " 
      + feature.properties.originaladdress


      layer.bindPopup(popupContent);
}


var myStyle = {
  "color": "#ff7800",
  "weight": 5,
  "opacity": 0.65
};



var base=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);


var mapbox1=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
id: 'zifanzhang12345/clez82evg000h01lqb402elby', // Replace with your own Mapbox style ID
accessToken: 'pk.eyJ1IjoiemlmYW56aGFuZzEyMzQ1IiwiYSI6ImNsZXo0aWt6bDBvajIzeG8wdHFjYmZydzgifQ.14P31UjREuVFl0CfgVeBLg'
}).addTo(map);
  
var mapbox2=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
id: 'zifanzhang12345/clezxrw8c000401qm3j7rnuda', // Replace with your own Mapbox style ID
accessToken: 'pk.eyJ1IjoiemlmYW56aGFuZzEyMzQ1IiwiYSI6ImNsZXo0aWt6bDBvajIzeG8wdHFjYmZydzgifQ.14P31UjREuVFl0CfgVeBLg'
}).addTo(map);

var baseLayers = {
  "Building Permit":base,
  "Incident Location Heat Map": mapbox1,
  "Satellite Map with the Incident Location": mapbox2,
  };
  //map.removeControl(layercontrol);
  
layercontrol=L.control.layers(baseLayers).addTo(map);






//L.marker([51.0447, -114.0719]).addTo(map)
  //.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

const form = document.getElementById('dates');


form.addEventListener('submit',event=> {
  layercontrol.remove();
  map.eachLayer(function(layer) {
      map.removeLayer(layer);

  });

  Building=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  }).addTo(map);


  const startdate = window.S_Date.slice(0,-1);
  const enddate = window.E_Date.slice(0,-1);
  
  var markers = L.markerClusterGroup();
  
  fetch(`https://data.calgary.ca/resource/c2es-76ed.geojson?$where=issueddate > \'${startdate}\' and issueddate< \'${enddate}\'`)
  .then(response =>
    
    response.json()).then(data => {
      var mapbox1=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'zifanzhang12345/clez82evg000h01lqb402elby', // Replace with your own Mapbox style ID
      accessToken: 'pk.eyJ1IjoiemlmYW56aGFuZzEyMzQ1IiwiYSI6ImNsZXo0aWt6bDBvajIzeG8wdHFjYmZydzgifQ.14P31UjREuVFl0CfgVeBLg'
      }).addTo(map);
      
      var mapbox2=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'zifanzhang12345/clezxrw8c000401qm3j7rnuda', // Replace with your own Mapbox style ID
      accessToken: 'pk.eyJ1IjoiemlmYW56aGFuZzEyMzQ1IiwiYSI6ImNsZXo0aWt6bDBvajIzeG8wdHFjYmZydzgifQ.14P31UjREuVFl0CfgVeBLg'
      }).addTo(map);



    // Use the GeoJSON data here
         var temp= L.geoJSON(data,{
            style: myStyle,
            onEachFeature: onEachFeature
           }).addTo(map);

         markers.addLayer(temp);
         map.addLayer(markers);
         var group = L.layerGroup([Building, markers,temp]).addTo(map);

      
          var baseLayers = {
          "Incident Location Heat Map": mapbox1,
          "Satellite Map with the Incident Location": mapbox2,
          "Building Permits": group
          };
          //map.removeControl(layercontrol);
          
          layercontrol=L.control.layers(baseLayers).addTo(map);
    });
    
  console.log('I get it: '+ startdate);
  console.log('I get:', enddate);
  //layercontrol=L.control.layers(baseLayers).addTo(map);



})


