import React from "react";
import { getImages } from "../../api";
import DetailPresenter from "./DetailPresenter";



export default class extends React.Component{
    state={
        data:null,
        loading:true,
        error:null,
    }


   
    async componentDidMount(){
        const Key =window.location.href.split("/#/")[1];
        try{
            const {data} = await getImages.images(Key)
            this.setState({data:data}); 
        }catch(error){
            this.setState({error:"Can't find Image"})
        }finally{
            this.setState({loading:false})
        }
    }

    render(){
        const {data,loading,error}=this.state
        console.log(data);
        return <DetailPresenter
            data={data}
            loading={loading}
            error={error}
           
        ></DetailPresenter>
    }
}