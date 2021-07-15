const morganFreeman = require("morgan");
const cors = require("cors");
const { app, express } = require("./init");
const { errorGeneral, error404 } = require("./errores");
const login = require("./rutas/login");
const listado = require("./rutas/listado");

app.use(morganFreeman("dev"));
app.use(cors());
app.use(express.json());

app.use("/usuarios", login);
app.use("/items", listado);
app.all("*", (req, res, next) => {
  const origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(error404);
app.use((error, res, req, next) => errorGeneral);
