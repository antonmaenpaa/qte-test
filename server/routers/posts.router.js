const express = require("express");
const router = express.Router();
const Post = require("../dbModel/postSchema");
const Comment = require("../dbModel/commentSchema");

router.get("/posts", async (req, res) => {
    const docs = await Post.find({}).populate('comments');
    res.status(200).json(docs);
  });
  

router.post("/posts", async (req, res) => {
    const post = { ...req.body}
    const doc = await Post.create(post);
    res.status(200).json(doc);
});

router.delete("/posts/:id", async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
        if (post) {
          await post.remove();
          return res.status(201).json(post);
        } else {
          return res.status(404).json("Post does not exist");
        }
  });

// CREATE Comment
router.post('/posts/:postId/comments', (req, res) => {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment({name:req.body.name, comment:req.body.comment});

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then(() => Post.findById(req.params.postId))
    .then((post) => {
      post.comments.push(comment);
      return post.save();
    })
    .then(() => res.redirect('/'))
    .catch((err) => {
      console.log(err);
    });
  });

module.exports = router;
