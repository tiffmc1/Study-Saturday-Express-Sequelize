const router = require('express').Router();
const Student = require('../db/models/student');
const Test = require('../db/models/test');

//EXPRESS = ROUTES
//SEQUELIZE = MODELS/HOOKS
//console.log(Object.keys(<nameoftable>.prototype)) to get list

// GET /tests
router.get('/', async(req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.send(tests);
  } catch (error) {
    next(error);
  }
})

// GET /tests/:id
router.get('/:id', async(req, res, next) => {
  try {
    const testsById = await Test.findByPk(req.params.id);
    if (testsById) {
      res.send(testsById);
    } else {
      res.status(404).send('Test not found');
    }
  } catch (error) {
    next(error);
  }
})

// POST /tests/student/:studentId (updating student info)
router.post('/student/:studentId', async(req, res, next) => { // you need to
  //direct from test ('/'), then to student (student), and finally student
  // :id (student:id)
  try {
    let student = await Student.findByPk(req.params.studentId); // holding
    //specific instance of a student
    const test = await Test.create(req.body); // holding specific instance of a test
    const studentTest = await test.setStudent(student); // this is holding the
    //instance-to-instance magic method. Associations are the relationships between
    //models. Only test has the magic method attached to it
    res.status(201).send(studentTest);
  } catch (error) {
    next(error);
  }
})

/*
we have two tables. one table has a row with a student called jenny. jenny has taken a test.
we want to take that test and create a new area for that. we have to specify in our
Test that says the test was taken by Jenny. So we're taking that test and creating
it as a new row in our test table. The magic method takes that specific row, and we are
taking that key, and appending it onto another table as a foreign key. 

*/

// DELETE /tests/:id
router.delete('/:id', async(req, res, next) => {
  try {
    const deleteById = await Test.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
})


module.exports = router;
