# Checkout Stripe Frontend

This project is a frontend application in an e-commerce setting. It incorporates Stripe for payment processing and offers features such as user authentication, product exploration, shopping cart operations, and access to order history.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository: git clone
   https://github.com/YourRepository/checkout-stripe.git

2. Navigate to the project directory: cd checkout-stripe

3. Install dependencies: npm install

### Configuration

1. Ensure the backend service is up and running, as this frontend interacts with
   it: https://github.com/SigneAnnaMaria/checkout-stripe-backend.git
2. Create a `.env` file in the root directory of the project.
3. Add the Stripe public key (REACT_APP_STRIPE_PUBLIC_KEY) to your `.env` file.

### Running the Application

Execute the following command to start the server: npm start

### Requirements

1. The task is submitted on time. 2. Products must be listed on one page. 3. Products that are displayed and purchased must be retrieved from Stripe. 4. It must be possible to add products to a shopping cart. 5. Based on the shopping cart, it must be possible to place an order through Stripe. 6. You must be able to register as a user in the web shop. This should result in a "Customer" being created in Stripe and the user saving in a JSON file. (all passwords must be saved hashed). 7. You must be able to log in as a customer. The logged-in customer (which is also saved in Stripe) must be used when placing an order. 8. You must not be able to place an order if you are not logged in. Further requirements: 1. All above points are met 2. It must work to enter a discount code to get a discount on your purchase (This is done through Stripe) 3. As logged in, you must be able to see your placed orders. 4. All placed orders must be saved to a list in a JSON file. 5. The order must not under any circumstances placed without completed payment! (i.e. Never save an order item unless you have received confirmation back from Stripe that the payment has gone through)
