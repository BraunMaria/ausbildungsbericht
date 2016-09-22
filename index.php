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
                <button class="button-add"  ng-click="fetchBerichtshefte(entername)" >Neues Berichtsheft anlegen</button>
                <button class="button-add"  onclick="location.href='berichtsheft.php'" >Berichtshefte anzeigen</button>
            </div>
			<div class="col-xs-12">
				<textarea ng-model="berichtshefte" name="berichtshefte" id="berichtshefte" type="text"></textarea>
			</div>
        </div>
    </div>
    
</bod>