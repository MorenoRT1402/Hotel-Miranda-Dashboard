export interface ModalStringsInterface {
    message:string, 
    yesOption:string, 
    noOption:string
}

export const defaultModalStrings:ModalStringsInterface = {
    message:'¿Estás segurx?',
    yesOption:'Sí',
    noOption:'Cancelar'
}