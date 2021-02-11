import { TrueOrNullPipe } from './true-or-null.pipe';

describe('TrueOrNullPipe', () => {
  let pipe: TrueOrNullPipe;

  beforeEach(() => {
    pipe = new TrueOrNullPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('given anything other than true', () => {
    const scenarios = [
      { actual: true, expected: true },
      { actual: false, expected: false },
      { actual: {}, expected: false },
      { actual: [], expected: false },
      { actual: 'true', expected: false },
      { actual: 'false', expected: false },
      { actual: () => {}, expected: false },
    ];

    scenarios.forEach((scenario) => {
      it(`should return ${scenario.expected} when value is ${scenario.actual}`, () => {
        expect(pipe.transform(scenario.actual)).toEqual(scenario.expected);
      });
    });
  });
});
