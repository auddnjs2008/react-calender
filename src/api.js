import axios from "axios";


const webSite ="https://api.nasa.gov/planetary";


const api = axios.create({
    baseURL:webSite,
    params:{
        api_key:"5gJf5VSdXaY3pad7Q3bPOzgSRV5MqFyfD0LC1wig",
    }
})


export const getImages={
    images:(date)=> api.get("apod",{
        params:{
            date
        }
    })
}

export default api;