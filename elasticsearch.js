const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  cloud: {
    id: 'SearchSystemAirmart:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGUyOWVjM2MxNDFiNzQ1ZjU4NjM0NTQ0OWY3OWJhYjMyJGUyOTkyMDVlNzc1ODRlNmQ4NTRhMzJkOGY5ZjgxYzI5',
  },
  auth: {
    username: 'elastic',
    password: 'htvWeyPd3npo0gWtTlkgnYF6'
  }
})

module.exports = client;