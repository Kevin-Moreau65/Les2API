/************************************/
/*** Import des modules nécessaires */
const express = require( 'express' )
const cors = require( 'cors' )
const checkTokenMiddleware = require( './jsonwebtoken/check' )
const bcrypt = require( 'bcrypt' )
const mongonection = require( './db.config' )
const user = require( './schemas/user' )
const routeAuth = require( './routes/auth' )
/************************************/
/*** Import de la connexion à la DB */

/*****************************/
/*** Initialisation de l'API */
const app = express()

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

/***********************************/
/*** Import des modules de routage */
// const user_router = require( './routes/users' )

// const auth_router = require( './routes/auth' )

/******************************/
/*** Mise en place du routage */
app.get( '/', ( req, res ) => res.send( `I'm online. All is OK !1` ) )

// app.use( '/users', checkTokenMiddleware, user_router )

// app.use( '/auth', auth_router )
app.use( '/login', routeAuth )
app.use( '/health', ( req, res ) => res.status( 200 ).json( { message: "OK" } ) )
app.get( '*', ( req, res ) => res.status( 501 ).send( 'What the hell are you doing !?!1' ) )
/********************************/
/*** Start serveur avec test DB */


mongonection
    .then( () => console.log( 'Database connection OK' ) )
    .then( async () => {
        const users = await user.find()
        console.log( users )
        if ( users.length === 0 ) {
            console.log( "Aucun user, user par défaut en création" )
            const pwdHash = await bcrypt.hash( "nimda", 10 )
            user.create( { pseudo: "admin", pwd: pwdHash }, ( err, user ) => {
                if ( err ) console.log( err )
            } )
        }
    } )
    .then( () => {
        app.listen( process.env.SERVER_PORT, () => {
            console.log( `This server is running on port ${ process.env.SERVER_PORT }. Have fun !` )
        } )
    } )
    .catch( err => console.log( 'Database Error', err ) )