/***********************************/
/*** Import des module nécessaires */
const express = require( 'express' )
const checkTokenMiddleware = require('../jsonwebtoken/check')
const commercialCtrl= require( '../controllers/commercial' )

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

router.get( '/', commercialCtrl.getAllCommercial )
router.get('/:id', commercialCtrl.getOneCommercial)
//admin
router.put('/',checkTokenMiddleware,commercialCtrl.newCommercial)
router.patch('/:id',checkTokenMiddleware,commercialCtrl.updateCommercial)
router.delete('/:id',checkTokenMiddleware,commercialCtrl.deleteCommercial)

module.exports = router