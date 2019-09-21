const faunadb = require('faunadb');
const fetch = require('node-fetch');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  const claims = context.clientContext && context.clientContext.user;
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  console.log('Function `create` invoked', data);

  const sendSlackMessage = fetch(process.env.SLACK_WEBHOOK_URL, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ text: event.body })
  });

  const item = {
    data: { products: data, userId: claims.sub }
  };
  /* construct the fauna query */
  const saveOrder = client.query(q.Create(q.Ref('classes/orders'), item));

  return Promise.all([sendSlackMessage, saveOrder])
    .then(response => {
      console.log('success', response);
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    })
    .catch(error => {
      console.log('error', error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
