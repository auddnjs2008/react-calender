import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Day from "../../components/Day";


const Container = styled.div``; // 전체 감싸는 상자.

const Header = styled.ul`
    list-style:none;
`; // 날짜셋팅 - 연도, 달, 일 세팅창
const Form = styled.form`
    display:flex;
    justify-content:space-between;
`;
const Year = styled.li``;
const Month = styled.li``;

const GridWrapper = styled.div``; //달력을 나타내는 곳



const Homepresenter =({year,month,day,yearArray,monthArray,dayArray})=> 
<Container>
    <Header>
        <Form>
            <Year>
                <select name="year">
                    {yearArray.map(Ayear=>
                    Ayear === year ? <option value={Ayear} selected>{Ayear}</option>
                    :<option value={Ayear}>{Ayear}</option>)}
                </select>
            </Year>
            <Month>
                <select name="month">
                    {monthArray.map(Amonth=>
                    Amonth === month ?
                    <option value={Amonth} selected>{Amonth}</option>:
                    <option value={Amonth}>{Amonth}</option>)}
                </select>
            </Month>
         
            <input type="submit" value="Submit"/>
        </Form>
    </Header>
    <GridWrapper>
                        
    </GridWrapper>
</Container>

Homepresenter.propTypes={
    year:PropTypes.number,
    month:PropTypes.number,
    day:PropTypes.number,
    yearArray:PropTypes.array,
    monthArray:PropTypes.array,
    dayArray:PropTypes.array
}


export default Homepresenter;