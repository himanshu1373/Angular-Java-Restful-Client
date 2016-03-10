<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html ng-app="CompanyApp">
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
   <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<title>Angular JS and RESTfull web Service</title>

<script type="text/javascript" src="js/angular.min.js"></script>
<script type="text/javascript" src="js/angular-resource.min.js"></script>
<script src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/controller.js"></script>
<script type="text/javascript" src="js/services.js"></script>
<script src="js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet" type="text/css" href="css/ionicons.css">
<link href="css/bootstrap.min.css" rel="stylesheet">
</head>
<body ng-controller="MainController">
<div class="MainContainer">

<div class="SearchPanel"> <label for="CompanyIDS" >Company ID </label>
 <input type="text" id="CompanyIDS" value=""><div id="searchNow" class="SearchBtn" ng-click ="SearchCompanyRecord()">Search</div>
    <div id="SaveNow" class="saveBtn" ng-click ="saveCompanyRecord()">Save</div>
  <div class="AppTitle">Angular JS RESTfull Client v.1 </div>
 </div>
  <form id="myform" novalidate class="css-form">
<ul class="FormPanel" >
<li>
 <label for="CompanyID">Company ID </label>
 <input type="text" id="CompanyID"   ng-model="compid" ng-pattern="/^\d+$/">
 </li>
 <li>
 <input type="hidden" id="Formstatus" ng-model="FormStatus">
  <label for="CompanyID">Name </label>
 <input type="text" id="CompanyName" ng-model="compName" required >
 <span id="ErrCompanyName" class="CompError"> </span>
<label for="CompanyAddress">Address</label>
 <input type="CompanyAddress" id="CompanyAddress" ng-model="compAddress" required >
  <span id="ErrCompanyAddress"  class="CompError"> </span>
 </li>
 <li>
  <label for="CompanyCity">City </label>
 <input type="text" id="CompanyCity" ng-model="cityName" required>
   <span id="ErrCompanyCity"  class="CompError"> </span>
<label for="CompanyCountry">Country </label>
 <input type="text" id="CompanyCountry" ng-model="countryName" required>
    <span id="ErrCompanyCountry"  class="CompError"> </span>
 </li>
 <li>
 <label for="CompanyEmail">Email </label>
 <input type="email" id="CompanyEmail" ng-model="email" required >
  <span id="ErrCompanyEmail"  class="CompError"> </span>
  <label for="CompanyID">Phone </label>
 <input type="tel" id="CompanyPhone" ng-model="phone">
 

 </li>
</ul>
 </form>
 <div id="BtnPanel" class="BtnPanel">
   <div id="addNow" class="addBtn" ng-click ="addCompanyRecord()">Add</div>
  <div id="deleteNow" class="deleteBtn" ng-click ="deleteCompanyRecord()">Delete</div>
     <div id="FirstRecord" class="panelbuttons size-16 icon ion-ios-skipbackward" ng-click ="RecodPaging(count=0)"></div>
     <div id="PrevRecord" class="panelbuttons size-16 icon ion-arrow-left-b" ng-click ="RecodPaging(count>0?count=count-1:count-1)"></div>
     <div id="NextRecord" class="panelbuttons size-16 icon ion-arrow-right-b" ng-click =" RecodPaging((count <= recordLength)?count=count+1:recordLength)"></div>
     <div id="LastRecord" class="panelbuttons size-16 icon ion-ios-skipforward" ng-click ="RecodPaging(recordLength-1)"></div>
    
<!--  RecodPaging((count <= recordLength)?count=count+1:recordLength)">{{ count }}{{ recordLength }} --> 
 </div>
 </div>
 
 
<div class="main" cellpadding="2" cellspacing="2" border="1" >
<div class="DetailTitle">Owner Details</div>
<ul >
  <li><input type="checkbox" id="selectionAll" class="chkboxClass"/></li>
   <li class="ownerid">ID</li>
   <li class="ownerNameTitle">Name</li>
   <li class ="owneraddTitle">Address</li>
   <li class ="ownerCityTitle">City</li>
   <li class ="ownerCountryTitle">Country</li>
   <li class="owneremailTitle">Email</li>
   <li class="ownerphoneTitle">Phone</li>
     <li><input type="hidden" id="NeWRecoFlag"class="TexItem"  value="0" disabled="disabled"/></li>
</ul>
<div id="DetailRecords">
<ul id ="multirow{{ $index }}" class="cellbody" ng-repeat="pr in listOwner track by $index">

  <li><input type="checkbox" id="selection" class="chkboxClass" disabled="disabled"/></li>
  <li id="my2nd{{pr.ownerId}}"><input type="text" id="ownerId{{pr.ownerId}}"class="TexItem ownerid2" ng-model="pr.ownerId" value ="{{pr.ownerId}}" disabled="disabled"/></li>
  <li><input type="text" id="ownerName{{pr.ownerId}}"class="TexItem ownerName" ng-model="pr.ownerName" disabled="disabled"/></li>
  <li><input type="text" id="ownerAddress{{pr.ownerId}}"class="TexItem owneradd" ng-model="pr.ownerAddress" disabled="disabled"/></li>
  <li><input type="text" id="ownerCityName{{pr.ownerId}}"class="TexItem ownerEmail" ng-model="pr.ownerCityName" disabled="disabled"/></li>
  <li><input type="text" id="ownerCountryName{{pr.ownerId}}"class="TexItem ownerPhone" ng-model="pr.ownerCountryName" disabled="disabled"/></li>
  <li><input type="text" id="ownerEmail{{pr.ownerId}}"class="TexItem ownerEmail" ng-model="pr.ownerEmail" disabled="disabled"/></li>
  <li><input type="text" id="ownerPhone{{pr.ownerId}}"class="TexItem ownerPhone" ng-model="pr.ownerPhone" disabled="disabled"/></li>
  <li><input type="hidden" id="ownerCompid{{pr.ownerId}}"class="TexItem ownerPhone" ng-model="pr.ownerCompid" value="{{pr.ownerCompid}}" disabled="disabled"/></li>

