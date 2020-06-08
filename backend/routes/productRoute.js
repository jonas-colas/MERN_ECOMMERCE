import express from 'express';
import Product from '../models/productModel';

const router = express.Router();

router.get("/", async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});

router.post("", async (req, res) =>{
	const product = new Product({
		name: req.body.name,	
		category: req.body.category,	
		image: req.body.image,	
		price: req.body.price,	
		brand: req.body.brand,	
		description: req.body.description,	
		countInStock: req.body.countInStock,	
		rating: req.body.rating,	
		numReviews: req.body.numReviews,	
	});
	const newProduct = await product.save();
	if (newProduct) {
		return res.status(201).send({message: 'New Product Stored!', data: newProduct });
	}
	return res.status(500).send({message: 'Cannot store product.'});
});

export default router;