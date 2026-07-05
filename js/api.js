async function generateNews(prompt) {

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const body = {
        contents: [
            {
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ]
    };

    try {

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        // Tampilkan semua response di Console
        console.log("Status :", res.status);
        console.log("Response :", data);

        if (!res.ok) {
            return "ERROR " + res.status + " : " +
                (data.error?.message || JSON.stringify(data));
        }

        return data.candidates?.[0]?.content?.parts?.[0]?.text
            || "AI tidak memberikan respon.";

    } catch (err) {

        console.error(err);

        return "ERROR : " + err.message;

    }
}
