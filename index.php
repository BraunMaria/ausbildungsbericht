<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<title>Berichtsheftverwaltung</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script language="javascript" type="text/javascript" src="logik.js"></script>
<link rel="stylesheet" href="styles.css">

<h1> Berichtsheft</h1>
</head>
<body ng-controller="MainCtrl">
    <div class="container-fluid margin-top-xl" ng-app="">
		<div class="row hidden-print row-centered">
            <div class="col-xs-12 from-group row-centered">
                <input class="form-control" ng-model="entername" value="test" name="entername" id="entername" type="text" />
            </div>
            <div class= "col-xs-12">
                <button class="button-add"  ng-click="fetchBerichtshefte(entername)" >Berichtshefte anzeigen</button>
                <button class="button-add"  ng-click = "newBerichtsheft()" >Neues Berichtsheft anlegen</button>
            </div>
		</div>
		<div class ="row hidden-print row-centered" ng-hide="!anzeigen">
			<div class="col-xs-4 margin-top-md">
				<span><u>1.tes Ausbildungsjahr</u></span>
				<div id="contentarea" class="margin-top-md" ><p ng-repeat="berichtsheftab1 in ausbildungsjahr1 track by $index" id="db1{{$index}}" class="datadb">Ausbildungsnachweis Nr {{berichtsheftab1}} <img src="bilder/delete.png" style="width: 30px; height: 30px; margin-left: 20px; margin-right: 20px;" ng-click="deleteDbTable(entername, 1, berichtsheftab1);"><img src="bilder/document_edit.png" ng-click="getDatafromDB(entername, 1, berichtsheftab1 ); " style="width: 30px; height: 30px"></img></p></div>
			</div>
			<div class="col-xs-4 margin-top-md">
				<span><u>2.tes Ausbildungsjahr</u></span>
				<div id="contentarea"><p ng-repeat="berichtsheftab2 in ausbildungsjahr2 track by $index" id="db2{{$index}}" class="datadb">Ausbildungsnachweis Nr {{berichtsheftab2}} <img src="bilder/delete.png" style="width: 30px; height: 30px; margin-left: 20px; margin-right: 20px;" ng-click="deleteDbTable(entername, 2, berichtsheftab2);"><img src="bilder/document_edit.png" ng-click="getDatafromDB(entername, 2, berichtsheftab2);" style="width: 30px; height: 30px"></img></p></div>
			</div>
			<div class="col-xs-4 margin-top-md">
				<span><u>3.tes Ausbildungsjahr</u></span>
				<div id="contentarea"><p ng-repeat="berichtsheftab3 in ausbildungsjahr3 track by $index" id="db3{{$index}}" class="datadb">Ausbildungsnachweis Nr {{berichtsheftab3}} <img src="bilder/delete.png" style="width: 30px; height: 30px; margin-left: 20px; margin-right: 20px;" ng-click="deleteDbTable(entername, 3, berichtsheftab3);"><img src="bilder/document_edit.png" ng-click="getDatafromDB(entername, 3, berichtsheftab3);" style="width: 30px; height: 30px"></img></p></div>
			</div>
        </div>
		<?php include "berichtsheft.php" ?>
    </div>
    
</bod>