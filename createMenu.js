import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.usersTable,
    Item: {
      userID: event.requestContext.identity.cognitoIdentityId,
      menuID: data.date,
      foods: data.foods,
      createdAt: data.time
    }
  };

  await dynamoDb.put(params);
  return params.Item;
});
