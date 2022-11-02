const appOption = {
  locals: {
    modules: {
      logger: "morgan",
      cookieParser: "cookie-parser",
    },
    uses: [
      "logger('dev')",
      "express.json()",
      "express.urlencoded({ extended: false })",
      "cookieParser()",
    ],
  },
};

export { appOption };
