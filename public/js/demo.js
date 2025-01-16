console.log("demo");
$(document).ready(function(){
    $('#demo').on('submit',function(){
        const chapterId = 1;
        const formData = new FormData();
        if(file1){const file1 = $('#file1')[0].files[0];} 
        if(file2){const file2 = $('#file2')[0].files[0]};
        formData.append('file1',file1);
        formData.append('file2',file2);
        $.ajax({
            url:`/upload/${chapterId}`,
            type:'POST',
            processData: false, 
            contentType: false,
            data:formData,
            success: function(){
                alert('files uploaded sucessfully');
                // console.log(response);
            },
            error: function (err) {
                alert('Error uploading files.');
                console.error(err);
            }
        })
    })
})