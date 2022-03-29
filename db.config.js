/************************************/

const mongoose = require("mongoose")

/*** Import des modules nécessaires */
/************************************/
/*** Connexion à la base de données */

const mongonection = mongoose.connect(`mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.${process.env.DB_ID}.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority
`)


module.exports = mongonection