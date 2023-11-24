import { IImportCSV } from "../interface/interface";

export async function calcularSaldoFinal(
    jsonCSV: IImportCSV[],
    contas: Array<string>
  ) {
    let valorFinal = 0
    jsonCSV.forEach((contasJson)=>{
        if(contas.includes(contasJson.Conta)){
            let valor = contasJson["Saldo Final"]
            valor = valor.replace(/\./g, '')
            valor = valor.replace(',', '.')
            valorFinal+=  (+valor)
            return;
        }

    })

    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }