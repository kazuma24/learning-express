const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * middleware sample code .
 */
const logger = function(req, res, next) {
    console.log(`LOGGED`);
    next();
};
app.use(logger);


const requestTime = function(req, res, next) {
    req.requestTime = Date.now();
    next();
};
app.use(requestTime);
app.get('/time', (req, res) => {
    const requestTime = req.requestTime;
    res.send(`requestTime : ${requestTime}`);
})

/**
 * GET sample code . 
 */
app.get('/', (req, res) => {
    res.send('Express API is runnning!');
});

app.get("/hello/:name", (req, res) => {
    const name = req.params.name;
    res.send(`param ${name}`);
});

app.get("/hello", (req, res) => {
    const name = req.query.name;
    res.send(`query ${name}`);
});


/**
 * POST sample code . 
 */
app.post('/api/test', (req, res) => {
    const requestData = req.body;

    res.json({
        receivedData: requestData
    });
});

/**
 * Routing sample code .
 */
app.route('/book')
   .get((req, res) => {
        res.status(200).send('get book');
   })
   .post((req, res) => {
        const addBook = req.body.book;
        res.status(201).send(`add book ${addBook}`);
   })
   .put((req, res) => {
        const book = req.body.book;
        res.status(201).send(`updated book ${book}`);
   });


/**
 * ファイル分割
 * ルーティング、ミドルウェア、コントローラで分ける
 */
const mainRouter = require('./routes/mainRouter');

app.use('/mainRouter', mainRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


