const {conexao} = require('../conexao.js')


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