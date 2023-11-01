
const UploadImage = ((req, res) => {
    if (req.file) {
        res.send("Single file uploaded successfully");
    } else {
        res.status(400).send("Please upload a valid image");
    }
})

module.exports = {
    UploadImage
}