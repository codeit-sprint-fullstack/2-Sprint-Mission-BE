import { appConfig } from "./appConfig";

const app = appConfig();

app.listen(3000, () => {
  console.log("Server Started");
});
