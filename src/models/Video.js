import mongoose from "mongoose";

// video의 형태
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

// mongoose에게 DB모델 이름을 알려줌
const Video = mongoose.model("Video", videoSchema);

// 다른 js 파일에 import로 연결 가능
export default Video;
