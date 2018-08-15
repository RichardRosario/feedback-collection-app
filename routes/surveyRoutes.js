const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for giving us your feedback! It means a lot!');
  })

  app.post(
    '/api/surveys', 
    requireLogin, 
    requireCredits, 
    async (req, res) => {
      if(!req.user) {
        return res.status(401).send({ error: 'Please add credit to run your survey.'})}

        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
          title,
          subject,
          body,
          recipients: recipients.split(',').map(email => { 
            return { email: email.trim() }
          }),
          _user: req.user.id,
          dateSent: Date.now()
        });

        //send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
        //error handler
        } catch(err) {
          res.status(422).send(err);
        }
    }
  )
}