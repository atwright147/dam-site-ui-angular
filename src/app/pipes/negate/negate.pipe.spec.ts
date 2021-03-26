import { NegatePipe } from './negate.pipe';

describe('NegatePipe', () => {
  let pipe: NegatePipe;

  beforeEach(() => {
    pipe = new NegatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('given a boolean value', () => {
    const scenarios = [
      { actual: true, expected: false },
      { actual: false, expected: true },
    ];

    scenarios.forEach((scenario) => {
      it(`should return ${JSON.stringify(scenario.expected)} when value is ${JSON.stringify(scenario.actual)}`, () => {
        expect(pipe.transform(scenario.actual)).toEqual(scenario.expected);
      });
    });
  });

  describe('given a non-boolean value', () => {
    const scenarios = [
      { actual: -5 },
      { actual: 'true' },
      { actual: 'false' },
      { actual: '0' },

      { actual: {} },
      { actual: [] },
      { actual: { item: 'value' } },
      { actual: ['item'] },

      { actual: '' },
      { actual: 0 },
      { actual: undefined },
      { actual: null },
    ];

    scenarios.forEach((scenario) => {
      it(`should throw when value is ${JSON.stringify(scenario.actual)}`, () => {
        expect(() => pipe.transform(scenario.actual as any)).toThrow();
      });
    });
  });
});
