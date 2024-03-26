const { Client } = require("pg");

const client = new Client({
user:"postgres",
password:"admin",
host:"localhost",
port:"5432",
database:"PlayToWin"
})

client
.connect()
.then(() =>{
    console.log("Conectado ao banco de dados PostgreSQL");
    exibeUsuarioCadastrado();
})
.catch((err) => [
    console.error('Erro: ${err}')
])

function exibeUsuarioCadastrado(){
    client.query("select * from usuarios", (err, result) => {
        if (err){
            console.error("Erro ao executar a busca: "+ err);
        } else{
            console.log("Resultado: "+ JSON.stringify(result.rows));
        }
        fechaConexao()
    });
}

function fechaConexao(){
    client
    .end()
    .then(() => {
        console.log("Conexão encerrada!");
    })
    .catch((err) => {
        console.error("Erro ao encerrar conexão: ", err)
    });
}

require("dotenv").config();

const cliente = new Client({
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,

})