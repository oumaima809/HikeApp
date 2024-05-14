const express = require('express');
// const mysql = require('mysql');
const multer = require('multer');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite')
})
// Example using db.all() to retrieve multiple rows
db.all('SELECT * FROM randonnee', (err, rows) => {
    if (err) {
        console.error('Error executing query:', err.message);
    } else {
        console.log('Rows:', rows);
    }
});
db.all('SELECT * FROM utilisateur', (err, rows) => {
    if (err) {
        console.error('Error executing query:', err.message);
    } else {
        console.log('Rows:', rows);
    }
});




const app = express();

app.use(express.static(__dirname + '/client'));
app.use(express.json());

app.get('/',(req,res)=>{
   res.sendFile('/index.html',{root : __dirname+ '/client'});
});

app.get('/api/randonnees',(req,res)=>{

    db.all('SELECT * FROM randonnee ORDER by nom', (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
        } 
        console.log("this is data");
        res.end(JSON.stringify(rows));
    });
    
})

app.get('/randonnee/',(req,res)=>{
   
   
    res.sendFile('/randonnee.html',{root : __dirname+ '/client'});
    
})
app.get('/api/randonnees/:id',(req,res)=>{
    
    const id = req.params.id;
    console.log(id);
    db.get('SELECT * FROM randonnee WHERE id = ? ', id, (err, row) => {
        if (err) {
            console.error('Error executing query:', err.message);
        } 
        console.log(row)
        res.end(JSON.stringify(row));
    });
 });
 app.get('/contribuer/',(req,res)=>{
   
   
    res.sendFile('/contribuer.html',{root : __dirname+ '/client'});
    
})
// Start by creating some disk storage options:
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/client/images');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })
  
// Set saved storage options:
const upload = multer({ storage: storage })

app.post("/contribuer", upload.array("files"), (req, res) => {
// Sets multer to intercept files named "files" on uploaded form data

    console.log(req.body); // Logs form body values
    console.log(req.files); // Logs any files
    const data= req.body;
    const nom=data.nom;
   const depart = data.depart;
   const description = data.description;
   const score = data.score;
   const photo = '/images/'+req.files[0].originalname;
   console.log(nom)
     const values = [nom, depart, description,score,photo]; // Wrap values in an array
    console.log(values)
    // Insert data into the database
    db.run('INSERT INTO randonnee (nom, depart, description_,score,photo) VALUES (?,?,?,?,?)', values, (err) => {
        if (err) {
            
            res.writeHead(500);
            return res.end('Error adding data to database');
        }
        console.log("Data added to database:");
         res.redirect('/');
    });
   

});
app.get('/connexion/',(req,res)=>{
   
   
    res.sendFile('/connexion.html',{root : __dirname+ '/client'});
    
})


app.post('/connecter', (req, res) => {
    const formData = req.body; // JSON data will be available in req.body
    console.log(req.body);
    const identifiant = formData.identifiant;
    const password_ = formData.password;
    const nouveau = formData.nouveau ;

    db.get(`SELECT COUNT(*) AS num FROM utilisateur WHERE identifiant = ?`, [identifiant], (err,row) => {
        if (err) {
            
            console.log(err)
           
        }
        console.log(`Number of rows for identifiant ${identifiant}: ${row.num}`);
        const result = row.num
        if (nouveau && result === 1) {
            console.log("utilisateur existe déjà");
            const erreur = [{
                connected : '0',
                msg:'utilisateur existe déjà'
            }]
            res.json(erreur)
        } else if (!nouveau && result === 0) {
            console.log("utilisateur n'existe pas");
            const erreur = [{
                 connected : '0' ,               
                msg:"utilisateur n'existe pas"
            }]
            res.json(erreur)
        } else if (nouveau && result === 0) {
            db.run('INSERT INTO utilisateur (identifiant, password_, nouveau) VALUES (?, ?, ?)', [identifiant, password_, nouveau], (err) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500);
                    return res.end('Error adding data to database');
                }
                console.log("Data added to database");
                const erreur = [{
                connected : '1',
                    msg:'Bienvenue dans Mouhatdi Hike'
                }]
                res.json(erreur)
            });
        }
            

    });
    
   
  
    
});









app.listen(3000,()=>{
    console.log("listening on port 3000")
})