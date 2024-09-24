const responseLogger = (req, res, next) => {
  res.on('finish', () => {
    console.log(
      `[RESPONSE] ${res.statusCode} - Body: ${JSON.stringify(
        res.locals.data || {}
      )}`
    );
  });
  next();
};

export default responseLogger;
