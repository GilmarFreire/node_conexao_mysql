const {conexao} = require('../conexao.js')

//Busca de lista com todos os produtos

async function buscarProdutos(){
  console.log('DAO de Produtos')
    const sql = `SELECT * FROM tbl_produtos;`
    
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

//Busca de lista com todos os produtos por categoria

async function buscarProdutoIdCategoria(id){
    const sql = `SELECT * FROM tbl_produtos WHERE id_categoria = ?`
   
    
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


module.exports = {buscarProdutos, buscarProdutoIdCategoria}