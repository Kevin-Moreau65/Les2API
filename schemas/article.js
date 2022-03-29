const mongoose = require( 'mongoose' );
const { Schema } = mongoose;

const articleSchema = new Schema( {
  nom: { required: true, type: String },
  prix: { required: true, type: String },
  // image: { required: true, type: String }
} );

const article = mongoose.model( "Article", articleSchema )


module.exports = article