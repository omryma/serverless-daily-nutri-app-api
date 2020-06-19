import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.usersTable,
    KeyConditionExpression: "userID = :userID",
    ExpressionAttributeValues: {
      ":userID": event.requestContext.identity.cognitoIdentityId
    },
    ProjectionExpression: "menuID"
  };

  const result = await dynamoDb.query(params);
  return result.Items;
});
