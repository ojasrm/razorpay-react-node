// ssh -R 80:localhost:1337 nokey@localhost.run

const app = require("express")();
const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require("cors");
const { ok } = require("assert");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
	key_id: "rzp_test_7YZxpMWv7sBQ8F",
	key_secret: "ZQGqNB5idR4udBM6jCk9aDCw",
});

app.post("/verification", (req, res) => {
	const secret = "12345678";
	console.log(req.body);
	const crypto = require("crypto");
	const shasum = crypto.createHmac("sha256", secret);
	shasum.update(JSON.stringify(req.body));
	const digest = shasum.digest("hex");

	console.log(digest, req.headers["x-razorpay-signature"]);

	if (digest === req.headers["x-razorpay-signature"]) {
		console.log("request is legit");
		//process it
		// require("fs").writeFileSync(
		// 	"payment1.json",
		// 	JSON.stringify(req.body, null, 4)
		// );
	} else {
		//pass it
	}

	res.json({ status: "ok" });
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
