import React from 'react';
import { Popup } from 'react-leaflet';

const popupContent = {
  //textAlign: "center",
  height: "250px",
  width: "150px",
  marginTop: "20px"
};
const popupImg = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "20px"
};

const popupText = {
  fontSize: "18px",
  marginBottom: "10px",
  marginLeft: "10px"
};

let icon;

const BikePopup = ({img, price, distance}) => {
  if (img == "bird"){
    icon = "./markers/bird.png"
  } else if (img == "jump"){
    icon = "./markers/jump.png"
  } else if (img == "lime"){
    icon = "./markers/lime.png"
  } else {
    icon = "./markers/lyft.png"
  }
    return(
      <Popup>
        <div style={popupContent}>
            <img
            style={popupImg}
            src={require("" + icon)}
          />
          <div style={popupText}>
            ETA: {distance} mins
          </div>
          <div style={popupText}>
            Price: $ {price.toFixed(2)}
          </div>
        </div>
      </Popup>
    );
  }

  const TrainPopup = () => {
    return(
      <Popup>
        <div style={popupContent}>
            <img
            style={popupImg}
            src="https://cdn1.iconfinder.com/data/icons/materia-transport-vol-2/24/014_052_sign_railway_tram_train-512.png"
          />
          <div style={popupText}>
            ETA: 
          </div>
          <div style={popupText}>
            Price: $
          </div>
        </div>
      </Popup>
    );
  }

  export { BikePopup, TrainPopup };