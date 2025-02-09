$(document).ready(function () {
    $('#dropdowns').submit(function (event) {
        event.preventDefault();

        const chapterId = $('#chapter').val();
        console.log("Selected Chapter ID:", chapterId);
        sessionStorage.setItem("chapter_id", chapterId);

        window.location.href = "/questions"; 
    });

    $('#syllabus').on('change', function () {
        const syllabusId = $(this).val();
        console.log("Syllabus ID:", syllabusId);

        $('#year').html('<option value="">Select year</option>');
        $('#subject').html('<option value="">Select subject</option>');
        $('#chapter').html('<option value="">Select chapters</option>');

        if (syllabusId) {
            $.ajax({
                url: '/years',
                type: 'GET',
                success: function (data) {
                    data.forEach(item => {
                        $('#year').append(`<option value="${item.year_id}">${item.year_name}</option>`);
                    });
                }
            });
        }
    });

    $('#year').on('change', function () {
        const yearId = $(this).val();
        console.log("Year ID:", yearId);

        $('#subject').html('<option value="">Select subject</option>');
        $('#chapter').html('<option value="">Select chapters</option>');

        if (yearId) {
            $.ajax({
                url: '/subjects',
                type: 'GET',
                success: function (data) {
                    data.forEach(item => {
                        $('#subject').append(`<option value="${item.subject_id}">${item.subject_name}</option>`);
                    });
                }
            });
        }
    });

    $('#subject').on('change', function () {
        const subjectId = $(this).val();
        const yearId = $('#year').val();
        console.log("Selected Year ID:", yearId);
        console.log("Selected Subject ID:", subjectId);

        $('#chapter').html('<option value="">Select chapters</option>');

        if (subjectId && yearId) {
            $.ajax({
                url: `/chapters/${subjectId}/${yearId}`,
                type: 'GET',
                success: function (data) {
                    data.forEach(item => {
                        $('#chapter').append(`<option value="${item.chapter_id}">${item.chapter_name}</option>`);
                    });
                }
            });
        }
    });

    // Clear button functionality
    $('#clear').click(function (event) {
        event.preventDefault(); // Prevent default action

        $('#syllabus').val(""); 
        $('#year').html('<option value="">Select year</option>');
        $('#subject').html('<option value="">Select subject</option>');
        $('#chapter').html('<option value="">Select chapters</option>');
        
        sessionStorage.removeItem("chapter_id");
    });
});
