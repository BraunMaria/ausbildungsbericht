var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope',function($scope) {
   $scope.abteilungen = [ "E-Commerce", "Einkauf", "Service", "Buchhaltung", "Personalwesen",
				"Marketing", "Logistik", "Export", "EDV-Host", "IT-Netzwerke", "Grafik" ]
    $scope.btkcontent = [];
    $scope.tgk = [];
    $scope.bs = [];
    $scope.name = "";
    $scope.company = "";
    $scope.field = "";
    
    $scope.count = 0;

  $scope.addProduct = function() {
    $scope.count++;
  };
  
    $scope.delAbteilung = function(abteilung) {
        $scope.abteilungnonexistent = true;
        
        for ( var i = 0; i < $scope.abteilungen.length; i++) {
            if ($scope.abteilungen[i] == abteilung) {
                $scope.abteilungen.splice(i, 1);
                $scope.abteilungnonexistent = false;
            }
        }
        console.log($scope.abteilungen);
    };
    
    $scope.addAbteilung = function(abteilung) {
        for ( var i = 0; i < $scope.abteilungen.length; i++) {
            if ($scope.abteilungen[i] == abteilung) {
                $scope.abteilungexists = true;
                return;
            }
        }
        $scope.abteilungexists = false;
        $scope.abteilungen.push(abteilung);
        console.log($scope.abteilungen);
	}
        
    $scope.savePersonal = function(name, company){
        $scope.name = name;
        $scope.firma = company;
        $scope.abteilung = $scope.selectedAbteilung;
        $scope.myValue = true;
    };
        
    $scope.saveFileData = function(ab_nw, ab_jahr, week, ab, bis){
        $scope.nachweisnr  = ab_nw;
        $scope.jahr = ab_jahr;
        $scope.woche = week;
        $scope.from = ab.yyyymmdd();
        $scope.till = bis.yyyymmdd();
        $scope.data = true;
    }
    
    $scope.saveContent = function(bbt, bbt_h, bav, bav_h, bs, bs_h){
        $scope.btkcontent = bbt.split('\n');
        $scope.content = true;
    }
    
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
    
    $scope.getweekNumber = function(d){
            var kwdate = new Date(d);
            kwdate.setHours(0,0,0);
            kwdate.setDate(kwdate.getDate() + 4 - (kwdate.getDay()||7));
            var yearStart = new Date(kwdate.getFullYear(),0,1);
            var weekNo = Math.ceil(( ( (kwdate - yearStart) / 86400000) + 1)/7);
            
            return weekNo + "";
        }
    
}]);