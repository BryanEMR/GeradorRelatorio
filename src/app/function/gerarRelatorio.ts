import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { variablesHTMLForPDF } from "../jsonMokado/variaveisHTML";
import puppeteer from "puppeteer";
import * as Handlebars from "handlebars";
import { IImportCSV } from "../interface/interface";
import { calcularSaldoFinal } from "./calcularSaldo";

export async function createOrcamentoPDF(
  jsonCSV: IImportCSV[],
  valor: string
) {
  // Puxa o arquivo de templete
  const hbsFile = resolve(__dirname, "..", "html", "relatorio.hbs");

  // Puxa as variaveis que nominamos no templete para ser substituida por outro valor
  let variaveis: any[] = variablesHTMLForPDF.filter(
    (variable) => !variable.display
  );


  //O Switch com variaveis a ser subistiruidas do templete
  variaveis = variaveis.map(async (variable) => {
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

        for(let i = 0; i<7; i++){
          switch(true){
            case i === 0:
              html += `
              <tr>
                <td style=" text-align: left; ">Receita bruta de vendas</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3002'] )}</td>
              </tr>
              `
            break
            case i === 1:
              html += `
              <tr>
                <td style=" text-align: left; ">Devoluções de vendas</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${ await calcularSaldoFinal(jsonCSV, ['3017'] ) }</td>
              </tr>
              `
            break
            case i === 2:
              html += `
              <tr>
                <td style=" text-align: left; ">ICMS</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3022'] )}</td>
              </tr>
              `
            break
            case i === 3:
              html += `
              <tr>
                <td style=" text-align: left; ">PIS </td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3023', '3026'] )}</td>
              </tr>
              `
            break
            case i === 4:
              html += `
              <tr>
                <td style=" text-align: left; ">COFINS</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3024', '3027'] )}</td>
              </tr>
              `
            break
            case i === 5:
              html += `
              <tr>
                <td style=" text-align: left; font-weight: bold;">ISSQN</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold">${await calcularSaldoFinal(jsonCSV, ['3028'] )}</td>
              </tr>
              `
            break
            case i === 6:
              html += `
              <tr>
                <td style=" text-align: left; font-weight: bold;">Receita Liquida</td>
                <td style=" "> </td>
                <td style=" text-align: right; margin-top:1px solid black;font-weight: bold">${await calcularSaldoFinal(jsonCSV, ['3001'] )}</td>
              </tr>
              `
            break
          }
          
        }
          
        console.log(html)
        return {
          ...variable,
          content: html,
        };
      case variable.variablesNames === "valor":
        return {
          ...variable,
          content: valor,
        };
      default:
        return variable;
    }
  });


  //Apartir daqui seria funções a ser chamadas para não quebrar na hora de rederizar o pdf

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


  console.log(variables)
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
