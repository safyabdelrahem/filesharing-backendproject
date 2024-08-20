const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
    console.log(`Fetching file with UUID: ${req.params.uuid}`);
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            console.log('File not found or link expired.');
            return res.render('download', { error: 'Link has been expired.' });
        }
        console.log('File found:', file);
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${req.protocol}://${req.get('host')}/files/download/${file.uuid}`
        });
    } catch (err) {
        console.error('Error fetching file:', err);
        return res.render('download', { error: 'Something went wrong.' });
    }
});



module.exports = router;