import swaggerUi from "swagger-ui-express"
import SwJsdoc from "swagger-jsdoc"
import { Router } from "express"

const router = Router()
const PORT = process.env.PORT || 3000
const swaggerDocument = SwJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Online-lesson Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
        variables: {
          port: {
            enum: [PORT],
          },
        },
      },
    ],
    components: {
      securitySchemes: {
        Token: {
          type: "apiKey",
          name: "token",
          in: "header",
          description: "token",
        },
      },
    },
  },
  apis: [
    "src/docs/users.doc.yaml",
    "src/docs/categories.doc.yaml",
    "src/docs/videos.doc.yaml",
  ],
})
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default router
