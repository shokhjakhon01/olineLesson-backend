import subcategoryModel from "../models/subcategory.model.js"
import videoModel from "../models/video.model.js"
import {
  BadRequest,
  InternalServerError,
  NotFountError,
} from "../utils/error.js"
import path from "path"
import fs from "fs"
import { VideoSchema } from "../utils/validation.js"

const GET_ID = async (req, res, next) => {
  try {
    const { videoId } = req.params
    const videoInfo = await subcategoryModel.getVideoWithCommentsAndUser(
      videoId
    )

    if (!videoInfo || videoInfo.length === 0) {
      next(new NotFountError(404, "Video not found"))
    }

    res.status(200).json({
      status: 200,
      message: videoInfo[0].video_title,
      data: videoInfo,
    })
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
}

const POST_VIDEO = async (req, res, next) => {
  try {
    const { sup_category_id, title } = req.body
    const { error } = VideoSchema.validate(req.body)

    if (error) {
      throw new BadRequest(400, error.message)
    }

    const userId = req.user.user_id

    const videoLink = `/videos/${req.files[0].filename}`
    console.log(videoLink)
    const newVideo = await videoModel.createVideo(
      userId,
      title,
      sup_category_id,
      videoLink
    )

    res.status(201).json({
      status: 201,
      message: "Video created successfully.",
      data: newVideo,
    })
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
}

const GET_SINGLE_VIDEO = async (req, res) => {
  try {
    const { id } = req.params
    return res.sendFile(path.join(process.cwd(), "src/uploads", id))
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
}

const UPDATE_VIDEO = async (req, res, next) => {
  try {
    const { sup_category_id, title, link } = req.body

    const video = await videoModel.findByIdAndUpdate(
      sup_category_id,
      title,
      link,
      req.params.id,
      req.user.user_id
    )

    if (video.length === 0) {
      return next(
        new BadRequest(
          400,
          "You cannot update this video because it doesnt relate to"
        )
      )
    }

    res.status(200).json({
      status: 200,
      message: "Video updated successfully.",
      data: video,
    })
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
}

const DELETE_VIDEO = async (req, res, next) => {
  try {
    const deletedVideo = await videoModel.findByIdAndDelete(
      req.params.id,
      req.user.user_id
    )

    if (deletedVideo.length === 0) {
      return next(
        new BadRequest(
          400,
          "You cannot delete this video because it doesnt relate to"
        )
      )
    }

    const link = deletedVideo[0].link.split("/")[2]
    const videoFilePath = path.join(process.cwd(), "src/uploads", link)
    console.log(link)
    fs.unlinkSync(videoFilePath)

    res.status(200).json({
      status: 200,
      message: "Video deleted successfully.",
      data: deletedVideo,
    })
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
}

export default {
  GET_ID,
  POST_VIDEO,
  GET_SINGLE_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
}
