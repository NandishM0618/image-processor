export async function uploadFile(file, userId) {
    if (!file) return alert("No file selected")
    const REGION = process.env.REGION
    const API = process.env.API_GATEWAY_URL

    try {
        const res = await fetch(`https://${API}.execute-api.${REGION}.amazonaws.com/get-upload-url`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileName: file.name, fileType: file.type, userId }),
            credentials: "include",
        })
        const data = await res.json()
        const uploadUrl = data.uploadUrl

        const uploadRes = await fetch(uploadUrl, {
            method: "PUT",
            headers: { "content-type": file.type },
            body: file
        })
        if (uploadRes.ok) {
            alert("File uploaded successfully")
        }
        else {
            alert("Upload failed")
        }
    } catch (err) {
        console.error(err)
        alert("Something went wrong")
    }
}