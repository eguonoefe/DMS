
/**
 * @class Validate
 */
class Validate {
  /**
   * @static
   * @param {any} [req]
   * @memberof Validate
   * @return {void}
   */
  static update(req) {
    const keys = Object.keys(req.body);
    keys.forEach((element, index, array) => {
      if (element === 'email') {
        const email = req.body[element];
        req.checkBody('email', 'Please Input Valid Email').isEmail().notEmpty();
      }
      if (element === 'password') {
        const password = req.body[element];
        req.checkBody('password', 'Password is Required').notEmpty();
      }
      if (element === 'password1') {
        const password1 = req.body[element];
        req.checkBody('password1', 'Passwords do not match').equals(
          req.body.password);
      }
      if (element === 'firstName') {
        const firstName = req.body[element];
        req.checkBody('firstName', 'Must be alphabets').isAlpha();
        req.checkBody('firstName', 'Required').notEmpty();
      }
      if (element === 'lastName') {
        const lastName = req.body[element];
        req.checkBody('lastName', 'Must be alphabets').isAlpha();
        req.checkBody('lastName', 'Required').notEmpty();
      }
    });
  }

  /**
   * @static
   * @param {any} req
   * @return {void}
   * @memberof Validate
   */
  static user(req) {
    let firstName, lastName, email, password, password1;
    if (!req.body.firstName || !req.body.firstName) {
      email = req.body.email;
      password = req.body.password;
      req.checkBody('email', 'Please Input Valid Email').isEmail().notEmpty();
      req.checkBody('password', 'Password is Required').notEmpty();
    } else {
      firstName = req.body.firstName;
      lastName = req.body.lastName;
      email = req.body.email;
      password = req.body.password;
      password1 = req.body.password1;
      req.checkBody('firstName', 'Last Name is Required').notEmpty();
      req.checkBody('firstName', 'Must be alphabets').isAlpha();
      req.checkBody('lastName', 'Last Name is Required').notEmpty();
      req.checkBody('lastName', 'Must be alphabets').isAlpha();
      req.checkBody('email', 'Email is Required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('password', 'Password is Required').notEmpty();
      req.checkBody('password1', 'Passwords do not match').equals(password);
    }
  }

  /**
   * @static
   * @param {any} req
   * @memberof Validate
   * @return {void}
   */
  static role(req) {
    const title = req.body.title;
    const description = req.body.description;

    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('title', 'Must be alphabets').isAlpha();
    req.checkBody('description', 'Descrition is Required').notEmpty();
  }

  /**
   * @static
   * @param {any} req
   * @return {void}
   * @memberof Validate
   */
  static document(req) {
    const title = req.body.title;
    const content = req.body.content;
    const access = req.body.access;

    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('content', 'Content is Required').notEmpty();
    req.checkBody('access', 'Invalid Access Type').isAlpha().notEmpty();
  }
}

export default Validate;

