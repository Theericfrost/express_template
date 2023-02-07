const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('../../models/userModel');
const Car = require('../../models/carModel');

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const cars = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importData = async () => {
  try {
    await Car.create(cars);
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Car.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
