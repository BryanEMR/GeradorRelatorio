import { IImportCSV } from "../interface/interface";

export async function calcularSaldoFinal(
    jsonCSV: IImportCSV[],
    contas: Array<string>
  ) {
    let valorFinal = 0
    let valid = true
    jsonCSV.forEach((contasJson)=>{
        if(contas.includes(contasJson.Conta) && valid){
            let valor = contasJson["Saldo Final"]
            console.log('\n\nvalor I', valor)
            valor = valor.replace(/\./g, '')
            console.log('valor S pontos', valor)
            valor = valor.replace(',', '.')
            console.log('valor F', valor)
            valorFinal+=  (+valor)
            valid =false
        }

    })

    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }