import { server } from "./server.js";

const PORT = process.env.PORT || 3000

server.listen(PORT, async () => {
    console.log(`listening on http://localhost:${PORT}`)
})