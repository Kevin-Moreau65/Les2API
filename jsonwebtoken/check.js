/***********************************/
/*** Import des module nécessaires */
const jwt = require( 'jsonwebtoken' )

/*************************/
/*** Extraction du token */
const extractBearer = authorization => {

    if ( typeof authorization !== 'string' ) {
        return undefined
    }
    return authorization.split( " " )[ 1 ]
}


/******************************************/
/*** Vérification de la présence du token */
const checkTokenMiddleware = ( req, res, next ) => {

    const token = req.headers.authorization && extractBearer( req.headers.authorization )

    if ( !token ) {
        return res.status( 401 ).json( { message: 'No token' } )
    }

    // Vérifier la validité du token
    jwt.verify( token, process.env.JWT_SECRET, ( err, decodedToken ) => {
        if ( err ) {
            return res.status( 401 ).json( { message: 'Bad token' } )
        }

        next()
    } )
}

module.exports = checkTokenMiddleware