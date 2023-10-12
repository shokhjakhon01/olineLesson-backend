import express from "express"
import { config } from "dotenv"
import { PORT } from "./config.js"
import { resolve } from "path"
import cors from "cors"
import bodyparser from "body-parser"
import errorsController from "./src/controllers/errors.controller.js"
import categoriesRouter from "./src/routes/categories.routes.js"
import usersRouter from "./src/routes/users.routes.js"
import authRouter from "./src/routes/auth.routes.js"
import videoRouter from "./src/routes/video.routes.js"
import commentsRouter from "./src/routes/comments.routes.js"
import swaggerRouter from "./src/utils/swagger.js"
import multer from "./src/utils/upload.js"

config()

const app = express()

app.use(swaggerRouter)
app.use(cors())
app.use(multer.any("video"))
app.use(bodyparser.json())
app.use(express.static(resolve("src/uploads")))
app.use(authRouter)
app.use("/categories", categoriesRouter)
app.use("/users", usersRouter)
app.use("/videos", videoRouter)
app.use("/comments", commentsRouter)

app.use(errorsController.errorHandler)

app.listen(PORT, () => console.log(`server has been started at ${PORT}`))
