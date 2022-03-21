/************************************/
/*** Import des modules nécessaires */
const express = require( 'express' )
const cors = require( 'cors' )
const checkTokenMiddleware = require( './jsonwebtoken/check' )
const bcrypt = require( 'bcrypt' )

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
const user_router = require( './routes/users' )

const auth_router = require( './routes/auth' )

/******************************/
/*** Mise en place du routage */
app.get( '/', ( req, res ) => res.send( `I'm online. All is OK !1` ) )

app.use( '/users', checkTokenMiddleware, user_router )

app.use( '/auth', auth_router )

app.get( '*', ( req, res ) => res.status( 501 ).send( 'What the hell are you doing !?!1' ) )

/********************************/
/*** Start serveur avec test DB */




