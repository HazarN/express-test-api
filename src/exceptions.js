function InternalServerError(res) {
  res.status(500).json({
    error: 'Internal Server Error (read the terminal)',
  });
}

function NotFound(res) {
  res.status(404).json({
    error: 'The what you are looking for does not exist',
  });
}

function BadRequest(res) {
  res.status(400).json({
    error:
      'The body of your request is missing, malformed(check the syntax), or incorrect',
  });
}

function Conflict(res) {
  res.status(409).json({
    error:
      'There may be some unique constraints in the database that are being violated',
  });
}

module.exports = {
  InternalServerError,
  NotFound,
  BadRequest,
  Conflict,
};
