import { Form, useActionData } from "@remix-run/react";
import { json } from "@remix-run/react";
import axios from "axios";

const currencies = [
  "SGD",
  "MYR",
  "EUR",
  "USD",
  "AUD",
  "JPY",
  "CNH",
  "HKD",
  "CAD",
  "INR",
  "DKK",
  "GBP",
  "RUB",
  "NZD",
  "MXN",
  "IDR",
  "TWD",
  "THB",
  "VND",
];

export async function action({ request }) {
  const body = await request.formData();
  const fromCurrency = body.get("fromCurrency");
  const toCurrency = body.get("toCurrency");
  const amount = body.get("amount");

  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    params: {
      from: fromCurrency,
      to: toCurrency,
      q: 1,
    },
    headers: {
      "X-RapidAPI-Key": "097cba6a3cmsh01ea34efab263b5p1d419bjsnd054f83d8dc0",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const exchangeRate = response.data;
    const value = response.data * amount;
    return json({
      message1: `${amount} ${fromCurrency} = ${value} ${toCurrency}`,
      message2: `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`,
    });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to fetch exchange rate." }, { status: 500 });
  }
}

export default function Test() {
  const data = useActionData(action);
  return (
    <div>
      <header>
        <img src="/currency.svg" alt="currency" id="logo" />
      </header>
      <main id="content">
        <h1>Currency Converter</h1>
        <h3>Check live foreign currency exchange rates</h3>
        <div id="convertContainer">
        <Form method="post">
  <div class="input-wrapper">
    <label htmlFor="amount">Amount</label>
    <input type="number" name="amount" id="amount" class="input" />
  </div>

  <div class="input-wrapper">
    <label htmlFor="fromCurrency">From</label>
    <select name="fromCurrency" class="input">
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
  <img src="/switch.svg" alt="switch" id="switch" />
  <div class="input-wrapper">
    <label htmlFor="toCurrency">To</label>
    <select name="toCurrency" class="input">
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>

  <div id="convertBottom">
    <div id="results">
      {data && data.message1 && <p>{data.message1}</p>}
      {data && data.message2 && <p>{data.message2}</p>}
      {data && data.error && <p>{data.error}</p>}
    </div>
    <button type="submit" id="submitBtn">
      Convert
    </button>
  </div>
</Form>

        </div>
      </main>
    </div>
  );
}
