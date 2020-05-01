import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.foodsTable,
    KeyConditionExpression: "letter = :letter",
    ExpressionAttributeValues: {
      ":letter": event.pathParameters.letter
    }
  };

  const result = await dynamoDb.query(params);
  return result.Items;
});
