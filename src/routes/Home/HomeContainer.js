import React, { useState,useEffect } from "react";
import { getImages } from "../../api";
import HomePresenter from "./Homepresenter";

const HomeContainer =()=>{
    const Initial =new Date();
    const [year,setYear]=useState(Initial.getFullYear());
    const [ month,setMonth]=useState(Initial.getMonth()+1);
    const [day,setDay] =useState(null);
    const [yearArray,setYarray]=useState([]);
    const [monthArray,setMarray]=useState([1,2,3,4,5,6,7,8,9,10,11,12]);
    const [dayArray,setDarray] =useState([]);
    const [ startIndex,setStart]=useState(null);
    const [importBtn,setBtn]=useState(0); 

    const handleImportant=(e) =>{
        if(importBtn === 0){
            e.target.innerHTML="중요날짜 선택<br/>ON";
            setStart(1);
    
        }
        else{
            e.target.innerHTML="중요날짜 선택<br/>OFF";
            setStart(0);
        }
    }

    const handleLocalStorage =(key)=>{
        const list = (localStorage.getItem(key));
        return list ? list.split(",") : [];
    }


    const calculateDay=(year,month)=>{
        let newArray=[];

        const thisMonthLastDay=new Date(year,month,0).getDate(); //이번달의  마지막 일(30,31 이런것)
        const thisMonthStartIndex=new Date(year,month-1,1).getDay(); // 처음시작하는 요일 일요일이면 0 

        const lasMonthLastDay =  // 저번달의 마지막 일  1월이면  작년 12월계산  
                month === 1 ? new Date(year-1,12,0).getDate() :new Date(year,month-1,0).getDate();
        
        let fillLastDay= lasMonthLastDay-(thisMonthStartIndex-1); // 전달의 start (27 28 29 30 1 2 3 이러면 27)
    
        const nextMonthStartIndex = new Date(year,month,0).getDay(); // 다음달의 시작 요일 

        // 전달 의 숫자들을 채워준다. 27 28 29 30 같은 숫자들
        for(let i=0; i<thisMonthStartIndex; i++){
            newArray.push(fillLastDay);
            fillLastDay++;
        }

        // 이번달의 숫자들을 채운다. 
        for(let i=1; i<=thisMonthLastDay; i++){
            newArray.push(i);
        }

        //다음달의 숫자들을 채운다.  1,2,3,4,
        for(let i=1; i<(6-nextMonthStartIndex)+1; i++){
            newArray.push(i);
        }

        setDay(thisMonthLastDay); 
        setDarray(newArray);
        setStart(thisMonthStartIndex);
    }

    const handleChange=(e)=>{
        //const{ year,month,yearArray,dayArray,startIndex}=this.state;
        
        if(e.target.name === "year"){
            const newYear=parseInt(e.target.value);
            calculateDay(newYear,month);
            setYear(newYear);
        }    
        else if(e.target.name==="month"){
            const newMonth = parseInt(e.target.value);
            calculateDay(year,newMonth);
            setMonth(newMonth);
        }      
    }
    
    useEffect(()=>{
        calculateDay(year,month);
        for(let i=1997; i<=year; i++)
            yearArray.push(i);   
        yearArray.reverse();
        setYarray(yearArray);
    },[]);

    return <HomePresenter
    year={year}
    month={month}
    day={day}
    yearArray={yearArray}
    monthArray={monthArray}
    dayArray={dayArray}
    startIndex={startIndex}
    importBtn={importBtn}
    handleChange={handleChange}
    handleLocalStorage={handleLocalStorage}
    handleImportant={handleImportant}
    ></HomePresenter>
}

export default HomeContainer;


// export default class extends React.Component{
    
//     state={
//         //year,month day는 서브밋할때 마다 업데이트
//         year: day.getFullYear(),
//         month:day.getMonth()+1,
//         day:null,
//         yearArray:[],
//         monthArray:[1,2,3,4,5,6,7,8,9,10,11,12],
//         dayArray:[],
//         startIndex:null,
//         importBtn:0
//     }

//     handleImportant=(e)=>{
//         const {importBtn}=this.state;
//         if(importBtn === 0){
//           e.target.innerHTML="중요날짜 선택<br/>ON";
//           this.setState({importBtn:1});  
//           console.log(importBtn);
//         }else{
//             e.target.innerHTML="중요날짜 선택<br/>OFF";
//             this.setState({importBtn:0});
//           console.log(importBtn);

//         }
//     }


