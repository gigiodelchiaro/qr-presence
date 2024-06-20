//<script>

    function docReady(fn) {
        // see if DOM is already available
        if (document.readyState === "complete"
            || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    docReady(function () {
        var resultContainer = document.getElementById('qr-reader-results');
        var lastResult, countResults = 0;
        var scannedResults = []; // Array to store scan results

        function onScanSuccess(decodedText, decodedResult) {
            if (decodedText !== lastResult) {
                ++countResults;
                lastResult = decodedText;
                scannedResults.push(decodedText); // Store the result
                // Handle on success condition with the decoded message.
                console.log(`Scan result ${decodedText}`, decodedResult);
                displayResults(); // Update the displayed results
            }
        }

        function displayResults() {
            // Clear previous results
            resultContainer.innerHTML = '';
            // Display all scan results
            scannedResults.forEach((result, index) => {
                var resultItem = document.createElement('div');
                resultItem.textContent = `Result ${index + 1}: ${result}`;
                resultContainer.appendChild(resultItem);
            });
        }

        var html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", { fps: 10, qrbox: 250 });
        html5QrcodeScanner.render(onScanSuccess);
    });
//</script>