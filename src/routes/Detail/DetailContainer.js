import React, { useEffect, useState } from "react";
import { getImages } from "../../api";
import DetailPresenter from "./DetailPresenter";


const DetailContainer =()=>{
    let Key =window.location.href.split("/#/")[1];
    const [ data,setData]=useState(null);
    const [ loading,setLoader] = useState(true);
    const [ error,setError] =useState(null);
    const [ planner,setPlanner] =useState(false);
    const [ planList,setPlanList] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const plan = e.target.firstChild.value;
        const fixedPlan = planList.typeof === "string" ? [planList]:planList;
        setPlanList(fixedPlan);
        e.target.firstChild.value="";
    }

    const handleDelClick =(e)=>{
        const{parentNode:{innerText}} =e.target;
        const number=parseInt(innerText.split(".")[0]);
        const newPlans = this.state.planList.filter((item,index)=>index !== number-1);
        setPlanList(newPlans);       
        cleanLocalStorage();

    }

    const handleClick=()=>{
        if (!planner) 
            setPlanner(true);
        else
            setPlanner(false);
    }

    const cleanLocalStorage = ()=>{
        Key =window.location.href.split("/#/")[1];
        if(planList.length !==0)
            localStorage.setItem(Key,planList);
        else
            localStorage.removeItem(Key);
    }

    const settingInitial = async ()=>{
        const KeyArray =Key.split("-");
        const Day = new Date();
        const nowYear = Day.getFullYear();
        const nowMonth = Day.getMonth()+1;
        const nowDay = Day.getDate();
        let IsSearch = true;
        // 지금 현재의 날짜보다  미래이면  api로 데이터를 받아올 수 없다. 
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
        setData(newData);
        setPlanList(plans);
        }catch(error){
            setError("Can't find Info");
        }finally{
            setLoader(false);
        }
    }

    useEffect(()=>{
        console.log("실행");
        settingInitial();
    },[]);


    return <DetailPresenter
    data={data}
    loading={loading}
    error={error}
    planner={planner}
    planList={planList}
    handleClick={handleClick}
    handleSubmit={handleSubmit}
    handleDelClick={handleDelClick}
    ></DetailPresenter>
} 

export default DetailContainer;

// export default class extends React.Component{
//     state={
//         data:null,
//         loading:true,
//         error:null,
//         planner:false,
//         planList:[]
//     }
//     handleSubmit=  (e)=>{
//         const {planList} = this.state;
//         e.preventDefault();
//         const plan = e.target.firstChild.value;
//         const fixedPlan = planList.typeof === "string" ? [planList] :planList;
//         // state 업데이트
//         this.setState({planList:[plan,...fixedPlan]});
//         e.target.firstChild.value="";
//     }
//     componentDidUpdate(){
//         Key =window.location.href.split("/#/")[1];
//         if(this.state.planList.length !==0)
//             localStorage.setItem(Key,this.state.planList);
//         else
//             localStorage.removeItem(Key);
//     }

//     handleDelClick =(e)=>{
//         const{parentNode:{innerText}} =e.target;
//         console.log(innerText);
//         const number=parseInt(innerText.split(".")[0]);
//         const newPlans = this.state.planList.filter((item,index)=>index !== number-1);
//         console.log(newPlans);
//         this.setState({planList:newPlans});        
//     }


//     handleClick=()=>{
//         const { planner}=this.state
//         if (!planner) 
//             this.setState({planner:true});
//         else
//             this.setState({planner:false});
//     }
   
//     async componentDidMount(){
//         const Key =window.location.href.split("/#/")[1];
//         const KeyArray =Key.split("-");
//         const Day = new Date();
//         const nowYear = Day.getFullYear();
//         const nowMonth = Day.getMonth()+1;
//         const nowDay = Day.getDate();
//         let IsSearch = true;
 
//         if( nowYear === parseInt(KeyArray[0]))
//             IsSearch =nowMonth >=parseInt(KeyArray[1]) && nowDay >=parseInt(KeyArray[2]);
//         try{
//             let newData;    
//             if(IsSearch){
//                 const {data} = await getImages.images(Key);
//                 newData=data;
//             }else
//                  newData=null;

//             const plans = localStorage.getItem(Key) ? localStorage.getItem(Key).split(",") : [];
               
//             this.setState({data:newData,planList:(plans)});

//         }catch(error){
//             this.setState({error:"Can't find Image"})
//         }finally{
//             this.setState({loading:false})
//         }
//     }

//     render(){
//         const {data,loading,error,planner,planList}=this.state
      
//         return <DetailPresenter
//             data={data}
//             loading={loading}
//             error={error}
//             planner={planner}
//             planList={planList}
//             handleClick={this.handleClick}
//             handleSubmit={this.handleSubmit}
//             handleDelClick={this.handleDelClick}
           
//         ></DetailPresenter>
//     }
// }