//     handleLocalStorage=(key)=>{
//         const list = (localStorage.getItem(key));
//         return list ? list.split(",") : [];
//     }


    
//     calculateDay=(year,month)=>{
//         let newArray=[];

//         const lastDay=new Date(year,month,0).getDate(); //이번달의  마지막 일(30,31 이런것)
//         const startIndex=new Date(year,month-1,1).getDay(); // 처음시작하는 요일 일요일이면 0 

//         const lastMonth =  // 저번달의 마지막 일  1월이면  작년 12월계산  
//                 month === 1 ? new Date(year-1,12,0).getDate() :new Date(year,month-1,0).getDate();
        
//         let fillLastDay= lastMonth-(startIndex-1); // 전달의 start (27 28 29 30 1 2 3 이러면 27)
    
//         const ThisMonth = new Date(year,month,0).getDay(); // 다음달의 시작 요일 

//         // 전달 의 숫자들을 채워준다. 27 28 29 30 같은 숫자들
//         for(let i=0; i<startIndex; i++){
//             newArray.push(fillLastDay);
//             fillLastDay++;
//         }

//         // 이번달의 숫자들을 채운다. 
//         for(let i=1; i<=lastDay; i++){
//             newArray.push(i);
//         }

//         //다음달의 숫자들을 채운다.  1,2,3,4,
//         for(let i=1; i<(6-ThisMonth)+1; i++){
//             newArray.push(i);
//         }


//         this.setState({day:lastDay, dayArray:newArray,startIndex,});
//     }




//     handleChange=(e)=>{
//         const{ year,month,yearArray,dayArray,startIndex}=this.state;
//         if(e.target.name === "year"){
//             const newYear=parseInt(e.target.value);
//             this.calculateDay(newYear,month);
//             this.setState({year:newYear});
//         }    
//         else if(e.target.name==="month"){
//             const newMonth = parseInt(e.target.value);
//             this.calculateDay(year,newMonth);
//             this.setState({month:newMonth});
//         }      
    
//     }    
//     componentDidUpdate(){
//         // console.log(this.state.year, this.state.month);
//         // console.log(this.state.dayArray.length);
//         // console.log( this.state.startIndex);
//         //console.log("업데이트후",this.state.importBtn)
//     }

//      componentDidMount(){
//         //마지막 날짜 구하기 
//         const{ year,month,day,yearArray,dayArray,startIndex}=this.state;
//         const newStartIndex=new Date(year,month-1,1).getDay();
            
//         const lastDay=new Date(year,month,0).getDate();
        
//         // 이번달의 1일이 목요일부터 시작하면
//         // 일 월 화 수는 저번달의 숫자로 채워야한다
//         // 따라서 fillLastDay는  일 월 화 수 중에  일요일에
//         //해당하는 일수 를 나타내며 하나씩 증가시키면서 배열에 넣어준다.
//         const lastMonth = 
//             month === 1 ? new Date(year-1,11,0).getDate() :new Date(year,month-1,0).getDate();
//         let fillLastDay= lastMonth-(newStartIndex-1);
        
//         //마찬가지로  이번달의 마지막 주에는  다음달의
//         // 날짜도 포함되야 한다.

//         const ThisMonth = new Date(year,month,0).getDay();
      

//         for(let i=1997; i<=year; i++){
//             yearArray.push(i);   
//         }
//         yearArray.reverse();
        
//         // 저번달 수를 채운다. (첫째주)
//         for(let i=0; i<newStartIndex; i++){
//             dayArray.push(fillLastDay);
//             fillLastDay++;
//         }
//         // 이번달 수를 채운다.
//         for(let i=1; i<=lastDay; i++){
//             dayArray.push(i);
//         }

//         // 다음달 수를 채운다. 마지막주

//         for(let i=1; i<(6-ThisMonth)+1; i++){
//             dayArray.push(i);
//         }
       

        
//         this.setState({yearArray,dayArray,day:lastDay,startIndex:newStartIndex});
//     }


//     render(){
//         const {year,month,day,yearArray,monthArray,dayArray,startIndex,importBtn}=this.state;
//         //console.log("render",this.state.importBtn);
//         return <HomePresenter
//         year={year}
//         month={month}
//         day={day}
//         yearArray={yearArray}
//         monthArray={monthArray}
//         dayArray={dayArray}
//         startIndex={startIndex}
//         importBtn={importBtn}
//         handleChange={this.handleChange}
//         handleLocalStorage={this.handleLocalStorage}
//         handleImportant={this.handleImportant}
//         ></HomePresenter>
//     }

// }

