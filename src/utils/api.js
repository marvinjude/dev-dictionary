import Axios from 'axios'

/* Frontend code from src/utils/api.js */
/* Api methods to call /functions */

const functionURL = `http://localhost:9000`
const functionURL2 = `/.netlify/functions`

export const create = data => {
  return fetch(`${functionURL}/todos-create`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

export const helloData = () => {
  return Axios.post(`/.netlify/functions/fetch-questions`,{name: "Marvin Jude"})
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

export const readAll = () => {
  return fetch(`${functionURL}/todos-read-all`).then(response => {
    return response.json()
  })
}

export const update = (todoId, data) => {
  return fetch(`${functionURL}/${todoId}`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

export const deleteTodo = todoId => {
  return fetch(`${functionURL}/${todoId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

export const batchDeleteTodo = todoIds => {
  return fetch(`/.netlify/functions/todos-delete-batch`, {
    body: JSON.stringify({
      ids: todoIds,
    }),
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}
