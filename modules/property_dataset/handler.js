const handlerFileProperty = async (ctx) => {
    let fileInfo

    if (ctx.message.document) {
        const doc = ctx.message.document
        fileInfo = {
            name: doc.file_name,
            size: `${(doc.file_size / 1024).toFixed(2)} KB`,
            mime_type: doc.mime_type || 'Unknown',
        }
    } else if (ctx.message.photo) {
        const photoArray = ctx.message.photo
        const largestPhoto = photoArray[photoArray.length - 1]
        fileInfo = {
            name: 'photo.jpg',
            size: `${(largestPhoto.file_size / 1024).toFixed(2)} KB`,
            mime_type: 'image/jpeg',
        }
    } else if (ctx.message.video) {
        const video = ctx.message.video
        fileInfo = {
            name: video.file_name || 'video.mp4',
            size: `${(video.file_size / 1024).toFixed(2)} KB`,
            mime_type: video.mime_type || 'video/mp4',
        }
    } else {
        ctx.reply("Unsupported file type")
        return
    }

    ctx.session.fileInfo = fileInfo 
    return fileInfo
}

module.exports = {
    handlerFileProperty
}
