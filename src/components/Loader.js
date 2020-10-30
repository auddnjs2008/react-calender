import React from "react";
import styled from "styled-components";
import Nasa from "../../src/Nasa.jpg";

const Container=styled.div`
    width:100vw;
    height:100vh;
    background-color:black;
    display:flex;
    justify-content:center;
    align-items:center;    
`;


const Loader=()=>
        <Container>
            <img src={Nasa}/>
        </Container>


export default Loader;