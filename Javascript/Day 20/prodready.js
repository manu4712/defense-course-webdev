// ---------- Utilities ----------
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const logger = (message) => {
  console.log(`[${new Date().toLocaleString()}] ${message}`);
};


// ---------- Core Order Processing Functions ----------

async function placeOrder(order) {
  logger("Order received.");
  logger(`Items: ${order.foodOrdered.join(", ")}`);
  logger(`Processing payment of ₹${order.foodCost}...`);

  await delay(2000); // simulate payment gateway

  logger("Payment successful. Order placed.");

  return {
    ...order,
    paid: true,
    status: "ORDER_PLACED",
  };
}

async function prepareOrder(order) {
  logger("Kitchen started preparing your food…");

  await delay(3000); // simulate cooking time

  logger("Food prepared and ready for pickup.");

  return {
    ...order,
    token: Math.floor(Math.random() * 500),
    status: "READY_FOR_PICKUP",
  };
}

async function assignDelivery(order) {
  logger("Assigning delivery partner…");

  await delay(1500);

  logger("Delivery partner assigned: Rahul (Hero Splendor)");

  return {
    ...order,
    deliveryPartner: "Rahul",
    status: "PARTNER_ASSIGNED",
  };
}

async function pickupOrder(order) {
  logger(`Delivery partner reached restaurant: ${order.restaurantLocation}`);

  await delay(2500);

  logger("Order picked up successfully.");

  return {
    ...order,
    pickedUp: true,
    status: "PICKED_UP",
  };
}

async function deliverOrder(order) {
  logger("Delivery partner is on the way to customer…");

  await delay(4000); // simulate travel time

  logger("Order delivered to customer!");

  return {
    ...order,
    deliveryDone: true,
    status: "DELIVERED",
    deliveredAt: new Date().toLocaleString(),
  };
}


// ---------- Orchestrator (Production Workflow) ----------

async function processOrder(orderDetails) {
  try {
    let order = { ...orderDetails };

    order = await placeOrder(order);
    order = await prepareOrder(order);
    order = await assignDelivery(order);

    // pickup & delivery can be done sequentially
    order = await pickupOrder(order);
    order = await deliverOrder(order);

    logger("Final order state:");
    console.log(order);

    return order;

  } catch (err) {
    logger("ERROR OCCURRED:");
    console.error(err);
  }
}


// ---------- Example Run ----------
const orderDetails = {
  orderId: 201,
  foodOrdered: ["Biriyani", "Pulka", "Thumbs Up 2 liters"],
  foodCost: 500,
  customerName: "Manu",
  customerLocation: "Banjara hills, Hyderabad",
  restaurantLocation: "Ameerpet, Hyderabad",
};

processOrder(orderDetails);
