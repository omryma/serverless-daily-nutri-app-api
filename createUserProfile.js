import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
// import * as uuid from "uuid";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.usersTable,
    Item: {
      userID: event.requestContext.identity.cognitoIdentityId,
      menuID: 'PROFILE#' + data.email,
     //TODO Other user things
    }
  };

  await dynamoDb.put(params);
  return params.Item;
});
