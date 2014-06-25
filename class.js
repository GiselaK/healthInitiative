if(htmlForPath[name] != undefined)
      {
        console.log("i'm old","pointWeeklyTotal:",pointWeeklyTotal,"pointInputTotal;",pointInputTotal );
        pointWeeklyTotal += pointInputTotal;
        classChosen=document.getElementById("hrClass");
    	classChosen.style.display="none";
    	showTable=document.getElementById("table");
   		showTable.style.display="block";

      }else{
        pointWeeklyTotal=pointInputTotal;
        console.log("im new","pointWeeklyTotal:",pointWeeklyTotal,"pointInputTotal;",pointInputTotal);
        whatClass=document.getElementById("hrClass");
   		whatClass.style.display="block";
   		hideTable=document.getElementById("table");
   		hideTable.style.display="none";
      }
function personSaved(){
	 	classChosen=document.getElementById("hrClass");
    	classChosen.style.display="none";
    	showTable=document.getElementById("table");
   		showTable.style.display="block";
}

    