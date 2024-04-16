import MissingPerson from "../../../DB/models/missingPerson.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

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
    images: req.files.map((file) => ({
      path: file.path,
    })),
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
    .sort({
      sort,
      createdAt: -1,
    })
    .paginate(page)
    .search(keyword)
    .populate("addedBy");
  return res.status(200).json({
    success: true,
    data: {
      missingPersons,
    },
  });
});

export const getMissingPerson = asyncHandler(async (req, res, next) => {
  // get the missing person by id
  // return response

  const missingPerson = await MissingPerson.findById(req.params.id);
  return res.status(200).json({
    success: true,
    data: {
      missingPerson,
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
    return res.status(400).json({
      success: false,
      message: "Missing person is already marked as done",
    });
  }
  missingPerson.status = "done";
  await missingPerson.save();
  return res.status(200).json({
    success: true,
    data: {
      missingPerson,
    },
  });
});
