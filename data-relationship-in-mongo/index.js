const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/data-relationship", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(() => {
    console.log("Failed to connect!");
  });

const userSchema = new mongoose.Schema({
  userName: String,
  membershipStatus: String,
  post: [
    {
      postContent: String,
      postComment: [
        {
          postComment: String,
          userName: String,
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeAPost = async () => {
  try {
    const user = await new User({
      userName: "Mavis_Pendragon_@",
      membershipStatus: "Active",
    });

    user.post.push({
      postContent:
        "Trying to find the best location for settling down in Canada.",
    });

    const res = await user.save();

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const addingPost = async (id) => {
  try {
    const user = await User.findById(id);

    user.post.push({
      postContent: "I have a new product next week!",
    });

    const res = await user.save();

    console.log(res);
  } catch (err) {}
};

makeAPost();
addingPost(`60bb1482be29bd0cf8cb34db`);
