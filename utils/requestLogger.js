const requestLogger = (req, res, next) => {
  console.log(
    `[REQUEST] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`
  );
  next();
};

export default requestLogger;
