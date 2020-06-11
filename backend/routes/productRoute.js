import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});

router.post("/", isAuth, isAdmin, async (req, res) =>{
	const product = new Product({
		name: req.body.name,	
		category: req.body.category,	
		image: req.body.image,	
		price: req.body.price,	
		brand: req.body.brand,	
		descr: req.body.descr,	
		stock: req.body.stock,	
		rating: req.body.rating,	
		numReviews: req.body.numReviews,	
	});
	const newProduct = await product.save();
	if (newProduct) {
		return res.status(201).send({message: 'New Product Stored!', data: newProduct });
	}
	return res.status(500).send({message: 'Cannot store product.'});
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);//findOne({_id: productId});
	if (product) {

		product.name = req.body.name;	
		product.category = req.body.category;	
		product.image = req.body.image;	
		product.price = req.body.price;	
		product.brand = req.body.brand;	
		product.descr = req.body.descr;	
		product.stock = req.body.stock;	
	
		const updatedProduct = await product.save();
		if (updatedProduct) {
			return res.status(200).send({message: 'New Product Updated!', data: updatedProduct });
		}
	}
	return res.status(500).send({message: 'Cannot update product.'});
	
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
	const deletedProduct = await Product.findById(req.params.id);
	if (deletedProduct) {
		await deletedProduct.remove();
		res.send({message: "Product Deleted"});
	}else{
		res.send("Error in Deletion");
	}
});

export default router;