/***********************************/
/*** Import des module nécessaires */
const express = require( 'express' )
const { checkTokenMiddleware } = require( '../jsonwebtoken/check' )
const villaCtrl = require( '../controller/villa' )
/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/**********************************/
/*** Routage de la ressource Auth */

router.get( '/', villaCtrl.getVillas )
router.get( '/:id', villaCtrl.getVilla )
//admin
router.post( '/', villaCtrl.newVilla )
router.patch( '/:id', villaCtrl.modifyVilla )
router.delete( '/:id', villaCtrl.deleteVilla )
module.exports = router