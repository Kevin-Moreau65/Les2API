const axios = require( 'axios' )
const article = axios.create( { baseURL: `http://${ process.env.API_ARTICLE }:${ process.env.API_PORT }` } )
// const commercial = axios.create({baseURL: `http://${ process.env.API_COMMERCIAL }:${ process.env.API_PORT }`})
exports.newVilla = async ( req, res ) => {
    try {
        const { nom, prix, image_article } = req.body
        const response = await article.post( '/article', {
            nom,
            prix,
            img: image_article
        } )
        console.log( `Villa ${ nom } créer` )
        return res.status( response.status ).json( { ...response.data } )
    } catch ( err ) {
        console.log( err );
        return res.status( 500 ).json( { error: err } )
    }
}