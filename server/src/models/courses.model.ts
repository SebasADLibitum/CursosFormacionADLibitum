export interface Course {
    idpresentacion: number
    titulo: string
    tipo: number
    cliente?: string
    sitio: string
    fecha: Date
    notas: string
    registrableweb?: number
    camposobligatorios?: number
}