const Logger = require('../src/logger');

describe('Logger Tests', () => {
    it('Should be a logger', () => {
        expect(Logger).toEqual(expect.anything());
    })
})