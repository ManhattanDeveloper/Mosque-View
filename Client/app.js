var app = angular.module('MosqueView', []);

app.controller('MainCtrl', 
function($scope, $http){
  $scope.test = 'Hello Mosque!';

  var pullTimes = function(){
      $http.get('http://api.aladhan.com/timingsByCity?city=Indianapolis&country=USA&method=2')
      .success(function(response){
      console.log("Hey");
      console.log(response.data.timings);
      $scope.timings = response.data.timings;
      });
  };

  pullTimes();
  

  $http.get('http://localhost:8080/api/mosque-prayer-time/576c1ae1c2f826c95c97411b')
  .success(function(response){
    console.log("Hey");
    console.log(response.name);
    $scope.mosqueTime = response;
    
  });


  $scope.updateTime = function(){
    if($scope.FajrInput== null){
      $scope.FajrInput = $scope.mosqueTime.Fajr;
    }
    if($scope.DhuhrInput==null){
      $scope.DhuhrInput = $scope.mosqueTime.Dhuhr;
    }
    if($scope.AsrInput==null){
      $scope.AsrInput = $scope.mosqueTime.Asr;
    }
    if($scope.MaghribInput==null){
      $scope.MaghribInput = $scope.mosqueTime.Maghrib;
    }
    if($scope.IshaInput==null){
      $scope.IshaInput = $scope.mosqueTime.Isha;
    }
    if($scope.JummahInput==null){
      $scope.JummahInput = $scope.mosqueTime.Jummah;
    }
    $http.put('http://localhost:8080/api/mosque-prayer-time/576c1ae1c2f826c95c97411b' , 
      {
      name:   "Al Other Mosque",
      Fajr:   $scope.FajrInput,
      Dhuhr:  $scope.DhuhrInput,
      Asr:    $scope.AsrInput,
      Maghrib:$scope.MaghribInput,
      Isha:   $scope.IshaInput,
      Jummah: $scope.JummahInput
      }
    );

    pullTimes();
    
  };
  /*
  $scope.mosqueTime = {
  	Fajr:   "5:00",
  	Dhuhr:  "6:00",
  	Asr:    "7:00",
  	Maghrib:"8:00",
  	Isha:   "9:00",
  	Jummah: "10:00"
  }
  */
});
