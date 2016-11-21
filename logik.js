var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope',function($scope) {
   $scope.abteilungen = [ "E-Commerce", "Einkauf", "Service", "Buchhaltung", "Personalwesen",
				"Marketing", "Logistik", "Export", "EDV-Host", "IT-Netzwerke", "Grafik" ]
   $scope.btkcontent = [];
   $scope.taetigkeitenarray = [];
   $scope.schulearray = [];
   $scope.arbeitsvorgangarray = [];
   $scope.schulstundenarray = [];
   $scope.hourarray = [];
   $scope.btkhour = [];
   $scope.faecher = ["IT-Systeme: ", "Anwendungsentwicklung: ", "Vernetzte Systeme: ", "BWP: ", "Sozialkunde: ", "Englisch: "];
   $scope.weeknumber;
   $scope.today = new Date();
   $scope.count = 0;
   $scope.ausbildungsjahr1 = [];
   $scope.ausbildungsjahr2 = [];
   $scope.ausbildungsjahr3 = [];

   $scope.newBerichtsheft = function(){
      $scope.week = $scope.getweekNumber($scope.today);
      $scope.getWeekDates($scope.today);
      $scope.ab_nw = $scope.nachweisnumber();
      $scope.ab_jahr = $scope.ausbildungsjahr(2016);
      $scope.fullname = $scope.entername;
      $scope.btt = "";
      $scope.btthour = "";
      $scope.abvorgang = "";
      $scope.schule = "";
      $scope.schulehour = "";

      if ($scope.abteilungen.length >= 1) {
         $scope.selectedAbteilung = $scope.abteilungen[0];
      }
      $scope.zeigeberichtsheft = true;
      $scope.saveFileData();
   };

   $scope.clearAll = function() {
      $scope.btt= "";
      $scope.btthour = "";
      $scope.abvorgang = "";
      $scope.schule = "";
      $scope.schulehour = "";
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
       var weekNo = Math.ceil(( ( (kwdate - yearStart) / 86400000) + 1)/7) -1;
       return weekNo;
   }

    //Funktion zur Berechnung der Nachweisnummer
   $scope.nachweisnumber = function(){
     var currentdate = new Date();
     console.log(currentdate);
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

         var number = thisweeknumber - firstazubikw -1;
         return number;
     }
     else{
         var thisweeknumber = $scope.getweekNumber(currentdate);
         var number = thisweeknumber + allKW - firstazubikw -1;
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

    //Funktion um die Nachweisdaten zu speichern
   $scope.saveFileData = function(){
       $scope.nachweisnr  = $scope.ab_nw;
       $scope.jahr = $scope.ab_jahr;
       $scope.woche = $scope.week;
       $scope.abteilung = $scope.selectedAbteilung;
       $scope.name = $scope.fullname;
       $scope.from = $scope.ab.yyyymmdd();
       $scope.till = $scope.bis.yyyymmdd();
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
     $scope.abvorgang = "";
     $scope.completehour = "40";
     for( var x = 0; x < $scope.faecher.length; x++){
        if ($scope.schule ) {
           $scope.schule = $scope.schule + $scope.faecher[x] + '\n';
        }
        else{
        $scope.schule = $scope.faecher[x] + '\n';
        }
     }
   };

   $scope.calcHour = function(){
     $scope.btkhour = typeof $scope.btthour !== undefined ? $scope.btthour.split('\n') : "0";
     $scope.schoolhour = $scope.schulehour !== undefined ? $scope.schulehour.split('\n') : "0";
     var hours = 0;
     for ( var i = 0; i < $scope.btkhour.length; i++){
        if ($scope.btkhour[i] != "") {
           hours = hours + parseInt($scope.btkhour[i]);
        }
     }
     for ( var i = 0; i < $scope.schoolhour.length-1; i++){
        if ($scope.schoolhour[i] != "") {
           hours = hours + parseInt($scope.schoolhour[i]);
        }
     }
     $scope.completehour = hours;
   };

   $scope.convertDataIntoJSON = function() {
      var json = {
         name: $scope.fullname,
         datevon: $scope.ab,
         datebis: $scope.bis,
         abjahr: $scope.ab_jahr,
         abteilung: $scope.selectedAbteilung,
         nachweisnr: $scope.ab_nw,
         woche: $scope.week,
         taetigkeiten: $scope.btt,
         taetigkeitenstunden: $scope.btthour,
         arbeitsvorgang: $scope.abvorgang,
         schule: $scope.schule,
         schulehour: $scope.schulehour
      };

      return json;
     };

     $scope.fetchBerichtshefte = function(key) {
      if (key) {
        $.ajax({
         url: 'getKeys.php',
             type: 'post',
             data: {
                 loadkey: key,
                 aktion: "getAllKeys"
             },
         success: function(response){
            $scope.zeigeberichtsheft = false;
            $scope.ausbildungsjahr1 = [];
            $scope.ausbildungsjahr2 = [];
            $scope.ausbildungsjahr3 = [];
            var keinname = true;
            var raw = response.substr(1, response.length-2);
                 var str_array = raw.split(',');
                 for(var i = 0; i < str_array.length; i++) {
                     var x = str_array[i].replace(/\"/g, "");
                     var nachweis = x[x.length-1];
                     var jahrausbildung = x[x.length-3];
                     var name = x.substr(0, x.length-4);
                     if (name == key) {
                        if (jahrausbildung == 3) {
                            $scope.ausbildungsjahr3.push(nachweis);
                            $scope.ausbildungsjahr3.sort();
                            $scope.anzeigen = true;
                        }
                        else if(jahrausbildung == 2){
                           $scope.ausbildungsjahr2.push(nachweis);
                           $scope.ausbildungsjahr2.sort();
                           $scope.anzeigen = true;
                        }
                        else if(jahrausbildung == 1){
                           $scope.ausbildungsjahr1.push(nachweis);
                           $scope.ausbildungsjahr1.sort();
                           $scope.anzeigen = true;
                        }
                        var keinname = false;
                     }


                 }
                 if (keinname) {

                    alert("Keine Berichtshefte unter diesem Namen gespeichert");
                    $scope.anzeigen = false;
                 }
                 $scope.berichtshefte  = str_array;
                 $scope.$apply();



         },
         error: function(response) {
             console.log(response);
         }

      });
      }
      else(
         alert("Bitte geben Sie Ihren Namen ein")
      )
   }

   $scope.saveDataToDb = function() {

      var json = $scope.convertDataIntoJSON();
      var mykey = $scope.fullname + " " + $scope.ab_jahr + " " + $scope.ab_nw;;
      $scope.btthour = $scope.btthour !== undefined ? $scope.btthour : "0";
      $scope.schoolhour = $scope.schulehour !== undefined ? $scope.schulehour : "0";
      console.log('attempting to save data to redis with following json:\n');
      if ( !$scope.fullname || !$scope.ab_jahr || !$scope.ab_nw) {
        alert("Bitte fülle Name, Nachweisnummer und Ausbildungsjahr aus");
      }
      else{
      jQuery.ajax({
          url: 'saveData.php',
          type: 'post',
          data: {
              data: json,
              key: mykey,
          },
          success: function(){
            alert("Das Berichtsheft wurde erfolgreich gespeichert");
            $scope.fetchBerichtshefte($scope.entername);
            console.log("erfolgreich gespeichert")
            $scope.clearAll();
          },
          error: function() {
            console.log("fehlgeschlagen");
          }

      });
      }
   };

   $scope.getDatafromDB = function(name, jahr, nummer){
      var key = name + " " + jahr + " " + nummer;

      jQuery.ajax({
      url: 'getData.php',
      type: 'post',
      data: {
      loadkey: key,
      },
      success: function(response){
         var antwort = JSON.parse(response);
         $scope.zeigeberichtsheft = true;
         $scope.ab = new Date(antwort.datevon);
         $scope.bis = new Date(antwort.datebis);
         $scope.fullname = antwort.name;
         $scope.ab_jahr = parseInt(antwort.abjahr);
         for ( var z = 0; z < $scope.abteilungen.length; z++) {
            if ($scope.abteilungen[z] == antwort.abteilung) {
               $scope.selectedAbteilung = $scope.abteilungen[z]
            };
         }
         $scope.ab_nw = parseInt(antwort.nachweisnr);
         $scope.week = parseInt(antwort.woche);
         $scope.btt = antwort.taetigkeiten;
         $scope.btthour = antwort.taetigkeitenstunden;
         $scope.schule = antwort.schule;
         $scope.schulehour = antwort.schulehour;
         $scope.abvorgang = antwort.arbeitsvorgang;

         $scope.calcHour();
         $scope.saveFileData();
         $scope.$apply();
         $scope.showtable=true;
      }});

   }

   $scope.deleteDbTable = function(name, jahr, nummer) {

      if (confirm('Wirklich löschen?')) {

         var key = name + " " + jahr + " " + nummer;
         console.log('attempting to delete data to redis with following json:\n');

         jQuery.ajax({
            url: 'deleteData.php',
            type: 'post',
            data: {
               delkey: key
            },
            success: function(response){
               if (jahr == 1) {
                  for(var f=0 ; f<$scope.ausbildungsjahr1; f++){
                     if ($scope.ausbildungsjahr1[f] == nummer) {
                        $scope.ausbildungsjahr1.splice(f, 1);
                     }
                  }
               }
               if (jahr == 2) {
                  for(var y=0 ; y<$scope.ausbildungsjahr2; y++){
                     if ($scope.ausbildungsjahr2[y] == nummer) {
                        $scope.ausbildungsjahr2.splice(y, 1);
                     }
                  }
               }
               if (jahr == 3) {
                  for(var p=0 ; p<$scope.ausbildungsjahr2; p++){
                     if ($scope.ausbildungsjahr3[p] == nummer) {
                        $scope.ausbildungsjahr3.splice(p, 1);
                     }
                  }
               }
               $scope.fetchBerichtshefte($scope.entername);
               $scope.$apply();
               console.log("wurde gelöscht");
            }
         });
      };
   }

   Date.prototype.yyyymmdd = function() {
      var yyyy = this.getFullYear().toString();
      var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
      var dd = this.getDate().toString();
      return (dd[1] ? dd : "0" + dd[0]) + "."
              + (mm[1] ? mm : "0" + mm[0]) + "." + yyyy;
   };

}]);
