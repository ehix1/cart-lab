import express from "express";
import CartItem from "../models/CartItem";

const cartRouter = express.Router();

// dummy database
const cartItems: CartItem[] = [
  { product: "Book", price: 20, quantity: 2, id: 1 },
  {
    product: "Guitar",
    price: 400,
    quantity: 1,
    id: 2,
  },
  {
    product: "Vinyl record",
    price: 17,
    quantity: 10,
    id: 3,
  },
  { product: "TV", price: 800, quantity: 1, id: 4 },
];
let nextId: number = 5;

// make endpoints
//1.
cartRouter.get("/cart-items", (req, res) => {
  const { maxPrice, prefix, pageSize } = req.query;
  res.status(200);
  res.json(cartItems);
});

//2.
cartRouter.get("/cart-items/:id", (req, res) => {
  const id: number = +req.params.id;
  const foundObject: CartItem | undefined = cartItems.find((item) => {
    return item.id === id;
  });
  if (foundObject) {
    res.status(200);
    res.json(foundObject);
  } else {
    res.status(404);
    res.json({ message: `no item found with id of ${id}` });
  }
});

//3.
cartRouter.post("/cart-items", (req, res) => {
  const newItem: CartItem = req.body;
  newItem.id = nextId++;
  cartItems.push(newItem);
  res.status(201);
  res.json(newItem);
});

//4.
cartRouter.put(".cart-items/:id", (req, res) => {
  const idToUpdate: number = +req.params.id;
  const updatedItem: CartItem = req.body;
  const foundIndex: number = cartItems.findIndex((item) => {
    return item.id === idToUpdate;
  });
  if (foundIndex !== -1) {
    cartItems[foundIndex] = updatedItem;
    res.status(200);
    res.json(updatedItem);
  } else {
    res.status(404);
    res.json({ message: `Item with id ${idToUpdate} not found` });
  }
});

//5.
cartRouter.delete("/cart-item/:id", (req, res) => {
  const idToDelete: number = +req.params.id;
  const foundIndex: number = cartItems.findIndex((item) => {
    return item.id === idToDelete;
  });
  if (foundIndex !== -1) {
    cartItems.splice(foundIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({ message: `item with id ${idToDelete} not found` });
  }
});

export default cartRouter;
