require('dotenv').config();//se cargan las variables de dotenv

const app = require('./app');//se llama a app q es el backend
const { sequelize } = require('./models');
const db = require('./models');//se llama a db q es la base de datos

const PORT = process.env.PORT || 3000;

// async function main(){
//     await sequelize.sync({force:false})
//     db.sequelize.authenticate().then(()=>{
//         console.log('Connected to Databse');
//         app.listen(PORT, ()=>{
//             console.log('Server is running in port', PORT);
//         });
//     }
//     ).catch(err => {
//         console.log('Unable to connect to databse', err);
//     });

// }

db.sequelize.authenticate().then(()=>{
    console.log('Connected to Databse');
    app.listen(PORT, ()=>{
        console.log('Server is running in port', PORT);
    });
}
).catch(err => {
    console.log('Unable to connect to databse', err);
});
