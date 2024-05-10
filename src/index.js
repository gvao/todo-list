const { app } = require("./app.js")

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    console.log(`listening on http://localhost:${PORT}`)
})

