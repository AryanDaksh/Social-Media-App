import { Button, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({ description, icon, path }) {
  return (
    <Tooltip
      label={description}
      placement="right"
      hasArrow
      fontSize="xl"
      borderRadius="2xl"
    >
      <Button
        p={7}
        borderRadius="2xl"
        colorScheme="whiteAlpha"
        color="black"
        fontSize="3xl"
        as={NavLink}
        to={path}
        _hover={{ boxShadow: '2xl' }}
        _activeLink={{ boxShadow: '2xl' }}
        rightIcon={icon}
        aria-label={description} // Add aria-label for accessibility
        display="flex" // Ensures that text and icon are aligned properly
        alignItems="center"
      >
        <Text as="b">{description}</Text>
      </Button>
    </Tooltip>
  );
}

export default NavItem;
