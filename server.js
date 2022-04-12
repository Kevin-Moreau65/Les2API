/************************************/
/*** Import des modules nécessaires */
const express = require( 'express' )
const cors = require( 'cors' )
const bcrypt = require( 'bcrypt' )
const mongonection = require( './db.config' )
const routeArticle = require( './routes/article' )
const schemaArticle = require( './schemas/article' )

/************************************/
/*** Import de la connexion à la DB */

/*****************************/
/*** Initialisation de l'API */
const app = express()

app.use( cors() )
app.use( express.json( { limit: "50mb" } ) )
app.use( express.urlencoded( { extended: true } ) )

/***********************************/
/*** Import des modules de routage */
// const user_router = require( './routes/users' )

// const auth_router = require( './routes/auth' )

/******************************/
/*** Mise en place du routage */
app.use( '/article', routeArticle )
app.use( '/health', ( req, res ) => res.status( 200 ).json( { message: "OK" } ) )
// app.use( '/users', checkTokenMiddleware, user_router )

// app.use( '/auth', auth_router )

app.get( '*', ( req, res ) => res.status( 501 ).send( 'What the hell are you doing !?!1' ) )



/********************************/
/*** Start serveur avec test DB */


mongonection
    .then( () => console.log( 'Database connection OK' ) )
    .then( async () => {
        const articles = await schemaArticle.find()
        if ( articles.length === 0 ) {
            console.log( 'Aucun article trouvé' )
        }
        console.log( articles )
    } )
    .then( () => {
        app.listen( process.env.SERVER_PORT, () => {
            console.log( `This server is running on port ${ process.env.SERVER_PORT }. Have fun !` )
        } )
    } )
    .catch( err => console.log( 'Database Error', err ) )