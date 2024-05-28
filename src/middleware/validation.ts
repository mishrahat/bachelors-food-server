import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name Must be String"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 Must be String"),
  body("city").isString().notEmpty().withMessage("City Must be String"),
  body("country").isString().notEmpty().withMessage("Country Must be String"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant Name Is Required"),
  body("city").notEmpty().withMessage("City Name Is Required"),
  body("country").notEmpty().withMessage("Country Name Is Required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price Must Be A Positive Number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery Time Must be a Positive Integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines Must be an Array")
    .not()
    .isEmpty()
    .withMessage("Cuisines Array Cannot be Empty"),
  body("menuItems").isArray().withMessage("Menu Items Must Be Array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu Item Name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item Price is required and must be a positive number"),
  handleValidationErrors,
];
