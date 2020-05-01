import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.usersTable,
    Key: {
      userID: event.requestContext.identity.cognitoIdentityId,
      menuID: 'MENU#' + event.pathParameters.date
    }
  };

  await dynamoDb.delete(params);
  return { status: true };
});
