export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

const notFound = (req, res, next) => {
  const err = new Error('404 page not found');
  err.status = 404;
  next(err);
};

const catchErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
};

export default { notFound, catchErrors };
