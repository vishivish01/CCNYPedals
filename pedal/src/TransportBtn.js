import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Image from 'react-bootstrap/Image';

export default function TrasportBtn () {
    return (
        <Dropdown>
            <DropdownToggle variant="info">
                Transportation
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Bike</DropdownItem>
                <DropdownItem>Train</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
