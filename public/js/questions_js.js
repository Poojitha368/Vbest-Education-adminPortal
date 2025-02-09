console.log("Question script loaded!");

$(document).ready(function () {
    const chapterId = sessionStorage.getItem("chapter_id");

    console.log("Using Chapter ID:", chapterId);

    $('#question_container').submit(function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("chapter_id", chapterId);
        formData.append("question", $('#question').val().trim());
        formData.append("question_type", $("select[name='question_type']").val());
        formData.append("level", $("select[name='level']").val());
        formData.append("key", $("select[name='key']").val());
        formData.append("minimum_time", $("#minimum_time").val());
        formData.append("option1", $("#option1").val().trim());
        formData.append("option2", $("#option2").val().trim());
        formData.append("option3", $("#option3").val().trim());
        formData.append("option4", $("#option4").val().trim());
        formData.append("solution", $("#solution").val().trim());

        // Append images if selected
        const appendFile = (name) => {
            let file = document.querySelector(`input[name="${name}"]`)?.files[0];
            if (file) formData.append(name, file);
        };

        appendFile("question_image");
        appendFile("solution_image");
        appendFile("option1_image");
        appendFile("option2_image");
        appendFile("option3_image");
        appendFile("option4_image");

        $.ajax({
            url: "/upload",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Question submitted successfully!");
                console.log(response);
            },
            error: function (xhr) {
                alert("Error submitting question: " + xhr.responseText);
                console.log(xhr.responseText);
            }
        });
    });
});
