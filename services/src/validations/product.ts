import { AddProductErrors, AddProductInput } from "../types/product.types";
import { errorCodes } from "../constants";
import { isEmpty } from "../utils/isEmpty";

export const validateProductInput = ({
  name,
  description,
  quantity,
  price,
  pictures,
}: AddProductInput): AddProductErrors | undefined => {
  const errors: AddProductErrors = {
    name: validateProductName(name),
    description: validateProductDescription(description),
    quantity: validateProductQuantity(quantity),
    price: validateProductPrice(price),
    pictures: validateProductPictures(pictures),
  };
  if (
    errors.name ||
    errors.description ||
    errors.quantity ||
    errors.price ||
    errors.pictures
  )
    return errors;
  return;
};
const validateProductName = (name: string): string | undefined => {
  if (!isEmpty(name)) return;
  const error = errorCodes.PRODUCT_NAME_REQUIRED.message;
  return error;
};
const validateProductDescription = (
  description: string
): string | undefined => {
  if (!isEmpty(description)) return;
  const error = errorCodes.PRODUCT_DESCRIPTION_REQUIRED.message;
  return error;
};
const validateProductQuantity = (quantity: number): string | undefined => {
  console.log(quantity);
  return;
};
const validateProductPrice = (price: number): string | undefined => {
  console.log(price);
  return;
};
const validateProductPictures = (pictures: string[]): string | undefined => {
  if (!isEmpty(pictures)) return;
  const error = errorCodes.PRODUCT_PICTURES_REQUIRED.message;
  return error;
};
