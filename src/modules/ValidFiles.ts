export interface FileType {
    mimetype: string,
    storagetype: string
}

export default [
    {
        mimetype: "image/jpeg",
        storagetype: "jpeg"
    },
    {
        mimetype: "image/png",
        storagetype: "png"
    }
] as FileType[]