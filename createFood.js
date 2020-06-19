import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
// import * as uuid from "uuid";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.foodsTable,
    Item: {
      letter: data.letter,
      foodName: data.foodName,
      dateAdded: data.dateAdded,
      createdBy: event.requestContext.identity.cognitoIdentityId,
      carbs: data.carbs,
      proteins: data.proteins,
      fats: data.fats,
      calories: data.calories,
      units: data.units
    },
    ConditionExpression: 'attribute_not_exists(foodName)'
  };

  await dynamoDb.put(params);
  return params.Item;
});
