const express = require('express');
const app = express();

app.listen(3000);

const userRouter = require('./routes/users-map');
const channelRouter = require('./routes/channels');

app.use("/", userRouter.router);
app.use("/channels", channelRouter);

