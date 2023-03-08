import mysql from 'mysql';


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sebas1234',
    database: 'ng_pruebalanding_db'

    // host: '82.98.168.205',
    // user: 'admin_ahead',
    // password: 'kl33%L7y',
    // database: 'admin_adlibgestio'
});

mysqlConnection.connect( err => {
    if (err) {
        console.log(`Error al conectarse a la BBDD : \n${err}`);
        return;
    }else {
        console.log('Connexion con la BBDD correcta')
    }
})

export default mysqlConnection;