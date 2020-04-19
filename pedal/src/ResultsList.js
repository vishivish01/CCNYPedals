import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

export default function ResultsList () {
  return(
    <ListGroup as="ul">
      <ListGroup.Item as="li" active>
        Bicycle   5 min   $1.37
      </ListGroup.Item>
      <ListGroup.Item as="li">Bicycle   4 min   $1.25</ListGroup.Item>
      <ListGroup.Item as="li" disabled>
        Morbi leo risus
      </ListGroup.Item>
      <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>
  );
};
