import { daysSince } from './display';

describe('daysSince', () => {
  it('should return the correct number of days from the ISO string', function() {
    const days = daysSince('2018-03-01T18:48:52.772Z', new Date('2018-03-06T18:48:52.772Z'));

    expect(days).toEqual(5);
  });
});
