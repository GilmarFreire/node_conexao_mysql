const express = require('express')
const env = require('dotenv')

const {buscarClientes, buscarClienteCodigo, buscarClienteStatus} = require('./src/DAO/cliente/buscar_cliente.js')
const {buscarCategorias, buscarCategoriaId, buscarCategoriaNome} = require('./src/DAO/categorias/buscar_categoria.js')
const { buscarEnderecos, buscarEnderecoCidade } = require('./src/DAO/enderecos/buscar_endereco.js')
const { buscarItemPedido, buscarItemPedidoQtd } = require('./src/DAO/item_pedido/buscar_item_pedido.js')
const { buscarPedido, buscarPedidoCliente } = require('./src/DAO/pedido/buscar_pedido.js')
const { buscarStatus, buscarStatusId } = require('./src/DAO/status/buscar_status.js')
const { buscarProdutos, buscarProdutoIdCategoria } = require('./src/DAO/produtos/produto.js')
const {incluirCliente} = require('./src/DAO/cliente/inserir_cliente.js')
const { incluirCategoria } = require('./src/DAO/categorias/inserir_categoria.js')
const { incluirEndereco } = require('./src/DAO/enderecos/inserir_endereco.js')
const { deletarCliente } = require('./src/DAO/cliente/deletar_cliente.js')
const { editarParcialmenteCliente } = require('./src/DAO/cliente/editar_parcialmente_cliente.js')
const { editarIntegralmenteCliente } = require('./src/DAO/cliente/editar_integralmente_cliente.js')
const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')
const { incluirItemPedido } = require('./src/DAO/item_pedido/inserir_item_pedido.js')
const { incluirPedido } = require('./src/DAO/pedido/inserir_pedido.js')
const { incluirProduto } = require('./src/DAO/produtos/inserir_produto.js')
const { incluirStatus } = require('./src/DAO/status/inserir_status.js')






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

app.get('/firma/1.0.0/produtos', async(req, res)=>{

    let produtos = await buscarProdutos()
    res.json(produtos)
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

app.get('/firma/1.0.0/status/:id', async (req, res) =>{
    let id = parseInt( req.params.id)
    let status = await buscarStatusId(id)
    res.json(status)
})

app.get('/firma/1.0.0/produtos/:id', async (req, res) =>{
    let id = parseInt( req.params.id)
    let produtos = await buscarProdutoIdCategoria(id)
    res.json(produtos)
})

app.post('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
   let result = await incluirCliente(infos)
    res.json(result)
})

app.post('/firma/1.0.0/categoria', async (req, res) =>{
    let {id, nome} = req.body
    const infos = [id, nome]
   let result = await incluirCategoria(infos)
    res.json(result)
})

app.post('/firma/1.0.0/endereco', async (req, res) =>{
    let {id, logradouro, cep, numero, bairro,  cidade} = req.body
    const infos = [id, logradouro, cep, numero, bairro,  cidade]
   let result = await incluirEndereco(infos)
    res.json(result)
})

app.post('/firma/1.0.0/itempedido', async (req, res) =>{
    let {id, id_pedido, id_produto, qnt} = req.body
    const infos = [id, id_pedido, id_produto, qnt]
   let result = await incluirItemPedido(infos)
    res.json(result)
})

app.post('/firma/1.0.0/pedido', async (req, res) =>{
    let {numero, data_elaboracao, cliente_id} = req.body
    const infos = [numero, data_elaboracao, cliente_id]
   let result = await incluirPedido(infos)
    res.json(result)
})

app.post('/firma/1.0.0/produto', async (req, res) =>{
    let {codigo,nome, id_categoria, preco} = req.body
    const infos = [codigo,nome, id_categoria, preco]
   let result = await incluirProduto(infos)
    res.json(result)
})

app.post('/firma/1.0.0/status', async (req, res) =>{
    let {id, nome} = req.body
    const infos = [id, nome]
   let result = await incluirStatus(infos)
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