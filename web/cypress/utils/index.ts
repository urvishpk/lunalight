export const findByTestId = (attr: string) => {
  return cy.get(`[data-testid=${attr}]`);
};

export const findElement = (element: string) => {
  return cy.get(element);
};
