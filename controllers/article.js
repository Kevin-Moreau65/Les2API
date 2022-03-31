const Article = require( '../schemas/article' )
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const multer = require( 'multer' );
const storage = multer.diskStorage( {
   destination: function ( req, file, cb ) {
      cb( null, 'uploads/' );
   },
   filename: function ( req, file, cb ) {
      cb( null, file.originalname );
   }
} );
function fileFilter ( req, file, cb ) {
   // Allowed ext
   const filetypes = /jpeg|jpg|png/;

   // Check ext
   const extname = filetypes.test( file.originalname.toLowerCase() );
   // Check mime
   const mimetype = filetypes.test( file.mimetype );

   if ( mimetype && extname ) {
      return cb( null, true );
   } else {
      cb( new Error( 'Invalid type!' ) );
   }
}
const upload = multer( { storage, fileFilter } );
const uploadIMG = upload.single( 'articleIMG' )
exports.getAllArticle = ( req, res ) => {
   Article.find( {}, ( err, articles ) => {
      if ( err ) return res.status( 500 ).json( { message: "Server ERROR", error: err } )
      return res.status( 200 ).json( { message: "OK", articles } )
   } )
}

exports.getOneArticle = async ( req, res ) => {
   try {
      const id = req.params.id
      const article = await Article.findById( id )
      if ( !article ) return res.status( 404 ).json( { message: "Article non trouvé" } )
      return res.status( 200 ).json( { message: "OK", article } )
   } catch ( err ) {
      if ( err.name === 'CastError' ) return res.status( 404 ).json( { message: "Article non trouvé" } )
      return res.status( 500 ).json( { message: "SERVER ERROR", err } )
   }
}

exports.newArticle = async ( req, res ) => {
   // uploadIMG( req, res, async err => {
   //    if ( err ) return res.status( 500 ).json( { message: "File error", err } )
   const { nom, prix } = req.body
   if ( !nom || !prix || !req.file ) {
      return res.status( 400 ).json( { message: 'Missing Data' } )
   }
   try {
      let article = await Article.findOne( { nom: nom } )
      if ( article !== null ) {
         return res.status( 409 ).json( { message: `La villa ${ nom } existe déjà` } )
      }

      article = await Article.create( { nom, prix } )
      return res.json( { message: `Villa ajouté`, data: article } )
   } catch ( err ) {
      return res.status( 500 ).json( { message: `Database Error`, error: err } )
   }
   // } )
}

exports.updateArticle = async ( req, res ) => {
   const { id } = req.params
   if ( !id ) {
      return res.status( 400 ).json( { message: 'Missing parameter' } )
   }

   try {
      const article = await Article.findById( id )
      if ( article === null ) {
         return res.status( 404 ).json( { message: "Cette villa n'existe pas" } )
      }


      await Article.findByIdAndUpdate( id, { ...req.body } )
      return res.json( { message: 'Villa mis a jour' } )
   } catch ( err ) {
      return res.status( 500 ).json( { message: 'Database Error', error: err } )
   }
}



exports.deleteArticle = ( req, res ) => {
   let articleId = parseInt( req.params.id )

   if ( !articleId ) {
      return res.status( 400 ).json( { message: 'Missing parameter' } )
   }

   Article.deleteOne( { id: articleId } )
      .then( () => res.status( 204 ).json( {} ) )
      .catch( err => res.status( 500 ).json( { message: 'Database Error', error: err } ) )
}


