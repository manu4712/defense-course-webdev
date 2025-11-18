//let's simulate ordering food

const orderDetails = {
  orderId: 201,
  foodOrdered: ["Biriyani", "Pulka", "Thumbs Up 2 liters"],
  foodCost: 500,
  customerName: "Manu",
  customerLocation: "Banjara hills,Hyderabad",
  restaurantLocation: "Ameerpet,Hyderabad",
};

function placeOrder(orderDetails, callback) {
  console.log("Thank you for choosing our app.");
  console.log(`You have ordered ${orderDetails.foodOrdered}.`);
  console.log(`Your Payment of rs.${orderDetails.foodCost} is in progress.`);

  setTimeout(() => {
    console.log("Payment received and your order is placed.");
    orderDetails.paid = true;
    callback(orderDetails);
  }, 3000);
}

function prepareOrder(orderDetails, callback) {
  console.log(
    `Your food ${orderDetails.foodOrdered}  preparation has started.`
  );

  setTimeout(() => {
    console.log("Your order is ready now.");
    orderDetails.token = 150;
    callback(orderDetails);
  }, 3000);
}

function pickupOrder(orderDetails, callback) {
  console.log(
    `Delivery boy is on the way to pickup your order from ${orderDetails.restaurantLocation}.`
  );

  setTimeout(() => {
    console.log(
      `Delivery boy has picked up your order from ${orderDetails.restaurantLocation}.`
    );
    orderDetails.pickedUp = true;
    callback(orderDetails);
  }, 3000);
}

function deliverOrder(orderDetails) {
  console.log(
    `Delivery boy is on the way to deliver your order to your place ${orderDetails.customerLocation}.`
  );

  setTimeout(() => {
    console.log("Order delivered successfully.");
    orderDetails.deliveryDone = true;
    console.log(orderDetails);
  }, 3000);
}

/*
❌
placeOrder();
prepareOrder();

o/p:
Thank you for choosing our app.
Your Payment is in progress.
Your food preparation has started.
Payment received and your order is placed.
Your order is ready now.

This is not working the way we want it is just executing line by line we want to execute prepare order function only after executing place order.
*/

/*
✔️
placeOrder(prepareOrder)

o/p:
Thank you for choosing our app.
Your Payment is in progress.
Payment received and your order is placed.
Your food preparation has started.
Your order is ready now.
*/

/*
❌
but now we want need to call pickup order function also

placeOrder(prepareOrder(pickupOrder));

Your food preparation has started.
Thank you for choosing our app.
Your Payment is in progress.
Your order is ready now.
Delivery boy is on the way to pickup your order.
Payment received and your order is placed.
C:\Users\manoj\OneDrive\Desktop\repos\defense\Javascript\Day 18\index.js:9
    callback();
    ^

TypeError: callback is not a function
    at Timeout._onTimeout (C:\Users\manoj\OneDrive\Desktop\repos\defense\Javascript\Day 18\index.js:9:5)    
    at listOnTimeout (node:internal/timers:588:17)    
    at process.processTimers (node:internal/timers:523:7)

Node.js v22.19.0

This gave error so it is not the correct way to do it because first it will call prepare order then place order.
*/

/*
✔️
placeOrder(() => {
  prepareOrder(() => {
    pickupOrder(() => {
      deliverOrder();
    });
  });
});

o/p:
Thank you for choosing our app.
Your Payment is in progress.
Payment received and your order is placed.
Your food preparation has started.
Your order is ready now.
Delivery boy is on the way to pickup your order.
Delivery boy has picked up your order.
Delivery boy is on the way to deliver your order.
Order delivered successfully.

This gives the intended output.
*/

placeOrder(orderDetails, (orderDetails) => {
  prepareOrder(orderDetails, (orderDetails) => {
    pickupOrder(orderDetails, (orderDetails) => {
      deliverOrder(orderDetails);
    });
  });
});


