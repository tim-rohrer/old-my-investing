import PDFParser from "pdf2json";

export default class Pdf2ofx {

  constructor() {
    let pdfParser = new PDFParser();
    this.pdfParser = pdfParser;
    // this.pdfParser = pdfParser;
    // console.log(this.pdfParser);
  }

  handleData(pdfData) {
    console.log("Here!")
    fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
  }

  fetchAndParsePDF2JSON(fileName) {
    // console.log("Inside method!", fileName);
    this.pdfParser.on("pdfParser_dataError", errData => console.error("Error: ",errData.parserError) );
    this.pdfParser.on("pdfParser_dataReady", pdfData => {
      console.log("Success!");
      this.handleData(pdfData);
    });
    // console.log(this.pdfParser);
    this.pdfParser.loadPDF(__dirname + fileName)
  }

}


