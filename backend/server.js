import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';

dotenv.config();

//const mongodbUrl =config.MONGODB_URL;	
mongoose.connect('mongodb://localhost/amazon', { //mongodbUrl, 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).catch(error => console.log(error.reason));

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected !!!');
});

const app = express();

app.use("/api/users", userRoute);

app.get("/api/products/:id", (req, res) => {
	const productId = req.params.id;
	const product = data.products.find(X => X._id === productId);
	if (product) {
		res.send(product);
	}else{
		res.status(404).send({msg: "Product Not Found"});	
	}
});

app.get("/api/products", (req, res) => {
	res.send(data.products);
});

app.listen(5000, () => {console.log("server started at http://localhost:5000") });