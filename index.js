const express = require('express');
//add body parser
const bodyParser = require('body-parser');
// add cors
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');



const configuration = new Configuration({
	organization: 'org-QkLEZZkAs0eGzM9yJxb8CsAp',
	apiKey: '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',
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const response = await openai.createCompletion({
// 	model: 'text-davinci-003',
// 	prompt: 'Say this is a test',
// 	max_tokens: 7,
// 	temperature: 0,
// });
// express api that calls method callAPI
const app = express();
app.use(bodyParser.json());
app.use(cors());


// app.use(express.json);
// app.use(express.urlencoded({extended: true}))
const port = 3080;
app.post('/', async (req, res) => {
    const { message, currModel } = req.body;
    console.log(currModel);
    const response = await openai.createCompletion({
        model: `${currModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature:0.5,  
    })
    res.json({
        // data:response.data
        message:response.data.choices[0].text,
    })
});
app.get('/models', async (req, res) => {
    const response = await openai.listModels();
    // console.log(response.data.data)
    res.json({
        models: response.data
    })
})

app.listen(port, () => {
	console.log('server up and running');
});
