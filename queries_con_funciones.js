const config = require('./config.json');
const Pool = require('pg').Pool

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})

const getUsers = (request, response) => {
    const sql = 'SELECT * FROM getUsers()';
    pool.query(sql, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    const sql = 'SELECT * FROM getUserById($1)';
    pool.query(sql, [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })

  }

  /**
  curl:

  >> curl --data "name=Elaine&email=elaine@example.com"   http://localhost:3000/users
  */
  const createUser = (request, response) => {
    const { name, email } = request.body
    
    const sql = 'CALL createUser($1,$2)'
    pool.query(sql, [name, email], (error, results) => {
      if (error) {
        throw error
      }
      //response.status(201).send(`User added with ID: ${results}`)
      response.status(201).send(`User added`)
      //console.log(results)
    })

  }
  

  /**
  curl:
  
  >> curl -X PUT -d "name=Kramer" -d "email=kramer@example.com"   http://localhost:3000/users/1
  */
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    
    const sql = 'CALL updateUser($1,$2,$3)';
    
    pool.query(sql,[name, email, id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
    
      /*console.log('-------------')
      console.log(request)
      console.log('-------------')
      console.log(request.params)*/
      
    }


  /**
  curl:

  curl -X "DELETE" http://localhost:3000/users/3
  */
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    
    const sql = 'CALL deleteUser($1)';
    pool.query(sql, [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }



  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }