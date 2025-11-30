//simplyfying call back hell with promises

const orderDetails = {
  orderId: 201,
  foodOrdered: ["Biriyani", "Pulka", "Thumbs Up 2 liters"],
  foodCost: 500,
  customerName: "Manu",
  customerLocation: "Banjara hills,Hyderabad",
  restaurantLocation: "Ameerpet,Hyderabad",
};

function placeOrder(orderDetails) {
  return new Promise((resolve, reject) => {
    console.log("Thank you for choosing our app.");
    console.log(`You have ordered ${orderDetails.foodOrdered}.`);
    console.log(`Your Payment of rs.${orderDetails.foodCost} is in progress.`);

    setTimeout(() => {
      console.log("Payment received and your order is placed.");
      orderDetails.paid = true;
      resolve(orderDetails);
      reject("Couldn't able to place order. ");
    }, 3000);
  });
}

function prepareOrder(orderDetails) {
  return new Promise((resolve, reject) => {
    console.log(
      `Your food ${orderDetails.foodOrdered}  preparation has started.`
    );

    setTimeout(() => {
      console.log("Your order is ready now.");
      orderDetails.token = 150;
      resolve(orderDetails);
      reject("Couldn't able to prepare order. ");
    }, 3000);
  });
}

function pickupOrder(orderDetails) {
  return new Promise((resolve, reject) => {
    console.log(
      `Delivery boy is on the way to pickup your order from ${orderDetails.restaurantLocation}.`
    );

    setTimeout(() => {
      console.log(
        `Delivery boy has picked up your order from ${orderDetails.restaurantLocation}.`
      );
      orderDetails.pickedUp = true;
      resolve(orderDetails);
      reject("Couldn't able to pick up order. ");
    }, 3000);
  });
}

function deliverOrder(orderDetails) {
  return new Promise((resolve, reject) => {
    console.log(
      `Delivery boy is on the way to deliver your order to your place ${orderDetails.customerLocation}.`
    );

    setTimeout(() => {
      console.log("Order delivered successfully.");
      orderDetails.deliveryDone = true;
      resolve(orderDetails);
      reject("Couldn't able to deliver order. ");
    }, 3000);
  });
}

placeOrder(orderDetails)
  .then((orderDetails) => prepareOrder(orderDetails))
  .then((orderDetails) => pickupOrder(orderDetails))
  .then((orderDetails) => deliverOrder(orderDetails))
  .then((orderDetails) => console.log(orderDetails))
  .catch((error) => console.log(error));
