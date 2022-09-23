const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const origin = process.env.ORIGIN;
const port = process.env.PORT;

const app = express();
app.use(cookieParser());
app.use(cors({credentials: true, origin: origin}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));