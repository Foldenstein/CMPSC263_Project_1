import './HomePage.css';
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

/* https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found */
import L from "leaflet";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [1, -34], // point of the icon which will correspond to marker's location
    popupAnchor:  [13, 41] // point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

function HomePage() {
    return (
        <div>
            <h1 align="center">Welcome to Seafood Hotpot</h1>
            <div className='main'>
                <img src='./picture/homehotpot.jpg' alt='hotpot' className="Hotpot_photo"/>
                <div className='Content'>
                    <h2>What is Hotpot?</h2>
                    <p>Hotpot starts with a simmering pot of hot soup at the center of the table. All you have to do is add your choice
                        of ingredients, such as thinly sliced meats, seafood, vegetables, and noodles into the pot. Typically, you would use 
                        chopsticks or tongs to handle the ingredients. The food would absorb the flavor of the soup and you can take 
                        them out once it's done cooking. There are additional dipping sauces and condiments available to enhance the flavor 
                        of the cooked ingredients.</p>
                </div>
            </div>
            <div className='second'>
                <div className='location'>
                    <h2>Location & Hours</h2>
                    <h3>Address</h3>
                    <p>1002 Arch St</p>
                    <p>Philadelphia, PA 19107</p>
                    <h3>Phone</h3>
                    <p>(215) 928-8838</p>
                    <h3>Hours</h3>
                    <ul>
                    <li>Saturday: 12 PM - 12 AM</li>
                    <li>Sunday: 12 PM - 11 PM</li>
                    <li>Monday: 12 PM - 11 PM</li>
                    <li>Tuesday: 12 PM - 11 PM</li>
                    <li>Wednesday: Closed</li>
                    <li>Thursday: 12 PM - 11 PM</li>
                    <li>Friday: 12 PM - 12 AM</li>
                    </ul>
                </div>
                <div className='map'>
                    <MapContainer className='leaflet' center={[39.953481864172055, -75.15662647180234]} zoom={20} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[39.953481864172055, -75.15662647180234]}>
                        <Popup>
                        Seafood Hotpot <br /> 
                        </Popup>
                    </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default HomePage;