const Article = require( '../schemas/article' )
const fs = require( "fs" )
const path = require( "path" )
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const checkExtention = ( img ) => {
   if ( !img.extention ) return false
   const ext = [ "jpg", "jpeg", "png", "webp" ]
   return ext.includes( img.extention )
}
const generateImg = async ( img ) => {
   const { body, extention } = img
   try {
      const time = Date.now()
      const rad = Math.floor( Math.random() * 100000 )
      const filename = `${ time * rad }.${ extention }`
      await fs.promises.writeFile( path.join( process.cwd(), "/uploads", filename ), body, { encoding: "base64" } )
      return filename
   } catch ( err ) {
      console.log( err );
   }
}
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
   const { nom, prix, img } = req.body
   if ( !nom || !prix || !img || !checkExtention( img ) || !img.body ) {
      return res.status( 400 ).json( { message: 'Missing Data' } )
   }
   try {
      let article = await Article.findOne( { nom: nom } )
      if ( article !== null ) {
         console.log( `Tentative de recréation de la villa ${ nom }` );
         return res.status( 409 ).json( { message: `La villa ${ nom } existe déjà` } )
      }
      const image = await generateImg( img )
      article = await Article.create( { nom, prix, image } )
      console.log( `Villa ${ nom } a était crée` );
      return res.json( { message: `Villa ajouté`, data: article } )
   } catch ( err ) {
      return res.status( 500 ).json( { message: `Database Error`, error: err } )
   }
}

exports.updateArticle = async ( req, res ) => {
   const { id } = req.params
   const { img, nom, prix } = req.body
   if ( !id && !nom && !prix && !img ) {
      return res.status( 400 ).json( { message: 'Missing parameter' } )
   }
   try {
      const article = await Article.findById( id )
      if ( article === null ) return res.status( 404 ).json( { message: "Cette villa n'existe pas" } )
      if ( nom && article.nom.toLowerCase() !== nom.toLowerCase() ) {
         const check = await Article.findOne( { nom } )
         if ( check !== null ) return res.status( 409 ).json( { message: "Cette villa existe deja" } )
      }
      const update = { nom, prix }
      if ( img ) {
         if ( !checkExtention( img ) || !img.body ) return res.status( 400 ).json( { message: "Missing parameter" } )
         await fs.promises.rm( path.join( process.cwd(), "/uploads", article.image ) )
         const filename = await generateImg( img )
         update.image = filename
      }
      await Article.findByIdAndUpdate( id, { ...update } )
      console.log( `Villa ${ article.nom } -> ${ nom } mis a jour` )
      return res.json( { message: 'Villa mis a jour' } )
   } catch ( err ) {
      console.log( err );
      return res.status( 500 ).json( { message: 'Database Error', error: err } )
   }
}



exports.deleteArticle = async ( req, res ) => {
   const { id } = req.params

   if ( !id ) {
      return res.status( 400 ).json( { message: 'Missing parameter' } )
   }
   try {
      const article = await Article.findByIdAndDelete( id )
      if ( article === null ) return res.status( 404 ).json( { message: "Cette villa n'existe pas" } )
      await fs.promises.rm( path.join( process.cwd(), "/uploads", article.image ) )
      console.log( `Villa ${ article.nom } supprimé` )
      return res.status( 204 ).json( {} )
   } catch ( err ) {
      return res.status( 500 ).json( { message: "Database error", error: err } )
   }
}


