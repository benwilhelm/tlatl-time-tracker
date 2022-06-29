import { resolve } from 'path';

const values = {
  get DATA_DIR() {
    return process.env.DATA_DIR || resolve(__dirname, '..', 'data');
  },
};

export const config = {
  get: (key) => {
    if (values.hasOwnProperty(key)) {
      return values[key];
    } else {
      throw new Error(`No value defined for key ${key}`);
    }
  },
};
