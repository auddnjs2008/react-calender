import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
const Container =styled.div``;

const DetailPresenter=({data,loading,error})=>
loading ? 
    <Loader/>:
    <Container>
        <img src={data.url}/>
    </Container>;


DetailPresenter.propTypes={
    data:PropTypes.object,
    loading:PropTypes.bool,
    error:PropTypes.string,
  
}


export default DetailPresenter;
