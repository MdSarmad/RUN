const express = require("express");
const cors = require("cors");
const {generateFile} = require("./generateFile");
const { executeCpp } = require("./executeCpp");

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({projectName: "codeCompiler"});
});

app.post("/run", async (req, res) => {
    // const language = req.body.language;
    // const code = req.body.cod;
    const {language="cpp", code} = req.body;
    if(code === undefined) {
        return res.status(400).json({
            success: false,
            error: "Empty code body!"
        })
    }

    // we need to generate a cpp file with content from the request
    // we need to run the file and send the response

    try{
        const filepath = await generateFile(language,code);
        const output = await executeCpp(filepath);
        return res.json({filepath, output}); 
    } catch (error) {
        res.status(500).json({error});
    }
})

app.listen(2022, () => {
    console.log(`Listening on port 2022`);
});