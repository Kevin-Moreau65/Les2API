const mongoose = require( 'mongoose' );
const { Schema } = mongoose;

const commercialSchema = new Schema( {
  nom: { required: true, type: String },
  prix: { required: true, type: String },
  //description:{ required: true, type: String },
  // image1: { required: true, type: String }
  // image2: { required: true, type: String }
  // image3: { required: true, type: String }
} );

const commercial = mongoose.model( "Commercial", commercialSchema )


module.exports = commercial