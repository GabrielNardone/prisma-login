/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(
      selector: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args?: any
    ): Chainable<JQuery<HTMLElement>>;
    getBySelLike(
      selector: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args?: any
    ): Chainable<JQuery<HTMLElement>>;
    clickLinkAndVerifyUrl(
      selector: string,
      url: string
    ): Chainable<JQuery<HTMLElement>>;
    getInputAndType(
      selector: string,
      text: string
    ): Chainable<JQuery<HTMLElement>>;
    interceptApi(
      endpoint: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      routeOptions: any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responseOptions: any
    ): Chainable<any>;
    validateUsername(inputSelector: string, errorSelector: string): void;
    validatePassword(inputSelector: string, errorSelector: string): void;
    validateCode(inputSelector: string, errorSelector: string): void;
    signIn(): Chainable<JQuery<HTMLElement>>;
    deleteCookie(cookieName: string): void;
  }
}
