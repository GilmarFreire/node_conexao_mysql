// bibliotecas externas  - importadas com npm
const express = require('express')

// libs internas
const {buscarCategoriaId, buscarCategoriaNome, buscarCategorias} = require('../DAO/categorias/buscar_categoria.js')
const{incluirCategoria} = require('../DAO/categorias/inserir_categoria.js')

const router_categoria = express.Router()

router_categoria.use(
    express.urlencoded({
        extended: true
    })
)

router_categoria.use(express.json())

router_categoria.get('/firma/1.0.0/categorias', async (req, res) =>{
    
    let categorias = await buscarCategorias()
    res.json(categorias)
})

router_categoria.get('/firma/1.0.0/categoria/id/:id', async (req, res) =>{
    let id = parseInt( req.params.id)
    let categoria = await buscarCategoriaId(id)
    res.json(categoria)
})
router_categoria.get('/firma/1.0.0/categoria/nome/:nome', async (req, res) =>{
    let nome = req.params.nome
    let categoria = await buscarCategoriaNome(nome)
    res.json(categoria)
})

router_categoria.get('/firma/1.0.0/categoria/nome/:nome', async (req, res) =>{
    let nome = req.params.nome
    let categoria = await buscarCategoriaNome(nome)
    res.json(categoria)
})

router_categoria.post('/firma/1.0.0/categoria', async (req, res) =>{
    let {id, nome} = req.body
    const infos = [id, nome]
   let result = await incluirCategoria(infos)
    res.json(result)
})


module.exports = router_categoria;