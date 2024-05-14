// const mysql = require('mysql');

// //Créer une connexion à la base de données MySQL
// // Créer une connexion à la base de données MySQL
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     port:4306,
//     password: '',
//     database: 'randonnee'
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Database Connected!");
// });
// connection.query('SELECT * FROM randonnees', (err, results) => {
//     if (err) {
        
//         console.log('Error fetching data from database');
//     }
//     console.log("this is data");
//     console.log(results);
    
// });
// module.exports = connection;