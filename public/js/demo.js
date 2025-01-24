console.log("demo");
$(document).ready(function () {
    $('#demo').on('submit', function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const chapterId = 1; // Replace with dynamic ID if needed
        const formData = new FormData();

        // Get file inputs
        const file1 = $('#file1')[0].files[0];
        const file2 = $('#file2')[0].files[0];

        // Append files if they exist
        if (file1) formData.append('file1', file1);
        if (file2) formData.append('file2', file2);
        console.log("files added to formdata");

        // Append other form data (e.g., question text)
        const question = $('input[name="question"]').val();
        if (question) formData.append('question', question);
        console.log("question added to formdata");

        // Send AJAX request
        $.ajax({
            url: `/upload/${chapterId}`,
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                alert('Files uploaded successfully!');
                console.log('Response:', response);
            },
            error: function (err) {
                alert('Error uploading files.');
                console.error('Error:', err);
            }
        });
    });
});
