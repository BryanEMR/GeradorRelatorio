import { Request, Response } from "express";
import { IFile, IImportCSV } from "../interface/interface";
import iconv from 'iconv-lite';
import csv from "csvtojson";
import { Readable } from "node:stream";
import { createOrcamentoPDF } from "../function/gerarRelatorio";
import { calcularSaldoFinal } from "../function/calcularSaldo";
class controller{
   
    async uploadCSV(request: Request, response: Response) {
        try {
          const {valor1, valor2, valor3, valor4, valor5, valor6, valor7} = request.body
          console.log('valor',valor1, valor2, valor3, valor4, valor5, valor6, valor7)
          const file: IFile | undefined = request.file;
          if (!file) {
            return response.status(400).send({
              message: "Não foi encontrado o arquivo no envio",
            });
          }
          const { mimetype, buffer } = file;
          
          if (mimetype !== "text/csv") {
            return response.status(500).send({
              message: "Para realizar a importação precisa ser um arquivo csv",
            });
          }
          if (file) {
            const utf8Buffer = iconv.decode(buffer, 'ISO-8859-1'); // Certifique-se de especificar a codificação correta do seu arquivo CSV
    
            const stream = Readable.from(utf8Buffer);
    
            //let that = this;
            const valoresImportados: IImportCSV[] | null = await csv({
              delimiter: ";",
            }).fromStream(stream);

            const teste = await calcularSaldoFinal(valoresImportados, ['3161','3260'] )

            const respostaFuncao = await createOrcamentoPDF(valoresImportados, teste)
            return response.status(200).send({
              data: valoresImportados,
              funcao: respostaFuncao,
              message: "Todos os valores foram importados!"
            });
          }
        } catch (e) {
          console.error(e);
          return response.status(500).send({
            message: `Houve um erro ao tentar importar o arquivo!`,
            error: e
          });
        }
      }

}
export default new controller;



