export default async function handler(request, response) {
    if (request.method !== "POST") {
        return response.status(405).json({ error: "Method not allowed" });
    }

    try {
        const payload = typeof request.body === "string"
            ? request.body
            : JSON.stringify(request.body);

        const googleResponse = await fetch(
            "https://script.google.com/macros/s/AKfycbw05cVoKThkucL6gBJSVdHySb63QZAHPLF-37D90GJmeYPAzevMRSQXf3I8WNpa9nRFDA/exec",
            {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: payload
            }
        );

        const result = await googleResponse.text();
        return response.status(googleResponse.ok ? 200 : googleResponse.status)
            .send(result);
    } catch (error) {
        return response.status(502).json({ error: "Unable to reach Google Apps Script" });
    }
}