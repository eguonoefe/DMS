import db from '../models';
import validate from '../helpers/Validate';
import authenticate from '../helpers/authenticate';

/**
 * @class User
 */
class User {
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} - saved user information
   * @memberof User
   */
  static create(req, res) {
    validate.user(req);
    const validateErrors = req.validationErrors();
    if (validateErrors) {
      res.status(403).send({ error: validateErrors });
    } else {
      db.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (user !== null) {
            res.status(400).send({ message: 'Email already exists' });
          } else {
            return db.User.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password
            })
              .then((newUser) => {
                newUser.save()
                  .then((savedUser) => {
                    const userInfo = authenticate.setUserInfo(savedUser);
                    const token = authenticate.generateWebToken(userInfo);
                    res.status(200).send({
                      message: 'Signup successful',
                      userData: savedUser,
                      token: `JWT ${token}`
                    });
                  }).catch((error) => {
                    res.send(error);
                  });
              })
              .catch((error) => {
                res.status(400).send({
                  message: "we're sorry, we couldn't sign you up",
                  error
                });
              });
          }
        });
    }
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberof User
   */
  static login(req, res) {
    validate.user(req);
    const validateErrors = req.validationErrors();
    if (validateErrors) {
      res.status(403).send({ error: validateErrors });
    } else {
      db.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
          const verifyUser = authenticate.verifyPassword(
            req.body.password, user.password);
          if (!user) {
            res.status(400).send({ message: 'User does not exist' });
          } else if (verifyUser) {
            const userInfo = authenticate.setUserInfo(user);
            const token = authenticate.generateWebToken(userInfo);
            res.status(200).send({
              message: 'login successful',
              userData: user,
              token: `JWT ${token}`
            });
          } else {
            res.status(401).send({ message: 'Invalid password' });
          }
        })
        .catch((error) => {
          res.status(400).send({
            message: "we're sorry, we couldn't log you in",
            error
          });
        });
    }
  }
}

export default User;
