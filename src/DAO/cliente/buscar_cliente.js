const {conexao} = require('../conexao.js')


async function buscarClientes(){
  console.log('DAO de CLIENTE')
    const sql = `SELECT * FROM tbl_cliente;`
    
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

async function buscarClienteCodigo(codigo){
    const sql = `SELECT * FROM tbl_cliente WHERE codigo = ?`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [codigo]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}
async function buscarClienteStatus(id_status){
    const sql = `SELECT * FROM tbl_cliente WHERE id_status = ?`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [id_status]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

async function buscarClienteFiltro(codigo){
    const sql = `SELECT * FROM tbl_cliente WHERE codigo = ?`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [codigo]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}


module.exports = {buscarClientes, buscarClienteCodigo, buscarClienteStatus}