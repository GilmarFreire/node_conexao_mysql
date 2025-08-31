const {conexao} = require('../conexao.js')


async function buscarPedido(){
  console.log('DAO de Pedidos')
    const sql = `SELECT * FROM tbl_pedido;`
    
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

async function buscarPedidoCliente(id){
    const sql = `SELECT * FROM tbl_pedido WHERE cliente_id = ?`
   
    
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


module.exports = {buscarPedido, buscarPedidoCliente}