$(document).foundation();

$.ajax('https://localhost:7184/api/v1/Smjer',   // request url
    {
        success: function (data, status, xhr) {// success callback function
           // console.log(data);
           for(let i=0;i<data.length;i++){
            $('#podaci').append('<li>' + data[i].naziv + '</li>');
           }
    }
});

$('#dodaj').click(function(){

    let smjer = { naziv: $('#naziv').val(), trajanje: $('#trajanje').val() };

    $.ajax('https://localhost:7184/api/v1/Smjer', {
        type: 'POST',  // http method
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(smjer),  // data to submit
        success: function (data, status, xhr) {
            $('#podaci').append('<li>' + $('#naziv').val() + '</li>');
        },
        error: function (jqXhr, textStatus, errorMessage) {
                //alert(errorMessage);
                console.log(errorMessage);
        }
    });

    return false;
});