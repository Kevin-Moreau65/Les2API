const axios = require( 'axios' )
const utilsAxios = require( '../utils/errorAxios' )
const article = axios.create( { baseURL: `http://${ process.env.API_ARTICLE }:${ process.env.PORT_ARTICLE }` } )
const commercial = axios.create( { baseURL: `http://${ process.env.API_COMMERCIAL }:${ process.env.PORT_COMMERCIAL }` } )
exports.newVilla = async ( req, res ) => {
    let data = {
        article: undefined,
        commercial: undefined
    }
    const { nom, prix, image_article, images_comm, description, pdf } = req.body
    const { authorization } = req.headers
    let headers = {
        authorization
    }
    if ( !nom || !prix || !image_article || !images_comm || !description || !pdf ) return res.status( 401 ).json( { message: "Bad Request" } )
    try {
        const response_article = await article.post( '/article', {
            headers,
            nom,
            prix,
            img: image_article
        } )
        data.article = { ...response_article.data }
        const response_commercial = await commercial.post( '/commercial', {
            headers,
            imgs: [ ...images_comm ],
            id: data.article.data._id,
            description,
            pdf
        } )
        data.commercial = { ...response_commercial.data }
        return res.status( 201 ).json( { message: 'OK', data } )
    } catch ( err ) {
        if ( data.article === undefined ) return utilsAxios.handleError( res, err, "Article" )
        return utilsAxios.handleError( res, err, "Commercial" )
    }
}
exports.modifyVilla = async ( req, res ) => {
    const { id } = req.params
    let modified = false
    if ( !id ) return res.send( 400 ).json( { message: "Bad request" } )
    const { authorization } = req.headers
    let headers = {
        authorization
    }
    const { nom, prix, image_article, images_comm, description, pdf } = req.body
    if ( !nom && !prix && !image_article && !images_comm && !description && !pdf ) return res.status( 401 ).json( { message: "Bad Request" } )
    try {
        if ( nom || prix || image_article ) {
            await article.patch( `/article/${ id }`, { headers, nom, prix, img: image_article } )
            modified = true
        }
        if ( images_comm || description || pdf ) {
            await commercial.patch( `/article/${ id }`, {
                headers,
                imgs: { ...images_comm },
                description,
                pdf
            } )
            modified = true
        }
        if ( !modified ) return res.status( 400 ).json( { message: "Bad Request" } )
        return res.status( 200 ).json( { message: "Villa modifiée !" } )
    } catch ( err ) {
        return utilsAxios.handleError( res, err, "Commercial" )
    }
}
exports.deleteVilla = async ( req, res ) => {
    const { id } = req.params
    if ( !id ) return res.send( 400 ).json( { message: "Bad request" } )
    const { authorization } = req.headers
    let headers = {
        authorization
    }
    try {
        await article.delete( `/article/${ id }`, { headers } )
        await commercial.delete( `/article/${ id }`, { headers } )
        return res.status( 201 ).json( { message: "OK" } )
    } catch ( err ) {
        return utilsAxios.handleError( res, err, "Commercial" )
    }
}
exports.getVillas = ( req, res ) => {
    article.get( '/article' )
        .then( ( response ) => res.status( 200 ).json( { data: response.data } ) )
        .catch( err => utilsAxios.handleError( res, err, "Article" ) )
}
exports.getVilla = async ( req, res ) => {
    let data = {
        article: undefined,
        commercial: undefined
    }
    let error_article = undefined
    const { id } = req.params
    if ( !id ) return res.send( 400 ).json( { message: "Bad request" } )
    try {
        const response_article = await article.get( `/article/${ id }` )
        data.article = { ...response_article.data }
    } catch ( err ) {
        error_article = err
    } finally {
        try {
            const response_commercial = await commercial.get( `/article/${ id }` )
            data.commercial = { ...response_commercial.data }
            return res.status( 200 ).json( { data } )
        } catch ( err ) {
            return utilsAxios.handleError( res, err, error_article ? "Article et Commercial" : "Commercial" )
        }
    }
}