# Product List with Functional Cart

This project is a dynamic product list with a functional cart, allowing users to interact with products and manage their orders. Built using **Next.js**, **Tailwind CSS**, and **Context API** for state management, it provides a responsive and accessible interface with full keyboard navigation support.

## Features

- **Add Items to Cart**: Users can add products to the cart from the product list.
- **Remove Items from Cart**: Users can remove individual items from the cart.
- **Increase/Decrease Quantity**: Easily adjust the quantity of each item in the cart.
- **Order Confirmation Modal**: A modal appears when users confirm their order.
- **Reset Cart**: The "Start New Order" button resets the cart, clearing all selected items.
- **Keyboard Navigation**: Users can navigate the entire app and perform actions using only the keyboard.
- **Responsive Design**: The layout adapts to different screen sizes, providing an optimal viewing experience on both mobile and desktop devices.
- **Hover and Focus States**: Interactive elements have clear hover and focus states for better accessibility.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: Context API
- **Product Data**: Provided in `data.json`

## Project Setup

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/tundeloper/product-list-cart.git
    ```

2. Navigate to the project directory:

    ```bash
    cd product-list-cart
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

The project should now be running on `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
npm run build
npm run start

## File Structure
.
├── data.json/                 # Reusable UI components (ProductCard, Cart, etc.)
├── store/                     # Context API setup for global state management
├── src/App/page.tsx           # Next.js pages (index.js, _app.js, etc.)
├── public/                    # Static files
├── styles/                    # Tailwind CSS setup
├── data.json                  # Product data used for populating the product list
├── README.md                  # Project documentation
├── tailwind.config.ts         # tailwind styles configruration
└── package.json               # Dependencies and scripts