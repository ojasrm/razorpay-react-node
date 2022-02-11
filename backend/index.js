const app = require("express")();
const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require("cors");

app.use(cors());

const razorpay = new Razorpay({
	key_id: "rzp_test_7YZxpMWv7sBQ8F",
	key_secret: "ZQGqNB5idR4udBM6jCk9aDCw",
});

app.post("/razorpay", async (req, res) => {
	const payment_capture = 1;
	const amount = 1000;
	const currency = "INR";

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture,
	};

	try {
		const response = await razorpay.orders.create(options);
		console.log(response);
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
		});
	} catch (e) {
		console.log(e);
	}
});

app.listen(1337, () => {
	console.log("Listening on 1337");
});
