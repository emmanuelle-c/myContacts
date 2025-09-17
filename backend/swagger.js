import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MyContacts API',
    version: '1.0.0',
    description: 'API pour la gestion des utilisateurs et des contacts',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;