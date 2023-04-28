# Stocks App

Stocks App is a web application that allows users to track real-time stock prices of multiple companies. It uses the Alpha Vantage API to fetch stock prices and the Chart.js library to display the prices in a line chart.

## Getting Started

To run this app locally, you'll need to follow these steps:

1. Clone this repository to your local machine.
2. Create a file named `.env.local` in the root directory of the project.
3. In the `.env.local` file, add your Alpha Vantage API key in the following format: `ALPHAVANTAGE_KEY=<your-api-key>`.
4. Install the dependencies by running `npm install` or `yarn` or `pnpm` in the project directory.
5. Start the development server by running `npm run dev` or `yarn dev` or `pnpm dev`.

## Deployment

This app is deployed on Vercel and can be accessed at the following URL: https://stock-vision-app.vercel.app/.

## Technologies Used

Stocks App is built using the following technologies:

- Next.js
- React.js
- Chart.js
- Alpha Vantage API

## Features

Stocks App comes with the following features:

- Real-time update of stock prices every 5 minutes.
- Ability to track multiple companies.
- Legend to show/hide individual stock prices in the chart.
- Tooltips to display the price of a stock at a specific point in time.

## Acknowledgements

This app was built as part of a coding challenge. It uses the Alpha Vantage API for real-time stock price data and the Chart.js library for displaying the data in a line chart.

## License

This project is licensed under the GNU GPL-3.0 License. See the LICENSE file for more information.
