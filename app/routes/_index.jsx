import { Link } from "@remix-run/react";

export default function Index() {
    return (
        <div>
            <header>
            <img src="/currency.svg" alt="currency" id="logo"/>
            </header>
            <main id="content">
            <h1>Trusted Global Currency Converter & Money Transfer Solutions</h1>
            <p>Best source for currency conversion, sending money online and tracking exchange rates</p>
            <p id="btn">
                <Link to="/converter">Convert</Link>
            </p>
        </main>
        </div> 
    );
}