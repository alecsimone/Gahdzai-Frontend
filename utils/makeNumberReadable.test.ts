// import '@testing-library/jest-dom';

import makeNumberReadable from './makeNumberReadable';

describe('makeNumberReadable', () => {
  it('Works when passed just a number', () => {
    const readableLongDecimal = makeNumberReadable(4.555555);
    expect(readableLongDecimal).toBe('4.56');

    const readableShortDecimal = makeNumberReadable(4.1);
    expect(readableShortDecimal).toBe('4.10');

    const readableInteger = makeNumberReadable(4);
    expect(readableInteger).toBe('4.00');

    const readableNegativeNumber = makeNumberReadable(-4.55);
    expect(readableNegativeNumber).toBe('-4.55');

    const readableGiantNumber = makeNumberReadable(123456789);
    expect(readableGiantNumber).toBe('123,456,789.00');
  });

  it('Works when passed an object', () => {
    const readableLongDecimal = makeNumberReadable({
      number: 4.555555555,
      minimumFractionDigits: 3,
      maximumFractionDigits: 4,
    });
    expect(readableLongDecimal).toBe('4.5556');

    const readableInteger = makeNumberReadable({
      number: 4.5555555,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    expect(readableInteger).toBe('5');

    const readableHundreds = makeNumberReadable({
      number: 4.555555555,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    expect(readableHundreds).toBe('4.56');

    const readableGiantNumber = makeNumberReadable({
      number: 123456789,
      minimumFractionDigits: 0,
    });
    expect(readableGiantNumber).toBe('123,456,789');

    const readableGiantNumberDecimal = makeNumberReadable({
      number: 123456789.1234,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    expect(readableGiantNumberDecimal).toBe('123,456,789.12');
  });
});