<div id="ButtonsPanel{{pr.ownerId}}" class="Btnpanel2">
  <div id="EditOwnerNow{{ $index }}" class="editBtn S ion-edit" ng-click="EditOwnerRecord($event)"></div>
  <div id="deleteOwnerNow{{ $index }}" class="deleteBtn S ion-android-remove-circle" ng-click="removeRow($event,$index,company.ownerId)"></div>
<div id="ErrorMessage" class="triangle-isosceles"><div id="close1" class="closesign icon ion-android-close"></div>
</div>
  </div>
    
<div id="ConfirmDilogueBox1{{pr.ownerId}}" Class="ConfirmDilogue1">
<div id="DilogueStrip" class="DilogueRibbon icon ion-android-delete ">Delete record<div id="close1" class="closesign icon ion-android-close"></div></div>
<div id="DiglogueMessage" class="DilogueMsg"><div class="mydelcircle size-48 icon ion-android-cancel"></div>Do you want to delete the record?</div>
<div id="DilogYesButton1{{pr.ownerId}}" class="DilogButton DilogButtonAfter">Yes</div>
<div id="DilogNoButton1{{pr.ownerId}}" class="DilogButton DilogButtonAfter"> No </div>
</div> 

</ul>
</div>
<div id="BtnPanel" class="BtnPanel2">

     <div id="addNow2" class="addBtn2 size-32 ion-plus-circled" ng-click ="addownerRecord($event)"></div>
       <div class="Appfooter">Contact: Himanshu Sethi, E:mail- <a href="himanshurs88@gmail.com">himanshurs88@gmail.com</a> ,Mobile: 111-111-1111</div>
<!-- <div id="SaveNow" class="saveBtn" ng-click ="saveownerRecord($event)">Save </div> --> 
   <!--    <div id="FirstRecord" class="panelbuttons size-16 icon ion-ios-skipbackward" ng-click ="RecodPaging(count=0)"></div>--> 
    <!--  <div id="PrevRecord" class="panelbuttons size-16 icon ion-arrow-left-b" ng-click ="RecodPaging(count>0?count=count-1:count=0)"></div>--> 
   <!--   <div id="NextRecord" class="panelbuttons size-16 icon ion-arrow-right-b" ng-click =" RecodPaging(count < (recordLength-1)?count=count+1:recordLength)"></div>--> 
   <!--   <div id="LastRecord" class="panelbuttons size-16 icon ion-ios-skipforward" ng-click ="RecodPaging(recordLength)"></div>--> 
    
 </div>
 <div id="StatusPanel" class="StatusPanel">
<div id="ScreenStatus" class="ScreenStatus"></div>
</div>
</div>

<div id="ConfirmDilogueBox" Class="ConfirmDilogue">
<div id="DilogueStrip" class="DilogueRibbon icon ion-android-delete ">Delete record<div id="close1" class="closesign icon ion-android-close"></div></div>
<div id="DiglogueMessage" class="DilogueMsg"><div class="mydelcircle size-48 icon ion-android-cancel"></div>Do you want to delete the record?</div>
<div id="DilogYesButton" class="DilogButton DilogButtonAfter">Yes</div>
<div id="DilogNoButton" class="DilogButton DilogButtonAfter"> No </div>
</div> 



<div id="AlertDilogueBox" Class="ConfirmDilogue">
<div id="DilogueStrip" class="DilogueRibbon icon ion-folder ">Save record<div class="closesign icon ion-android-close"></div></div>
<div id="DiglogueMessage" class="DilogueMsg"><div class="mydelcircle size-48 icon ion-alert-circled"></div>Do you want to Save current Modified record?</div>
<div id="AlertDilogYesButton" class="DilogButton DilogButtonAfter">Yes</div>
<div id="AlertDilogNoButton" class="DilogButton DilogButtonAfter"> No </div>

</div> 

<div id="InfoDilogueBox" Class="ConfirmDilogue1">
<div id="DilogueStrip" class="DilogueRibbon icon ion-alert ">Not Found<div class="closesign icon ion-android-close"></div></div>
<div id="DiglogueMessage" class="DilogueMsg"><div class="mydelcircle size-48 icon ion-information-circled"></div>No Record Found by this id </div>
<div id="InfoDilogYesButton" class="DilogButton2 DilogButtonAfter">OK</div>
</div>

<script type="text/javascript">

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
  
 
  
</script>
</body>

</html>
