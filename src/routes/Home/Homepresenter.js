import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Day from "../../components/Day";
import Nasa from "../../../src/Nasa.jpg";
import { getImages } from "../../api";


const Container = styled.div`
   
    padding:100px;
    padding-top:20px;
`; // 전체 감싸는 상자.

const Header = styled.ul`

    list-style:none;
    margin-bottom:20px;
`; // 날짜셋팅 - 연도, 달, 일 세팅창
const Wrapper = styled.div`
    
    width:100%;
    margin: 0 auto;
    display:grid;
    grid-template-columns:2fr 1fr;
    justify-items:center;
`;

const SettingWrapper = styled.div`
    display:flex;
    justify-content:flex-start;
    justify-self:start;
`;

const Year = styled.li`
    select{
    border:none;
    border:2px solid #ff7979;
    outline:none;
    width:80px;
    height:50px;
    font-size:20px;
    margin-right:10px;
    }

`;
const Month = styled.li`
 select{
    border:none;
    border:2px solid #ff7979;
    outline:none;
    width:80px;
    height:50px;
    font-size:20px;
    margin-right:10px;
    

    }`;

const ImportDay = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
border:2px solid #ff7979;
width:200px;
padding:5px;
cursor:pointer;
color:white;
`;


const Navigator=styled.div`
    width:100%;
    display:grid;
    grid-template-columns:repeat(7,1fr);
    justify-items:center;
    margin-bottom:20px;
    font-size:20px;
    font-weight:600;
    color:white;
`;
const GridWrapper = styled.div`
    width:100%;
    height:85vh;
    display:grid;
    grid-template-columns:repeat(7,1fr);
    gap:5px;

`; //달력을 나타내는 곳

const Brander = styled.div`
    
    display:flex;
    align-items:center;
    margin-left:50px;
    img{
        width:70px;
        height:70px;
        object-fit:cover;
        border-radius:50%;
        margin-right:10px;
    }
    span{
        color:white;
        font-size:20px;
    }
`;


const Homepresenter =({year,month,day,yearArray,monthArray,dayArray,startIndex,importBtn,handleChange,handleLocalStorage,handleImportant})=> 
<Container>
    <Header>
        <Wrapper>
            <SettingWrapper>
            <Year>
                <select name="year" onChange={handleChange}>
                    {yearArray.map(Ayear=>
                    Ayear === year ? <option value={Ayear} selected>{Ayear}</option>
                    :<option value={Ayear}>{Ayear}</option>)}
                </select>
            </Year>
            <Month>
                <select name="month" onChange={handleChange}>
                    {monthArray.map(Amonth=>
                    Amonth === month ?
                    <option value={Amonth} selected>{Amonth}</option>:
                    <option value={Amonth}>{Amonth}</option>)}
                </select>
            </Month>
            <ImportDay onClick={handleImportant}>
                중요날짜 선택<br/> OFF
            </ImportDay>
            </SettingWrapper>
             <Brander>
                   <img src="https://yayatube.s3-ap-northeast-1.amazonaws.com/calender/Nasa.jpg"/>
                   <span>Nasa Calender</span>     
             </Brander>             
        </Wrapper>
    </Header>
    <Navigator>
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
    </Navigator>
   
    <GridWrapper>
       {dayArray.map( (item,index)=> <Day importDay={importBtn} apiKey={index >=startIndex && index<=startIndex+day-1 ? `${year}-${month}-${item}`:""}  day={item} color={index >=startIndex && index<=startIndex+day-1 ? "true" :"false"} handleLocal={handleLocalStorage}></Day>)}                 
    </GridWrapper>
</Container>

Homepresenter.propTypes={
    year:PropTypes.number,
    month:PropTypes.number,
    day:PropTypes.number,
    yearArray:PropTypes.array,
    monthArray:PropTypes.array,
    dayArray:PropTypes.array,
    startIndex:PropTypes.number,
    importBtn:PropTypes.number,
    handleChange:PropTypes.func,
    handleLocalStorage:PropTypes.func,
    handleImportant:PropTypes.func
}


export default Homepresenter;