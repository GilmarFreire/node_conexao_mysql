// bibliotecas externas  - importadas com npm
const express = require('express')

// libs internas
const  { buscarClienteCodigo, buscarClientes, buscarClienteStatus } = require( '../DAO/cliente/buscar_cliente.js')
const  { incluirCliente } = require( '../DAO/cliente/inserir_cliente.js')


const router_cliente = express.Router()

router_cliente.use(
    express.urlencoded({
        extended: true
    })
)

router_cliente.use(express.json())


router_cliente.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let cliente = await buscarClienteCodigo(codigo)
    res.json(cliente)
})

router_cliente.get('/firma/1.0.0/cliente/status/:id_status', async (req, res) =>{
    let id_status = parseInt( req.params.id_status)
    let cliente = await buscarClienteStatus(id_status)
    res.json(cliente)
})

router_cliente.get('/firma/1.0.0/clientes', async (req, res) =>{
    
    let clientes = await buscarClientes()
    res.json(clientes)
})

router_cliente.post('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
   let result = await incluirCliente(infos)
    res.json(result)
})

module.exports = router_cliente;