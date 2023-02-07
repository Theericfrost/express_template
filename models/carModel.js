const mongoose = require('mongoose');
const slugify = require('slugify');

const carShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A car must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A car name must have less or equal then 40 characters'],
  },
  slug: String,
  price: {
    type: Number,
    required: [true, 'A car must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price'
    }
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A car must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

carShema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Car = mongoose.model('Car', carShema);

module.exports = Car;
