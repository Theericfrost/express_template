const Car = require('./../models/carModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./../utils/handlerFactory');

exports.getAllCars = factory.getAll(Car);
exports.getCar = factory.getOne(Car);
exports.createCar = factory.createOne(Car);
exports.updateCar = factory.updateOne(Car);
exports.deleteCar = factory.deleteOne(Car);

exports.getCarStats = catchAsync(async (req, res, next) => {
  const stats = await Car.aggregate([
    {
      $match: { price: { $gte: 10000 } }
    },
    {
      $group: {
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});
