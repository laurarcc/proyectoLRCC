//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
//import el fichero items.js que está en la carpeta services
const Items = require('./services/items')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
})

//Aclaración : un endpoint es una URL o dirección específica en un servidor
// al que puedes hacer una solicitud para obtener o enviar datos

//Creación del endpoint: /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)

//Creación del endpoint : /dashboard
app.get('/insertData', async function(req,res,next){
    try{
        res.json(await Items.insertData(req))
    } catch (err) {
        console.error('Error while inserting items' , err.message);
        next(err)
    }
})

//Creación del endpoint : /dashboard
//Normalmente es async function, de momento no hemos visto otras maneras de hacer lo mismo que lo que tenemos aqui
//lo que va entre '' es como vamos a llamar a la función asyncrona, en este caso '/getData', lo demás es igual para todos nuestros endpoints y
//el Items.getData, Items es como nosotros hemos llamado al archivo items.js y el .getData es haciendo referencia a su método con el mismo nombre
app.get('/getData', async function (req, res, next) {
    try{
        res.json(await Items.getData(req)) //si le pasaramos más datos como en el login tendriamos que poner mas cosas pero en este caso no hace falta
    } catch (err) {
        console.error('Error while getting items ', err.message) //Un mensaje de error si el try falla en algún punto por lo que sea
        next(err)
    }
})

//Creación del endpoint : /dashboard
app.get('/deleteData', async function (req, res, next) {
    try{
        res.json(await Items.deleteData(req))
    } catch (err) {
        console.error('Error while deleting items ', err.message)
        next(err)
    }
})