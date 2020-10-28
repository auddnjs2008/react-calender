import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div``;
const ImageWrapper = styled.div``;
const Number=styled.div``;
const Day=({day}) => 
<Container>
    <ImageWrapper></ImageWrapper>
    <Number>{day}</Number>
</Container>

Day.propTypes={
    day:PropTypes.number
}

export default Day;