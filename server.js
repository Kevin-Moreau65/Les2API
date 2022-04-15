/************************************/
/*** Import des modules nécessaires */
const express = require( 'express' )
const cors = require( 'cors' )
const path = require( "path" )
const helmet = require( "helmet" )
const routeVilla = require( "./routes/villa" )
const routeAuth = require( "./routes/auth" )
/************************************/
/*** Import de la connexion à la DB */

/*****************************/
/*** Initialisation de l'API */
const app = express()

app.use( cors() )
app.use( helmet() )
app.use( helmet.contentSecurityPolicy( {
    useDefaults: true
} ) )
app.use( helmet.dnsPrefetchControl( {
    allow: true
} ) )
app.use( helmet.hidePoweredBy() )
app.use( helmet.noSniff() )
app.use( helmet.xssFilter() )
app.use( express.json( { limit: "50mb" } ) )
app.use( express.urlencoded( { extended: true } ) )

/***********************************/
/*** Import des modules de routage */
// const user_router = require( './routes/users' )

// const auth_router = require( './routes/auth' )

/******************************/
/*** Mise en place du routage */
app.get( '/', ( req, res ) => res.send( `I'm online. All is OK !1` ) )
app.use( '/health', ( req, res ) => res.status( 200 ).json( { message: "OK" } ) )
app.use( '/auth', routeAuth )
app.use( '/article', routeVilla )
app.use( "/media", express.static( './uploads' ) )
// app.use( '/users', checkTokenMiddleware, user_router )

// app.use( '/auth', auth_router )

app.get( '*', ( req, res ) => res.status( 501 ).send( 'What the hell are you doing !?!1' ) )

/********************************/
/*** Start serveur avec test DB */

app.listen( process.env.SERVER_PORT, () => {
    console.log( path.join( process.cwd(), "/uploads" ) )
    console.log( `This server is running on port ${ process.env.SERVER_PORT }. Have fun !` )
} )