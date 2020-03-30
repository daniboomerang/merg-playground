const { printSchema } = require('graphql');
const fs = require('fs');

const printSchemaFromBuild = (schema) => {
  const SDLSchema = printSchema(schema);

  fs.writeFile('../data/schema.graphql', SDLSchema, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    // eslint-disable-next-line no-console
    console.log('Schema generated');
  });

  fs.writeFile('../data/schema.json', JSON.stringify(SDLSchema), (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    // eslint-disable-next-line no-console
    console.log('Schema JSON generated');
  });
};

module.exports = printSchemaFromBuild;
