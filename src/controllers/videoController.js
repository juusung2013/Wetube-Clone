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
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video }); //watch.pug 위한 pageTitle 변수 지정
};
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
