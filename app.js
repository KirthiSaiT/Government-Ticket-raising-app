const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const axios = require('axios'); // For geocoding

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.io connection
io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
});

// POST route to handle form submission
app.post("/submit", async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    let lat, lon;

    if (latitude && longitude) {
        // Use current location if provided
        lat = latitude;
        lon = longitude;
    } else {
        // Geocode the address
        try {
            const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
            const response = await axios.get(geocodeUrl);

            if (response.data.length === 0) {
                return res.send("Address not found.");
            }

            lat = response.data[0].lat;
            lon = response.data[0].lon;
        } catch (error) {
            return res.status(500).send("Error in geocoding the address.");
        }
    }

    // Render map with the obtained lat/lon
    res.render("map", { name, address, lat, lon });
});

// Route for the main form
app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
