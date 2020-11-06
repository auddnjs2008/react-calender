import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import ToDo from "../../components/ToDo";
import Face from "../../../src/우는얼굴.png";

const Container =styled.div`
    position:relative;
    padding:10px;
    width:95vw;
    height:95vh;
    @keyframes visualLeftToRight{
        0%{
         transform:translateX(-100%);
         opacity:0.5;
        }
        100%{
            transform:translateY(0%);
        }
    }
  

    animation:${props=>props.planner ? "" : "visualLeftToRight 1s linear"};

    text-align:center;
    display:${props => props.planner ? "none" :"grid"};
    justify-items:center;
    align-items:center;
    grid-template-columns:repeat(2,1fr);
    gap: 10px;
    
    background-color:rgba(25,25,25,0.9);
    color:white;
    div.Wrapper{
      display:grid;
      grid-template-rows:1fr 2fr;
      p{
        text-align:left;
      }
    }
    img{
        width:50vw;
        height:50vh;
        object-fit:contain;
        margin: 0 auto;
    }
    iframe{
        width:50vw;
        height:50vh;
       
    }
    .noInfo{
        border:5px solid red;
        width:30vw;
        height:30vh;
    }
    .noImage{
        border:5px solid red;
        width:30vw;
        height:30vh;
    }
    .noInfo,.noImage{
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:30px;
    }


    .face{
        position:absolute;
        top:30px;
        background-image:url(${Face});
        background-size:cover;
        width:400px;
        height:400px;
        background-color:#ffbe76;
        z-index:-1;

    }
    
`;

const Navigator = styled.div`
    position: absolute;
    bottom:0;
    left:50%;
    transform:translateX(-50%);
    font-size:30px;
    margin-bottom:5px;
    cursor:pointer;
    color:white;

`;

const Planner =styled.div`
    @keyframes visualLeftToRight{
        0%{
            transform:translateX(-100%);
            opacity:0.5;
        }
        100%{
            transform:translateX(0%);
            opacity:1;
        }
    }
    
    animation: ${props =>props.planner ? "visualLeftToRight 1s linear" : ""};
    display: ${props => props.planner ? "block" :"none"};
`;



const DetailPresenter=({data,loading,error,planner,planList,handleClick,handleSubmit,handleDelClick})=>
loading ? 
    <Loader/>:
    <>
    <Container planner={planner}>
        {data && data.url?   
            (data.media_type === "video" ? <iframe src={data.url}controls="controls" allow="autoPlay"></iframe>:<img src={data.url}/>) : <div className="noImage">No Images</div>     
        }
        {data && data.url?
            <div className="Wrapper">
                <h1>{data.title}</h1>
                <p>{data.explanation}</p>
            </div> : <div className="noInfo">No Information</div>
        }
        {!data ? <div className="face"></div> :""}
        <Navigator onClick={handleClick}>Go to Planner</Navigator>
    </Container>
    <Planner planner={planner}>
        <ToDo submit={handleSubmit} click={handleDelClick} planList={planList}></ToDo>
        <Navigator onClick={handleClick}>Go to Picture</Navigator>
    </Planner>
    </>    

DetailPresenter.propTypes={
    data:PropTypes.object,
    loading:PropTypes.bool,
    error:PropTypes.string,
    planner:PropTypes.bool,
    planList:PropTypes.object,
    handleClick:PropTypes.func,
    handleSubmit:PropTypes.func,
    handleDelClick:PropTypes.func,
  
}


export default DetailPresenter;
