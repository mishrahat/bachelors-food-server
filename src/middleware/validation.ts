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
