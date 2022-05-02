import Video from "../models/Video";

/* 
Video.find({}, (error, videos) => {
}); 
*/

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: `Home`, videos });
};
export const watch = (req, res) => {
  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  return res.render("watch", { pageTitle: `Watching` }); //watch.pug 위한 pageTitle 변수 지정
};
export const getEdit = (req, res) => {
  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  return res.render("edit", { pageTitle: `Editing` });
}; // form을 화면에 보여주는 녀석
export const postEdit = (req, res) => {
  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  const { title } = req.body; // form의 body에서 오는 title 획득, name="" 없으면 읽어올 수 없음
  return res.redirect(`/videos/${id}`); // 수정된 데이터를 다시 돌려보냄
}; // form 변경 사항을 저장해주는 녀석

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  await Video.create({
    title,
    description,
    createAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: { views: 0, rating: 0 },
  });
  return res.redirect("/");
};
