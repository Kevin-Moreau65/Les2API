const express = require( 'express' )
const { checkTokenMiddleware } = require( '../jsonwebtoken/check' )
const authCtrl = require( '../controller/auth' )
/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/**********************************/
/*** Routage de la ressource Auth */

router.post( '/', checkTokenMiddleware, authCtrl.login )
module.exports = router