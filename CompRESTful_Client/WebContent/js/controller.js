   var CompanyApp = angular.module('CompanyApp', ['ngResource']);

    //Main Controller for the RESTfull client application
    CompanyApp.controller('MainController', function($scope, Company, Owner, CompanyUpdate, ByOwnerId,DelOwnerByCompId, OwnerUpdate, $timeout) {

        //The following is to Search by the Company Id.
        $scope.recordLength = null;
        $scope.isDisabled;
        $scope.count = 0;
        $scope.cnt = 1;
        DeleteFlag = false;
        $scope.recordChangeFlag = false;
        $scope.Formstatus = "NEW";
        $("#ScreenStatus").text("NEW");
        $scope.CompValidate =true;
      
        //orignal Response of JSON Array will be fetch under this array.
        $scope.response = {};
        $scope.listOwner = {};
        //Empty Array to preserve the Orginal Record Fetched.
        $scope.companyRecord = {};

        
        $scope.removeRow = function(event,index1,owenerId){				
              
      		var dilogubox = $("#"+ $("#"+event.target.id).parent().prop('id')).next().prop('id');
      		var diloguboxYesBt = $("#"+$("#"+ $("#"+event.target.id).parent().prop('id')).next().prop('id')+ " div:nth-child(3)").attr('id');
      		var diloguboxNoBt = $("#"+$("#"+ $("#"+event.target.id).parent().prop('id')).next().prop('id')+ " div:nth-child(4)").attr('id');
      		var id = $("#"+event.target.id).closest("div").attr("id");

      		 $scope.ownerId = $("#" + $("#" + $("#" + event.target.id).parent(".ConfirmDilogue1").parent("#ButtonsPanel").parent("ul.cellbody").attr('id') + " li:nth-child(2)").attr('id') + " input:first-child").val();
         	 $('#'+dilogubox).css("display", 'Block');
      		 $('#'+dilogubox).draggable({
       	        stop: function(event, ui) {
       	            $('#'+dilogubox).css("display", 'block');
       	        }
       	    });
      		 $('#'+diloguboxYesBt).click(function() {
     			  $('#'+dilogubox).css("display", 'none');
     			 $scope.DeleteOwnerRecord(event,index1);
      		 });
      		$('#'+diloguboxNoBt).click(function() {
      			  $('#'+dilogubox).css("display", 'none');
      		 });
        };

        $scope.DeleteOwnerRecord = function(event,index) {
           // console.log("Delete the Owner Record");       	
            $scope.ownerId = $("#" + $("#" + $("#" + event.target.id).parent(".Btnpanel2").parent("ul.cellbody").attr('id') + " li:nth-child(2)").attr('id') + " input:first-child").val();

            $timeout(function() {
                            var response = ByOwnerId.remove({ownerId: $scope.ownerId}, function() {
                            	try {
                            	//$('#ConfirmDilogueBox1').css("display", 'none');
                                $("#ScreenStatus").text('Record Sucessfully Deleted');
                                console.log('Record Sucessfully Deleted');
                            } catch (e) {
                                if (e instanceof SyntaxError) {
                                    $("#ScreenStatus").text('Unable to Delete Owner Record');
                                    console.log("Unable to Delete Owne Record");
                                }
                            }
                            });
                    });
                  //  console.log('myindex'+ index);
                    //Delete the record from the JSON Array 
              		$scope.listOwner.splice( index, 1 );	 
        }
        
        
        $scope.EditOwnerRecord = function(event) {
            //Get the Value of Owner Id.
        	
         	$('#close1').click(function() {
      		  $('#ErrorMessage').css("display", 'none');
      		});
              $scope.ownerId = $("#" + $("#" + $("#" + event.target.id).parent(".Btnpanel2").parent("ul.cellbody").attr('id') + " li:nth-child(2)").attr('id') + " input:first-child").val();
                  var ItemId = $("#" + event.target.id).parent(".Btnpanel2").parent("ul.cellbody").attr('id');
             
                  fields = $("#" + ItemId + " :input").not("button");
              var validFlag = $scope.validateOwner(event,$scope.ownerId);

           	 if (validFlag==true){	    
           	
           		 fields.each(function(index, element) {
                var isDisabled = $(element).is(':disabled');
                $scope.isDisabled = $(element).is(':disabled');
                var ownerItemId = $("#" + $("#" + $("#" + event.target.id).parent(".Btnpanel2").parent("ul.cellbody").attr('id') + " li:nth-child(2)").attr('id') + " input:first-child").attr('id');
           
                //Check if the items are disabled
                if (isDisabled) {
                    if (element.id !== ownerItemId) {
                        $(element).prop('disabled', false);
                       // console.log(element.id+" - "+ownerItemId);
                        $(element).toggleClass('TexItem', false);
                        $("#" + event.target.id).toggleClass('ion-edit', false);
                        $("#" + event.target.id).toggleClass('ion-android-checkbox-outline', true);
                    }
                } else {
                  
                 
                	if (element.id !== ownerItemId) {
                		  $('#ErrorMessage').css("display", 'none');
                        $(element).prop('disabled', true);
                        $(element).toggleClass('TexItem', true);
                        $("#" + event.target.id).toggleClass('ion-edit', true);
                        $("#" + event.target.id).toggleClass('ion-android-checkbox-outline', false);
                    }
                  }
                
           
                // Attach on change event to all the items within the scope defined up in the fields object.
                $(element).on("input", function() {
                  // console.log('Changed Scope' + $scope.Formstatus);
                    if ($scope.Formstatus == "QUERY") {
                     //   console.log($("#NeWRecoFlag").val());
                        if ($("#NeWRecoFlag").val() == 0) {
                            $scope.recordChangeFlag = true;
                        //    console.log('Changed Scope I am here' + $scope.Formstatus);
                            $scope.Formstatus = "CHANGED1";
                            $("#ScreenStatus").text('CHANGED1');
                          //  console.log($scope.Formstatus);
                        }
                    }
                });
            });
           	 }   
           	 
             var validFlag = $scope.validateOwner(event,$scope.ownerId);
 if (validFlag==true){	   	 
            $scope.ownerName = $("#ownerName" + $scope.ownerId).val();
            $scope.ownerAddress = $("#ownerAddress" + $scope.ownerId).val();
            $scope.ownerCityName = $("#ownerCityName" + $scope.ownerId).val();
            $scope.ownerCountryName = $("#ownerCountryName" + $scope.ownerId).val();
            $scope.ownerEmail = $("#ownerEmail" + $scope.ownerId).val();
            $scope.ownerPhone = $("#ownerPhone" + $scope.ownerId).val();
            $scope.ownerCompid = $("#CompanyID").val();
          
   
  
            if ($scope.Formstatus == "CHANGED1") {
                 try {
                	 
                	 OwnerUpdate.update({ownerId: $scope.ownerId}, {
                        ownerId: $scope.ownerId,
                        ownerName: $scope.ownerName,
                        ownerAddress: $scope.ownerAddress,
                        ownerCityName: $scope.ownerCityName,
                        ownerCountryName: $scope.ownerCountryName,
                        ownerEmail: $scope.ownerEmail,
                        ownerPhone: $scope.ownerPhone,
                        ownerCompid: $scope.ownerCompid
                    });
                
                   } catch (e) {
                      if (e instanceof SyntaxError) {
                          $("#ScreenStatus").text('Unable to update this Record');
                          console.log("Unable to update this Record");
                          }
                      }
                	
                    $("#ScreenStatus").text('Owner Record Sucessfully Updated');
                    console.log('Updating Owner Record');
            }
       
       }
            //For saving the owner record;
            if ($scope.Formstatus == "NEW1") {
           	 var validFlag = $scope.validateOwner(event,$scope.ownerId);
             if (validFlag==true){	
                    try {
                    	 $timeout(function() { 
                    	Owner.save({ownerId: $scope.ownerId}, {
                        ownerId: $scope.ownerId,
                        ownerName: $scope.ownerName,
                        ownerAddress: $scope.ownerAddress,
                        ownerCityName: $scope.ownerCityName,
                        ownerCountryName: $scope.ownerCountryName,
                        ownerEmail: $scope.ownerEmail,
                        ownerPhone: $scope.ownerPhone,
                        ownerCompid: $scope.ownerCompid
                    	});
                    	 },200);
                    	 $("#NeWRecoFlag").val('0');
                         $("#ScreenStatus").text('Owner Record Sucessfully Added');
                         console.log('Saving Owner Record');
                         console.log($scope.ownerCompid);
                         
                    	$scope.Formstatus = "QUERY";
                   	  } catch (e) {
                         if (e instanceof SyntaxError) {
                             $("#ScreenStatus").text('Unable to save this Record');
                               console.log("Unable to Add this Record");
                              }
                            }
          
            	 }
             if (validFlag==true){	   
                    //to wait before the above save is commited to the database.
                    console.log("This is for Quering the record");
                    try {
                    	  $timeout(function() {
                        var response2 = Owner.query({compid: $scope.ownerCompid}, function() {
                            $scope.listOwner = response2;
                        });
                    	  }, 300);
                    } catch (e) {
                        if (e instanceof SyntaxError) {
                            $("#ScreenStatus").text('Unable to Query this Record');
                            console.log("Unable to Query this Record")
                        }
                    }
             } 
            }
        }

       
        $scope.addownerRecord = function(event) {
            var counter = 0;
            fields1 = $("#addNow2").not("button");
            var itemid = $("#DetailRecords" + " ul:last-child").attr('id');
               //The following is to get the current record ownerid
            var ownerid = $("#" + itemid + "input:first-child").val();
            fields1.each(function(index, element) {
                var isDisabled = $(element).is(':disabled');
                console.log('isDisabled - ' + isDisabled);
            });

            //this will ensure that when the Add button press subsequently always add one empty record 
            if ($("#NeWRecoFlag").val() == 0) {
                if (typeof ownerid == "undefined" || ownerid > 0) {
                    $scope.listOwner.push({
                        ownerId: null,
                        ownerName: null,
                        ownerAddress: null,
                        ownerCityName: null,
                        ownerEmail: null,
                        ownerPhone: null,
                        ownerCompid: null,
                        ownerCountryName: null

                    });
                }
                $scope.Formstatus == "NEW1";
                $("#ScreenStatus").text("NEW1");
                $("#NeWRecoFlag").val('1');
                //This $timeout function useful to wait for Dynamic Dom to render before it seek an ID object in DOM API.
                $timeout(function() {
                    var itemid = $("#DetailRecords" + " ul:last-child").attr('id');
                    //the following is to get  the if of Edit Button Clicked item 
                    var itemid2 = $("#" + itemid + " div:nth-child(1)").attr('id');
                    var ItemId1 = $('#' + itemid).attr("id");
                    fields = $("#" + ItemId1 + " :input").not("button");

                    var ownerId = $("#" + $("#" + $("#" + ItemId1).attr('id') + " li:nth-child(2)").attr('id') + " input:first-child").attr('id');
                    fields.each(function(index, element) {
                        var isDisabled = $(element).is(':disabled');
                        $scope.isDisabled = $(element).is(':disabled');

                        $("#ownerName" ).focus();
                        if (isDisabled) {
                            if (element.id !== ownerId) {
                                $(element).toggleClass('TexItem', false);
                                $(element).prop('disabled', false);
                                $("#" + itemid2).toggleClass('ion-edit', false);
                                $("#" + itemid2).toggleClass('ion-android-checkbox-outline', true);
                                $scope.Formstatus = "NEW1";
                                $("#ScreenStatus").text('NEW1');
                            }

                        } else {
                           // console.log('This is not disabled');

                            $scope.ownerName = $("#ownerName" + $scope.ownerId).val();
                            $scope.ownerAddress = $("#ownerAddress" + $scope.ownerId).val();
                            $scope.ownerCityName = $("#ownerCityName" + $scope.ownerId).val();
                            $scope.ownerCountryName = $("#ownerCountryName" + $scope.ownerId).val();
                            $scope.ownerEmail = $("#ownerEmail" + $scope.ownerId).val();
                            $scope.ownerPhone = $("#ownerPhone" + $scope.ownerId).val();
                            $scope.ownerCompid = $("#CompanyID" + $scope.ownerId).val();

                                if (element.id !== ownerId) {
                                $(element).prop('disabled', true);
                                $(element).toggleClass('TexItem', true);
                                $("#" + itemid2).toggleClass('ion-edit', true);
                                $("#" + itemid2).toggleClass('ion-android-checkbox-outline', false);
                            }
                        }
                        
                        // Attach on change event to all the items within the scope defined up in the fields object.
                        $(element).on("input", function() {

                            if ($scope.Formstatus == "QUERY") {

                                if ($("#NeWRecoFlag").val() == 0) {
                                    $scope.recordChangeFlag = true;

                                    $scope.Formstatus = "CHANGED1";
                                    $("#ScreenStatus").text('CHANGED1');
 
                                }
                            }
                        });
                    });
                });
               // console.log("Add Owner Record");
             
            }
            
        }
        
        function queryOwnerRecord(companyid){
        	try {
        		 $timeout(function() {
                     var response2 = Owner.query({compid: companyid}, function() {
                      	  $scope.listOwner = response2;
                         //console.log($scope.listOwner);
                     }, function () {
                   	  $("#ScreenStatus").text('No Owner Record found by this Company ID - '+ companyid);
                         console.log('No Owner Record found by this Company ID - '+companyid);
             		    });
                         },200);
				 } catch (e) {
                     if (e instanceof SyntaxError) {
                         $("#ScreenStatus").text('Unable to Query the Owner Record');
                         console.log("Unable to Query the Owner Record");
                     }
                 }
        }
        function clearCompanyRecord() {
            //Clear the records
            $scope.compid = "";
            $scope.compName = "";
            $scope.compAddress = "";
            $scope.cityName = "";
            $scope.countryName = "";
            $scope.email = "";
            $scope.phone = "";
           //To query empty Company Record
            queryOwnerRecord('00000000000000000000000000');
        }
        function validateEmail(email) { 
        	  // http://stackoverflow.com/a/46181/11236
        	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        	    return re.test(email);
        	}
        
        //Method to validate the company record before saving or updating.
        $scope.validateCompany = function(event) { 
        	var validComp = true;
        	var CompanyName = $('#CompanyName').val();

        	if(CompanyName||CompanyName.val){
        		 $('#CompanyName').text('');
     			validComp = true;
        	 }else{
        		 $('#CompanyName').text('Please enter Company Name');
         		validComp = false;
        	 }
        	 
        	 
        	 var CompanyAddress = $('#CompanyAddress').val();
        	if(CompanyAddress||CompanyAddress.val){
        		 $('#ErrCompanyAddress').text('');
      			validComp = true;
        	 }else{
        		 $('#ErrCompanyAddress').text('Please enter Company Address');
         		validComp = false;
     	 }
     	 
        	 var CompanyCity = $('#CompanyCity').val();
        	if(CompanyCity||CompanyCity.val){
        		 $('#ErrCompanyCity').text('');
       			validComp = true;
        	 }else{
        		 $('#ErrCompanyCity').text('Please enter City Name');
         		validComp = false;
	
      	 }
            var	CompCountry = $('#CompanyCountry').val();
        	
            if(CompCountry||CompCountry.val){
            	$('#ErrCompanyCountry').text('');
      			validComp = true;
            }else{
            	$('#ErrCompanyCountry').text('Please enter Country Name');
        		validComp = false;
      			
      	 }
        	
        	var email= $('#CompanyEmail').val();
        	if(email||email.val){
        		if (validateEmail(email)) {
        			 $('#ErrCompanyEmail').text('');
            			validComp = true;
        	 
        	 }else{
        		 $('#ErrCompanyEmail').text('Please enter correct email address');
        		 validComp = false;
        	 }	
       	 }
        	return validComp;
}
        
        //method to validate the Owner Record before saving or updating.
        $scope.validateOwner = function(event,ownerid) {
        	var validComp = true;
        	var validComp1 = true;
        	var validComp2 = true;
        	var validComp3 = true;
        	var validComp4 = true;
        	var validComp5 = true;
  
        	$("#ErrorMessage").empty();
        	$( "<div id=close1\" class=\"closesign icon ion-android-close\">" ).appendTo( "#ErrorMessage" );
        	//$("#ErrorMessage").append($("<div id=close1\" class=\"closesign icon ion-android-close\">").text());
    		$("#ErrorMessage").append($("<div>").text('Owner ID#'+ ownerid));
        	var CompanyName = $('#ownerName'+ownerid).val();
        
       
        	 if(CompanyName||CompanyName.val){
     			validComp1 = true;
        	 }else{
        		 $("#ErrorMessage").append($("<li>").text('Please enter Owner Name'));
         		validComp1 = false;
        	 }
        	 
        	 
        	 var CompanyAddress = $('#ownerAddress'+ownerid).val();
        	if(CompanyAddress||CompanyAddress.val){
      			validComp2 = true;
        	 }else{
        		 $("#ErrorMessage").append($("<li>").text('Please enter Address'));
        		
         		validComp2 = false;
        		
     	 }
     	 
        	 var CompanyCity = $('#ownerCityName'+ownerid).val();
        	if(CompanyCity||CompanyCity.val){
        		// $('#ErrCompanyCity').text('');
       			validComp3 = true;
        	 }else{
        		 $("#ErrorMessage").append($("<li>").text('Please enter City Name'));
        		 
         		validComp3 = false;
         		
        		
      	 }
            var	CompCountry = $('#ownerCountryName'+ownerid).val();
        	
            if(CompCountry||CompCountry.val){
      			validComp4 = true;
            }else{
            	$("#ErrorMessage").append($("<li>").text('Please enter Country'));
            validComp4 = false;
      			
      	 }
        	console.log('#ownerEmail'+ownerid);
        	var email= $('#ownerEmail'+ownerid).val();
        	if(email||email.val){
        		if (validateEmail(email)) {
            			validComp5 = true;
        	 
        	 }else{
        		 $("#ErrorMessage").append($("<li>").text('Please enter correct email address'));
        		 validComp5 = false;
        	 }	
       	 }
        	if (validComp1==false||validComp2==false||validComp3==false||validComp4==false||validComp5==false){
        	  $('#ErrorMessage').css("display", 'block');
        		validComp=false;

        	}else{
        		validComp=true;
        	}
        	return validComp;
        }
        
        
        // Main function for navigating through records i.e Next/Previous/First/Last Record.
        $scope.RecodPaging = function(n, event) {
            $scope.compid = $('#CompanyIDS').val();

            if ((n == null || n == "") && $scope.count == 1) {
                n = 1;
                console.log("n is null");
            }
            if (n < 0) {
                n = 0;
                console.log("the n is -1");
            }
            if (($scope.compid == "" || $scope.compid == "null") && n >= 0)
            // to get All records
            {
               //To get the lenght of record fetched from the RESTfull Server.
                $scope.response = Company.query(function() {
                $scope.recordLength = $scope.response.length;
                    try {
                        //Assign all values for Company Master record with the required position.
                        $scope.compid = $scope.response[n].compId;
                        $scope.compName = $scope.response[n].compName;
                        $scope.compAddress = $scope.response[n].compAddress;
                        $scope.cityName = $scope.response[n].cityName;
                        $scope.countryName = $scope.response[n].countryName;
                        $scope.email = $scope.response[n].email;
                        $scope.phone = $scope.response[n].phone;
                        $("#ScreenStatus").text(n + 1 + ' Record');
                        //To ensure the detail records being queried along the master.
				
                        //Query the Owner Record 
                        queryOwnerRecord($scope.compid);
                        
                    } catch (e) {
                        if (e instanceof SyntaxError) {
                            $("#ScreenStatus").text('Error No Record for this range');
                            console.log("Error No Record for this range");
                        }
                    }
                }); //query() returns all the entries
            } else {
                if (typeof(response) !== "undefined") {
                    $scope.recordLength = response.length;
                }
            }
        }

        //Method to Search All or One company record.
        $scope.SearchCompanyRecord = function(event) {
        	    var mytmepcompid = $scope.compid;
                $scope.compid = $('#CompanyIDS').val();
                $("#ownerId").prop("disabled", true);
                $("#ownerName").prop("disabled", true);
                $scope.Formstatus = "QUERY";
                $("#ScreenStatus").text("QUERY" + 1 + ' Record');

                try {
                if ($scope.compid == "" || $scope.compid == "null")
                // to get All records
              {
                        var response = Company.query(function() {
                            // Following block of code actually will fetch the value from the 
                            //JSON arary and assign to respective field in the company master form.
                       
                    	
                    	    $scope.recordLength = response.length;
                            $scope.compid = response[0].compId;
                            $scope.compName = response[0].compName;
                            $scope.compAddress = response[0].compAddress;
                            $scope.cityName = response[0].cityName;
                            $scope.countryName = response[0].countryName;
                            $scope.email = response[0].email;
                            $scope.phone = response[0].phone;
                            $("#ScreenStatus").text('Queried All records');
                            //Ensure the Detail Records are populated w.r.t.o company master record.
                    	  
                            //Query the Owner Record 
                            queryOwnerRecord($scope.compid);
                          
                     
                        }, function () {
                        	
                      	  $("#ScreenStatus").text('There is no record found in the database ');
                            console.log('There is no record found in the database ');
                          
                            
                        }); //query() returns all the entries
           

                } else {
                    //Return only single record.
                    console.log("CompanyRecord Get else");
                	try {
                		
                	                		  
                        response = Company.get({compid: $scope.compid}, function() {
                        
                        		$scope.compid = response.compId;
                            $scope.compName = response.compName;
                            $scope.compAddress = response.compAddress;
                            $scope.cityName = response.cityName;
                            $scope.countryName = response.countryName;
                            $scope.email = response.email;
                            $scope.phone = response.phone;
                            $("#ScreenStatus").text('Queried One Record');
                                    
                        	  try {
                        		  //Query the Owner Record 
                                  queryOwnerRecord($scope.compid);
                        	  } catch (e) {
                                  if (e instanceof SyntaxError) {
                                      $("#ScreenStatus").text('Unable to Query owner Record');
                                      console.log("Unable to Query owner Record");
                                  }
                              }
                        	  //Catch the failure if there is Internal 500 errors where there is no data found by the key.
                        }, function () {
                        	if (typeof $scope.compid!=="undefined"){
                        		$scope.compid = mytmepcompid;
                           	}
                        
                        	  $('#InfoDilogueBox').css('display','block');
                              $('#InfoDilogYesButton').click(function() {	
                              	$('#InfoDilogueBox').css('display','none');
                              	 $( "#CompanyIDS" ).focus();
                              });
                              
                        	$("#ScreenStatus").text('No Record found by this Company ID -'+ $('#CompanyIDS').val());
                              console.log('No Record found by this Company ID -'+$('#CompanyIDS').val());
                  		    }); // get() returns a single Company
                
                	} catch (e) {
                         if (e instanceof SyntaxError) {
                             $("#ScreenStatus").text('Unable to Query Company Record');
                             console.log("Unable to Query Company Record");
                         }
                     }
                }
            
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        $("#ScreenStatus").text('Unable to Save company Record');
                        console.log("Unable to Save company Record");
                    }
                	 
                }
            
               // console.log('Changed Scope Line 39812' + $scope.Formstatus);
         }
        
     
        
            //Method to Save the Company record even the record have been updated.
        $scope.saveCompanyRecord = function(event) {
        	var CompValidate2 = $scope.validateCompany();
        	//console.log("validate company"+ CompValidate2);
            if (($("#CompanyID").prop('disabled') == true 
            		&& $scope.Formstatus == "NEW") 
            		&& ($scope.recordChangeFlag == false
            		&& CompValidate2==true)) {
               // console.log('Saving the record');
                try {
                	
                    Company.save({compid: $scope.compid}, {
                        compId: $scope.compid,
                        compName: $scope.compName,
                        compAddress: $scope.compAddress,
                        cityName: $scope.cityName,
                        countryName: $scope.countryName,
                        email: $scope.email,
                        phone: $scope.phone
                    });
                    
                    $timeout(function() {          
                    var response = Company.query(function() {
                        // Following block of code actually will fetch the value from the 
                        //JSON arary and assign to respective field in the company master form.
                   try {
                	   $scope.CompanyLength = response.length;
                	    console.log($scope.CompanyLength);
                	  var CompanyLength= $scope.CompanyLength-1;
                	    console.log('COMPANY LENGTH - '+CompanyLength);
                        $scope.compid = response[CompanyLength].compId;
                        $scope.compName = response[CompanyLength].compName;
                        $scope.compAddress = response[CompanyLength].compAddress;
                        $scope.cityName = response[CompanyLength].cityName;
                        $scope.countryName = response[CompanyLength].countryName;
                        $scope.email = response[CompanyLength].email;
                        $scope.phone = response[CompanyLength].phone;
                        $("#ScreenStatus").text('Queried All records');
                        //Ensure the Detail Records are populated w.r.t.o company master record.
                       
                        //Query the Owner Record 
                        queryOwnerRecord($scope.compid);
                      
                   } catch (e) {
                       if (e instanceof SyntaxError) {
                           $("#ScreenStatus").text('Unable to Save company Record');
                           console.log("Unable to Save company Record");
                       }
                   }
                   });//query() returns all the entries
                    },200); //timeout
                    console.log('Company Record Sucessfully Saved');
                    $("#ScreenStatus").text('Company Record Sucessfully Saved');
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        $("#ScreenStatus").text('Unable to Query Company Record');
                        console.log("Unable to Query Company Record");
                    }
                }
             }

            if ($scope.Formstatus == "CHANGED" && $scope.CompValidate==true) {
                try {
                    CompanyUpdate.update({compid: $scope.compid}, {
                        compId: $scope.compid,
                        compName: $scope.compName,
                        compAddress: $scope.compAddress,
                        cityName: $scope.cityName,
                        countryName: $scope.countryName,
                        email: $scope.email,
                        phone: $scope.phone
                    });
        
                    $("#ScreenStatus").text('Company Record Updated');
                    console.log('Updating Company Record');
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        $("#ScreenStatus").text('Unable to update this Record');
                        console.log("Unable to update this Record")
                    }
                }
            }
        }

        $scope.deleteCompanyRecord = function(event) {
        	var ownerCompId =$scope.compid;
            $('#DilogYesButton').click(function() {
                DeleteFlag = true;
                if (DeleteFlag) {
                	
                	try {
                		 $timeout(function() {
                        var response = Company.remove({compid: $scope.compid}, function() {
                            $('#ConfirmDilogueBox').css("display", 'none');
                            $("#ScreenStatus").text('Company Record Sucessfully Deleted');
                            console.log('Company Record Sucessfully Deleted')
                        });
                		 },200);
                		 
                		 
                    } catch (e) {
                        if (e instanceof SyntaxError) {
                            $("#ScreenStatus").text('Unable to update this Record');
                            console.log("Unable to update company Record")
                        }
                    }
                	
                    
                    try {
                      	 $timeout(function() {
                                    var response =  DelOwnerByCompId.remove({compid: ownerCompId}, function() {
                                 	$('#ConfirmDilogueBox').css("display", 'none');
                                     $("#ScreenStatus").text('Owner Record Sucessfully Deleted');
                                     console.log('Owner Record Sucessfully Deleted');
                               
                                 });
                         });
                      	  } catch (e) {
                                if (e instanceof SyntaxError) {
                                    $("#ScreenStatus").text('Unable to Delete Owner Record');
                                    console.log("Unable to Delete Owner Record");
                                }
                            }     
                	  $scope.SearchCompanyRecord(event);
                	 }
            });
        }

        //Method will clear the form to ensure user start entering a new record.	  
        $scope.addCompanyRecord = function(event) {
            $scope.Formstatus = "NEW";
            $("#ScreenStatus").text('NEW');
            if ($scope.recordChangeFlag) {
                $('#AlertDilogueBox').css("display", 'block');
                $('#AlertDilogYesButton').click(function() {
                    // Save the record
                    if ($scope.recordChangeFlag) {
                        try {
                            CompanyUpdate.update({
                                compid: $scope.compid
                            }, {
                                compId: $scope.compid,
                                compName: $scope.compName,
                                compAddress: $scope.compAddress,
                                cityName: $scope.cityName,
                                countryName: $scope.countryName,
                                email: $scope.email,
                                phone: $scope.phone
                            });
                            $("#ScreenStatus").text('Record Successfully Saved');
                            $('#AlertDilogueBox').css("display", 'none');

                            //Clear the records
                            clearCompanyRecord();
                            $("#ScreenStatus").text('NEW');
                            $scope.Formstatus = "NEW";
                            $scope.recordChangeFlag = false;

                        } catch (e) {
                            if (e instanceof SyntaxError) {
                                $("#ScreenStatus").text('Unable to Save this Record');
                                //console.log("Unable to Save this Record")
                            }
                        }
                    }
                });
            } else {
                $("#CompanyID").prop("disabled", true);
                //Clear the records
                clearCompanyRecord();
                $scope.Formstatus = "NEW";
                $("#ScreenStatus").text('NEW');
            }
            $( "#CompanyName" ).focus();
        }

        //The following Code will ensure when use clear the form should also clear the detail owner recrod, 
        ///therefore passing Dummy number  company id which never be exists in the database

        $("#CompanyID").prop("disabled", true);
        $("#CompanyName,#CompanyID,#CompanyAddress,#CompanyCity,#CompanyCountry,#CompanyEmail,#CompanyPhone").on("input", function() {

            if ($scope.Formstatus == "QUERY") {
                $scope.recordChangeFlag = true;
                $scope.Formstatus = "CHANGED";
                $("#ScreenStatus").text('CHANGED');
            }
        });

        $('#AlertDilogNoButton').click(function() {
            $('#AlertDilogueBox').css("display", 'none');

        });
    });

 
    