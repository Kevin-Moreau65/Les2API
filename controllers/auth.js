const User = require( '../schemas/user' )
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const login = ( req, res ) => {
    const { username, pwd } = req.body
    if ( !username || !pwd ) return res.status( 401 ).json( { message: "Utilisateur ou mot de passe incorrect" } )
    User.findOne( { pseudo: username }, ( err, user ) => {
        if ( !user ) return res.status( 401 ).json( { message: "Utilisateur ou mot de passe incorrect" } )
        bcrypt.compare( pwd, user.pwd, function ( err, res ) {
            if ( err ) return res.status( 500 ).json( { message: "Server ERR", error: err } )
            if ( res ) {
                const token = jwt.sign( { username: pseudo }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING } )
                return res.status( 200 ).json( { message: "OK", token } )
            }
            return res.status( 401 ).json( { message: "Utilisateur ou mot de passe incorrect" } )
        } );
    } )
}