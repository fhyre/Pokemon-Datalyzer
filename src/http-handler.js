import axios from 'axios';

export default axios.create({
    baseURL: "https://data.mongodb-api.com/app/pokemonbattle-neuut/endpoint/",
    headers: {
        "Content-type": "application/json" 
    }
})
