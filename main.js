const map = L.map('map').setView([20.5937, 78.9629], 5);  // Zoom out to India with level 5

// Tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Heatmap layer
let heat = L.heatLayer([], {
  radius: 30,
  blur: 20,
  maxZoom: 17,
  gradient: {
    0.0: 'green',   // safe
    0.5: 'yellow',  // moderate
    1.0: 'red'      // dangerous
  }
}).addTo(map);

// Sample decibel data for multiple districts across India
// (Use actual district noise data if available)
const dbData = [
  // Delhi District
  [28.7041, 77.1025, 90],  // Central Delhi (high traffic area)
  [28.5355, 77.3910, 80],  // West Delhi
  [28.6760, 77.2187, 85],  // South Delhi

  // Mumbai District
  [19.0760, 72.8777, 95],  // Central Mumbai
  [19.2183, 72.9785, 85],  // Navi Mumbai
  [19.0769, 72.8764, 88],  // Andheri, Mumbai

  // Bangalore District
  [12.9716, 77.5946, 70],  // Central Bangalore
  [12.9260, 77.6762, 75],  // Whitefield
  [12.9710, 77.6101, 82]   // Koramangala
];

// Normalize decibels (for the heatmap)
function normalize(dB) {
  const min = 40;
  const max = 100;
  return Math.max(0, Math.min(1, (dB - min) / (max - min)));
}

// Map decibel data to heatmap format
const heatData = dbData.map(p => [p[0], p[1], normalize(p[2])]);

// Set heatmap data
heat.setLatLngs(heatData);

// Optional: Adding a zoom level and the heatmap for street-level details for Delhi
map.setZoom(12);  // Street level zoom for Delhi after loading the page

// Optional: Adding a geocoder for address search
if (typeof L.Control.Geocoder !== 'undefined') {
  L.Control.geocoder({
    defaultMarkGeocode: true
  }).addTo(map);
}
