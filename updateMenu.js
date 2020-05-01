import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.usersTable,
    Key: {
      userID: event.requestContext.identity.cognitoIdentityId,
      menuID: 'MENU#' + event.pathParameters.date
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET foods = :foods, lastModified = :lastModified",
    ExpressionAttributeValues: {
      ":foods": data.foods || null,
      ":lastModified": data.lastModified || null
    },

    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);
  return { status: true };
});
