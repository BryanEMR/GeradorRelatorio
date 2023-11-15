
export interface IImportCSV {
    "Cta.Estrut.": string
    "Conta": string
    "Descrição Conta": string
    "Analitico": string
    "Saldo Incial":string
    "D/C":string
    "Débito":string
    "Crédito":string
    "Saldo Final":string
}


export interface IFile {
    fieldname: String
    originalname: String
    encoding: String
    mimetype: String
    buffer: Buffer
    size: number
}