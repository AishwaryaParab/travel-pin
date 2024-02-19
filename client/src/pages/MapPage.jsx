import Map, { Marker } from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';
import "mapbox-gl/dist/mapbox-gl.css";
import { Popup } from 'react-map-gl';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from "timeago.js";
import { UserContext } from '../context/UserContext';
import Tooltip from '@mui/material/Tooltip';
import "./map.css";
import { useNavigate } from 'react-router-dom';

function MapPage() {
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 46,
    zoom: 4,
  })

  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const [pins, setPins] = useState([]);
  const [currentPin, setCurrentPin] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);

  if(!user) {
    navigate('/');
  }

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('https://travel-pin-server.onrender.com/api/pins');
        setPins(res.data);
      } catch(err) {
        console.log(err);
      }
    }

    getPins();
  }, [])

  const handleMarkerClick = (id, lng, lat) => {
    setCurrentPin(id);
    setViewState({...viewState, longitude: lng, latitude: lat});
  }

  const handleNewPlace = (e) => {
    setNewPlace(e.lngLat);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: user.username,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      lng: newPlace.lng
    }

    try {
      const res = await axios.post('https://travel-pin-server.onrender.com/api/pins', newPin);
      setNewPlace(null);
      setPins([...pins, res.data]);
    } catch(err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }

  return (
    <>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        {...viewState}
        onMove={e => setViewState(e.viewState)}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={(e) => {handleNewPlace(e)}}
      >
        {pins?.map(pin => (
          <div key={pin._id}>
            <Marker
              longitude={pin.lng}
              latitude={pin.lat}
              offsetLeft={-3.5 * viewState.zoom}
              offsetTop={-7 * viewState.zoom}
            >
              <LocationOnIcon onClick={() => handleMarkerClick(pin._id, pin.lng, pin.lat)} style={{fontSize: viewState.zoom * 7, color: pin.username == user?.username ? "tomato" : "slateblue", cursor: "pointer"}} />
            </Marker>

            {currentPin == pin._id && <Popup
              key={pin._id}
              longitude={pin.lng}
              latitude={pin.lat}
              anchor="left"
              closeOnClick={false}
              closeButton={true}
              onClose={() => {setCurrentPin(null)}}
              >
                <div className='card'>
                  <label>Place</label>
                  <h4 className='place'>{pin.title}</h4>

                  <label>Review</label>
                  <p className='desc'>{pin.desc}</p>

                  <label>Rating</label>
                  <div className='stars'>
                    {/* Create array of the number and fill it with the component */}
                    {Array(pin.rating).fill(<StarIcon className='star' />)}
                  </div>

                  <label>Information</label>
                  <span className='username'>Created by <strong>{pin.username}</strong></span>
                  <span className='date'>{format(pin.createdAt)}</span>
                </div>
            </Popup>}
          </div>
        ))}

        {/* To display a new pin */}
        {newPlace && <Popup
          longitude={newPlace.lng}
          latitude={newPlace.lat}
          anchor="left"
          closeOnClick={false}
          closeButton={true}
          onClose={() => {setNewPlace(null)}}
        >
          <div>
            <form className="new-pin-form" onSubmit={handleSubmit}>
              <label>Title</label>
              <input type='text' placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)} />

              <label>Review</label>
              <textarea placeholder='Say something about this place' onChange={(e) => setDesc(e.target.value)} />

              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <button type="submit" className='button submit-btn'>Add Pin</button>
            </form>
          </div>
        </Popup>}

        {user && <button className='button logout'>
          <Tooltip
          title="Logout"
          componentsProps={{
            tooltip: {
              sx: {
                color: "black",
                backgroundColor: "white",
                fontFamily: "Poppins"
              }
            }}}
          >
            <LogoutIcon onClick={handleLogout} />
          </Tooltip>
        </button>}
      </Map>
    </>
  )
}

export default MapPage;
