module.exports = (req, res, next) => {
  if (req.user.credits < 1 ) {
    return res.status(403).send({ error: 'Minimum of 1 credit is needed to use this service. Please click the "Add Credits" button to add credit.' })
  }

  next();
}