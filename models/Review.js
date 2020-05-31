const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "Please add some text."],
  },
  rating: {
    type: Number,
    required: [true, "Please add a rating between 1 and 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

// Prevent user from submitting more than one reqview per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static Method to get avg of reviews rating
ReviewSchema.statics.getRatingAvg = async function (bootcampId) {
  const obj = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  console.log(obj[0]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageRating: obj[0].averageRating,
    });
    console.log(this.model("Bootcamp").find({}));
  } catch (error) {
    console.error(error);
  }
};

// Call getReviewsAvg after save
ReviewSchema.post("save", function () {
  this.constructor.getRatingAvg(this.bootcamp);
});

// Call getReviewsAvg before remove
ReviewSchema.pre("remove", function () {
  this.constructor.getRatingAvg(this.bootcamp);
});

module.exports = mongoose.model("Review", ReviewSchema);
