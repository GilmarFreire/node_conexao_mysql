const express = require('express')
const env = require('dotenv')

const {buscarClientes, buscarCliente} = require('./src/DAO/cliente/buscar_cliente.js')
const {buscarCategorias} = require('./src/DAO/categorias/buscar_categoria.js')
const { buscarEnderecos } = require('./src/DAO/enderecos/buscar_endereco.js')
const { buscarItemPedido } = require('./src/DAO/item_pedido/item_pedido.js')
const { buscarPedido } = require('./src/DAO/pedido/pedido.js')
const {incluirCliente} = require('./src/DAO/cliente/inserir_cliente.js')
const { deletarCliente } = require('./src/DAO/cliente/deletar_cliente.js')
const { editarParcialmenteCliente } = require('./src/DAO/cliente/editar_parcialmente_cliente.js')
const { editarIntegralmenteCliente } = require('./src/DAO/cliente/editar_integralmente_cliente.js')
const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')


const app = express()
env.config()

app.use(
    express.urlencoded({
        extended: true
    })
  )
  
  app.use(express.json())
  


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/firma/1.0.0/clientes', async (req, res) =>{
    
    let clientes = await buscarClientes()
    res.json(clientes)
})

app.get('/firma/1.0.0/enderecos', async (req, res) =>{

    let enderecos = await buscarEnderecos()
    res.json(enderecos)
})

app.get('/firma/1.0.0/categorias', async (req, res) =>{
    
    let categorias = await buscarCategorias()
    res.json(categorias)
})

app.get('/firma/1.0.0/itempedido', async (req, res) =>{
    
    let itempedido = await buscarItemPedido()
    res.json(itempedido)
})

app.get('/firma/1.0.0/pedido', async (req, res) =>{
    
    let pedido = await buscarPedido()
    res.json(pedido)
})


app.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let cliente = await buscarCliente(codigo)
    res.json(cliente)
})

app.post('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
   let result = await incluirCliente(infos)
    res.json(result)
})

app.put('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [telefone, nome, limite, id_endereco, id_status]
    let result = await editarIntegralmenteCliente(infos, codigo)
    res.status(200).json(result)
})

app.patch('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, campo, valor } = req.body
    let result = await editarParcialmenteCliente(codigo, campo, valor)
    res.status(200).json(result)
})

app.delete('/firma/1.0.0/cliente', async (req, res) =>{
    let { codigo } = req.body
    let result = await deletarCliente(codigo)
    res.json(result)
})

app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})