import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


const Container=styled.div``;
const Title = styled.h1``;
const Ul=styled.ul``;

const Form = styled.form``;

const ToDo=({submit,click,planList})=> <Container>
    <Title>Today's  To Do List</Title>
    <Form onSubmit={submit}>
        <input type="text" placeholder="What is your plan??"/>
        <input type="submit" placeholder="Submit"/>
    </Form>
    <Ul>
        {planList && planList.length !==0 ? 
            planList.map((item,index) => <div>{index+1}. {item} <button onClick={click}>❌</button></div>)
            :<span>There is no Plans</span>        
        }
    </Ul>
</Container>;

ToDo.propTypes={
    submit:PropTypes.func,
    click:PropTypes.func,
    planList:PropTypes.object
}

export default ToDo;