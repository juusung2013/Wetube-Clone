// app을 동작시키는 파일
// server.js에서 분리한 이유는 server.js는 express에 연결된 것과 server의 구성에 관련된 코드만 처리하기 위해

import "dotenv/config";
import "./db"; // db.js 파일 자체를 연결
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 5000;

//Server Listening
const handleListening = () =>
  console.log(`👌Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
