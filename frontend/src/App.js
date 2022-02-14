import logo from "./logo.svg";
import "./App.css";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;
		document.body.appendChild(script);
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
	});
}

const __DEV__ = document.domain === "localhost";

function App() {
	async function displayRazorpay() {
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) {
			alert("Razorpay failed to connect");
			return;
		}
		const data = await fetch("http://localhost:1337/razorpay", {
			method: "POST",
		}).then((t) => t.json());
		console.log(data);

		const options = {
			key: __DEV__ ? "rzp_test_7YZxpMWv7sBQ8F" : "Production_key",
			currency: data.currency,
			amount: data.amount,
			order_id: data.id,
			name: "Donation",
			description: "Test Transaction",
			image: "https://img.icons8.com/fluency/48/000000/charity.png",
			handler: function (response) {
				alert(response.razorpay_payment_id);
				alert(response.razorpay_order_id);
				alert(response.razorpay_signature);
			},
			prefill: {
				name: "",
				email: "sdsdsdsds@gmail.com",
				phone: "7878787878",
			},
		};
		var paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Donate 1000Rs
				</a>
			</header>
		</div>
	);
}

export default App;
