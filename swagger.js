const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Measurements API",
      version: "1.0.0",
      description: "API for managing user health measurements",
    },
    servers: [
      {
        url: "http://localhost:5050",
      },
    ],
  },
  apis: ["./routs/*.js"], // נתיבים שבהם Swagger יחפש תיעוד
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:5050/api-docs");
}

module.exports = setupSwagger;