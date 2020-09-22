import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { MikroContext } from "../types";
import {
  AddProductData,
  AddProductErrors,
  AddProductInput,
  AddProductResponse,
} from "../types/product.types";
import { createObjectResponse } from "../utils";
import codes from "../constants/codes.json";
import errorCodes from "../constants/errorCodes.json";
import { Product } from "../entities/Product";
import { validateProductInput } from "../validations/product";

@Resolver()
export class ProductResolver {
  @Mutation(() => AddProductResponse)
  async addProduct(
    @Arg("options")
    input: AddProductInput,
    @Ctx() { req, em }: MikroContext
  ): Promise<AddProductResponse> {
    if (!req?.session?.userId) {
      const errors: AddProductErrors = {
        user: errorCodes.UNAUTHORIZED.message,
      };
      const response = createObjectResponse<AddProductData, AddProductErrors>(
        codes.UNAUTHORIZED,
        undefined,
        errors
      );
      return response;
    }
    const errors = validateProductInput(input);
    if (errors) {
      const response = createObjectResponse<AddProductData, AddProductErrors>(
        codes.INVALID_INPUT,
        undefined,
        errors
      );
      return response;
    }
    const data = await this.saveProduct({ em }, input);
    const response = createObjectResponse<AddProductData, AddProductErrors>(
      codes.PRODUCT_ADDED,
      data
    );
    return response;
  }
  async saveProduct(
    { em }: MikroContext,
    input: AddProductInput
  ): Promise<AddProductData> {
    const product = em.create(Product, input);
    await em.persistAndFlush(product);
    const data: AddProductData = { done: true };
    return data;
  }
}
