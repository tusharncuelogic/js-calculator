function Calculator() {

	this.result  = '' ;

	var calculate = function(str) {
		var inputstr = str;
		this.result = '';
		if(parseInt(str))
		{
			this.result = parseInt(str);
			str =  str.replace(this.result,"");
			while(str != '')
			{
				if(str[0]== "+") {
					str =  str.replace("+","");
					var tmp = parseInt(str) ;
					this.result = this.add(this.result,tmp);
					str =  str.replace(tmp,"") ;
				}
				else if(str[0]== "-") {
					str =  str.replace("-","");
					var tmp = parseInt(str);
					this.result = this.substract(this.result,tmp);
					str =  str.replace(tmp,"");
				}
				else if(str[0]== "*") {
					str =  str.replace("*","");
					var tmp = parseInt(str);
					this.result = this.multiply(this.result,tmp);
					str =  str.replace(tmp,"");
				}
				else if(str[0]== "/") {
					str =  str.replace("/","");
					var tmp = parseInt(str);
					this.result = this.divide(this.result,tmp);
					str =  str.replace(tmp,"");
				}
			}

			alert(this.result) ;
		}
		else {
			alert("Invalid expression");
		}

		return this.result;
						
	}

	this.add = function(a,b){return a+b ;}
	this.substract = function(a,b){return a-b;}
	this.multiply = function(a,b){return a*b;}
	this.divide= function(a,b){return a/b;}
	return calculate;

}


var addVal = function(val) {
	var res = document.getElementById("result") ;
	res.value += val;
}


var calculate = Calculator();

var inputdiv = document.getElementById("result") ;

var histories = [] ;

document.querySelector("#frmCalc").addEventListener("submit", function(e){
    var input = inputdiv.value;
    var output = calculate(input);
    inputdiv.value = output;
    var history_txt = '<div class="history_row"><span class="history_input">'+input+'</span> = <b>'+output+'</b><span class="history_delete">x</span></div>';
    document.getElementById( "history").innerHTML  += history_txt ;    
    localStorage.setItem("histories", histories);


    e.preventDefault();
});

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target;
    if(target.className=="history_input")
    {
    	inputdiv.value = target.textContent;
    }
    if(target.className=="history_delete")
    {
    	target.parentNode.style.display = "None" ;
    }
}, false);

