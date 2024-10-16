let socket = io();
const markers = {}; 

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error("Geolocation error:", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}


const map = L.map("map").setView([0, 0], 10);


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    
    console.log(`Received Location - ID: ${id}, Latitude: ${latitude}, Longitude: ${longitude}`);

    
    map.setView([latitude, longitude], 16);

    if (markers[id]) {
        
        markers[id].setLatLng([latitude, longitude]);
    } else {
       
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected",(id)=>{
        if(markers[id]){
            map.removeLayer(marker[id]);
            delete markers[id];
        }
})