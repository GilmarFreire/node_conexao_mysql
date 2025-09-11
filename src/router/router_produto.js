// bibliotecas externas  - importadas com npm
const express = require('express')

// libs internas
const  { buscarProdutos, buscarProdutoIdCategoria } = require( '../DAO/produtos/produto.js')
const  {incluirProduto} = require( '../DAO/produtos/inserir_produto.js')


const router_produto = express.Router()

router_produto.use(
    express.urlencoded({
        extended: true
    })
)


module.exports = router_produto;