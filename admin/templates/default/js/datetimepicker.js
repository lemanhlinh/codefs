var winCal;var dtToday;var Cal;var MonthName;var WeekDayName1;var WeekDayName2;var exDateTime;var selDate;var calSpanID="calBorder";var domStyle=null;var cnLeft="0";var cnTop="0";var xpos=0;var ypos=0;var calHeight=0;var CalWidth=208;var CellWidth=30;var TimeMode=24;var StartYear=1940;var EndYear=5;var CalPosOffsetX=-1;var CalPosOffsetY=0;var SpanBorderColor="#000000";var SpanBgColor="#FFFFFF";var MonthYearColor="#cc0033";var WeekHeadColor="#18861B";var SundayColor="#C0F64F";var SaturdayColor="#C0F64F";var WeekDayColor="#FFEDA6";var FontColor="blue";var TodayColor="#ffbd35";var SelDateColor="#8DD53C";var YrSelColor="#cc0033";var MthSelColor="#cc0033";var HoverColor="#E0FF38";var DisableColor="#999966";var CalBgColor="#ffffff";var WeekChar=2;var DateSeparator="-";var ShowLongMonth=true;var ShowMonthYear=true;var ThemeBg="";var PrecedeZero=true;var MondayFirstDay=true;var UseImageFiles=true;var imageFilesPath="templates/default/images/calenda/";var MonthName=["January","February","March","April","May","June","July","August","September","October","November","December"];var WeekDayName1=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var WeekDayName2=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];function Calendar(pDate,pCtrl)
{this.Date=pDate.getDate();this.Month=pDate.getMonth();this.Year=pDate.getFullYear();this.Hours=pDate.getHours();if(pDate.getMinutes()<10)
{this.Minutes="0"+ pDate.getMinutes();}
else
{this.Minutes=pDate.getMinutes();}
if(pDate.getSeconds()<10)
{this.Seconds="0"+ pDate.getSeconds();}
else
{this.Seconds=pDate.getSeconds();}
this.MyWindow=winCal;this.Ctrl=pCtrl;this.Format="ddMMyyyy";this.Separator=DateSeparator;this.ShowTime=false;this.Scroller="DROPDOWN";if(pDate.getHours()<12)
{this.AMorPM="AM";}
else
{this.AMorPM="PM";}
this.ShowSeconds=false;this.EnableDateMode=""}
Calendar.prototype.GetMonthIndex=function(shortMonthName)
{for(var i=0;i<12;i+=1)
{if(MonthName[i].substring(0,3).toUpperCase()===shortMonthName.toUpperCase())
{return i;}}};Calendar.prototype.IncYear=function(){if(Cal.Year<=dtToday.getFullYear()+EndYear)
Cal.Year+=1;};Calendar.prototype.DecYear=function(){if(Cal.Year>StartYear)
Cal.Year-=1;};Calendar.prototype.IncMonth=function(){if(Cal.Year<=dtToday.getFullYear()+ EndYear){Cal.Month+=1;if(Cal.Month>=12){Cal.Month=0;Cal.IncYear();}}};Calendar.prototype.DecMonth=function(){if(Cal.Year>=StartYear){Cal.Month-=1;if(Cal.Month<0){Cal.Month=11;Cal.DecYear();}}};Calendar.prototype.SwitchMth=function(intMth)
{Cal.Month=parseInt(intMth,10);};Calendar.prototype.SwitchYear=function(intYear)
{Cal.Year=parseInt(intYear,10);};Calendar.prototype.SetHour=function(intHour){var MaxHour,MinHour,HourExp=new RegExp("^\\d\\d"),SingleDigit=new RegExp("^\\d{1}$");if(TimeMode===24){MaxHour=23;MinHour=0;}
else if(TimeMode===12){MaxHour=12;MinHour=1;}
else{alert("TimeMode can only be 12 or 24");}
if((HourExp.test(intHour)||SingleDigit.test(intHour))&&(parseInt(intHour,10)>MaxHour)){intHour=MinHour;}
else if((HourExp.test(intHour)||SingleDigit.test(intHour))&&(parseInt(intHour,10)<MinHour)){intHour=MaxHour;}
intHour=parseInt(intHour,10);if(SingleDigit.test(intHour)){intHour="0"+ intHour;}
if(HourExp.test(intHour)&&(parseInt(intHour,10)<=MaxHour)&&(parseInt(intHour,10)>=MinHour)){if((TimeMode===12)&&(Cal.AMorPM==="PM")){if(parseInt(intHour,10)===12){Cal.Hours=12;}
else{Cal.Hours=parseInt(intHour,10)+ 12;}}
else if((TimeMode===12)&&(Cal.AMorPM==="AM")){if(intHour===12){intHour-=12;}
Cal.Hours=parseInt(intHour,10);}
else if(TimeMode===24){Cal.Hours=parseInt(intHour,10);}}};Calendar.prototype.SetMinute=function(intMin)
{var MaxMin=59,MinMin=0,SingleDigit=new RegExp("\\d"),SingleDigit2=new RegExp("^\\d{1}$"),MinExp=new RegExp("^\\d{2}$"),strMin=0;if((MinExp.test(intMin)||SingleDigit.test(intMin))&&(parseInt(intMin,10)>MaxMin))
{intMin=MinMin;}
else if((MinExp.test(intMin)||SingleDigit.test(intMin))&&(parseInt(intMin,10)<MinMin))
{intMin=MaxMin;}
strMin=intMin+"";if(SingleDigit2.test(intMin))
{strMin="0"+ strMin;}
if((MinExp.test(intMin)||SingleDigit.test(intMin))&&(parseInt(intMin,10)<=59)&&(parseInt(intMin,10)>=0))
{Cal.Minutes=strMin;}};Calendar.prototype.SetSecond=function(intSec)
{var MaxSec=59,MinSec=0,SingleDigit=new RegExp("\\d"),SingleDigit2=new RegExp("^\\d{1}$"),SecExp=new RegExp("^\\d{2}$"),strSec=0;if((SecExp.test(intSec)||SingleDigit.test(intSec))&&(parseInt(intSec,10)>MaxSec))
{intSec=MinSec;}
else if((SecExp.test(intSec)||SingleDigit.test(intSec))&&(parseInt(intSec,10)<MinSec))
{intSec=MaxSec;}
strSec=intSec+"";if(SingleDigit2.test(intSec))
{strSec="0"+ strSec;}
if((SecExp.test(intSec)||SingleDigit.test(intSec))&&(parseInt(intSec,10)<=59)&&(parseInt(intSec,10)>=0))
{Cal.Seconds=strSec;}};Calendar.prototype.SetAmPm=function(pvalue)
{this.AMorPM=pvalue;if(pvalue==="PM")
{this.Hours=parseInt(this.Hours,10)+ 12;if(this.Hours===24)
{this.Hours=12;}}
else if(pvalue==="AM")
{this.Hours-=12;}};Calendar.prototype.getShowHour=function(){var finalHour;if(TimeMode===12){if(parseInt(this.Hours,10)===0){this.AMorPM="AM";finalHour=parseInt(this.Hours,10)+ 12;}
else if(parseInt(this.Hours,10)===12){this.AMorPM="PM";finalHour=12;}
else if(this.Hours>12){this.AMorPM="PM";if((this.Hours- 12)<10){finalHour="0"+((parseInt(this.Hours,10))- 12);}
else{finalHour=parseInt(this.Hours,10)- 12;}}
else{this.AMorPM="AM";if(this.Hours<10){finalHour="0"+ parseInt(this.Hours,10);}
else{finalHour=this.Hours;}}}
else if(TimeMode===24){if(this.Hours<10){finalHour="0"+ parseInt(this.Hours,10);}
else{finalHour=this.Hours;}}
return finalHour;};Calendar.prototype.getShowAMorPM=function()
{return this.AMorPM;};Calendar.prototype.GetMonthName=function(IsLong)
{var Month=MonthName[this.Month];if(IsLong)
{return Month;}
else
{return Month.substr(0,3);}};Calendar.prototype.GetMonDays=function(){var DaysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];if(Cal.IsLeapYear()){DaysInMonth[1]=29;}
return DaysInMonth[this.Month];};Calendar.prototype.IsLeapYear=function()
{if((this.Year%4)===0)
{if((this.Year%100===0)&&(this.Year%400)!==0)
{return false;}
else
{return true;}}
else
{return false;}};Calendar.prototype.FormatDate=function(pDate)
{var MonthDigit=this.Month+ 1;if(PrecedeZero===true)
{if((pDate<10)&&String(pDate).length===1)
{pDate="0"+ pDate;}
if(MonthDigit<10)
{MonthDigit="0"+ MonthDigit;}}
switch(this.Format.toUpperCase())
{case"DDMMYYYY":return(pDate+ DateSeparator+ MonthDigit+ DateSeparator+ this.Year);case"DDMMMYYYY":return(pDate+ DateSeparator+ this.GetMonthName(false)+ DateSeparator+ this.Year);case"MMDDYYYY":return(MonthDigit+ DateSeparator+ pDate+ DateSeparator+ this.Year);case"MMMDDYYYY":return(this.GetMonthName(false)+ DateSeparator+ pDate+ DateSeparator+ this.Year);case"YYYYMMDD":return(this.Year+ DateSeparator+ MonthDigit+ DateSeparator+ pDate);case"YYMMDD":return(String(this.Year).substring(2,4)+ DateSeparator+ MonthDigit+ DateSeparator+ pDate);case"YYMMMDD":return(String(this.Year).substring(2,4)+ DateSeparator+ this.GetMonthName(false)+ DateSeparator+ pDate);case"YYYYMMMDD":return(this.Year+ DateSeparator+ this.GetMonthName(false)+ DateSeparator+ pDate);default:return(pDate+ DateSeparator+(this.Month+ 1)+ DateSeparator+ this.Year);}};function GenCell(pValue,pHighLight,pColor,pClickable)
{var PValue,PCellStr,PClickable,vTimeStr;if(!pValue)
{PValue="";}
else
{PValue=pValue;}
if(pColor===undefined)
pColor=CalBgColor;if(pClickable!==undefined){PClickable=pClickable;}
else{PClickable=true;}
if(Cal.ShowTime)
{vTimeStr=' '+ Cal.Hours+':'+ Cal.Minutes;if(Cal.ShowSeconds)
{vTimeStr+=':'+ Cal.Seconds;}
if(TimeMode===12)
{vTimeStr+=' '+ Cal.AMorPM;}}
else
{vTimeStr="";}
if(PValue!=="")
{if(PClickable===true){if(Cal.ShowTime===true)
{PCellStr="<td id='c"+ PValue+"' class='calTD' style='text-align:center;cursor:pointer;background-color:"+pColor+"' onmousedown='selectDate(this,"+ PValue+");'>"+ PValue+"</td>";}
else{PCellStr="<td class='calTD' style='text-align:center;cursor:pointer;background-color:"+ pColor+"' onmouseover='changeBorder(this, 0);' onmouseout=\"changeBorder(this, 1, '"+ pColor+"');\" onClick=\"javascript:callback('"+ Cal.Ctrl+"','"+ Cal.FormatDate(PValue)+"');\">"+ PValue+"</td>";}}
else
{PCellStr="<td style='text-align:center;background-color:"+pColor+"' class='calTD'>"+PValue+"</td>";}}
else
{PCellStr="<td style='text-align:center;background-color:"+pColor+"' class='calTD'>&nbsp;</td>";}
return PCellStr;}
function RenderCssCal(bNewCal)
{if(typeof bNewCal==="undefined"||bNewCal!==true)
{bNewCal=false;}
var vCalHeader,vCalData,vCalTime="",vCalClosing="",winCalData="",CalDate,i,j,SelectStr,vDayCount=0,vFirstDay,WeekDayName=[],strCell,showHour,ShowArrows=false,HourCellWidth="35px",SelectAm,SelectPm,funcCalback,headID,e,cssStr,style,cssText,span;calHeight=0;winCalData="<span style='cursor:auto;'>";vCalHeader="<table style='background-color:"+CalBgColor+";width:200px;padding:0;margin:5px auto 5px auto'><tbody>";vCalHeader+="<tr><td colspan='7'><table border='0' width='200px' cellpadding='0' cellspacing='0'><tr>";if(Cal.Scroller==="DROPDOWN")
{vCalHeader+="<td align='center'><select name='MonthSelector' onChange='javascript:Cal.SwitchMth(this.selectedIndex);RenderCssCal();'>";for(i=0;i<12;i+=1)
{if(i===Cal.Month)
{SelectStr="Selected";}
else
{SelectStr="";}
vCalHeader+="<option "+ SelectStr+" value="+ i+">"+ MonthName[i]+"</option>";}
vCalHeader+="</select></td>";vCalHeader+="<td align='center'><select name='YearSelector' size='1' onChange='javascript:Cal.SwitchYear(this.value);RenderCssCal();'>";for(i=StartYear;i<=(dtToday.getFullYear()+ EndYear);i+=1)
{if(i===Cal.Year)
{SelectStr='selected="selected"';}
else
{SelectStr='';}
vCalHeader+="<option "+ SelectStr+" value="+ i+">"+ i+"</option>\n";}
vCalHeader+="</select></td>\n";calHeight+=30;}
else if(Cal.Scroller==="ARROW")
{if(UseImageFiles)
{vCalHeader+="<td><img onmousedown='javascript:Cal.DecYear();RenderCssCal();' src='"+imageFilesPath+"cal_fastreverse.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";vCalHeader+="<td><img onmousedown='javascript:Cal.DecMonth();RenderCssCal();' src='"+ imageFilesPath+"cal_reverse.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";vCalHeader+="<td width='70%' class='calR' style='color:"+YrSelColor+"'>"+ Cal.GetMonthName(ShowLongMonth)+" "+ Cal.Year+"</td>";vCalHeader+="<td><img onmousedown='javascript:Cal.IncMonth();RenderCssCal();' src='"+ imageFilesPath+"cal_forward.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";vCalHeader+="<td><img onmousedown='javascript:Cal.IncYear();RenderCssCal();' src='"+ imageFilesPath+"cal_fastforward.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";calHeight+=22;}
else
{vCalHeader+="<td><span id='dec_year' title='reverse year' onmousedown='javascript:Cal.DecYear();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; color:"+ YrSelColor+"'>-</span></td>";vCalHeader+="<td><span id='dec_month' title='reverse month' onmousedown='javascript:Cal.DecMonth();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'>&lt;</span></td>\n";vCalHeader+="<td width='70%' class='calR' style='color:"+ YrSelColor+"'>"+ Cal.GetMonthName(ShowLongMonth)+" "+ Cal.Year+"</td>\n";vCalHeader+="<td><span id='inc_month' title='forward month' onmousedown='javascript:Cal.IncMonth();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'>&gt;</span></td>\n";vCalHeader+="<td><span id='inc_year' title='forward year' onmousedown='javascript:Cal.IncYear();RenderCssCal();'  onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; color:"+ YrSelColor+"'>+</span></td>\n";calHeight+=22;}}
vCalHeader+="</tr></table></td></tr>";if(ShowMonthYear&&Cal.Scroller==="DROPDOWN")
{vCalHeader+="<tr><td colspan='7' class='calR' style='color:"+ MonthYearColor+"'>"+ Cal.GetMonthName(ShowLongMonth)+" "+ Cal.Year+"</td></tr>";calHeight+=19;}
vCalHeader+="<tr><td colspan=\"7\"><table style='border-spacing:1px;border-collapse:separate;'><tr>";if(MondayFirstDay===true)
{WeekDayName=WeekDayName2;}
else
{WeekDayName=WeekDayName1;}
for(i=0;i<7;i+=1)
{vCalHeader+="<td style='background-color:"+WeekHeadColor+";width:"+CellWidth+"px;color:#FFFFFF' class='calTD'>"+ WeekDayName[i].substr(0,WeekChar)+"</td>";}
calHeight+=19;vCalHeader+="</tr>";CalDate=new Date(Cal.Year,Cal.Month);CalDate.setDate(1);vFirstDay=CalDate.getDay();if(MondayFirstDay===true)
{vFirstDay-=1;if(vFirstDay===-1)
{vFirstDay=6;}}
vCalData="<tr>";calHeight+=19;for(i=0;i<vFirstDay;i+=1)
{vCalData=vCalData+ GenCell();vDayCount=vDayCount+ 1;}
for(j=1;j<=Cal.GetMonDays();j+=1)
{if((vDayCount%7===0)&&(j>1))
{vCalData=vCalData+"<tr>";}
vDayCount=vDayCount+ 1;if(Cal.EnableDateMode==="future"&&((j<dtToday.getDate())&&(Cal.Month===dtToday.getMonth())&&(Cal.Year===dtToday.getFullYear())||(Cal.Month<dtToday.getMonth())&&(Cal.Year===dtToday.getFullYear())||(Cal.Year<dtToday.getFullYear())))
{strCell=GenCell(j,false,DisableColor,false);}
else if(Cal.EnableDateMode==="past"&&((j>=dtToday.getDate())&&(Cal.Month===dtToday.getMonth())&&(Cal.Year===dtToday.getFullYear())||(Cal.Month>dtToday.getMonth())&&(Cal.Year===dtToday.getFullYear())||(Cal.Year>dtToday.getFullYear()))){strCell=GenCell(j,false,DisableColor,false);}
else if(Cal.Year>(dtToday.getFullYear()+EndYear))
{strCell=GenCell(j,false,DisableColor,false);}
else if((j===dtToday.getDate())&&(Cal.Month===dtToday.getMonth())&&(Cal.Year===dtToday.getFullYear()))
{strCell=GenCell(j,true,TodayColor);}
else
{if((j===selDate.getDate())&&(Cal.Month===selDate.getMonth())&&(Cal.Year===selDate.getFullYear())){strCell=GenCell(j,true,SelDateColor);}
else
{if(MondayFirstDay===true)
{if(vDayCount%7===0)
{strCell=GenCell(j,false,SundayColor);}
else if((vDayCount+ 1)%7===0)
{strCell=GenCell(j,false,SaturdayColor);}
else
{strCell=GenCell(j,null,WeekDayColor);}}
else
{if(vDayCount%7===0)
{strCell=GenCell(j,false,SaturdayColor);}
else if((vDayCount+ 6)%7===0)
{strCell=GenCell(j,false,SundayColor);}
else
{strCell=GenCell(j,null,WeekDayColor);}}}}
vCalData=vCalData+ strCell;if((vDayCount%7===0)&&(j<Cal.GetMonDays()))
{vCalData=vCalData+"</tr>";calHeight+=19;}}
if(vDayCount%7!==0)
{while(vDayCount%7!==0)
{vCalData=vCalData+ GenCell();vDayCount=vDayCount+ 1;}}
vCalData=vCalData+"</table></td></tr>";if(Cal.ShowTime===true)
{showHour=Cal.getShowHour();if(Cal.ShowSeconds===false&&TimeMode===24)
{ShowArrows=true;HourCellWidth="10px";}
vCalTime="<tr><td colspan='7' style=\"text-align:center;\"><table border='0' width='199px' cellpadding='0' cellspacing='0'><tbody><tr><td height='5px' width='"+ HourCellWidth+"'>&nbsp;</td>";if(ShowArrows&&UseImageFiles)
{vCalTime+="<td style='vertical-align:middle;'><table cellspacing='0' cellpadding='0' style='line-height:0pt;width:100%;'><tr><td style='text-align:center;'><img onclick='nextStep(\"Hour\", \"plus\");' onmousedown='startSpin(\"Hour\", \"plus\");' onmouseup='stopSpin();' src='"+ imageFilesPath+"cal_plus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr><tr><td style='text-align:center;'><img onclick='nextStep(\"Hour\", \"minus\");' onmousedown='startSpin(\"Hour\", \"minus\");' onmouseup='stopSpin();' src='"+ imageFilesPath+"cal_minus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr></table></td>\n";}
vCalTime+="<td width='22px'><input type='text' name='hour' maxlength=2 size=1 style=\"WIDTH:22px\" value="+ showHour+" onkeyup=\"javascript:Cal.SetHour(this.value)\">";vCalTime+="</td><td style='font-weight:bold;text-align:center;'>:</td><td width='22px'>";vCalTime+="<input type='text' name='minute' maxlength=2 size=1 style=\"WIDTH: 22px\" value="+ Cal.Minutes+" onkeyup=\"javascript:Cal.SetMinute(this.value)\">";if(Cal.ShowSeconds)
{vCalTime+="</td><td style='font-weight:bold;'>:</td><td width='22px'>";vCalTime+="<input type='text' name='second' maxlength=2 size=1 style=\"WIDTH: 22px\" value="+ Cal.Seconds+" onkeyup=\"javascript:Cal.SetSecond(parseInt(this.value,10))\">";}
if(TimeMode===12)
{SelectAm=(Cal.AMorPM==="AM")?"Selected":"";SelectPm=(Cal.AMorPM==="PM")?"Selected":"";vCalTime+="</td><td>";vCalTime+="<select name=\"ampm\" onChange=\"javascript:Cal.SetAmPm(this.options[this.selectedIndex].value);\">\n";vCalTime+="<option "+ SelectAm+" value=\"AM\">AM</option>";vCalTime+="<option "+ SelectPm+" value=\"PM\">PM<option>";vCalTime+="</select>";}
if(ShowArrows&&UseImageFiles)
{vCalTime+="</td>\n<td style='vertical-align:middle;'><table cellspacing='0' cellpadding='0' style='line-height:0pt;width:100%'><tr><td style='text-align:center;'><img onclick='nextStep(\"Minute\", \"plus\");' onmousedown='startSpin(\"Minute\", \"plus\");' onmouseup='stopSpin();' src='"+ imageFilesPath+"cal_plus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr><tr><td style='text-align:center;'><img onmousedown='startSpin(\"Minute\", \"minus\");' onmouseup='stopSpin();' onclick='nextStep(\"Minute\",\"minus\");' src='"+ imageFilesPath+"cal_minus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr></table>";}
vCalTime+="</td>\n<td align='right' valign='bottom' width='"+ HourCellWidth+"px'></td></tr>";vCalTime+="<tr><td colspan='8' style=\"text-align:center;\"><input style='width:60px;font-size:12px;' onClick='javascript:closewin(\""+ Cal.Ctrl+"\");'  type=\"button\" value=\"OK\">&nbsp;<input style='width:60px;font-size:12px;' onClick='javascript: winCal.style.visibility = \"hidden\"' type=\"button\" value=\"Cancel\"></td></tr>";}
else
{vCalTime+="\n<tr>\n<td colspan='7' style=\"text-align:right;\">";if(UseImageFiles){vCalClosing+="<img onmousedown='javascript:closewin(\""+ Cal.Ctrl+"\"); stopSpin();' src='"+imageFilesPath+"cal_close.gif' width='16px' height='14px' onmouseover='changeBorder(this,0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>";}
else{vCalClosing+="<span id='close_cal' title='close'onmousedown='javascript:closewin(\""+ Cal.Ctrl+"\");stopSpin();' onmouseover='changeBorder(this, 0)'onmouseout='changeBorder(this, 1)' style='border:1px solid white; font-family: Arial;font-size: 10pt;'>x</span></td>";}
vCalClosing+="</tr>";}
vCalClosing+="</tbody></table></td></tr>";calHeight+=31;vCalClosing+="</tbody></table>\n</span>";funcCalback="function callback(id, datum) {";funcCalback+=" var CalId = document.getElementById(id);if (datum=== 'undefined') { var d = new Date(); datum = d.getDate() + '/' +(d.getMonth()+1) + '/' + d.getFullYear(); } window.calDatum=datum;CalId.value=datum;";funcCalback+=" if(Cal.ShowTime){";funcCalback+=" CalId.value+=' '+Cal.getShowHour()+':'+Cal.Minutes;";funcCalback+=" if (Cal.ShowSeconds)  CalId.value+=':'+Cal.Seconds;";funcCalback+=" if (TimeMode === 12)  CalId.value+=''+Cal.getShowAMorPM();";funcCalback+="}if(CalId.onchange!=undefined) CalId.onchange();CalId.focus();winCal.style.visibility='hidden';}";if(ypos>calHeight)
{ypos=ypos- calHeight;}
if(!winCal)
{headID=document.getElementsByTagName("head")[0];e=document.createElement("script");e.type="text/javascript";e.language="javascript";e.text=funcCalback;headID.appendChild(e);cssStr=".calTD {font-family: verdana; font-size: 12px; text-align: center; border:0; }\n";cssStr+=".calR {font-family: verdana; font-size: 12px; text-align: center; font-weight: bold;}";style=document.createElement("style");style.type="text/css";style.rel="stylesheet";if(style.styleSheet)
{style.styleSheet.cssText=cssStr;}
else
{cssText=document.createTextNode(cssStr);style.appendChild(cssText);}
headID.appendChild(style);span=document.createElement("span");span.id=calSpanID;span.style.position="absolute";span.style.left=(xpos+ CalPosOffsetX)+'px';span.style.top=(ypos- CalPosOffsetY)+'px';span.style.width=CalWidth+'px';span.style.border="solid 1pt "+ SpanBorderColor;span.style.padding="0";span.style.cursor="move";span.style.backgroundColor=SpanBgColor;span.style.zIndex=100;document.body.appendChild(span);winCal=document.getElementById(calSpanID);}
else
{winCal.style.visibility="visible";winCal.style.Height=calHeight;if(bNewCal===true)
{winCal.style.left=(xpos+ CalPosOffsetX)+'px';winCal.style.top=(ypos- CalPosOffsetY)+'px';}}
winCal.innerHTML=winCalData+ vCalHeader+ vCalData+ vCalTime+ vCalClosing;return true;}
function NewCssCal(pCtrl,pFormat,pScroller,pShowTime,pTimeMode,pShowSeconds,pEnableDateMode)
{dtToday=new Date();Cal=new Calendar(dtToday);if(pShowTime!==undefined)
{if(pShowTime){Cal.ShowTime=true;}
else{Cal.ShowTime=false;}
if(pTimeMode)
{pTimeMode=parseInt(pTimeMode,10);}
if(pTimeMode===12||pTimeMode===24)
{TimeMode=pTimeMode;}
else
{TimeMode=24;}
if(pShowSeconds!==undefined)
{if(pShowSeconds)
{Cal.ShowSeconds=true;}
else
{Cal.ShowSeconds=false;}}
else
{Cal.ShowSeconds=false;}}
if(pCtrl!==undefined)
{Cal.Ctrl=pCtrl;}
if(pFormat!==undefined&&pFormat!=="")
{Cal.Format=pFormat.toUpperCase();}
else
{Cal.Format="MMDDYYYY";}
if(pScroller!==undefined&&pScroller!=="")
{if(pScroller.toUpperCase()==="ARROW")
{Cal.Scroller="ARROW";}
else
{Cal.Scroller="DROPDOWN";}}
if(pEnableDateMode!==undefined&&(pEnableDateMode==="future"||pEnableDateMode==="past")){Cal.EnableDateMode=pEnableDateMode;}
exDateTime=document.getElementById(pCtrl).value;if(exDateTime)
{var Sp1=exDateTime.indexOf(DateSeparator,0),Sp2=exDateTime.indexOf(DateSeparator,parseInt(Sp1,10)+ 1),tSp1,tSp2,strMonth,strDate,strYear,intMonth,YearPattern,strHour,strMinute,strSecond,winHeight,offset=parseInt(Cal.Format.toUpperCase().lastIndexOf("M"),10)- parseInt(Cal.Format.toUpperCase().indexOf("M"),10)- 1,strAMPM="";if(Cal.Format.toUpperCase()==="DDMMYYYY"||Cal.Format.toUpperCase()==="DDMMMYYYY")
{if(DateSeparator==="")
{strMonth=exDateTime.substring(2,4+ offset);strDate=exDateTime.substring(0,2);strYear=exDateTime.substring(4+ offset,8+ offset);}
else
{if(exDateTime.indexOf("D*")!==-1)
{strMonth=exDateTime.substring(8,11);strDate=exDateTime.substring(0,2);strYear="20"+ exDateTime.substring(11,13);}
else
{strMonth=exDateTime.substring(Sp1+ 1,Sp2);strDate=exDateTime.substring(0,Sp1);strYear=exDateTime.substring(Sp2+ 1,Sp2+ 5);}}}
else if(Cal.Format.toUpperCase()==="MMDDYYYY"||Cal.Format.toUpperCase()==="MMMDDYYYY"){if(DateSeparator===""){strMonth=exDateTime.substring(0,2+ offset);strDate=exDateTime.substring(2+ offset,4+ offset);strYear=exDateTime.substring(4+ offset,8+ offset);}
else{strMonth=exDateTime.substring(0,Sp1);strDate=exDateTime.substring(Sp1+ 1,Sp2);strYear=exDateTime.substring(Sp2+ 1,Sp2+ 5);}}
else if(Cal.Format.toUpperCase()==="YYYYMMDD"||Cal.Format.toUpperCase()==="YYYYMMMDD")
{if(DateSeparator===""){strMonth=exDateTime.substring(4,6+ offset);strDate=exDateTime.substring(6+ offset,8+ offset);strYear=exDateTime.substring(0,4);}
else{strMonth=exDateTime.substring(Sp1+ 1,Sp2);strDate=exDateTime.substring(Sp2+ 1,Sp2+ 3);strYear=exDateTime.substring(0,Sp1);}}
else if(Cal.Format.toUpperCase()==="YYMMDD"||Cal.Format.toUpperCase()==="YYMMMDD")
{if(DateSeparator==="")
{strMonth=exDateTime.substring(2,4+ offset);strDate=exDateTime.substring(4+ offset,6+ offset);strYear=exDateTime.substring(0,2);}
else
{strMonth=exDateTime.substring(Sp1+ 1,Sp2);strDate=exDateTime.substring(Sp2+ 1,Sp2+ 3);strYear=exDateTime.substring(0,Sp1);}}
if(isNaN(strMonth)){intMonth=Cal.GetMonthIndex(strMonth);}
else{intMonth=parseInt(strMonth,10)- 1;}
if((parseInt(intMonth,10)>=0)&&(parseInt(intMonth,10)<12)){Cal.Month=intMonth;}
YearPattern=/^\d{4}$/;if(YearPattern.test(strYear)){if((parseInt(strYear,10)>=StartYear)&&(parseInt(strYear,10)<=(dtToday.getFullYear()+EndYear)))
Cal.Year=parseInt(strYear,10);}
if((parseInt(strDate,10)<=Cal.GetMonDays())&&(parseInt(strDate,10)>=1)){Cal.Date=strDate;}
if(Cal.ShowTime===true)
{if(TimeMode===12)
{strAMPM=exDateTime.substring(exDateTime.length- 2,exDateTime.length);Cal.AMorPM=strAMPM;}
tSp1=exDateTime.indexOf(":",0);tSp2=exDateTime.indexOf(":",(parseInt(tSp1,10)+ 1));if(tSp1>0)
{strHour=exDateTime.substring(tSp1,tSp1- 2);Cal.SetHour(strHour);strMinute=exDateTime.substring(tSp1+ 1,tSp1+ 3);Cal.SetMinute(strMinute);strSecond=exDateTime.substring(tSp2+ 1,tSp2+ 3);Cal.SetSecond(strSecond);}
else if(exDateTime.indexOf("D*")!==-1)
{strHour=exDateTime.substring(2,4);Cal.SetHour(strHour);strMinute=exDateTime.substring(4,6);Cal.SetMinute(strMinute);}}}
selDate=new Date(Cal.Year,Cal.Month,Cal.Date);RenderCssCal(true);}
function closewin(id){if(Cal.ShowTime===true){var MaxYear=dtToday.getFullYear()+ EndYear;var beforeToday=(Cal.Date<dtToday.getDate())&&(Cal.Month===dtToday.getMonth())&&(Cal.Year===dtToday.getFullYear())||(Cal.Month<dtToday.getMonth())&&(Cal.Year===dtToday.getFullYear())||(Cal.Year<dtToday.getFullYear());if((Cal.Year<=MaxYear)&&(Cal.Year>=StartYear)&&(Cal.Month===selDate.getMonth())&&(Cal.Year===selDate.getFullYear())){if(Cal.EnableDateMode==="future"){if(beforeToday===false){callback(id,Cal.FormatDate(Cal.Date));}}
else
callback(id,Cal.FormatDate(Cal.Date));}}
var CalId=document.getElementById(id);CalId.focus();winCal.style.visibility='hidden';}
function changeBorder(element,col,oldBgColor)
{if(col===0)
{element.style.background=HoverColor;element.style.borderColor="black";element.style.cursor="pointer";}
else
{if(oldBgColor)
{element.style.background=oldBgColor;}
else
{element.style.background="white";}
element.style.borderColor="white";element.style.cursor="auto";}}
function selectDate(element,date){Cal.Date=date;selDate=new Date(Cal.Year,Cal.Month,Cal.Date);element.style.background=SelDateColor;RenderCssCal();}
function pickIt(evt)
{var objectID,dom,de,b;if(document.addEventListener)
{objectID=evt.target.id;if(objectID.indexOf(calSpanID)!==-1)
{dom=document.getElementById(objectID);cnLeft=evt.pageX;cnTop=evt.pageY;if(dom.offsetLeft)
{cnLeft=(cnLeft- dom.offsetLeft);cnTop=(cnTop- dom.offsetTop);}}
xpos=(evt.pageX);ypos=(evt.pageY);}
else
{objectID=event.srcElement.id;cnLeft=event.offsetX;cnTop=(event.offsetY);de=document.documentElement;b=document.body;xpos=event.clientX+(de.scrollLeft||b.scrollLeft)-(de.clientLeft||0);ypos=event.clientY+(de.scrollTop||b.scrollTop)-(de.clientTop||0);}
if(objectID.indexOf(calSpanID)!==-1)
{domStyle=document.getElementById(objectID).style;}
if(domStyle)
{domStyle.zIndex=100;return false;}
else
{domStyle=null;return;}}
function dragIt(evt)
{if(domStyle)
{if(document.addEventListener)
{domStyle.left=(event.clientX- cnLeft+ document.body.scrollLeft)+'px';domStyle.top=(event.clientY- cnTop+ document.body.scrollTop)+'px';}
else
{domStyle.left=(evt.clientX- cnLeft+ document.body.scrollLeft)+'px';domStyle.top=(evt.clientY- cnTop+ document.body.scrollTop)+'px';}}}
function nextStep(whatSpinner,direction)
{if(whatSpinner==="Hour")
{if(direction==="plus")
{Cal.SetHour(Cal.Hours+ 1);RenderCssCal();}
else if(direction==="minus")
{Cal.SetHour(Cal.Hours- 1);RenderCssCal();}}
else if(whatSpinner==="Minute")
{if(direction==="plus")
{Cal.SetMinute(parseInt(Cal.Minutes,10)+ 1);RenderCssCal();}
else if(direction==="minus")
{Cal.SetMinute(parseInt(Cal.Minutes,10)- 1);RenderCssCal();}}}
function startSpin(whatSpinner,direction)
{document.thisLoop=setInterval(function()
{nextStep(whatSpinner,direction);},125);}
function stopSpin()
{clearInterval(document.thisLoop);}
function dropIt()
{stopSpin();if(domStyle)
{domStyle=null;}}
document.onmousedown=pickIt;document.onmousemove=dragIt;document.onmouseup=dropIt;