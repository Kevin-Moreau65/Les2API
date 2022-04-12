/***********************************/
/*** Import des module nécessaires */
const express = require( 'express' )
const checkTokenMiddleware = require( '../jsonwebtoken/check' )
const articleCtrl = require( '../controllers/article' )
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

router.get( '/', articleCtrl.getAllArticle )
router.get( '/:id', articleCtrl.getOneArticle )
//admin
router.post( '/', /*checkTokenMiddleware,*/ articleCtrl.newArticle )
router.patch( '/:id', /*checkTokenMiddleware,*/ articleCtrl.updateArticle )
router.delete( '/:id', /*checkTokenMiddleware,*/ articleCtrl.deleteArticle )
module.exports = router