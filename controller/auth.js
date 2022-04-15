const axios = require( 'axios' )
const utilsAxios = require( '../utils/errorAxios' )
const login = axios.create( { baseURL: `http://${ process.env.API_AUTH }:${ process.env.PORT_AUTH }` } )

exports.login = ( req, res ) => {
    const { username, pwd } = req.body
    login.post( '/login', {
        username,
        pwd
    } ).then( ( response ) => res.status( 200 ).json( { ...response.data } ) )
        .catch( ( err ) => utilsAxios.handleError( res, err, "Auth" ) )
}