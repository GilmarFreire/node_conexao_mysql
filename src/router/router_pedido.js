// bibliotecas externas  - importadas com npm
const express = require('express')

// libs internas
const  { buscarPedido, buscarPedidoCliente } = require( '../DAO/pedido/buscar_pedido.js')
const  { incluirPedido } = require( '../DAO/pedido/inserir_pedido.js')


const router_pedido = express.Router()

router_pedido.use(
    express.urlencoded({
        extended: true
    })
)

router_pedido.use(express.json())

router_pedido.get('/firma/1.0.0/pedido', async (req, res) =>{
    
    let pedido = await buscarPedido()
    res.json(pedido)
})

router_pedido.get('/firma/1.0.0/pedido/cliente_id/:id', async (req, res) =>{
    let cliente_id = parseInt( req.params.id)
    let pedido = await buscarPedidoCliente(cliente_id)
    res.json(pedido)
})

router_pedido.post('/firma/1.0.0/pedido', async (req, res) =>{
    let {numero, data_elaboracao, cliente_id} = req.body
    const infos = [numero, data_elaboracao, cliente_id]
   let result = await incluirPedido(infos)
    res.json(result)
})

module.exports = router_pedido;