import MissingPerson from "../../../DB/models/missingPerson.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import path from "path";
import axios from "axios";

export const addMissingPerson = asyncHandler(async (req, res, next) => {
  // check if the person is already exists or not by checking the model for the same person
  // TODO
  // data was checked in the
  // create a new person
  // create new post with person Id
  // return response
  // create the missing person
  //   return res.json(req.body);
  const person = await MissingPerson.create({
    ...req.body,
    addedBy: req.user._id,
    images: req.files.map((file) => path.basename(file.path)),
  });
  return res.status(201).json({
    success: true,
    data: {
      person,
    },
  });
});

export const getAllMissingPerson = asyncHandler(async (req, res, next) => {
  // get all the missing person
  // return response
  const { sort, keyword, page } = req.query;
  const missingPersons = await MissingPerson.find({
    ...req.query,
  })
    .sort(`${sort} -createdAt`)
    .paginate(page)
    .search(keyword)
    .populate("addedBy", "fullName");
  return res.status(200).json({
    success: true,
    page: page ? parseInt(page) : 1,
    data: {
      missingPersons,
    },
  });
});

export const getMissingPerson = asyncHandler(async (req, res, next) => {
  // get the missing person by id
  // return response

  const missingPerson = await MissingPerson.findById(req.params.id).populate(
    "addedBy",
    "fullName"
  );
  return res.status(200).json({
    success: true,
    data: {
      missingPerson,
      lenOfimages: missingPerson.images.length,
    },
  });
});

export const updateMissingPerson = asyncHandler(async (req, res, next) => {
  // update the missing person by id
  // return response
  const missingPerson = req.missingPerson;
  Object.assign(missingPerson, req.body);
  await missingPerson.save();
  return res.status(200).json({
    success: true,
    data: {
      missingPerson,
    },
  });
});

export const markAsDone = asyncHandler(async (req, res, next) => {
  // mark the missing person as done
  // return response
  const missingPerson = req.missingPerson;
  if (missingPerson.status === "done") {
    return next(new Error("Missing person is already marked as done", 400));
  }
  missingPerson.status = "done";
  await missingPerson.save();
  return res.status(200).json({
    success: true,
    message: "Missing person marked as done",
    data: {
      missingPerson,
    },
  });
});

export const getMissingNames = asyncHandler(async (req, res, next) => {
  const { name, page } = req.query;
  return res.status(200).json({
    success: true,
    data: {
      missingPersons: await MissingPerson.find()
        .search(name)
        .select("name status")
        .paginate(page),
    },
  });
});

export const getMatch = asyncHandler(async (req, res, next) => {
  // user will upload an image to this controller so it should check it to face rec model and return the response
  // apply check model
  // the result of the model is the name of the image that is matched with so
  // the controller should return the missing person info who was matched
  // const modelResult = call model
  const modelResult = await axios.post("http://127.0.0.1:5000/detect/one", {
    photo: req.file.path,
  });
  const modelImage = modelResult.data.name;
  if (!modelImage) {
    return next(new Error("Couldn't find any match in our database", 404));
  }

  const missingPersonData = await MissingPerson.findOne({
    images: { $in: [modelImage] },
  }); // how to search in array
  if (!missingPersonData) {
    return next(new Error("Couldn't find any match in our database", 404));
  }
  let user = missingPersonData.addedBy ? missingPersonData.addedBy : null;
  // send notification to the user
  await Notification.create({
    user,
    missingPerson: missingPersonData._id,
    title: "New Match",
    description: `Your missing person ${missingPersonData.name} was matched with a new image in our database`,
  });

  MissingPerson.status = "done";
  await MissingPerson.save();

  return res.status(200).json({
    success: true,
    message:
      "The image was matched successfully with one of our missing people in database",
    data: missingPersonData,
  });
});

export const getAllMatches = asyncHandler(async (req, res, next) => {
  // user will upload an image to this controller so it should check it to face rec model and return the response
  // apply check model
  // the result of the model is the name of the image that is matched with so
  // the controller should return the missing person info who was matched
  // const modelResult = call model
  if (!modelResult) {
    return next(new Error("Couldn't find any match in our database", 404));
  }

  const missingPersonData = await MissingPerson.find({
    images: { $in: [modelResult] },
  }); // how to search in array

  for (const missingPerson of missingPersonData) {
    const user = missingPerson.addedBy;
    // send notification to the user
    await Notification.create({
      user,
      missingPerson: missingPerson._id,
      title: "New Match",
      description: `Your missing person ${missingPerson.name} was matched with a new image in our database`,
    });
    missingPerson.status = "done";
    await missingPerson.save();
  }

  return res.status(200).json({
    success: true,
    message:
      "The image was matched successfully with one of our missing people in database",
    data: missingPersonData,
  });
});
