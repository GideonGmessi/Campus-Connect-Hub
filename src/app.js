const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
 app.use(cors());
 app.use(helmet());
 app.use(express.json({ limit: '10kb' })); 

//  app.use((req, res, next) => {
//     console.log('Content-Type:', req.headers['content-type']);
//     console.log('Raw request body:', req.body).select(-password);
//     next();
//  }); 

app.use('/api/auth/register', (req, res, next) => {
    console.log('registratiion', {
        name: req.body?.name,
        email: req.body?.email
    });
    next();
})

 
const {notFound, errorHandler} = require('./middlewares/error.middleware');

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/user.route'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;