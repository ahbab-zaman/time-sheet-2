const express = require("express");
const apiRouter = express.Router();

// Define your route configurations here
const routers = [
//   {
//     path: "/auth",
//     router: null, // replace with actual router when ready
//   },
//   {
//     path: "/users",
//     router: null,
//   },
];

// Loop through and attach when available
routers.forEach(({ path, router, middlewares }) => {
  if (router) {
    if (middlewares && middlewares.length > 0) {
      apiRouter.use(path, ...middlewares, router);
    } else {
      apiRouter.use(path, router);
    }
  }
});

module.exports = apiRouter;
