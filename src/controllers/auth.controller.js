import sha256 from "sha256"
import authModel from "../models/auth.model.js"
import { InternalServerError, NotFountError } from "../utils/error.js"
import jwt from "../utils/jwt.js"
import userModel from "../models/users.model.js"

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = sha256(password)

    const existingUser = await userModel.getUser(email, hashedPassword)
    if (existingUser[0]) {
      return next(new NotFountError(404, "User already exists"))
    }

    const user = await authModel.signUp(username, email, hashedPassword)

    return res.status(201).json({
      status: 201,
      message: "User created !",
      token: jwt.sign({ id: user[0].user_id }),
      data: user[0],
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const hashedPassword = sha256(password)
    const user = await authModel.login(email, hashedPassword)

    if (!user[0] || user.length === 0) {
      return next(new NotFountError(404, "User Not found"))
    }

    return res.status(200).json({
      status: 200,
      message: "Succesfully log in !",
      token: jwt.sign({ id: user[0].user_id }),
      data: user[0],
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

export default { signUp, login }
