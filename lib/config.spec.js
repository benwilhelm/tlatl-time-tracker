import { resolve } from 'path';
import { config } from './config.js';

const originalEnv = { ...process.env };
afterEach(() => {
  process.env = originalEnv;
});

describe('config.get method', () => {
  it('should return default data directory for DATA_DIR', () => {
    const expected = resolve(__dirname, '..', 'data');
    const actual = config.get('DATA_DIR');
    expect(actual).toEqual(expected);
  });

  it('should return environment variable value for DATA_DIR if defined', () => {
    // arrange
    const expected = 'SOME_VALUE';
    process.env.DATA_DIR = expected;

    const actual = config.get('DATA_DIR');
    expect(actual).toEqual(expected);
  });

  it('should throw if called with nonexistent key', () => {
    expect(() => config.get('BAD_KEY')).toThrow(
      /no value defined for key BAD_KEY/i
    );
  });
});
