export default function handler(lambda) {
  return function (event, context) {
    return Promise.resolve()
    // Run the Lambda
        .then(() => lambda(event, context))
        .then((responseBody) => [200, responseBody])
        .catch((e) => {
          return [500, { error: e.message }];
        })
        .then(([statusCode, body]) => ({
          statusCode,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(body),
        }));
  };
}
