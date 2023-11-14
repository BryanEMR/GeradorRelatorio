import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { variablesHTMLForPDF } from "../jsonMokado/variaveisHTML";
import puppeteer from "puppeteer";
import * as Handlebars from "handlebars";
import { IImportCSV } from "../interface/interface";

export async function createOrcamentoPDF(
  jsonCSV:IImportCSV[],
  valor:string
) {
  const hbsFile = resolve(__dirname, "..", "html", "relatorio.hbs");
  // variables display false
  let variaveis: any[] = variablesHTMLForPDF.filter(
    (variable) => !variable.display
  );
  variaveis = variaveis.map((variable) => {
    switch (true) {
      case variable.variablesNames === "initialPage":
        let img = resolve(
          __dirname,
          "..",
          "html",
          "img",
          "initialPage.jpg"
        );
        let file = readFileSync(img, { encoding: "base64" });
        return {
          ...variable,
          content: `<img style="width: 100%; height: 100%" src="data:image/png;base64,${file}" />`,
        };
      case variable.variablesNames === "tabela":
        let html = ''

        jsonCSV.forEach((infos: IImportCSV) => {
          html += `
          <tr style="background-color: #EEE;">
            <td style=" border-right: 2px solid white; border-collapse: collapse; padding-left:15px ;">${infos.Nome} </td>
            <td style=" border-right: 2px solid white; border-collapse: collapse; padding-left:15px ;">${infos.Sobrenome}</td>
            <td style=" border-right: 2px solid white; border-collapse: collapse; padding-left:15px ;">${infos.Cidade}</td>
            <td style=" border-collapse: collapse; padding-left:15px ;">${infos.Sexo}</td>
            <td style=" border-collapse: collapse; padding-left:15px ;">${infos.valor}</td>
          </tr>
          `

        });
        return {
          ...variable,
          content: html,
        };
        case variable.variablesNames === "valor":
          return {
            ...variable,
            content: valor ,
          };
      default:
        return variable;
    }
  });

  const titlesNotDisplay = variaveis.map(
    (object) => object.variablesNames
  );

  const allTitlesNotDisplay = titlesNotDisplay.map((title, index) =>
    Object.fromEntries([[`${title}`, variaveis[index].content]])
  );

  const variablesNotDisplay = Object.assign({}, ...allTitlesNotDisplay);

  //variables display true

  // join variables
  const variables = {
    ...variablesNotDisplay
  };

  const readFile = readFileSync(hbsFile).toString("utf-8");
  const template = Handlebars.compile(readFile);
  const html = template(variables);

  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  await page.setContent(html);

  const pathSavePdf = resolve(__dirname, "..", "teste", "relatorio.pdf");
  writeFileSync(
    pathSavePdf,
    await page.pdf()
  );

  return pathSavePdf

  // const fileBlob = await page.pdf({});

  // return fileBlob ;

}
