$(document).ready(function(){
    $('#submit').click(function(){
        console.log("Thanks for submitting the form");
        $('#question_container').show();
    })
    
    $('#question_container').on('submit',function(e){
        e.preventDefault(); 
        
        const chapterId = $('#chapter').val();
        const question = $('#question').val();
        const question_type = $('#question_type').val();
        const option1 = $('#option1').val();
        const option2 = $('#option2').val();
        const option3 = $('#option3').val();
        const option4 = $('#option4').val();
        const solution = $('#solution').val();
        const level = $('#level').val();
        const key = $('#key').val();
        const minimum_time = $('#minimum_time').val();
        
        var formdata = new FormData();
        
        // Add text inputs to formdata
        formdata.append("question", question);
        formdata.append("question_type", question_type);
        formdata.append("option1", option1);
        formdata.append("option2", option2);
        formdata.append("option3", option3);
        formdata.append("option4", option4);
        formdata.append("solution", solution);
        formdata.append("level", level);
        formdata.append("key", key);
        formdata.append("minimum_time", minimum_time);

        // Manually add the image files to the formdata
        var questionImage = $('#question_image')[0].files[0];
        var solutionImage = $('#solution_image')[0].files[0];
        var option1Image = $('#option1_image')[0].files[0];
        var option2Image = $('#option2_image')[0].files[0];
        var option3Image = $('#option3_image')[0].files[0];
        var option4Image = $('#option4_image')[0].files[0];

        if (questionImage) formdata.append("question_image", questionImage);
        if (solutionImage) formdata.append("solution_image", solutionImage);
        if (option1Image) formdata.append("option1_image", option1Image);
        if (option2Image) formdata.append("option2_image", option2Image);
        if (option3Image) formdata.append("option3_image", option3Image);
        if (option4Image) formdata.append("option4_image", option4Image);
        
        console.log("Form data:", formdata);
        
        if(question){
            $.ajax({
                url: `/submit-question/${chapterId}`,
                type: 'POST',
                processData: false, // Prevent jQuery from automatically processing the data
                contentType: false, // Let the browser set the content type (multipart/form-data)
                data: formdata, // Send the formdata with the files
                success: function(){
                    alert("Question added successfully");
                },
                error: function(){
                    alert("Error occurred while adding the question");
                }
            });
        }
    });
});
