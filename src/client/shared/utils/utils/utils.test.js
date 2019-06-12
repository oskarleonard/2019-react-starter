import { cleanHttpsLink } from './utils';

describe('cleanHttpsLink', () => {
  describe('normal cases', () => {
    const expected = 'hello.se';
    const websiteInputs = [
      'http://www.hello.se',
      'http://hello.se',
      'https://www.hello.se',
      'https://hello.se',
      'www.hello.se',
      'hello.se',
    ];

    websiteInputs.forEach((inputs) => {
      it(`should handle ${inputs}`, () => {
        const result = cleanHttpsLink(inputs);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('Edge cases', () => {
    const expectedEdgeCases = '';
    [undefined, null, ''].forEach((inputs) => {
      it(`should handle ${inputs}`, () => {
        const result = cleanHttpsLink(inputs);
        expect(result).toEqual(expectedEdgeCases);
      });
    });
  });
});
