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

// @route    GET api/profile
// @desc     Get current users profile
// @access   Private

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

// @route    POST api/profile
// @desc     Create or edit user profile
// @access   Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};

    profileFields.user = req.user.id;
    if (res.body.handle) profileFields.handle = req.body.handle;
    if (res.body.company) profileFields.company = req.body.company;
    if (res.body.website) profileFields.website = req.body.website;
    if (res.body.location) profileFields.location = req.body.location;
    if (res.body.bio) profileFields.bio = req.body.bio;
    if (res.body.status) profileFields.status = req.body.status;
    if (res.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // Skills
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create

          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }

            // Save
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
