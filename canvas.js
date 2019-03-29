var hello1 = (function () {
    var hello1 = function () {
        alert(1);
    };
     var hello1str = 'i am hello1';
    return {
        hello1: hello1,
        hello1str: hello1str        
    };
})();

var canvas = (function(){
	var mainUi = document.getElementById("mainUI");
	return mainUi;
})();