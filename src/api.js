import axios from "axios";


const webSite ="https://api.nasa.gov/planetary/apod";


const api =async (date) => await axios.create({
    url:webSite,
    params:{
        api_key:process.env.API_KEY,
        date //YYYY-MM-DD 형식으로 써야 한다. 
    }
})

export default api;