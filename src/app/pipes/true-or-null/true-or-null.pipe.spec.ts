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
      { actual: false, expected: null },
      { actual: {}, expected: null },
      { actual: [], expected: null },
      { actual: 'true', expected: null },
      { actual: 'false', expected: null },
      { actual: (): void => {}, expected: null },
    ];

    scenarios.forEach((scenario) => {
      it(`should return ${scenario.expected} when value is ${JSON.stringify(scenario.actual)}`, () => {
        expect(pipe.transform(scenario.actual)).toEqual(scenario.expected);
      });
    });
  });
});
