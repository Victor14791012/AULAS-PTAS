const { Client } = require("pg");
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
    res.sendFile(`${__dirname}/views/novo-usuario.html`); 
});

app.listen(8000, () => {
    console.log("Server ouvindo na porta 8000");
});

app.post("/usuarios/novo", (req, res) => {
    const nick = req.body.nickname;
    const nome = req.body.nome;

    client.query(
        `INSERT INTO usuarios(usuario_nickname, usuario_nome)
        values ('${nome}', '${nick}') returning *`,

        (err,result) => {
           if(err){
            res.send("Erro: "+ err);
           } else {
            res.send("Sucesso, veja os dados: "+ JSON.stringify(result.rows));
           }
        }
    );
});

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

client
    .connect()
    .then(() => {
        console.log("Conectado ao banco de dados PostgreSQL");
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });


/* function exibeUsuarioCadastrado(){
    client.query("select * from usuarios", (err, result) => {
        if (err){
            console.error("Erro ao executar a busca: "+ err);
        } else{
            console.log("Resultado: "+ JSON.stringify(result.rows));
        }
        fechaConexao()
    });
}*/

/*function fechaConexao(){
    client
    .end()
    .then(() => {
        console.log("Conexão encerrada!");
    })
    .catch((err) => {
        console.error("Erro ao encerrar conexão: ", err)
    });
}*/

