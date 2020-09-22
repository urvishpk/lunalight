import { expect } from "chai";
import errorCodes from "../../constants/errorCodes.json";
import { AddProductErrors } from "../../types/product.types";
import { validateProductInput } from "../../validations/product";

describe("Validations for Product input", () => {
  it("should return errors for empty input", () => {
    const errors: AddProductErrors | undefined = validateProductInput({
      name: "",
      description: "",
      quantity: 0,
      price: 0,
      pictures: [],
    });
    expect(errors).to.not.be.undefined;
    expect(errors!.name).to.equal(errorCodes.PRODUCT_NAME_REQUIRED.message);
    expect(errors!.description).to.equal(
      errorCodes.PRODUCT_DESCRIPTION_REQUIRED.message
    );
    expect(errors!.pictures).to.equal(
      errorCodes.PRODUCT_PICTURES_REQUIRED.message
    );
  });

  it("should return errors for empty white space as input", () => {
    const errors: AddProductErrors | undefined = validateProductInput({
      name: "    ",
      description: " ",
      quantity: 0,
      price: 0,
      pictures: [],
    });
    expect(errors).to.not.be.undefined;
    expect(errors!.name).to.equal(errorCodes.PRODUCT_NAME_REQUIRED.message);
    expect(errors!.description).to.equal(
      errorCodes.PRODUCT_DESCRIPTION_REQUIRED.message
    );
    expect(errors!.pictures).to.equal(
      errorCodes.PRODUCT_PICTURES_REQUIRED.message
    );
  });

  it("should return no error for valid input", () => {
    const errors: AddProductErrors | undefined = validateProductInput({
      name: "Flamethrower FM-2044",
      description: "A flamethrower for none of your needs.",
      quantity: 5,
      price: 99.99,
      pictures: ["https://picsum.photos/200", "https://picsum.photos/200"],
    });
    expect(errors).to.be.undefined;
  });
});
