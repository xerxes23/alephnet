const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input Validation
const validatePostInput = require("../../validation/post");

// Load models
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route    GET api/posts/test
// @desc     Tests posts route
// @access   Public

router.get("/test", (req, res) => res.json({ msg: "Posts route works" }));

// @route    GET api/posts
// @desc     Get all posts
// @access   Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route    GET api/posts/:id
// @desc     Get post by id
// @access   Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route    POST api/posts
// @desc     Create post
// @access   Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route    Delete api/posts/:id
// @desc     Delete post by id
// @access   Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check for owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "No post found with that ID" })
      );
  }
);

// @route    POST api/posts/like/:post_id
// @desc     Like a post by post id
// @access   Private

router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }

        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });

        // Save
        post.save().then(post => res.json(post));
      });
    });
  }
);

// @route    POST api/posts/unlike/:post_id
// @desc     Unlike a post by post id
// @access   Private

router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "User has not liked this post" });
        }

        // Remove like
        post.likes = post.likes.filter(
          like => like.user.toString() !== req.user.id
        );

        // Save
        post.save().then(post => res.json(post));
      });
    });
  }
);

// @route    POST api/posts/comment/:post_id
// @desc     Add a comment to a post
// @access   Private

router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar
          };

          // Add to comments array
          post.comments.unshift(newComment);
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).status.json({ postnotfound: "Post not found" })
        );
    });
  }
);

// @route    Delete api/posts/comment/:post_id/:comment_id
// @desc     Remove comment from post
// @access   Private

router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      // Check if comment exist
      if (
        post.comments.filter(c => c.id.toString() === req.params.comment_id)
          .length === 0
      ) {
        return res
          .status(404)
          .json({ commentdoesnotexist: "Comment does not exist" });
      }

      // Delete comment
      post.comments = post.comments.filter(c => c.id !== req.params.comment_id);
      // Save
      post.save().then(post => res.json(post));
    });
  }
);

module.exports = router;
