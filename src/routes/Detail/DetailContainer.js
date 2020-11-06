import React from "react";
import { getImages } from "../../api";
import DetailPresenter from "./DetailPresenter";

 let Key =window.location.href.split("/#/")[1];


export default class extends React.Component{
    state={
        data:null,
        loading:true,
        error:null,
        planner:false,
        planList:[]
    }
    handleSubmit=  (e)=>{
        const {planList} = this.state;
        e.preventDefault();
        const plan = e.target.firstChild.value;
        const fixedPlan = planList.typeof === "string" ? [planList] :planList;
        // state 업데이트
        this.setState({planList:[plan,...fixedPlan]});
        e.target.firstChild.value="";
    }
    componentDidUpdate(){
        Key =window.location.href.split("/#/")[1];
        if(this.state.planList.length !==0)
            localStorage.setItem(Key,this.state.planList);
        else
            localStorage.removeItem(Key);
    }

    handleDelClick =(e)=>{
        const{parentNode:{innerText}} =e.target;
        console.log(innerText);
        const number=parseInt(innerText.split(".")[0]);
        const newPlans = this.state.planList.filter((item,index)=>index !== number-1);
        console.log(newPlans);
        this.setState({planList:newPlans});        
    }


    handleClick=()=>{
        const { planner}=this.state
        if (!planner) 
            this.setState({planner:true});
        else
            this.setState({planner:false});
    }
   
    async componentDidMount(){
        const Key =window.location.href.split("/#/")[1];
        const KeyArray =Key.split("-");
        const Day = new Date();
        const nowYear = Day.getFullYear();
        const nowMonth = Day.getMonth()+1;
        const nowDay = Day.getDay();
        let IsSearch = true;
        if( nowYear === parseInt(KeyArray[0]))
            IsSearch =nowMonth >=parseInt(KeyArray[1]) && nowDay >=parseInt(KeyArray[2]);
        try{
            let newData;    
            if(IsSearch){
                const {data} = await getImages.images(Key);
                newData=data;
            }else
                 newData=null;

            const plans = localStorage.getItem(Key) ? localStorage.getItem(Key).split(",") : [];
               
            this.setState({data:newData,planList:(plans)});

        }catch(error){
            this.setState({error:"Can't find Image"})
        }finally{
            this.setState({loading:false})
        }
    }

    render(){
        const {data,loading,error,planner,planList}=this.state
      
        return <DetailPresenter
            data={data}
            loading={loading}
            error={error}
            planner={planner}
            planList={planList}
            handleClick={this.handleClick}
            handleSubmit={this.handleSubmit}
            handleDelClick={this.handleDelClick}
           
        ></DetailPresenter>
    }
}