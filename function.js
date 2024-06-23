//<script>
    const dateInput = document.getElementById('date');
    dateInput.value = formatDate();
    function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
    }
    function formatDate(date = new Date()) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
    }
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
        var scannedResults = [[]]; // Array to store scan results

        function onScanSuccess(decodedText, decodedResult) {
            var date = document.getElementById("date").value;
            
            var parts = date.split('-');
            var year = parts[0];
            var month = parts[1];
            var day = parts[2];
        
            // Create a new date string in DD/MM/YYYY format
            var formattedDate = day + '/' + month;
        
            // Check if the decoded text (tag) is already in scannedResults
            var foundIndex = scannedResults.findIndex(function(item) {
                return item[0] === decodedText;
            });
        
            if (foundIndex !== -1) {
                // Tag already exists in scannedResults
                var existingEntry = scannedResults[foundIndex];
                // Check if the date is different
                if (existingEntry[1] !== formattedDate) {
                    // Create a new column for the new date
                    existingEntry.push(formattedDate);
                }
            } else {
                // New tag, add to scannedResults with initial date
                scannedResults.push([decodedText, formattedDate]);
            }
        
            displayResults(); // Update the displayed results
        }
        
        function displayResults() {
            var csvContent = "id; Dates\n"; // CSV header
        
            // Loop through scannedResults
            for (var i = 1; i < scannedResults.length; i++) { // Start from 1 to skip the initial empty array [[]]
                var row = scannedResults[i];
                csvContent += row.join(";") + "\n"; // Join elements with comma and add newline
            }
        
            var textarea = document.getElementById("csv");
            textarea.value = csvContent; // Update textarea value
        }
        

        var html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", { fps: 10, qrbox: 250 });
        html5QrcodeScanner.render(onScanSuccess);
    });
//</script>