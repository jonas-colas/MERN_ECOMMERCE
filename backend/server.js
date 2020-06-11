import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//import fileUpload from 'express-fileupload';
//import path from 'path';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
//import orderRoute from './routes/orderRoute';

dotenv.config();

//const mongodbUrl =config.MONGODB_URL;	
//const port = config.PORT;
mongoose.connect('mongodb://localhost/amazon', { //mongodbUrl, 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).catch(error => console.log(error.reason));

mongoose.connection.on('connected', () => {
	console.log('Database connection is successful !!!');
});

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

/*app.get("/api/products/:id", (req, res) => {
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
});*/

app.listen(5000, () => {console.log("server started at http://localhost:5000") });