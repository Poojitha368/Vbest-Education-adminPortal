$(document).ready(function () {
  $('#question_container').submit(function(event){
      event.preventDefault();
      const chapterId = $("#chapter_id").val() || 1;
      const formData = new FormData();

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
          let file = $(`input[name='${name}']`)[0].files[0];
          if (file) formData.append(name, file);
      };

      appendFile("question_image");
      appendFile("solution_image");
      appendFile("option1_image");
      appendFile("option2_image");
      appendFile("option3_image");
      appendFile("option4_image");

      $.ajax({
        url: `upload/${chapterId}`,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend:function(){
          console.log("before the question adding");
        },
        success: function (response) {
              alert("Question submitted successfully!");
              console.log(response);
        },
        error: function (xhr, status, error) {
              alert("Error submitting question: " + error);
              console.log(xhr.responseText);
        }
      });
  });
});
