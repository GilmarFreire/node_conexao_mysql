const {conexao} = require('../conexao.js')

//Busca de lista com todas as categorisas dos produtos

async function buscarCategorias(){
  console.log('DAO de Categoria')
    const sql = `SELECT * FROM tbl_categoria;`
    
    const conn = await conexao()
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

//Busca de lista com todas as categorisas dos produtos por filtro de ID

async function buscarCategoriaId(id){
    const sql = `SELECT * FROM tbl_categoria WHERE id = ?`
   
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [id]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

//Busca de lista com todas as categorisas dos produtos por filtro de NOME

async function buscarCategoriaNome(nome){
    const sql = `SELECT * FROM tbl_categoria WHERE nome = ?`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [nome]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

module.exports = {buscarCategorias, buscarCategoriaId, buscarCategoriaNome}