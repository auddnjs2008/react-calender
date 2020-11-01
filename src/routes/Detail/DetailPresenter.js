import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import ToDo from "../../components/ToDo";
const Container =styled.div`
    position:relative;
    padding:10px;
    width:95vw;
    height:95vh;
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
`;

const Navigator = styled.div`
    position: absolute;
    bottom:0;
    left:50%;
    transform:translateX(-50%);
    font-size:30px;
    margin-bottom:5px;
    cursor:pointer;

`;

const Planner =styled.div`
    display: ${props => props.planner ? "block" :"none"};
`;



const DetailPresenter=({data,loading,error,planner,planList,handleClick,handleSubmit,handleDelClik})=>
loading ? 
    <Loader/>:
    <>
    <Container planner={planner}>
        {data && data.url?   
            (data.media_type === "video" ? <iframe src={data.url}controls="controls" allow="autoPlay"></iframe>:<img src={data.url}/>) : <div>No Images</div>     
        }
        {data && data.url?
            <div className="Wrapper">
                <h1>{data.title}</h1>
                <p>{data.explanation}</p>
            </div> : <div>No Information</div>
        }
        <Navigator onClick={handleClick}>Go to Planner</Navigator>
    </Container>
    <Planner planner={planner}>
        <ToDo submit={handleSubmit} click={handleDelClik} planList={planList}></ToDo>
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
    handleDelClik:PropTypes.func,
  
}


export default DetailPresenter;
