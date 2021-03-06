/* global it, describe */
import { expect } from 'chai';
import returning from './returning';
import printFilePath from '../utils/printFilePath';

export default function() {
  describe(printFilePath(__filename), ()=>{
    const columns = ['col_a', 'col_b'];

    it('should be a function', () => {
      expect(returning).to.be.a('function');
    });
        
    it('should require a columns parameter', () => {
      expect(() => returning({})).to.throw(Error, '\'columns\' is a required parameter');
    });

    it('should return a returning clause', () => {
      const value = returning({ columns });
      expect(value).to.be.equal('RETURNING\n\tcol_a,\n\tcol_b');
    });
  });
}