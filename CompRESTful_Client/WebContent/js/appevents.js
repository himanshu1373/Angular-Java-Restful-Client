
    //To Delete Master Record by company iD
    $('#deleteNow').click(function() {
        var compid2 = $('#CompanyID').val();
        console.log("THIS IS TO DELETE COMPAN MASTER");
       // console.log(compid2);
        if (compid2) {
            $('#ConfirmDilogueBox').css("display", 'Block');

        }
    });

    $('#DilogNoButton').click(function() {
        $('#ConfirmDilogueBox').css("display", 'none');
    });

    $('#close1').click(function() {
        $('#ConfirmDilogueBox').css("display", 'none');
    });
    //attached Jquery UI dragable to Dilogue Boxes of the application
    $('#AlertDilogueBox').draggable({
        stop: function(event, ui) {
            $('#ConfirmDilogueBox').css("display", 'block');
        }
    });
 