import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import api, { getImages } from "../api";


const handleClick =(e)=>{
    e.preventDefault();
    const index =e.currentTarget.href.split("/#/")[1];
    const events = e.currentTarget.classList
    const local = localStorage.getItem(index+"import");
    if(index !==""){
        // 저장되 있냐 저장되있지 않느냐 가 문제
        

        //저장되 있지 않은 경우
        events.toggle("background");
        if(!local && events.contains("background")){    
            localStorage.setItem(index+"import",1);
        }
        else{ 
            localStorage.removeItem(index+"import");
        }
    }
};

const Container = styled(Link)`
  background-color:${props=>props.color==="true" ? (props.star?"#ff7979" :"#aaa69d") :"#f7f1e3"};
  color:${props=>props.color==="true" ? "white" :"black"};
  text-decoration:none;
  padding:5px;
  &:hover{
      transform:scale(1.05,1.05);
  }
  transition:transform 0.2s linear;  
  &.background{
      background-color:"#ff7979";
  }

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
const Day=({apiKey,day,color,handleLocal,importDay}) => 
    <Container star={localStorage.getItem(apiKey+"import")}onClick={importDay ? handleClick:""} to={`/${apiKey}`} color={color}>
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
    importDay: PropTypes.number
}

export default Day;