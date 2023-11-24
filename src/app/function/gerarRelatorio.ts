import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { variablesHTMLForPDF } from "../jsonMokado/variaveisHTML";
import puppeteer from "puppeteer";
import * as Handlebars from "handlebars";
import { IImportCSV } from "../interface/interface";
import { calcularSaldoFinal } from "./calcularSaldo";

export async function createOrcamentoPDF(
  jsonCSV: IImportCSV[],
  valor1: string,
  valor2: string,
  valor3: string,
  valor4: string,
  valor5: string,
  valor6: string,
  valor7: string,
) {
  // Puxa o arquivo de templete
  const hbsFile = resolve(__dirname, "..", "html", "relatorio.hbs");

  // Puxa as variaveis que nominamos no templete para ser substituida por outro valor
  let variaveis: any[] = variablesHTMLForPDF.filter(
    (variable) => !variable.display
  );

  //O Switch com variaveis a ser subistiruidas do templete
  let promisse = await variaveis.map(async (variable) => {
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
      case variable.variablesNames === "tabela1":
        let html = ''
        for (let i = 0; i < 7; i++) {
          switch (true) {
            case i === 0:
              html += `
              <tr>
                <td style=" text-align: left; ">Receita bruta de vendas</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3002'])}</td>
              </tr>
              `
              break
            case i === 1:
              html += `
              <tr>
                <td style=" text-align: left; ">Devoluções de vendas</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3017'])}</td>
              </tr>
              `
              break
            case i === 2:
              html += `
              <tr>
                <td style=" text-align: left; ">ICMS</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3022'])}</td>
              </tr>
              `
              break
            case i === 3:
              html += `
              <tr>
                <td style=" text-align: left; ">PIS </td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3023', '3026'])}</td>
              </tr>
              `
              break
            case i === 4:
              html += `
              <tr>
                <td style=" text-align: left; ">COFINS</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3024', '3027'])}</td>
              </tr>
              `
              break
            case i === 5:
              html += `
              <tr>
                <td style=" text-align: left;">ISSQN</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold; border-bottom: 1px solid black;">${await calcularSaldoFinal(jsonCSV, ['3028'])}</td>
              </tr>
              `
              break
            case i === 6:
              html += `
              <tr>
                <td style=" text-align: left; font-weight: bold;">Receita Liquida</td>
                <td style=" "> </td>
                <td style=" text-align: right; margin-top:1px solid black;font-weight: bold;  border-bottom: 1px double black;">${await calcularSaldoFinal(jsonCSV, ['3001'])}</td>
              </tr>
              <tr>
                <td style=" text-align: left; font-weight: bold;"></td>
                <td style=" "> </td>
                <td style=" text-align: right; margin-top:1px solid black;font-weight: bold;  border-top: 1px double black;">   </td>
              </tr>
              `
              break
          }

        }

        return {
          ...variable,
          content: html,
        };
      case variable.variablesNames === "tabela2":
        html = ''
        for (let i = 0; i < 4; i++) {
          switch (true) {
            case i === 0:
              html += `
              <tr>
                <td style=" text-align: left; ">Custo dos produtos vendidos</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['329'])}</td>
              </tr>
              `
              break
            case i === 1:
              html += `
              <tr>
                <td style=" text-align: left; ">Despesas com vendas</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3307'])}</td>
              </tr>
              `
              break
            case i === 2:
              html += `
              <tr>
                <td style=" text-align: left; ">Despesas gerais e administrativas</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold;border-bottom: 1px solid black; ">${await calcularSaldoFinal(jsonCSV, ['3206', '3467', '3472'])}</td>
              </tr>
              `
              break
            case i === 3:
              html += `
                <tr>
                  <td style=" text-align: left; "></td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold;border-bottom: 1px solid black;">${await calcularSaldoFinal(jsonCSV, ['329', '3206', '3307', '3467', '3472'])}</td>
                </tr>
                `
              break
          }

        }

        return {
          ...variable,
          content: html,
        };
      case variable.variablesNames === "tabela3":
        html = ''
        for (let i = 0; i < 10; i++) {
          switch (true) {
            case i === 0:
              html += `
                <tr>
                  <td style=" text-align: left; ">Custo de materiais
                  </td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3048'])}</td>
                </tr>
                `
              break
            case i === 1:
              html += `
                <tr>
                  <td style=" text-align: left; ">Despesas com pessoal</td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3057', '3207'])}</td>
                </tr>
                `
              break
            case i === 2:
              html += `
                <tr>
                  <td style=" text-align: left; ">Fretes</td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold">${await calcularSaldoFinal(jsonCSV, ['3549', '3157', '3551', '3287', '3309', '3313'])}</td>
                </tr>
                `
              break
            case i === 3:
              html += `
                  <tr>
                    <td style=" text-align: left; ">Exaustão</td>
                    <td style=" "> </td>
                    <td style=" text-align: right;font-weight: bold">${await calcularSaldoFinal(jsonCSV, ['3174'])}</td>
                  </tr>
                  `
              break
            case i === 4:
              html += `
                    <tr>
                      <td style=" text-align: left; ">Energia</td>
                      <td style=" "> </td>
                      <td style=" text-align: right;font-weight: bold">${await calcularSaldoFinal(jsonCSV, ['3161', '3260'])}</td>
                    </tr>
                    `
              break
            case i === 5:
              html += `
                      <tr>
                        <td style=" text-align: left; ">Manutenção</td>
                        <td style=" "> </td>
                        <td style=" text-align: right;font-weight: bold">${await calcularSaldoFinal(jsonCSV, ['3151', '3152', '3153', '3154', '3252', '3376'])}</td>
                      </tr>
                      `
              break
            case i === 6:
              html += `
                        <tr>
                          <td style=" text-align: left; ">Depreciação e amortização</td>
                          <td style=" "> </td>
                          <td style=" text-align: right;font-weight: bold">${await calcularSaldoFinal(jsonCSV, ['3173', '3257', '3381'])}</td>
                        </tr>
                        `
              break
            case i === 7:
              html += `
                          <tr>
                            <td style=" text-align: left; ">Comissão</td>
                            <td style=" "> </td>
                            <td style=" text-align: right;font-weight: bold">${await calcularSaldoFinal(jsonCSV, ['3321'])}</td>
                          </tr>
                          `
              break
            case i === 8:
              html += `
                  <tr>
                    <td style=" text-align: left; ">Gastos gerais</td>
                    <td style=" "> </td>
                    <td style=" text-align: right;font-weight: bold;border-bottom: 1px solid black;">${valor7}</td>
                  </tr>
                  `
              break
            case i === 9:
              html += `
                    <tr>
                      <td style=" text-align: left; "></td>
                      <td style=" "> </td>
                      <td style=" text-align: right;font-weight: bold;border-bottom: 1px solid black;">${await calcularSaldoFinal(jsonCSV, ['3048', '3057', '3207', '3549', '3157', '3551', '3287', '3309', '3313', '3174', '3161', '3260', '3151', '3152', '3153', '3154', '3252', '3376', '3321', '3173', '3257', '3381'])}</td>
                    </tr>
                    `
              break
          }

        }

        return {
          ...variable,
          content: html,
        };

      case variable.variablesNames === "tabela4":
        html = ''
        for (let i = 0; i < 5; i++) {
          switch (true) {
            case i === 0:
              html += `
              <tr>
                <td style=" text-align: left; ">Juros ativos</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3422'])}</td>
              </tr>
              `
              break
            case i === 1:
              html += `
              <tr>
                <td style=" text-align: left; ">Descontos obtidos</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3423'])}</td>
              </tr>
              `
              break
            case i === 2:
              html += `
                <tr>
                  <td style=" text-align: left; ">Variações</td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold;">${await calcularSaldoFinal(jsonCSV, ['3425', '3426', '3428', '3429'])}</td>
                </tr>
                `
              break
            case i === 3:
              html += `
              <tr>
                <td style=" text-align: left; ">Rendimentos aplicação financeira</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold;border-bottom: 1px solid black; ">${await calcularSaldoFinal(jsonCSV, ['3424'])}</td>
              </tr>
              `
              break
            case i === 4:
              html += `
                <tr>
                  <td style=" text-align: left; "></td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold;border-bottom: 1px solid black;">${await calcularSaldoFinal(jsonCSV, ['3425', '3426', '3428', '3429', '3424', '3423', '3422'])}</td>
                </tr>
                `
              break
          }

        }

        return {
          ...variable,
          content: html,
        };
      case variable.variablesNames === "tabela5":
        html = ''
        for (let i = 0; i < 6; i++) {
          switch (true) {
            case i === 0:
              html += `
              <tr>
                <td style=" text-align: left; ">Juros passivos</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3435'])}</td>
              </tr>
              `
              break
            case i === 1:
              html += `
              <tr>
                <td style=" text-align: left; ">Descontos concedidos</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold ">${await calcularSaldoFinal(jsonCSV, ['3437'])}</td>
              </tr>
              `
              break
            case i === 2:
              html += `
                <tr>
                  <td style=" text-align: left; ">Juros S/empréstimos</td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold;">${await calcularSaldoFinal(jsonCSV, ['3445'])}</td>
                </tr>
                `
              break
              case i === 3:
                html += `
                <tr>
                  <td style=" text-align: left; ">Despesas bancárias e IOF</td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold; ">${await calcularSaldoFinal(jsonCSV, ['3436', '3444'])}</td>
                </tr>
                `
                break
            case i === 4:
              html += `
              <tr>
                <td style=" text-align: left; ">Variação cambial</td>
                <td style=" "> </td>
                <td style=" text-align: right;font-weight: bold;border-bottom: 1px solid black; ">${await calcularSaldoFinal(jsonCSV, ['3438', '3442'])}</td>
              </tr>
              `
              break
            case i === 5:
              html += `
                <tr>
                  <td style=" text-align: left; "></td>
                  <td style=" "> </td>
                  <td style=" text-align: right;font-weight: bold;border-bottom: 1px solid black;">${await calcularSaldoFinal(jsonCSV, ['3445', '3435', '3437', '3436', '3444', '3438', '3442'])}</td>
                </tr>
                `
              break
          }
        }

        return {
          ...variable,
          content: html,
        };
      default:
        return variable;
    }
  });

  variaveis = await Promise.all(promisse)

  //Apartir daqui seria funções a ser chamadas para não quebrar na hora de rederizar o pdf

  const titlesNotDisplay = variaveis.map(
    (object) => object.variablesNames
  );

  const allTitlesNotDisplay = titlesNotDisplay.map((title, index) =>
    Object.fromEntries([[`${title}`, variaveis[index].content]])
  );

  const variablesNotDisplay = Object.assign({}, ...allTitlesNotDisplay);

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
