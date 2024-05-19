import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Creating User" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Updating User" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const CurrentUser = await User.findById(req.userId);
    // await User.findOne({ _id: req.userId }); */

    if (!CurrentUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(CurrentUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Getting User" });
  }
};

export default { createCurrentUser, updateCurrentUser, getCurrentUser };
