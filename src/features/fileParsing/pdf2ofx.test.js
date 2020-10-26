import { cleanup } from "../../test-utils";
import Pdf2ofx from './pdf2ofx';
import PDFParser from 'pdf2json';

/** In this test file, we are not mocking file reads. A sample PDF must be in the directory */

let testConverter;
// afterEach(cleanup);

describe('pdf2ofx', () => {
  it('should exist as a module', () => {
    expect(new Pdf2ofx()).toBeInstanceOf(Pdf2ofx);
  })

  // it('should contain an instance of PDFParser', () => {
  //   const test = new Pdf2ofx(new PDFParser());
  //   expect(typeof test.pdfParser).toBe('object');
  // })

  describe('Method: fetchAndParsePDF2JSON', () => {

    beforeEach(() => {
      testConverter = new Pdf2ofx(new PDFParser());
    })

    it('should return a JSON object', () => {
      testConverter.fetchAndParsePDF2JSON('/test.pdf');
      // console.log("Actual = ",actual);
      // expect(actual).toBeTruthy();
    })
  })

})