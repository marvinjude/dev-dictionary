/**Randomly Fetch Questions */

/**Import Firebase */
import firebase from './firebase'; 

/**Write a query to fetch question and order them by Ids */

// let questionsRef = firebase.firestore('questions');



exports.handler = (event, context, callback) => {
  // "event" has informatiom about the path, body, headers etc of the request
  // console.log('event', event)
  
  const data = JSON.parse(event.body);

  console.log(data);
  // "context" has information about the lambda environment and user details
  // console.log('context', context)
  // The "callback" ends the execution of the function and returns a reponse back to the caller
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: '🍀',
    }),
  })
}
