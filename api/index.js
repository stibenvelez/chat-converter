import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);

app.post("/convert", async (req, res) => {
    const value = req.body.value;

    if (value <= 0 || value === "" || !value) {
        res.status(400).json({ msg: "Ingrese un valor mayor que cero" });
        return;
    }

    try {
        var config = {
            method: "get",
            url: `https://api.exchangerate.host/convert?from=COP&to=USD&amount=${value}`,
            headers: {},
        };
        const { data } = await axios(config);

        res.json({
            name: "App-convert",
            result: `${data.result.toFixed(2)} USD`,
            type: "message",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Hubo un error" });
    }

    /*
    INSERT INTO conversions (valueFrom, result)
    VALUES (value,  data.result);
    */
});

server.listen(PORT);
