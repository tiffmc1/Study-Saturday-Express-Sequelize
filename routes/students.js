const app = require('../app')

const router = require('express').Router();
const Student = require('../db/models/student');

/*res.send and res.json are essentially the same thing. They both 
send back a json object. res.json is good for when you have multiple
EXPORTS from a file (ie: in wizard news)*/

// GET /students
router.get('/', async(req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    next(error);
  }
})

// GET /students/:id
router.get('/:id', async(req, res, next) => {
  try {
    const studentId = await Student.findByPk(req.params.id)   // id's are usually primary keys
    // so that was findByPk means and the req.params.id will find that specific column
    if (studentId) {
      res.send(studentId);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    next(error);
  }
})

// POST /students
router.post('/', async(req, res, next) => {
  try {
    const student = await Student.create(req.body) //so it creates the entire
    //body of the student
    res.status(201).send(student); //
  } catch (error) {
    next(error);
  }
})

// PUT /students/:id (to update info for a specific student) ***NOT CORRECT SOLUTION. CHECK CYCLE-4
router.put('/:id', async(req, res, next) => {
  try {
    const updatedStudentInfo = await Student.update(req.body, {
      where: {id: req.params.id}, //we're taking req.body and UPDATING
//that specific student instance (ie: req.params.id)
    })
    req.send(updatedStudentInfo[1]);
  } catch (error) {
    next(error);
  }
})

// DELETE /students/:d ***NOT CORRECT SOLUTION. CHECK CYCLE-4
router.delete('/:id', async(req, res, next) => {
  try {
    const studentToDelete = await Student.destroy({where: {id: req.params.id}});
    res.status(204).send(studentToDelete); 
    next(error);
  }
})

/* no need to include req.body for deletion. Only need :id. By finding the
id, router.delete will delete everything for that specific id. The colon in :id 
is the thing to identify that specific id off the address. The req.param key will
have a value that contains the id on that address, and will send it back

You can check the status code>>If you open dev tool and open Network tab, click
the page that you are working on and click Header tab
*/

module.exports = router;
