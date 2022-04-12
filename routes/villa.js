const axios = require( 'axios' )
const article = axios.create( { baseURL: `http://${ process.env.API_ARTICLE }:${ process.env.API_PORT }` } )
// const commercial = axios.create({baseURL: `http://${ process.env.API_COMMERCIAL }:${ process.env.API_PORT }`})