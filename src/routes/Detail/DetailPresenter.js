import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container =styled.div``;

const DetailPresenter=({data,loading,error,handleClick})=>
    <Container onClick={handleClick}>
        <img src={data.url}/>
    </Container>;


DetailPresenter.propTypes={
    data:PropTypes.object,
    loading:PropTypes.bool,
    error:PropTypes.string,
    handleClick:PropTypes.func
}


export default DetailPresenter;
