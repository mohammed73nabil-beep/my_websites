const fileUrl = "http://localhost:5000/uploads/04517998-01ce-4e92-aded-b37cf9b85d5f.webp";
const url2 = "/uploads/some-uuid.webp";

function test(url) {
    console.log("Testing:", url);
    const match = url.match(/\/uploads\/([^/]+)$/);
    if (match) {
        console.log("Match found! Filename:", match[1]);
    } else {
        console.log("No match found.");
    }
}

test(fileUrl);
test(url2);
