const {conexao} = require('../conexao.js')


async function buscarItemPedido(){
  console.log('DAO de ItemPedidos')
    const sql = `SELECT * FROM tbl_itempedido;`
    
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

async function buscarItemPedidoQtd(qtd){
    const sql = `SELECT * FROM tbl_itempedido WHERE qnt = ?`
   
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [qtd]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}


module.exports = {buscarItemPedido, buscarItemPedidoQtd}