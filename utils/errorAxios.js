exports.handleError = ( res, err, api ) => {
    if ( !err.request ) {
        console.log( "Error axios", error.message )
        return res.status( 500 ).json( { error: error.message } )
    }
    if ( !err.response ) {
        console.log( `Error API ${ api }`, error.message )
        return res.status( 500 ).json( { error: err.message } )
    }
    if ( err.response ) return res.status( err.response.status ).json( { error: err.response.data } )

}