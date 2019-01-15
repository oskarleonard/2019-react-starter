import { fromJS } from 'immutable';
import { valIn } from './immutableUtils';

describe('valIn', () => {
  it('should return correct value', () => {
    const expected = 'Hej';
    const page = fromJS({
      content: {
        infoBox: {
          title: expected,
        },
      },
    });
    const result = valIn(page, 'content', 'infoBox', 'title');
    expect(result).toEqual(expected);
  });
});
