const {conexao} = require('../conexao.js')


//Busca de lista com todos os Endereços dos Clientes

async function buscarEnderecos(){
  console.log('DAO de Endereco')
    const sql = `SELECT * FROM tbl_endereco;`
    
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

//Busca de lista com todos os Endereços dos Clientes por filtro de cidade

async function buscarEnderecoCidade(cidade){
    const sql = `SELECT * FROM tbl_endereco WHERE cidade = ?`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [cidade]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}


module.exports = {buscarEnderecos, buscarEnderecoCidade}