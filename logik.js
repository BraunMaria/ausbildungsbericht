var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope',function($scope) {
   $scope.abteilungen = [ "E-Commerce", "Einkauf", "Service", "Buchhaltung", "Personalwesen",
				"Marketing", "Logistik", "Export", "EDV-Host", "IT-Netzwerke", "Grafik" ]
    $scope.btkcontent = [];
    $scope.btkhour = [];
    $scope.tgk = [];
    $scope.bs = [];
    $scope.faecher = ["IT-Systeme: ", "Anwendungsentwicklung: ", "Vernetzte Systeme: ", "BWP: ", "Sozialkunde: ", "Englisch: "];
    $scope.name = "";
    $scope.company = "";
    $scope.field = "";
    $scope.weeknumber;
    $scope.today = new Date();
    $scope.count = 0;
    $scope.berichtshefte = [];
    
    $scope.init = function(){
       $scope.week = $scope.getweekNumber($scope.today);
        $scope.getWeekDates($scope.today);
        $scope.ab_nw = $scope.nachweisnumber();
        $scope.ab_jahr = $scope.ausbildungsjahr(2016);
        $scope.fullname = "Maria Braun";
        
        console.log(mykey);
        if ($scope.abteilungen.length >= 1) {
            $scope.selectedAbteilung = $scope.abteilungen[0];
        }
        $scope.saveFileData();
    };
  
    //Funktion um Abteilungen im Dropdown hinzuzufügen
    $scope.delAbteilung = function(abteilung) {
        $scope.abteilungnonexistent = true;
        
        for ( var i = 0; i < $scope.abteilungen.length; i++) {
            if ($scope.abteilungen[i] == abteilung) {
                $scope.abteilungen.splice(i, 1);
                $scope.modabteilung = "";
                $scope.selectedAbteilung = $scope.abteilungen[i-1];
                $scope.abteilungnonexistent = false;
            }
        }
    };
    
    //Funktion zur Berechnung der Kalendar Woche
    $scope.getweekNumber = function(d){
        var kwdate = new Date(d);
        kwdate.setHours(0,0,0);
        kwdate.setDate(kwdate.getDate() + 4 - (kwdate.getDay()||7));
        var yearStart = new Date(kwdate.getFullYear(),0,1);
        var weekNo = Math.ceil(( ( (kwdate - yearStart) / 86400000) + 1)/7);
        return weekNo;
	}
    
    //Funktion zur Berechnung der Nachweisnummer
    $scope.nachweisnumber = function(){
      var currentdate = new Date();
      var currentyear = currentdate.getFullYear();
      var lastyear = currentyear -1;
      var firstazubi = new Date(currentyear, 8, 1);
      var firstazubikw = $scope.getweekNumber(firstazubi);
      var firstdaylastyear = new Date(lastyear, 8, 1);
      var firstdaylastyearkw = $scope.getweekNumber(firstdaylastyear);
      
      if (currentdate < firstazubi) {
         var newyear = new Date(lastyear, 11, 31);
         var allKW = $scope.getweekNumber(newyear);
      }
      else{
         var newyear = new Date(currentyear, 11, 31);
         var allKW = $scope.getweekNumber(newyear);
      }
      
      if (currentdate <= newyear) {
          var thisweeknumber = $scope.getweekNumber(currentdate);
          
          var number = thisweeknumber - firstazubikw;
          return number;
      }
      else{
          var thisweeknumber = $scope.getweekNumber(currentdate);
          var number = thisweeknumber + allKW - firstazubikw;
          return number; 
      }
    }
    
    //Funktion zur Berechnung des Ausbildungsjahres
    $scope.ausbildungsjahr = function(jahr){
      var currentdate = new Date();
      var currentyear = currentdate.getFullYear();
      var thisseptember = new Date(currentyear, 8, 1)
      if (currentdate < thisseptember ) {
        var ausbildungsjahr = currentyear - jahr;
      }
      else{
         var ausbildungsjahr = currentyear -jahr + 1;
      }
       return ausbildungsjahr;
    }
    
    //Funktion zu Berechnung von Kalendarwochen
    $scope.getWeekDates = function(d){
        $scope.currdate = new Date(d);
        var subtract = $scope.currdate.getDay() -1;
        var add = 4;
        
        $scope.abnew = $scope.currdate.setDate($scope.currdate.getDate() - subtract);
        $scope.abpage = new Date ($scope.abnew)
        $scope.ab = new Date( $scope.abnew);
        $scope.bisnew = $scope.abpage.setDate($scope.abpage.getDate() + add);
        $scope.bis = new Date($scope.bisnew);
        
        
    };
    
    //Funktion die beim Drucken die Felder füllt und Inputfelder ausblendet
    $scope.drucken = function(){
      $scope.myValue = true;
      $scope.data = true;
      $scope.abteilung = $scope.selectedAbteilung;
      $scope.from = $scope.ab.yyyymmdd();
      $scope.till = $scope.bis.yyyymmdd();
      $scope.name = $scope.fullname;
      $scope.nachweisnr  = $scope.ab_nw;
      $scope.jahr = $scope.ab_jahr;
      
    };
    
    //Funktion um Abteilungen aus Dropdown zu löschen
    $scope.addAbteilung = function(abteilung) {
      if (abteilung) {
        for ( var i = 0; i < $scope.abteilungen.length; i++) {
            if ($scope.abteilungen[i] == abteilung) {
                $scope.abteilungexists = true;
                return;
            }
        }
        $scope.abteilungexists = false;
        $scope.abteilungen.push(abteilung);
        $scope.modabteilung = "";
        $scope.selectedAbteilung = abteilung;
      }
	}
        
    //Funktion um die persönlichen Daten zu speichern
    $scope.savePersonal = function(name, company){
        $scope.name = name;
        $scope.firma = company;
        $scope.abteilung = $scope.selectedAbteilung;
        $scope.myValue = true;
    };
        
    //Funktion um die Nachweisdaten zu speichern    
    $scope.saveFileData = function(){
        $scope.nachweisnr  = $scope.ab_nw;
        $scope.jahr = $scope.ab_jahr;
        $scope.woche = $scope.week;
        $scope.abteilung = $scope.selectedAbteilung;
        $scope.name = $scope.fullname;
        $scope.from = $scope.ab.yyyymmdd();
        $scope.till = $scope.bis.yyyymmdd();
        if ($scope.btt) {
           $scope.btkcontent = $scope.btt.split('\n');
        }
        if ($scope.btthour) {
            $scope.btkhour = $scope.btthour.split('\n');
        }
        $scope.data = true;
        $scope.myValue = true;
    }
    
    //Funktion um bei Krankheit die Felder auszufüllen
    $scope.fillKrank = function(){
      $scope.btt = "-Krank";
      $scope.abvorgang = "-Krank";
      $scope.btthour = "0";
      $scope.schule = "";
    }
    
    //Funktion um bei Urlaub die Felder auszufüllen
    $scope.fillUrlaub = function(){
      $scope.btt = "- Urlaub";
      $scope.abvorgang = "- Urlaub";
      $scope.btthour = "0";
      $scope.schule = "";
    }
    
    //Funktion um bei Schulwoche die Felder auszufüllen mit Fächern
    $scope.fillSchule = function(){
      $scope.schule = ""
      $scope.btt = "";
      $scope.btthour = "";
      $scope.abvorgang = "";;
      for( var x = 0; x < $scope.faecher.length; x++){
         if ($scope.schule ) {
            $scope.schule = $scope.schule + $scope.faecher[x] + '\n';
         }
         else{
         $scope.schule = $scope.faecher[x] + '\n';
         }
      }
    };
    
    //Funktion zur Speicherung vom Betriebliche Tätigkeit und deren Stunden  
    $scope.saveContent = function(){
      if ($scope.bbt) {
         $scope.btkcontent = $scope.bbt.split('\n');
      }
      if ($scope.bbthour) {
         $scope.btkhour = $scope.bbthour.split('\n');
      }
        $scope.content = true;
    };
    
    $scope.calcHour = function(){
      $scope.btkhour = $scope.btthour !== undefined ? $scope.btthour.split('\n') : "0";
      $scope.schoolhour = $scope.schulehour !== undefined ? $scope.schulehour.split('\n') : "0";
      var hours = 0;
      for ( var i = 0; i < $scope.btkhour.length; i++){
         hours = hours + parseInt($scope.btkhour[i]);
      }
      for ( var i = 0; i < $scope.schoolhour.length; i++){
         hours = hours + parseInt($scope.schoolhour[i]);
      }
      $scope.completehour = hours;
    };
    
    $scope.convertDataIntoJSON = function() {
      var name = $scope.fullname;
      var von = $scope.ab;
      var bis = $scope.bis;
      var jahr = $scope.ab_jahr;
      var abteilung = $scope.selectedAbteilung;
      var ab_nw = $scope.ab_nw;
      var jsonst = '{"berichtsheft" : ['+
      '{"name":'+name+
      '"datevon":' +von+
      '"datebis":' +bis+
      '"abjahr:":' +jahr+
      '"abteilung":' + abteilung+
      '"nachweisnr":' + ab_nw+
      '"woche":' + $scope.week+
      '"taetigkeiten":' + $scope.btt+
      '"taetigkeitenstunden":' + $scope.btthour+
      '"arbeitsvorgang":' + $scope.abvorgang+
      '"schule":' + $scope.schule+
      '"schulehour":' + $scope.schulehour+
      ']}'
      
      //var jsonstring = "";
      //jsonstring = jsonstring.concat("name:" + $scope.fullname+";");
      //jsonstring = jsonstring.concat("datevon:" + $scope.ab+";");
      //jsonstring = jsonstring.concat("datebis:" + $scope.bis+";");
      //jsonstring = jsonstring.concat("abjahr:" + $scope.ab_jahr+";");
      //jsonstring = jsonstring.concat("abteilung:" + $scope.selectedAbteilung+";");
      //jsonstring = jsonstring.concat("nachweisnr:" + $scope.ab_nw+";");
      //jsonstring = jsonstring.concat("woche:" + $scope.week+";");
      //jsonstring = jsonstring.concat("taetigkeiten:" + $scope.btt+";");
      //jsonstring = jsonstring.concat("taetigkeitenstunden:" + $scope.btthour+";");
      //jsonstring = jsonstring.concat("arbeitsvorgang:" + $scope.abvorgang+";");
      //jsonstring = jsonstring.concat("schule:" + $scope.schule+";");
      //jsonstring = jsonstring.concat("schulehour:" + $scope.schulehour);
      jsonstring = JSON.stringify(jsonst)
      console.log(jsonstring);
      return jsonst;
      };
    
      $scope.fetchBerichtshefte = function(key) {
        $.ajax({    
            url: 'getData.php',
			    type: 'post',
			    data: {
			    	loadkey: key,
			    },
            success: function(response){
                var str_array = response.split(',');
                
                for(var i = 0; i < str_array.length; i++) {
                    var x = str_array[i].replace(/\"/g, "");
                    $scope.berichtshefte.push(x);
                }
                $scope.berichtshefte = str_array;
                $scope.$apply();
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            }
      
        });
      }
      
      $scope.saveDataToDb = function() {
			
				var json = $scope.convertDataIntoJSON();
                var mykey = $scope.fullname + " " + $scope.ab_jahr + " " + $scope.ab_nw;;
				
				console.log('attempting to save data to redis with following json:\n');
				
				jQuery.ajax({
					url: 'saveData.php',
					type: 'post',
					data: {
						data: json,
						key: mykey,
					},
					success: function(){
                     console.log("erfolgreich gespeichert")
					},
                    error: function() {
                        console.log("fehlgeschlagen");
                    }
                    
				});
		};
    
    $scope.generateArray = function(){
            
        for ( var i = 0; i <= $scope.dateList.length; i++) {
            $scope.dataList[i] = new Array($scope.dateList.length+1);
        }
         
        for ( var x = 0; x < $scope.fruitList.length; x++){
            $scope.dataList[x][0] = $scope.fruitList[x];
            for ( var y = 1; y <= $scope.dateList.length; y++){
                $scope.dataList[x][y] = 0;
              
            }
        }    
    }
    
    
    $scope.updateList = function(){
        for ( var i = 0; i <= $scope.dateList.length; i++) {
            $scope.dataList[i] = new Array($scope.dateList.length+1);
        }
        
        for ( var x = 0; x < $scope.fruitList.length; x++) {
                        for (var y = 0; y < $scope.dateList.length+1; y++) {
                            var xString = x + "";
                            var yString = y + "";
                            var xyString = x + "" + y;
                           
                           
                            $scope.dataList[x][y] = document.getElementById(xyString).value;
                            
                        }
                    }
    }
	
    				
    $scope.addFruit = function(fruit){
       
        for (var i = 0; i < $scope.fruitList.length; i++) {
            if($scope.fruitList[i] == fruit){
                $scope.fruitExists = true;
                return;
            }
        }
        $scope.fruitExists = false;
        $scope.fruitList.push(fruit);
        $scope.generateArray();
    }
    
    
    $scope.delFruit = function(fruit){
        $scope.updateList();

        for (var i = 0; i < $scope.fruitList.length; i++) {
            if($scope.fruitList[i] == fruit){
                $scope.fruitList.splice(i, 1);
                delete $scope.dataList[i];
                $scope.updateList();
                $scope.generateArray();
                $scope.fruitnonExistent = false;
                return
            }
        }    
        $scope.fruitnonExistent = true;
    }
    
    $scope.showArray = function(){
        for ( var x = 0; x<$scope.fruitList.length; x++){
            $scope.dataList[x][0] = $scope.fruitList[x];
            for ( var y = 0; y <= $scope.dateList.length; y++){
                console.log($scope.dataList[x][y]);                           
            }
        }   
    }
    
    
    Date.prototype.yyyymmdd = function() {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is
        // zero-based
        var dd = this.getDate().toString();
        return (dd[1] ? dd : "0" + dd[0]) + "."
                + (mm[1] ? mm : "0" + mm[0]) + "." + yyyy; // padding
    };

    
    $scope.updateDate = function() {
        $scope.dateList = [];
        
        var von = document.getElementById("von").value;
        var bis = document.getElementById("bis").value;
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(von);
        var secondDate = new Date(bis);
        var dayz = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        var day1 = new Date(firstDate.getFullYear(),firstDate.getMonth(), firstDate.getDate()+ i);
        var counter = 0;

        if (dayz == 11) {
            $scope.datewrong = false;
            for ( var i = 0; i <= dayz; i++) {

                if (counter == 5) {
                    i = i + 1;
                    counter = 0;
                } else {
                    counter++;
                    var day1 = new Date(firstDate.getFullYear(),
                            firstDate.getMonth(), firstDate.getDate()
                                    + i)

                    $scope.dateList.push(day1.yyyymmdd());
                }
            }
        } else {
            $scope.datewrong = true;
            return;
        }
        $scope.dataList = new Array($scope.dateList.length);
        $scope.generateArray();
    }
    
}]);