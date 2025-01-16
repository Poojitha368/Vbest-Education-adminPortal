console.log("this is my dropdowm")
$(document).ready(function(){
    $('#syllabus').on('change',function(){
        const syllabusId = $(this).val();
        console.log(syllabusId)
        $('#year').empty()
        if(syllabusId){
            $.ajax({
                url:'/years',
                type:'GET',
                success:function(data){
                    $('#year').append(`<option value="">Select year </option>`)
                    data.forEach(item => {
                        $('#year').append(`<option value="${item.year_id}">${item.year_name}</option>`)
                    });
                }
            })
        }
    })

    $('#year').on('change',function(){
        const yearId = $(this).val();
        console.log(yearId)
        $('#subject').empty()
        if(yearId){
            $.ajax({
                url:'/subjects',
                type:'GET',
                success:function(data){
                    $('#subject').append(`<option value="">Select subject </option>`)
                    data.forEach(item=>{
                        $('#subject').append(`<option value="${item.subject_id}">${item.subject_name}</option>`)
                    })
                }
            })
        }

        $('#subject').on('change',function(){
            const subjectId = $(this).val();
            const yearId = $('#year').val();
            console.log(yearId)
            console.log(subjectId)
           $('#chapter').empty()
            if(subjectId){
                $.ajax({
                    url:`/chapters/${subjectId}/${yearId}`,
                    type:'GET',
                    success:function(data){
                        $('#chapter').append(`<option value="">Select chapters </option>`)
                        data.forEach(item=>{
                            $('#chapter').append(`<option value="${item.chapter_id}">${item.chapter_name}</option>`)
                        })
                    }
                })
            }
        })
    })
})