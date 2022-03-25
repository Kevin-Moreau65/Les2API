/************************************/

const mongoose = require("mongoose")

/*** Import des modules nécessaires */
/************************************/
/*** Connexion à la base de données */

const mongonection = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tqs3y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)


module.exports = mongonection