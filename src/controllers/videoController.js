let videos = [
  //가짜 데이터베이스
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third  Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];
export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  const video = videos[id - 1]; // videos 변수에서 뽑아온 id값에서 -1하여 대입
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video }); //watch.pug 위한 pageTitle 변수 지정
};
export const getEdit = (req, res) => {
  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  const video = videos[id - 1]; // videos 변수에서 뽑아온 id값에서 -1하여 대입
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
}; // form을 화면에 보여주는 녀석
export const postEdit = (req, res) => {
  const { id } = req.params; // 데이터베이스에서 각 데이터의 id값 뽑아옴
  const { title } = req.body; // form의 body에서 오는 title 획득, name="" 없으면 읽어올 수 없음
  videos[id - 1].title = title; //기존의 title을 새로 얻은 title로 변경
  return res.redirect(`/videos/${id}`); // 수정된 데이터를 다시 돌려보냄
}; // form 변경 사항을 저장해주는 녀석

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};
export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
