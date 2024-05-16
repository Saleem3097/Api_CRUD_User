import User from "../model/userModel.js";

// will create 5 Api's

// Create API
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "No data found" });
    }

    const saveData = await userData.save();
    res.status(200).json(saveData);
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      status: 500,
      error: error,
    });
  }
};

// Get all User API

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      status: 500,
      error: error,
    });
  }
};

// Get one api

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(200).json({ msg: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      status: 500,
      error: error,
    });
  }
};

// Update

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not Found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      status: 500,
      error: error,
    });
  }
};

// delete user controller

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not exists" });
    }
    const deleteData = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        msg: `The User named ${deleteData.fname} has been deleted successfully`,
      });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      status: 500,
      error: error,
    });
  }
};
