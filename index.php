<html ng-app="myApp">
<head>
<meta charset="utf-8" />
<title>Berichtsheftverwaltung</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<link rel="stylesheet" type="text/css" media="print" href="print.css">
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
		
		<div class="row">
            <div class="col-xs-12 from-group">
                <input class="form-control" ng-model="entername" value="test" name="entername" id="entername" type="text" />
            </div>
            <div class= "col-xs-12">
                <button class="button-add"  ng-click="fetchBerichtshefte(entername)" >Berichtshefte anzeigen</button>
                <button class="button-add"  onclick="location.href='berichtsheft.php'" >Neues Berichtsheft anlegen</button>
            </div>
			<div class="col-xs-4">
				<div id="contentarea"><p ng-repeat="berichtsheftab1 in ausbildungsjahr1 track by $index" id="db{{$index}}" ng-click="addActive($index)" class="datadb">{{planung}} <img src="bilder/delete.png" style="width: 30px; height: 30px; margin-left: 20px; margin-right: 20px;" ng-click="addActive($index);deleteDbTable();"><img src="bilder/document_edit.png" ng-click="addActive($index);loadDbTable();" style="width: 30px; height: 30px"></img></p></div>
				<ul>
					<li>1.tes Ausbildungsjahr</li>
					<li ng-repeat="berichtsheftab1 in ausbildungsjahr1 track by $index"> <a href="#">Nachweisnummer: {{berichtsheftab1}}</a></li>
				</ul>
			</div>
			<div class="col-xs-4">
				<ul>
					<li>2.tes Ausbildungsjahr</li>
					<li ng-repeat="berichtsheftab2 in ausbildungsjahr2 track by $index">Nachweisnummer: {{berichtsheftab2}}</li>
				</ul>
			</div>
			<div class="col-xs-4">
				<ul>
					<li>3.tes Ausbildungsjahr</li>
					<li ng-repeat="berichtsheftab3 in ausbildungsjahr3 track by $index">Nachweisnummer: {{berichtsheftab3}}</li>
				</ul>
			</div>
        </div>
    </div>
    
</bod>