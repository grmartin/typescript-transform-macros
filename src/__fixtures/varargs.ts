declare function MACRO<T>(t: T): T;

const URNBase = ['urn', 'whft'];
const URNXform = MACRO((...type: string[]) => (...args: string[]) => [...URNBase, ...type, ...args].join(':'));

export const URN = Object.freeze({
  express: Object.freeze({
    REQUEST_ID: URNXform('ex-req')
  }),

  dbObjects: Object.freeze({
    USER: URNXform('pgdb', 'user')
  })
});
