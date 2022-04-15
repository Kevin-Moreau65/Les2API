const Commercial = require( '../schemas/commercial' )
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const fs = require( 'fs' )
const checkExtention = ( img, type = "img" ) => {
   if ( !img.extention ) return false
   let ext
   if ( type === "img" ) ext = [ "jpg", "jpeg", "png", "webp" ]
   if ( type === "pdf" ) ext = [ "pdf" ]
   return ext.includes( img.extention )
}
const generateFile = async ( img ) => {
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
exports.getAllCommercial = ( req, res ) => {
   Commercial.find( {}, ( err, articles ) => {
      if ( err ) return res.status( 500 ).json( { message: "Server ERROR", error: err } )
      return res.status( 200 ).json( { message: "OK", articles } )
   } )
}

exports.getOneCommercial = async ( req, res ) => {
   try {
      const id = req.params.id
      const commercial = await Commercial.findById( id )
      if ( !commercial ) return res.status( 404 ).json( { message: "Article non trouvé" } )
      return res.status( 200 ).json( { message: "OK", commercial } )
   } catch ( err ) {
      if ( err.name === 'CastError' ) return res.status( 404 ).json( { message: "Article non trouvé" } )
      return res.status( 500 ).json( { message: "SERVER ERROR", err } )
   }
}

exports.newCommercial = async ( req, res ) => {
   const { id, description, imgs, pdf } = req.body
   if ( !imgs[ 0 ].body || !imgs[ 1 ].body || !imgs[ 2 ].body || !pdf.body ) {
      return res.status( 401 ).json( { message: 'Bad Request' } )
   }
   try {
      let commercial = await Commercial.findById( id )
      if ( commercial !== null ) {
         return res.status( 409 ).json( { message: `La villa ${ nom } existe déjà` } )
      }
      const promise = imgs.map( img => {
         if ( !checkExtention( img ) ) return false
         const filename = generateFile( img )
         return filename
      } )
      const imgsFilename = await Promise.all( promise )
      if ( !checkExtention( pdf, "pdf" ) || imgsFilename.includes( false ) ) return res.status( 401 ).json( { message: 'Bad Request' } )
      const pdfFilename = await generateFile( pdf )
      commercial = await Commercial.create( { _id: id, description, image1: imgsFilename[ 0 ], image2: imgsFilename[ 1 ], image3: imgsFilename[ 2 ], pdf: pdfFilename } )
      return res.json( { message: `Villa ajouté`, data: commercial } )
   } catch ( err ) {
      console.log( err );
      return res.status( 500 ).json( { message: `Database Error`, error: err } )
   }
}

exports.updateCommercial = async ( req, res ) => {
   const { id } = req.params
   if ( !id ) {
      return res.status( 400 ).json( { message: 'Missing parameter' } )
   }
   const { description, imgs, pdf } = req.body
   let data = {}
   if ( description ) data.description = description
   if ( imgs ) {
      for await ( const [ key, img ] of Object.entries( imgs ) ) {
         if ( !checkExtention( img ) ) return res.status( 401 ).json( { message: 'Bad Request' } )
         const filename = await generateFile( img )
         data[ key ] = filename
      }
   }
   if ( pdf ) {
      if ( !checkExtention( pdf, "pdf" ) ) return res.status( 401 ).json( { message: 'Bad Request' } )
      const filename = await generateFile( pdf )
      data.pdf = filename
   }
   try {
      const commercial = await Commercial.findById( id )
      if ( commercial === null ) {
         return res.status( 404 ).json( { message: "Cette villa n'existe pas" } )
      }
      await Commercial.findByIdAndUpdate( id, { ...data } )
      return res.json( { message: 'Villa mis a jour' } )
   } catch ( err ) {
      return res.status( 500 ).json( { message: 'Database Error', error: err } )
   }
}



exports.deleteCommercial = ( req, res ) => {
   let articleId = parseInt( req.params.id )

   if ( !articleId ) {
      return res.status( 400 ).json( { message: 'Missing parameter' } )
   }

   Commercial.deleteOne( { id: articleId } )
      .then( () => res.status( 200 ).json( { message: "OK" } ) )
      .catch( err => res.status( 500 ).json( { message: 'Database Error', error: err } ) )
}