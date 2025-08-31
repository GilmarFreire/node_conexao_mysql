const express = require('express')
const env = require('dotenv')

const {buscarClientes, buscarClienteCodigo, buscarClienteStatus} = require('./src/DAO/cliente/buscar_cliente.js')
const {buscarCategorias, buscarCategoriaId, buscarCategoriaNome} = require('./src/DAO/categorias/buscar_categoria.js')
const { buscarEnderecos, buscarEnderecoCidade } = require('./src/DAO/enderecos/buscar_endereco.js')
const { buscarItemPedido, buscarItemPedidoQtd } = require('./src/DAO/item_pedido/item_pedido.js')
const { buscarPedido, buscarPedidoCliente } = require('./src/DAO/pedido/pedido.js')
const { buscarStatus } = require('./src/DAO/status/buscar_status.js')
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

app.get('/firma/1.0.0/status', async(req, res)=>{

    let status = await buscarStatus()
    res.json(status)
})


app.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let cliente = await buscarClienteCodigo(codigo)
    res.json(cliente)
})

app.get('/firma/1.0.0/cliente/status/:id_status', async (req, res) =>{
    let id_status = parseInt( req.params.id_status)
    let cliente = await buscarClienteStatus(id_status)
    res.json(cliente)
})

app.get('/firma/1.0.0/categoria/id/:id', async (req, res) =>{
    let id = parseInt( req.params.id)
    let categoria = await buscarCategoriaId(id)
    res.json(categoria)
})
app.get('/firma/1.0.0/categoria/nome/:nome', async (req, res) =>{
    let nome = req.params.nome
    let categoria = await buscarCategoriaNome(nome)
    res.json(categoria)
})

app.get('/firma/1.0.0/categoria/nome/:nome', async (req, res) =>{
    let nome = req.params.nome
    let categoria = await buscarCategoriaNome(nome)
    res.json(categoria)
})

app.get('/firma/1.0.0/endereco/cidade/:cidade', async (req, res) =>{
    let cidade = req.params.cidade
    let endereco = await buscarEnderecoCidade(cidade)
    res.json(endereco)
})

app.get('/firma/1.0.0/Itempedido/qtd/:qtd', async (req, res) =>{
    let qtd = parseInt( req.params.qtd)
    let Itempedido = await buscarItemPedidoQtd(qtd)
    res.json(Itempedido)
})

app.get('/firma/1.0.0/pedido/cliente_id/:id', async (req, res) =>{
    let cliente_id = parseInt( req.params.id)
    let pedido = await buscarPedidoCliente(cliente_id)
    res.json(pedido)
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