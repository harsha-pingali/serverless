import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      padding={"2rem"}
      bg={"teal"}
      color={"white"}
    >
      <Link to="/">
        <Text fontSize={"3lg"}>Home</Text>
      </Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </Box>
  );
};

export default Navbar;
