const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route    GET api/profile/test
// @desc     Tests profile route
// @access   Public

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route    GET api/profile/test
// @desc     Tests profile route
// @access   Public

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "This user does not have a profile";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
