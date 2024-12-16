import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5
  },
];



function getItemById(id) {
  return listProducts.find((product) => product.itemId === id);
}

const app = express();
app.listen(1245, () => {
  console.log('Server listening on port 1245');
});
const redisCli = redis.createClient();

async function reserveStockById(itemId, stock) {
  return promisify(redisCli.SET).bind(redisCli)(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  return promisify(redisCli.GET).bind(redisCli)(`item.${itemId}`);
}

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId(\\d+)', async (req, res) => {
//   const id = Number.parseInt(req.params?.itemId);
    const id = req.params && req.params.itemId ? Number.parseInt(req.params.itemId) : NaN;

  const product = getItemById(id);
  if (product) {
    await getCurrentReservedStockById(id)
      .then((r) => Number.parseInt(r || 0))
      .then((r) => {
        product.currentQuantity = product.initialAvailableQuantity - r;
        res.json(product);
        return;
      });
  } else {
    res.status(404).json({ status: 'Product not found' });
    return;
  }
});

app.get('/reserve_product/:itemId(\\d+)', async (req, res) => {
//   const id = Number .parseInt(req.params?.itemId);
    const id = req.params && req.params.itemId ? Number.parseInt(req.params.itemId) : NaN;

  const product = getItemById(id);
  if (product) {
    await getCurrentReservedStockById(id)
      .then((r) => Number.parseInt(r || 0))
      .then(async (reserved) => {
        if (reserved >= product.initialAvailableQuantity) {
          res.json({ status: 'Not enough stock available', itemId: id });
          return;
        }
        await reserveStockById(id, reserved + 1)
          .then(() => res.json({ status: 'Reservation confirmed', itemId: id }));
      });
  } else {
    res.status(404).json({ status: 'Product not found' });
  }
})
