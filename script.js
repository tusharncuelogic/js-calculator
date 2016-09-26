function Calculator() {
	var result  = '' ;

	var operations = {
		add: function(a,b){return a + b; } ,
		substract: function(a,b){return a - b; } ,
		multiply: function(a,b){return a * b; } ,
		divide: function(a,b){return a / b; }
	}

	var calculate = function(str) {
		var inputstr = str;
		var result = '';
		if(parseInt(str))
		{
			result = parseInt(str) ;
			str = str.replace(result,"") ;
			var ops = ['+','-','*','/']  ;
			var do_ops = ['add','substract','multiply','divide'] ;
			while(str != '')
			{
				if(ops.indexOf(str[0]) >= 0)
				{
					var op = do_ops[ops.indexOf(str[0])];
					str =  str.replace(str[0],"");
					var tmp = parseInt(str)   ;
					result = operations[op](result,tmp)  ;
					str =  str.replace(tmp,"");
				} else {
					alert("Invalid expression") ;
				}
			}
		}
		else {
			alert("Invalid expression") ;
		}
		return result;
	}

	return {calculate:calculate,delete_history:delete_history};

}

var addVal = function(val) {
	var res = document.getElementById("result") ;
	res.value += val;
}

var calculator = Calculator() ;
var inputdiv = document.getElementById("result") ;
var historydiv = document.getElementById( "history") ;
historydiv.innerHTML = localStorage.getItem("histories") ;
document.querySelector("form").addEventListener("submit", function(e)
{
    var input  = inputdiv.value;
    var output = calculator.calculate(input);
    inputdiv.value = output;
    var history_txt = '<div class="history_row"><span class="history_input">'+input+'</span> = <b>'+output+'</b><span class="history_delete">x</span></div>';
    historydiv.innerHTML += history_txt ;
    localStorage.setItem("histories", historydiv.innerHTML);
    e.preventDefault();
});

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target;
    if(target.className=="history_input")
    {
    	inputdiv.value = target.textContent ;
    }
    if(target.className=="history_delete")
    {
    	target.parentNode.parentNode.removeChild(target.parentNode);
    	localStorage.setItem("histories", historydiv.innerHTML);
    }
}, false) ;
