import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import api, { getImages } from "../api";


const Container = styled(Link)`
  background-color:${props=>props.color==="true" ?  "#aaa69d" :"#f7f1e3"};
  color:${props=>props.color==="true" ? "white" :"black"};
  text-decoration:none;
  padding:5px;
  &:hover{
      transform:scale(1.05,1.05);
  }
  transition:transform 0.2s linear;  
`;
const ToDoList = styled.ul`
    display:grid;
    grid-auto-rows:20px;
    font-size:15px;
    color:white;
    padding:10px;  
`;
const Number=styled.div`
    font-size:18px;
    margin-bottom:5px;
`;
const Day=({apiKey,day,color,handleLocal}) => 
    <Container to={`/${apiKey}`}color={color}>
        <Number>{day}</Number>
        <ToDoList>
            {
                handleLocal(apiKey) && handleLocal(apiKey).length!==0
            ?  handleLocal(apiKey).map(item=><li>•{item}</li>) 
                :""
        }
        </ToDoList>
    </Container>

Day.propTypes={
    apiKey: PropTypes.string,
    day:PropTypes.number,
    color:PropTypes.string,
    handleLocal:PropTypes.func,
}

export default Day;