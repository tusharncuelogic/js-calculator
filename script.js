function Calculator() {

	var calc_html = '<form class="frm_calc"> <table border=2> <tr> <td colspan=4> <input type=text Name="display" class="calc_result_box"> </td></tr><tr> <td> <input type=button value="0" class="add_val"> </td><td> <input type=button value="1" class="add_val"> </td><td> <input type=button value="2" class="add_val"> </td><td> <input type=button value="+" class="add_val"> </td></tr><tr> <td> <input type=button value="3" class="add_val"> </td><td> <input type=button value="4" class="add_val"> </td><td> <input type=button value="5" class="add_val"> </td><td> <input type=button value="-" class="add_val"> </td></tr><tr> <td> <input type=button value="6" class="add_val"> </td><td> <input type=button value="7" class="add_val"> </td><td> <input type=button value="8" class="add_val"> </td><td> <input type=button value="*" class="add_val"> </td></tr><tr> <td> <input type=button value="9" class="add_val"> </td><td> <input type=button value="C" class="add_val"> </td><td> <input type="submit" value="=" class="calc_result"> </td><td> <input type=button value="/" class="add_val"> </td></tr></table> </form>';

	var result  = '' ;
	var result_box = '' ;

	document.addEventListener('click', function(e) {

	    e = e || window.event;
	    var target = e.target;

	    if(target.className=="history_input" || target.className=="history_delete"  || target.className=='calc_result' || target.className=='add_val') 
	    {
	    	var parent_form = getParentForm(target) ;
	    	if(parent_form)
	    	{
	    		parent_form.id= 'form11';	    		
	    		result_box=parent_form.getElementsByClassName('calc_result_box');
	    	}

	    	cls = target.className ;

	    	if(cls=="history_input")
		    {
		    	inputdiv.value = target.textContent ;
		    }
		    else if(cls=="history_delete")
		    {
		    	target.parentNode.parentNode.removeChild(target.parentNode);
		    	localStorage.setItem("histories",historydiv.innerHTML);
		    }
		    else if(cls=="add_val")
		    {
		    	result_box.display.value=result_box.display.value + target.value;
		    }
		    else if(cls=="calc_result")
		    {
		    	var calc_input = result_box.display.value;
		    	result_box.display.value = calculate(calc_input);
		    }

		    e.preventDefault();

	    }    
	}, false) ;


	var getParentForm =  function(ele) {
		var cnt  =  1 ;
		while(ele && cnt < 15) {
			calc_frm =  ele.parentNode;
			if(calc_frm.tagName == 'FORM') {
				return calc_frm ;
			}
			else {
				cnt++;
				ele = calc_frm;
			}
		}
		return null;
	}

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

	var delete_history =  function(){

	}

	var add_history =  function(){

	}

	var init =  function(id) {
		var calc  = document.getElementById(id);
		
		if(calc) {
			calc.innerHTML = calc_html;
		}
		var frm =  calc.getElementsByTagName("form");
		frm.id =  'frm_'+id;
		console.log(frm.id);
	}

	return {init:init , calculate:calculate,delete_history:delete_history};

}

var calculator = Calculator() ;
calculator.init("calc1");
