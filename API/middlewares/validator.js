const { check, validationResult, body } = require("express-validator");

exports.registerRules = () => [
  check('nom', 'nom is required').notEmpty(),
  check('prenom', 'prenom is required').notEmpty(),
  check('cin', 'cin is required').notEmpty(),
  check('cin', 'cin must be 8 numbers').isLength({ min: 8, max: 8 }),
  check('tel', 'tel is required').notEmpty(),
  check('tel', 'tel must be 8 numbers').isLength({ min: 8, max: 8 }),
  check('email', 'email is required').notEmpty(),
  check('email', 'check your email again').isEmail(),
  check('password', 'password must be 6 to 20 characters').isLength({ min: 6, max: 20 }),
  check('role', 'role is required').notEmpty(),

  // Champs conditionnels si role === 'etudiant'
  body('gouvernorat').custom((value, { req }) => {
    if (req.body.role === 'etudiant' && (!value || value.trim() === '')) {
      throw new Error('gouvernorat is required for etudiant');
    }
    return true;
  }),
  body('adresse').custom((value, { req }) => {
    if (req.body.role === 'etudiant' && (!value || value.trim() === '')) {
      throw new Error('adresse is required for etudiant');
    }
    return true;
  }),
  body('code_postal').custom((value, { req }) => {
    if (req.body.role === 'etudiant') {
      if (!value || value.trim() === '') {
        throw new Error('code_postal is required for etudiant');
      }
      if (value.length !== 4) {
        throw new Error('code_postal must be 4 digits');
      }
    }
    return true;
  }),
  body('about').custom((value, { req }) => {
    if (req.body.role === 'etudiant' && (!value || value.trim() === '')) {
      throw new Error('about is required for etudiant');
    }
    return true;
  }),
  body('institut').custom((value, { req }) => {
    if (req.body.role === 'etudiant' && (!value || value.trim() === '')) {
      throw new Error('institut is required for etudiant');
    }
    return true;
  }),
  body('niveau').custom((value, { req }) => {
    if (req.body.role === 'etudiant' && (!value || value.trim() === '')) {
      throw new Error('niveau is required for etudiant');
    }
    return true;
  }),
  body('age').custom((value, { req }) => {
    if (req.body.role === 'etudiant' && (!value || isNaN(value))) {
      throw new Error('age is required and must be a number for etudiant');
    }
    return true;
  }),
  body('photo').custom((_, { req }) => {
    if (req.body.role === 'etudiant' && !req.file) {
      throw new Error('photo file is required for etudiant');
    }
    return true;
  }),
  
];

exports.loginRules = () => [
  check('email', 'email is required').notEmpty(),
  check('email', 'check your email again').isEmail(),
  check('password', 'password must be 6 to 20 characters').isLength({ min: 6, max: 20 }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({ msg: el.msg })),
    });
  }
  next();
};
