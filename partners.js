// ===============================
// PARTNER SCHOOLS MAP
// ===============================

// Create the map
const map = L.map("map");

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
}).addTo(map);

// Custom icon
const schoolIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// ===============================
// SCHOOL DATA
// ===============================

const schools = [

{
    name: "Ecole Chobene 2",
    country: "Metouia, Tunisia",
    lat: 33.95922739286105,
    lng: 10.00195353885024,
    maps: "https://maps.app.goo.gl/1MoTu8q6tznpa6mL6"
},

{
    name: "Ecole Ahmed Tlili",
    country: "Tunisia",
    lat: 34.79085215784231,
    lng: 10.7793613910636,
    maps: "https://maps.app.goo.gl/8wzHwnfZFcpo2GJ7A"
},

{
    name: "College Ibn Jazzar",
    country: "Tunisia",
    lat: 34.42370800007443,
    lng: 8.787485106726303,
    maps: "https://maps.app.goo.gl/ZfE2hbHCLzsMNvVS6"
},

{
    name: "Piazza Duomo",
    country: "Italy",
    lat: 37.73065520026696,
    lng: 14.93314090458315,
    maps: "https://maps.app.goo.gl/BLcVB9gFRMxpyW9KA"
}

];

// ===============================
// ADD MARKERS
// ===============================

const bounds = [];

schools.forEach((school) => {

    const marker = L.marker([school.lat, school.lng], {
        icon: schoolIcon
    }).addTo(map);

    marker.bindPopup(`
        <div class="popup-card">
            <h3>${school.name}</h3>
            <p>${school.country}</p>

            <a href="${school.maps}"
               target="_blank" style="color:white;">
                Open in Google Maps
            </a>
        </div>
    `);

    school.marker = marker;

    bounds.push([school.lat, school.lng]);

});

// Fit map to show every school
map.fitBounds(bounds, {
    padding: [80,80]
});

// ===============================
// SIDEBAR BUTTONS
// ===============================

const cards = document.querySelectorAll(".school-card");

cards.forEach((card, index)=>{

    card.addEventListener("click",()=>{

        // remove active
        cards.forEach(c=>c.classList.remove("active"));

        // add active
        card.classList.add("active");

        const school = schools[index];

        map.flyTo(
            [school.lat, school.lng],
            13,
            {
                animate:true,
                duration:1.5
            }
        );

        school.marker.openPopup();

    });

});

// ===============================
// OPTIONAL:
// Click marker => highlight card
// ===============================

schools.forEach((school,index)=>{

    school.marker.on("click",()=>{

        cards.forEach(c=>c.classList.remove("active"));

        cards[index].classList.add("active");

        cards[index].scrollIntoView({
            behavior:"smooth",
            block:"center"
        });

    });

});

// ===============================
// SELECT FIRST SCHOOL
// ===============================

setTimeout(()=>{

    cards[0].click();

},800);