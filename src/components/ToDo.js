import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Background from "../todolist.jpg";


const Container=styled.div`
    position:relative;
    width:100vw;
    height:100vh;
    display:grid;
    gap:40px;
    grid-template: "header header"1fr
                   "toDO Input" 2fr/1fr 1fr;
    color:white;               
`;
const ImageWrapper =styled.div`
    position:absolute;
    top:0;
    width:100vw;
    height:100vh;
    background-image:url("https://yayatube.s3-ap-northeast-1.amazonaws.com/calender/todolist.jpg");
    background-size:cover;
    background-position:center center;
    z-index:-1;
`;
const Title = styled.h1`
    grid-area: header;
    justify-self:center;
    align-self:center;
    font-size:50px;
`;
const Ul=styled.ul`
    grid-area: toDO;
    justify-self:center;
    padding-left:20px;
    padding-top:20px;
    width:50vw;
    height:330px;
    overflow:auto;
    &::-webkit-scrollbar{
        display:none;
    }
    background-color:rgba(20,20,20,0.5);
    
    @keyframes listAction {
        from{
            transform:translateX(-100%);
        }
        to{
            transform:translateX(0);
        }
    }
    span.noPlan{
        font-size:30px;

    }
    li{
        font-size:25px;
        color:white;
        font-weight:600;
        margin-bottom:10px;
        span{
            font-size:30px;
            color:#f1c40f;
        }
        button{
            all:unset;
            font-size:15px;
            opacity:0.8;
        }
       animation: listAction 0.5s linear; 
    }
`;

const Form = styled.form`
    grid-area: Input;
    input[type="text"]{
        border:none;
        outline:none;
        font-size:20px; 
        width:200px;
        height:40px;
        padding:10px;
        &::placeholder{
            font-size:20px;
            text-align:center;
        }
        &:focus{
            input[type="submit"]{
                transform:none;
            }
        }
    }

    input[type="submit"]{
        border:none;
        outline:none;
        height:60px;
        padding:10px;
        font-size:20px;
    
    }

`;


const ToDo=({submit,click,planList})=> <Container>
    <Title>Today's  To Do List</Title>
    <Form onSubmit={submit}>
        <input type="text" placeholder="What is your plan??"/>
        <input type="submit" value="Submit"/>

    </Form>
    <Ul>
        {planList && planList.length !==0 ? 
            planList.map((item,index) => <li><span>{index+1}.</span> {item} <button onClick={click}>❌</button></li>)
            :<span className="noPlan">There is no Plans</span>        
        }
    </Ul>
    <ImageWrapper></ImageWrapper>
</Container>;

ToDo.propTypes={
    submit:PropTypes.func,
    click:PropTypes.func,
    planList:PropTypes.object
}

export default  (ToDo);