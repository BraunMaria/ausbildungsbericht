<html ng-app="myApp">
<head>
<meta charset="utf-8" />
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
<?php phpinfo() ?>
</head>
<body ng-controller="MainCtrl" data-ng-init="init()">
    <div class="container-fluid margin-top-xl greyblock" ng-app="">
		<div class="row">
			<div class="left-data-block col-xs-12 col-md-7">
				<div class="name from-group">
					<label for="fullname">Name: </label>
					<input ng-model="fullname" value="test" class="input form-control" name="fullname" id="fullname" type="text" ng-hide="data"/>
					<span ng-hide="!data">{{name}}</span>
				</div>
				<div class="row margin-top-sm where">
					<div class="firma col-xs-12 col-md-6">
						<label for="company_name">Firma:</label>
						<div class="col-xs-12">
							<img class="logo" src="buttinette.jpg"/>
						</div>
					</div>
					<div class="abteilung col-xs-12 col-md-6 form-group">
						<label for="field_of_work">Ausbildungsabteilung:</label>
						<div class="col-xs-12 from-group">
							<span ng-hide="!data">{{abteilung}}</span>
							<select class="from-control" ng-hide="data" ng-model="selectedAbteilung">
								<option ng-repeat="abteilung in abteilungen track by $index" ng-name="{{abteilung}}">{{abteilung}}</option>
							</select>
							<div class="margin-top-xs from-group hidden-print">
							<input class="form-control" ng-hide="data" ng-model="modabteilung"></input>
							</div>
							<div class="margin-top-xs hidden-print">
							<button class="button-add" ng-hide="data" ng-click="addAbteilung(modabteilung)">Abteilung hinzufügen</button>
							<button class="button-remove" ng-hide="data" ng-click="delAbteilung(modabteilung)">Abteilung entfernen</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="right-data-block col-xs-12 col-md-4 margin-top-md no-padding form-group">
				<div class="col-xs-12 no-padding azubi-nachw">
					<label for="ab_nw">Ausbildungsnachweis Nr.</label>
					<span ng-hide="!data">{{nachweisnr}}</span>
					<input ng-hide="data" ng-model="ab_nw" class="input form-control" name="ab_nw" id="ab_nw" type="number"/>
				</div>
				<div class="col-xs-12 margin-top-sm no-padding azubi_jahr">
					<label for="ab_jahr">Ausbildungsjahr: </label>
					<span ng-hide="!data">{{jahr}}</span>
					<input ng-hide="data" ng-model="ab_jahr" class="input form-control" name="ab_jahr" id="ab_jahr" type="number"/>
				</div>
				<div class="col-xs-12 margin-top-xxl no-padding week">
					<label for="week">Woche: </label>
					<span ng-hide="!data">{{week}}</span>
					<input ng-hide="data" ng-model="week" class="input form-control" name="week" id="week"  placeholder="{{weeknumber}}" value="{{weeknumber}}"/>
				</div>
				<div class="col-xs-12 margin-top-xxl no-padding date">
					<div class="col-xs-12 col-md-6 date-from no-padding">
						<label >Von: </label>
						<span ng-hide="!data">{{from}}</span>
						<input ng-hide="data" ng-model="ab" class="input form-control" name="ab" id="ab" type="date"/>
					</div>
					<div class="col-xs-12 col-md-6 date-till no-padding">
						<label>bis: </label>
						<span ng-hide="!data">{{till}}</span>
						<input ng-hide="data" ng-model="bis" class="input form-control" name="bis" id="bis" type="date"/>
					</div>
				</div>
				<div class="row hidden-print">
					<div class="col-xs-12 buttons row-centered margin-top-md">
						<button ng-hide="data" href="#" class="button-add" ng-click= "saveFileData()">Eingabe bestätigen</button>
						<button ng-hide="!data" class="button-add" ng-click= "data=false">Eingabe ändern</button>
					</div>
				</div>
			</div>
		</div>
		<div class = "row hidden-print">
			<div class="col-xs-12 buttons row-centered margin-top-md">
				<button  class="button-add" ng-click= "fillKrank()">Krank</button>
				<button  class="button-add" ng-click= "fillUrlaub()">Urlaub</button>
				<button  class="button-add" ng-click= "fillSchule()">Berufsschule</button>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="row">
					<div class="col-xs-12">
						<table>
							<tr>
								<th><strong>Betriebliche Tätigkeit</strong> <span>(bitte Ausbildungsverlauf mit der zeitlichen und sachlichen Gliederung abgleichen):</span></th>
								<th><strong>Stunden</strong></th>
							</tr>
							<tr>
								<td>
									<textarea ng-model="btt" class="conten-area" name="btt" id="btt" type="text" ng-hide="content" rows=18"></textarea>
									<span class="t" ng-repeat="taetigkeit in btkcontent track by $index">{{bbt}}</span>
								</td>
								<td>
									<textarea ng-model="btthour" name="bbthour" id="bbthour" class="conten-area" rows=18" ng-change="calcHour()"></textarea>
									<span class="t" ng-repeat="taetigkeit in btkcontent track by $index">{{bbthour}}</span>
								</td>
							</tr>
						</table>
						
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<table>
							<tr>
								<th><strong>Beschreibung eines Arbeitsvorganges dieser Woche:</strong></th>
								<th class="hour"><strong></strong></th>
							</tr>
							<tr>
								<td>
									<textarea ng-model="abvorgang" class="conten-area" rows=18"></textarea>
								</td>
								<td>
									<textarea ng-model="abvorganghour" class="conten-area" rows=18"></textarea>
								</td>
							</tr>
						</table>
						
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<table>
							<tr>
								<th><strong>Berufsschule</strong> <span>(Themen des Unterrichts):</span></th>
								<th class="hour"><strong></strong></th>
							</tr> 
							<tr>
								<td>
									<textarea ng-model="schule" class="conten-area" name="schule" id="schule" type="text" ng-hide="content" rows="9"></textarea>
									
								</td>
								<td>
									<textarea class="conten-area" rows="9" ng-model="schulehour" ng-change="calcHour()"></textarea>
								</td>
							</tr>
							<tr>
								<td class="text-right">Gesamtstunden:</td>
								<td>
									{{completehour}}
								</td>
							</tr>
						</table>
					</div>
				</div>
			
				<div class="col-xs-12">
					<div class="row signature-box">
						<div class="col-xs-2">
							<div class="richtigkeit">
							<span>Für die Richtigkeit</span>
							</div>
						</div>
						<div class="col-xs-5 signatures row-centered">
							<div class="col-xs-6 ">
								<hr>
								<span>Datum</span>
							</div>
							<div class="col-xs-6">
								<hr>
								<span>Auszubildender</span>
							</div>
						</div>
						<div class="col-xs-5 signatures row-centered">
							<div class="col-xs-6">
								<hr>
								<span>Datum</span>
							</div>
							<div class="col-xs-6">
								<hr>
								<span>Ausbilder</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row row-centered hidden-print">
				<div class="col-xs-12 margin-top-md buttons">
					<button class="button-add" ng-click= "saveFileData()" ng-hide="content" href="#">Speichern</button>
					<button class="button-add" ng-click = "drucken()" ><a href="javascript:window.print()">Drucken</a></button>
					<button class="button-add" ng-click= "fetchberichtshefte(fullname)" onclick="location.href='index.html'" >Berichtshefte anzeigen</button>
				</div>
			</div>
		</div>
	</div>
</body>    
</html>