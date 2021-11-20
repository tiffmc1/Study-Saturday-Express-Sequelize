const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  grade: {
    type: Sequelize.INTEGER, // can't use NUMBER, bc it will coerce the
    //type to a string
    allowNull: false
  }
});

// ASSOCIATION:
Test.belongsTo(Student);

/*
this is a one-way association b/c the only association is on Test. Every
Test has to have a Student association. On the test table, we are creating 
a foreign key, and this key is going to create a relationship between 
these two tables

When you have many-to-many relationships and you want that control, you'll
want to create a joined table between them with its own name. This is what
we'll do in cycle-3, and it allows you to work through an alias

Can also use Student.hasMany(Test). Might actually work better bc students
will have plenty of test grades in real-life situations

*/

module.exports = Test;
