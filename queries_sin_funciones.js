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
    pool.query('select * from users order by id asc', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
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
    
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
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
    
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
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
    
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
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