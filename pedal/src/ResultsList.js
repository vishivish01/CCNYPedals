import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';


const priceImg = {
  width: "50px",
  height: "50px",
};

let icon;

const ResultsList = ({ bikeId, img, price, distance}) => {
  if (img === "bird"){
    icon = "./markers/bird.png"
  } else if (img === "jump"){
    icon = "./markers/jump.png"
  } else if (img === "lime"){
    icon = "./markers/lime.png"
  } else {
    icon = "./markers/lyft.png"
  }
    return(
      <ListGroup style={{width:"250px"}}>
        <ListGroup.Item key={bikeId} action="true" >
          <Row>
            <Col style={{padding: "0px", textAlign:"center"}}>
              <img
                style={priceImg}
                src={require("" + icon)}
                alt="Company Logo"
              />
            </Col>
            <Col style={{fontSize: "14px", padding:"0px"}}>
              <div>
                <strong>Price:</strong> ${price.toFixed(2)} <br></br>
                <strong>Distance:</strong> {distance} mins
              </div>
            </Col>
          </Row>
          
        </ListGroup.Item>
  </ListGroup>
    );
}

export { ResultsList };