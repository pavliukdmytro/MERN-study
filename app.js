const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');


app.use('/api/auth', require('./routes/auth.coutes'));

const PORT = config.get('port') || 5000;

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
	} catch (e) {
		console.log('server error', e.message);
		process.exit(1);
	}

}

start();

app.listen(PORT, () => console.log(`app has been started on port ${PORT}`));