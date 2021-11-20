const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', { // 'Student' is technically a CLASS, therefore it
  // needs an uppercase variable, whereas 'student' is an instance of the Student model
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { // when validating, must always go into its own object
      isEmail: true
    }
  }
});

Student.beforeCreate((student) => { // 'student' is just a variable that can be whatever
  // it wants (just like [] methods; filter, map, reduce, etc)
  const nameFirst = student.firstName;
  const nameLast = student.lastName;

  student.firstName = nameFirst[0].toUpperCase() + nameFirst.slice(1);
  student.lastName = nameLast[0].toUpperCase() + nameLast.slice(1);
})


//ANOTHER OPTION IS BELOW, BUT THE ABOVE OPTION IS A LITTLE CLEANER:
// Student.addHook('beforeCreate', (student, options) => {
//   student.firstName = student.firstName.charAt(0).toUpperCase() + student.firstName.slice(1);
//   student.lastName = student.lastName.charAt(0).toUpperCase() + student.lastName.slice(1);
// })



// Sequelize.sync({force: true}).then(() => Student.create({
//   firstName: 'one',
//   lastName: 'one',
// }).then(student) => {
//   student.firstName 
// })

module.exports = Student;
