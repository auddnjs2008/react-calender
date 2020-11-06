import React from "react";
import { getImages } from "../../api";
import HomePresenter from "./Homepresenter";
const day =new Date();
export default class extends React.Component{
    
    state={
        //year,month day는 서브밋할때 마다 업데이트
        year: day.getFullYear(),
        month:day.getMonth()+1,
        day:null,
        yearArray:[],
        monthArray:[1,2,3,4,5,6,7,8,9,10,11,12],
        dayArray:[],
        startIndex:null,
        importBtn:0
    }

    handleImportant=(e)=>{
        const {importBtn}=this.state;
        if(importBtn === 0){
          e.target.innerHTML="중요날짜 선택<br/>ON";
          this.setState({importBtn:1});  
          console.log(importBtn);
        }else{
            e.target.innerHTML="중요날짜 선택<br/>OFF";
            this.setState({importBtn:0});
          console.log(importBtn);

        }
    }


    handleLocalStorage=(key)=>{
        const list = (localStorage.getItem(key));
        return list ? list.split(",") : [];
    }


    
    calculateDay=(year,month)=>{
        let newArray=[];

        const lastDay=new Date(year,month,0).getDate();
        const startIndex=new Date(year,month-1,1).getDay();

        const lastMonth = 
                month === 1 ? new Date(year-1,12,0).getDate() :new Date(year,month-1,0).getDate();
        let fillLastDay= lastMonth-(startIndex-1);
    
        const ThisMonth = new Date(year,month,0).getDay();

        for(let i=0; i<startIndex; i++){
            newArray.push(fillLastDay);
            fillLastDay++;
        }
        for(let i=1; i<=lastDay; i++){
            newArray.push(i);
        }

        for(let i=1; i<(6-ThisMonth)+1; i++){
            newArray.push(i);
        }


        this.setState({day:lastDay, dayArray:newArray,startIndex,});
    }




    handleChange=(e)=>{
        const{ year,month,yearArray,dayArray,startIndex}=this.state;
        if(e.target.name === "year"){
            const newYear=parseInt(e.target.value);
            this.calculateDay(newYear,month);
            this.setState({year:newYear});
        }    
        else if(e.target.name==="month"){
            const newMonth = parseInt(e.target.value);
            this.calculateDay(year,newMonth);
            this.setState({month:newMonth});
        }      
    
    }    
    componentDidUpdate(){
        // console.log(this.state.year, this.state.month);
        // console.log(this.state.dayArray.length);
        // console.log( this.state.startIndex);
        //console.log("업데이트후",this.state.importBtn)
    }

     componentDidMount(){
        //마지막 날짜 구하기 
        const{ year,month,day,yearArray,dayArray,startIndex}=this.state;
        const newStartIndex=new Date(year,month-1,1).getDay();
            
        const lastDay=new Date(year,month,0).getDate();
        
        // 이번달의 1일이 목요일부터 시작하면
        // 일 월 화 수는 저번달의 숫자로 채워야한다
        // 따라서 fillLastDay는  일 월 화 수 중에  일요일에
        //해당하는 일수 를 나타내며 하나씩 증가시키면서 배열에 넣어준다.
        const lastMonth = 
            month === 1 ? new Date(year-1,11,0).getDate() :new Date(year,month-1,0).getDate();
        let fillLastDay= lastMonth-(newStartIndex-1);
        
        //마찬가지로  이번달의 마지막 주에는  다음달의
        // 날짜도 포함되야 한다.

        const ThisMonth = new Date(year,month,0).getDay();
      

        for(let i=1997; i<=year; i++){
            yearArray.push(i);   
        }
        yearArray.reverse();
        
        // 저번달 수를 채운다. (첫째주)
        for(let i=0; i<newStartIndex; i++){
            dayArray.push(fillLastDay);
            fillLastDay++;
        }
        // 이번달 수를 채운다.
        for(let i=1; i<=lastDay; i++){
            dayArray.push(i);
        }

        // 다음달 수를 채운다. 마지막주

        for(let i=1; i<(6-ThisMonth)+1; i++){
            dayArray.push(i);
        }
       

        
        this.setState({yearArray,dayArray,day:lastDay,startIndex:newStartIndex});
    }


    render(){
        const {year,month,day,yearArray,monthArray,dayArray,startIndex,importBtn}=this.state;
        //console.log("render",this.state.importBtn);
        return <HomePresenter
        year={year}
        month={month}
        day={day}
        yearArray={yearArray}
        monthArray={monthArray}
        dayArray={dayArray}
        startIndex={startIndex}
        importBtn={importBtn}
        handleChange={this.handleChange}
        handleLocalStorage={this.handleLocalStorage}
        handleImportant={this.handleImportant}
        ></HomePresenter>
    }

}

