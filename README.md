# React + Redux + TypeScript + Vite
This user-friendly ecommerce app lets you select your favorite pizza flavors! Not only that, it enables you to customize your toppings on top of the default ingredients. You can also choose your desired size. The app then calculates your total based on your pizza selections.

## Introduction
This app does few things offline
1. Fetch default mock pizza data
2. Users can choose pizza as their preference
3. Allow customer to customize the size and toppings

## Acceptance Criteria
**As a customer:**
1. I want to be presented with a variety of pizzas and see a basket displayed when I load the page.
2. When I click on the Choose button, I expect a modal to appear, allowing me to customize my pizza with options like toppings and size.
3. After I've customized my pizza, I should be able to click the Add to basket button. This action should close the modal and add the pizza to the basket, displaying its price and selected options.
4. I want the basket to automatically calculate the total cost and display my chosen options for each pizza.
5. If I change my mind, I should be able to remove items from the basket.
6. When the basket is empty, I expect the checkout button to be disabled, preventing me from proceeding.
7. Conversely, when the basket contains one or more items, I anticipate the checkout button to be enabled, allowing me to proceed with the purchase.

## Getting Started
1. Clone or download the repository to your local machine.
2. Install the required dependencies by running`npm install` in the terminal.
3. Start the app by running `npm run dev`

## Screenshot
![](./screenshot.png)