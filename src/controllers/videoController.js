import Video from "../models/Video";
import User from "../models/User";

/* 
Video.find({}, (error, videos) => {
}); 
*/

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: `Home`, videos });
};

export const watch = async (req, res) => {
  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  const video = await Video.findById(id).populate("owner");
  if (!video /* = video === null */) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video }); //watch.pug 위한 pageTitle 변수 지정
};

export const getEdit = async (req, res) => {
  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  if (!video /* = video === null */) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
}; // form을 화면에 보여주는 녀석

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;

  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video /* = video === null */) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`); // 수정된 데이터를 다시 돌려보냄
}; // form 변경 사항을 저장해주는 녀석

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: `Upload Video`,
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(id);
  if (!video /* = video === null */) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
