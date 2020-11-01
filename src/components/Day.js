import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import api, { getImages } from "../api";


const Container = styled(Link)`
  background-color:${props=>props.color==="true" ? "#34495e" :"#95a5a6"};
  color:${props=>props.color==="true" ? "white" :"black"};
  text-decoration:none;
  padding:5px;
  &:hover{
      transform:scale(1.05,1.05);
  }
  transition:transform 0.2s linear;  
`;
const ImageWrapper = styled.div`
`;
const Number=styled.div`
    font-size:18px;
    
`;
const Day=({apiKey,day,color}) => 
    <Container to={`/${apiKey}`}color={color}>
        <ImageWrapper></ImageWrapper>
        <Number>{day}</Number>
    </Container>

Day.propTypes={
    apiKey: PropTypes.string,
    day:PropTypes.number,
    color:PropTypes.string
}

export default Day;