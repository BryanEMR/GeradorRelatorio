
export interface IImportCSV {
    Nome: String
    Sobrenome: String
    Cidade: String
    Sexo: String
    valor:Number
}


export interface IFile {
    fieldname: String
    originalname: String
    encoding: String
    mimetype: String
    buffer: Buffer
    size: number
}