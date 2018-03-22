$(function () {
    $(".load").click(function(){
        $.ajax({
            url : "http://127.0.0.1:8080/getuserlist",
            method : "GET",
            dataType : "json",
            success : function (data) {
                var tableHtml = "";
                $.each(data,function (i,item) {
                    tableHtml += "<tr>";
                    tableHtml += "<td>"+item._id+"</td>";
                    tableHtml += "<td>"+item.name+"</td>";
                    tableHtml += "<td>"+item.age+"</td>";
                    tableHtml += "<td>"+item.sex+"</td>";
                    tableHtml += "</tr>";
                })
                $("#table").find("tbody").html(tableHtml)
            },
            error : function () {
                console.log("error")
            }
        })
    })
    $(".Submit").click(function () {
        var name = $(".name").val();
        var age = $(".age").val();
        var sex
        $.each($(".sex"),function () {
            if($(this)[0].checked){
                sex = $(this).attr("sign")
            }
        })
        $.ajax({
            url : "http://127.0.0.1:8080/submit",
            method : "POST",
            dataType : "json",
            data : {
                name : name,
                age : age,
                sex : sex
            },
            success : function (data) {
                $(".load").click();
            },
            error : function () {
                console.log("error")
            }
        })
    })
})