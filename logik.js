var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope',function($scope) {
    
    $scope.fruitList = ["Apfel", "Birnen", "Bananen", "Orangen", "Ananas"]
    $scope.personalList = []
    $scope.dateList = []
    $scope.btkcontent = []
    $scope.tgk = []
    $scope.bs = []
    
    $scope.savePersonal = function(name, company, abteilung){
        for ( var i = 0; i <= $scope.personalList.length; i++) {
            $scope.personalList[i] = new Array(3);
        }
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