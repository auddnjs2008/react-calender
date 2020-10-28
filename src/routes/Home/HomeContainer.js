import React from "react";
import HomePresenter from "./Homepresenter";
export default class extends React.Component{
    
    state={
        year: new Date().getFullYear(),
        month:new Date().getMonth()+1,
        day:new Date().getDate(), 
        yearArray:[],
        monthArray:[1,2,3,4,5,6,7,8,9,10,11,12],
        dayArray:[],
    }
    componentDidMount(){
        //마지막 날짜 구하기 
        const{ year,month,day,yearArray,monthArray,dayArray}=this.state;
        const lastDay=new Date(year,month,0).getDate();
        for(let i=2000; i<=year; i++){
            yearArray.push(i);   
        }
        yearArray.reverse();
        
        for(let i=1; i<=lastDay; i++){
            dayArray.push(i);
        }
        
        this.setState({yearArray,dayArray});
    }


    render(){
        const {year,month,day,yearArray,monthArray,dayArray}=this.state;
        return <HomePresenter
        year={year}
        month={month}
        day={day}
        yearArray={yearArray}
        monthArray={monthArray}
        dayArray={dayArray}
        ></HomePresenter>
    }

}

