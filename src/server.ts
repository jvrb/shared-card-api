import { app } from "./app";

// Definindo a porta do servidor
const PORT = 3333

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})