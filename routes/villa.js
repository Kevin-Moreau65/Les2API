/***********************************/
/*** Import des module nécessaires */
const express = require( 'express' )
const checkTokenMiddleware = require( '../jsonwebtoken/check' )
const villaCtrl = require( '../controller/villa' )
/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
// router.use( ( req, res, next ) => {
//     const event = new Date()
//     console.log( 'AUTH Time:', event.toString() )
//     next()
// } )

/**********************************/
/*** Routage de la ressource Auth */

// router.get( '/', villaCtrl.getAllVilla )
// router.get( '/:id', villaCtrl.getOneVilla )
//admin
router.post( '/', /*checkTokenMiddleware,*/ villaCtrl.newVilla )
// router.patch( '/:id', /*checkTokenMiddleware,*/ villaCtrl.updateVilla )
// router.delete( '/:id', /*checkTokenMiddleware,*/ villaCtrl.deleteVilla )
module.exports = router