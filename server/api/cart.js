const express = require("express")
const app = express.Router()
const { User } = require("../db")

// Get the user's cart
app.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send(await user.getCart())
  } catch (ex) {
    next(ex)
  }
})

// Add an item to the user's cart
app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send(await user.addToCart(req.body))
  } catch (ex) {
    next(ex)
  }
})

// Remove an item from the user's cart
app.put("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    console.log("API", req.body)
    res.send(await user.removeFromCart(req.body))
  } catch (ex) {
    next(ex)
  }
})

module.exports = app
