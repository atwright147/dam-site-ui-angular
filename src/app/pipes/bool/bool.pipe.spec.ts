import { BoolPipe } from './bool.pipe';

describe('BoolPipe', () => {
  let pipe: BoolPipe;

  beforeEach(() => {
    pipe = new BoolPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('given anything other than true', () => {
    const scenarios = [
      { actual: 1, expected: true },
      { actual: 5, expected: true },
      { actual: -5, expected: true },
      { actual: true, expected: true },
      { actual: 'true', expected: true },
      { actual: 'false', expected: true },
      { actual: '0', expected: true },

      { actual: {}, expected: false },
      { actual: [], expected: false },
      { actual: { item: 'value' }, expected: true },
      { actual: ['item'], expected: true },

      { actual: '', expected: false },
      { actual: 0, expected: false },
      { actual: false, expected: false },
      { actual: undefined, expected: false },
      { actual: null, expected: false },
    ];

    scenarios.forEach((scenario) => {
      it(`should return ${scenario.expected} when value is ${JSON.stringify(scenario.actual)}`, () => {
        expect(pipe.transform(scenario.actual)).toEqual(scenario.expected);
      });
    });
  });
});
