import axios from "axios";
async function runTest() {
    console.log("Testing /invoke API...");
    try {
        const res = await axios.post("http://localhost:3000/invoke", { input: "What is the capital of France?" });
        console.log("Result:", JSON.stringify(res.data, null, 2));
    }
    catch (err) {
        console.error("Fetch failed:", err.response?.data || err.message);
    }
}
runTest();
//# sourceMappingURL=test-api.js.map