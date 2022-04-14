const axios = require( 'axios' )
const { response } = require( 'express' )
const article = axios.create( { baseURL: `http://${ process.env.API_ARTICLE }:${ process.env.API_PORT }` } )
const commercial = axios.create( { baseURL: `http://${ process.env.API_COMMERCIAL }:${ process.env.API_PORT }` } )
exports.newVilla = async ( req, res ) => {
    let data
    const { nom, prix, image_article, images_comm, description, pdf } = req.body
    article.post( '/article', {
        nom,
        prix,
        img: image_article
    } ).then( ( response ) => data.article = { ...response.data } ).catch( ( err ) => {
        console.log( err );
        return res.status( 500 ).json( { error: "API Article down" } )
    } )
    commercial.post( '/commercial', {
        imgs: [ ...images_comm ],
        id: data.article._id,
        description,
        pdf
    } ).then( ( response ) => data.commercial = { ...response.data } ).catch( ( err ) => {
        console.log( err );
        return res.status( 500 ).json( { error: "API Commercial down" } )
    } )
    return res.status( 201 ).json( { message: 'OK', data } )
}