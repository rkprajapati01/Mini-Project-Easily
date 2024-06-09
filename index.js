import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import bodyParser from "body-parser";
import authRouter from "./src/routers/auth.router.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

// Creating Express server
const server = express();

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Set the view engine to EJS
server.set("view engine", "ejs");
server.set("views", path.resolve("src", "views"));

// session configuration
server.use(setLastVisit);
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use(ejsLayouts);
server.use(express.static(path.resolve("public")));

// middleware setup for bootstrap icons
server.use(
  "/icons",
  express.static(
    path.join(path.resolve(), "node_modules", "bootstrap-icons", "font")
  )
);

// main router
// Route for the auth router
server.use("/", authRouter);



export default server;
