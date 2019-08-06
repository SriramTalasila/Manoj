var express = require("express")
var path = require("path")
var app = express()
var port = process.env.PORT || 3000
app.use('/', express.static(path.join(__dirname, 'public')))
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})