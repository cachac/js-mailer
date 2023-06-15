export const errorHandler = (err, req, res, next) => {
  const isObject = err.message && typeof err.message === "object";

  console.error(
    `Code: [${err.code}]  (${req.originalUrl} - ${req.method} - ${req.ip}) ${
      !isObject ? err.message : ""
    }`,
    err.message
  );

  return res
    .status(err.status || 500)
    .send({ errorCode: err.code, errorMessage: err.userMessage });
};
