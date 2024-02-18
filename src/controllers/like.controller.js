import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "Video Id required");
  }
  const likedBy = req.user._id; //if user logged in
  try {
    const existingLike = await Like.findOne({ video: videoId, likedBy });
    if (existingLike) {
      await existingLike.deleteOne();
      res.status(200).json(new ApiResponse(200, "Like Removed Successfully"));
    } else {
      const newLike = await Like.create({
        video: videoId,
        likedBy,
      });
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            await newLike.populate("likedBy", "username"),
            "Like Added Successfully"
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, "Error While Toggling like button in a video")
      );
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new ApiError(400, "comment Id required");
  }
  const likedBy = req.user._id; //if user logged in
  try {
    const existingLike = await Like.findOne({ comment: commentId, likedBy });
    if (existingLike) {
      await existingLike.deleteOne();
      res.status(200).json(new ApiResponse(200, "Like Removed Successfully"));
    } else {
      const newLike = await Like.create({
        comment: commentId,
        likedBy,
      });
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            await newLike.populate("likedBy", "username"),
            "Like Added Successfully"
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, "Error While Toggling like button in a comment")
      );
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId) {
    throw new ApiError(400, "tweet Id required");
  }
  const likedBy = req.user._id; //if user logged in
  try {
    const existingLike = await Like.findOne({ tweet: tweetId, likedBy });
    if (existingLike) {
      await existingLike.deleteOne();
      res.status(200).json(new ApiResponse(200, "Like Removed Successfully"));
    } else {
      const newLike = await Like.create({
        tweet: tweetId,
        likedBy,
      });
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            await newLike.populate("likedBy", "username"),
            "Like Added Successfully"
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, "Error While Toggling like button in a comment")
      );
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
    
  });

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
