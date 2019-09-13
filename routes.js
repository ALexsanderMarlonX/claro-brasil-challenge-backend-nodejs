const express = require('express');
const passport = require('passport');
require('./src/config/auth')(passport);

const routes = express.Router();

const UserRegisterControl = require('./src/controllers/UserRegisterControl');
const UserAddDeviceControl = require('./src/controllers/UserAddDeviceControl');
const Controlls = require('./src/controllers/Controlls');

routes.post('/:userId/add/device', UserAddDeviceControl.store);
routes.post('/user/register', UserRegisterControl.store);
routes.delete('/:userId/delete/:deviceId', Controlls.delete);
routes.put('/:userId/put/:deviceId', Controlls.update);

routes.get('/user/logout', (req, res) => {
  req.logout();
  res.json({ msg: 'Successfully logged out' });
});


//req.params.user

routes.get('/user/login/failure', (req, res) => {
  res.json({ msg: 'Error LogIn' });
});

routes.get('/user/login/success', (req, res) => {
  res.json({ msg: req.user });
});

routes.post('/user/login', (req, res, next) => {
  if (req.user === undefined) {
      return passport.authenticate('local', {
          successRedirect: '/user/login/success',
          failureRedirect: '/user/login/failure'
      })(req, res, next);
  }

  res.json({ msg: 'You are already logged in' });
});

module.exports = routes;