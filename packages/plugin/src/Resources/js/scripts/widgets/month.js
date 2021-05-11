!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=10)}({0:function(e,t,a){"use strict";a.r(t),a.d(t,"renderEvent",(function(){return d})),a.d(t,"today",(function(){return l})),a.d(t,"renderDay",(function(){return c})),a.d(t,"renderView",(function(){return s})),a.d(t,"eventRepositioned",(function(){return u})),a.d(t,"eventDateChange",(function(){return f})),a.d(t,"eventDurationChange",(function(){return p})),a.d(t,"eventClick",(function(){return m})),a.d(t,"getDayViewLink",(function(){return v})),a.d(t,"getEvents",(function(){return h})),a.d(t,"closeAllQTips",(function(){return C})),a.d(t,"enableQTips",(function(){return y})),a.d(t,"getSpinner",(function(){return g}));var n=a(1);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var i=$("#solspace-calendar"),o=null,d=function(e,t,a){if(e.allDay&&t.addClass("fc-event-all-day"),e.end){if(e.multiDay||e.allDay)t.addClass("fc-event-multi-day");else{t.addClass("fc-event-single-day");var r=$("<span />").addClass("fc-color-icon").css("background-color",e.backgroundColor).css("border-color",e.borderColor);$(".fc-content",t).prepend(r)}e.enabled||t.addClass("fc-event-disabled"),t.addClass("fc-color-"+e.textColor),Object(n.buildEventPopup)(e,t,a.options.timeFormat)}},l=new moment,c=function(e,t){var a=t.parents(".fc-bg:first").siblings(".fc-content-skeleton").find("thead > tr > td:eq("+t.index()+")"),n=v(e),r=$("<a />").attr("href",n).html(a.html());a.html(r)},s=function(e,t){var a=t.parents("#solspace-calendar"),n=new moment(a.data("current-day"));"agendaWeek"===e.name&&$(".fc-day-header.fc-widget-header",t).each((function(){var e=$(this).html(),t=e.split(" ");e=t[0]+" <span>"+t[1]+"</span>";var a=new moment($(this).data("date")),r=v(a),i=$("<a />").attr("href",r).html(e);n.format("YYYYMMDD")===a.format("YYYYMMDD")&&i.addClass("fc-title-today"),$(this).html(i)}));$(".fc-localeButton-button",i).addClass("menubtn btn"),"agendaDay"===e.name&&$("thead.fc-head",t).remove()},u=function(e,t,a,n){$.ajax({url:Craft.getCpUrl("calendar/events/api/modify-"+e),type:"post",dataType:"json",data:r({eventId:t.id,siteId:t.site.id,isAllDay:t.allDay,startDate:t.start.toISOString(),endDate:t.end?t.end.toISOString():null,deltaSeconds:a.as("seconds")},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(e){e.error?n():t.repeats&&$calendar.fullCalendar("refetchEvents")},error:function(){n()}})},f=function(e,t,a){u("date",e,t,a)},p=function(e,t,a){u("duration",e,t,a)},m=function(e){window.location.href=Craft.getCpUrl("calendar/events/"+e.id+"/"+e.site.handle)},v=function(e){if(e.isValid()){var t=e.format("YYYY"),a=e.format("MM"),n=e.format("DD");return Craft.getCpUrl("calendar/view/day/"+t+"/"+a+"/"+n)}return""},h=function(e,t,a,n){g().fadeIn("fast");var i=$("ul.calendar-list"),o="*";i.length&&(o=$("input:checked",i).map((function(){return $(this).val()})).get().join());var d=$("#solspace-calendar").data().currentSiteId;$.ajax({url:Craft.getCpUrl("calendar/month"),data:r({rangeStart:e.toISOString(),rangeEnd:t.toISOString(),calendars:o,siteId:d},Craft.csrfTokenName,Craft.csrfTokenValue),type:"post",dataType:"json",success:function(e){for(var t=0;t<e.length;t++){var a=e[t];a.allDay&&(e[t].end=moment(a.end).add(2,"s").utc().format())}n(e),g().fadeOut("fast")}})},C=function(){window.qTipsEnabled=!1,$("div.qtip:visible").qtip("hide")},y=function(){window.qTipsEnabled=!0},g=function(){return o||(i.find(".fc-right").prepend('<div id="solspace-calendar-spinner" class="spinner" style="display: none;"></div>'),o=$("#solspace-calendar-spinner")),o}},1:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.r(t),a.d(t,"showEventCreator",(function(){return o})),a.d(t,"buildEventPopup",(function(){return d})),a.d(t,"createDateAsUTC",(function(){return l}));var r=!1,i=$("#solspace-calendar"),o=function(e,t){r||(r=!0,$("<div />").qtip({content:{text:$("#event-creator"),title:Craft.t("calendar","New Event")},position:{my:"center",at:"center",target:$(window)},show:{ready:!0,modal:{on:!0,blur:!0}},hide:!1,style:{classes:"qtip-bootstrap dialogue",width:500},events:{render:function(a,r){var o=r.elements.content,d=i.data().currentSiteId;$("ul.errors",o).empty();var c=e.utc().format("HHmmss"),s=t.utc().format("HHmmss"),u=!1;c===s&&"000000"===s&&(t.subtract(1,"seconds"),u=!0);var f=l(e.toDate()),p=l(t.toDate()),m=$("#event-creator"),v=$('input[name="startDate[date]"]',m),h=$('input[name="startDate[time]"]',m),C=$('input[name="endDate[date]"]',m),y=$('input[name="endDate[time]"]',m);m.addClass("shown"),v.datepicker("setDate",f),C.datepicker("setDate",p),h.timepicker("setTime",f),y.timepicker("setTime",p);var g=$("input[name=allDay]"),b=g.parents(".lightswitch:first");$("input",b).val(u?1:""),u?(b.data("lightswitch").turnOn(),$(".timewrapper",m).hide()):(b.data("lightswitch").turnOff(),$(".timewrapper",m).show()),setTimeout((function(){$("input[name=title]:first",o).val("").focus().bind("keypress",(function(e){13===(e.which?e.which:e.keyCode)&&$("button.submit",o).trigger("click")}))}),100);var w=h.timepicker("option","timeFormat").replace("h","hh").replace("H","HH").replace("G","H").replace("g","h").replace("A","a").replace("i","mm");$("button.submit",o).unbind("click").click((function(e){var t=$(this),a=$("input[name=title]",o).val(),i=$("select[name=calendarId]",o).val(),l=moment(v.datepicker("getDate")),c=moment(h.val().replace(/(a|p)\.(m)\./gi,"$1$2"),w),s=moment(C.datepicker("getDate")),u=moment(y.val().replace(/(a|p)\.(m)\./gi,"$1$2"),w);t.prop("disabled",!0).addClass("disabled"),t.text(Craft.t("app","Saving...")),$.ajax({url:Craft.getCpUrl("calendar/events/api/create"),type:"post",dataType:"json",data:n({siteId:d,startDate:l.format("YYYY-MM-DD")+" "+c.format("HH:mm:ss"),endDate:s.format("YYYY-MM-DD")+" "+u.format("HH:mm:ss"),allDay:g.val(),event:{title:a,calendarId:i}},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(t){if(t.error)$("ul.errors",o).empty().append($("<li />",{text:t.error}));else if(t.event){var a=t.event;a.allDay&&(a.end=moment(a.end).add(2,"s").utc().format()),$("*[data-calendar-instance]").fullCalendar("renderEvent",a),$("*[data-calendar-instance]").fullCalendar("unselect"),r.hide(e)}},error:function(e){var t=e.responseJSON;Craft.cp.displayNotification("error",t.error)},complete:function(){t.prop("disabled",!1).removeClass("disabled"),t.text(Craft.t("app","Save"))}})})),$("button.delete",o).unbind("click").click((function(){r.hide()}))},hide:function(e,t){$("#event-creator").removeClass("shown").insertAfter($("#solspace-calendar")),$("*[data-calendar-instance]").fullCalendar("unselect"),r=!1,t.destroy()}}}))},d=function(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(e.calendar){var i=$("<div>",{class:"buttons"}),o=$("<div>"),d=$("<div>",{class:"calendar-data",html:'<span class="color-indicator" style="background-color: '+e.backgroundColor+';"></span> '+e.calendar.name}),l=moment(e.start),c=moment(e.end),s="dddd, MMMM D, YYYY";e.allDay?c.subtract(1,"days"):s=s+" [at] "+a;var u=$("<div>",{class:"event-date-range separator",html:'<div style="white-space: nowrap;"><label>'+Craft.t("calendar","Starts")+":</label> "+l.format(s)+'</div><div style="white-space: nowrap;"><label>'+Craft.t("calendar","Ends")+":</label> "+c.format(s)+"</div>"}),f="";e.repeats&&(f=$("<div>",{class:"event-repeats separator",html:"<label>"+Craft.t("calendar","Repeats")+":</label> "+e.readableRepeatRule})),e.editable&&(i.append($("<a>",{class:"btn small submit",href:Craft.getCpUrl("calendar/events/"+e.id+(r?"/"+e.site.handle:"")),text:Craft.t("calendar","Edit")})),i.append($("<a>",{class:"btn small delete-event",href:Craft.getCpUrl("calendar/events/api/delete"),text:Craft.t("calendar","Delete"),data:{id:e.id}})),e.repeats&&i.append($("<a>",{class:"btn small delete-event-occurrence",href:Craft.getCpUrl("calendar/events/api/delete-occurrence"),text:Craft.t("calendar","Delete occurrence"),data:{id:e.id,date:e.start.toISOString()}}))),t.qtip({content:{title:e.title,button:!0,text:o.add(d).add(u).add(f).add(i)},style:{classes:"qtip-bootstrap qtip-event",tip:{width:30,height:15}},position:{my:"right center",at:"left center",adjust:{method:"shift flip"}},show:{solo:!0,delay:500},hide:{fixed:!0,delay:300},events:{show:function(e){window.qTipsEnabled||e.preventDefault()},render:function(t,a){$("a.delete-event-occurrence",a.elements.content).click((function(){var e=$(this).attr("href"),t=$(this).data("id"),r=$(this).data("date");return confirm(Craft.t("calendar","Are you sure?"))&&$.ajax({url:e,type:"post",dataType:"json",data:n({eventId:t,date:r},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(e){if(!e.error)return $("*[data-calendar-instance]").fullCalendar("refetchEvents"),void a.destroy();console.warn(e.error)}}),!1})),$("a.delete-event",a.elements.content).click((function(){var t=$(this).attr("href"),r=$(this).data("id");return confirm(Craft.t("calendar","Are you sure you want to delete this event?"))&&$.ajax({url:t,type:"post",dataType:"json",data:n({eventId:r},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(t){if(!t.error)return $("*[data-calendar-instance]").fullCalendar("removeEvents",e.id),void a.destroy();console.warn(t.error)}}),!1}))}}})}},l=function(e){return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds())}},10:function(e,t,a){"use strict";a.r(t);var n=a(0);document.querySelectorAll("*[data-mini-cal]").forEach((function(e){var t=(e=$(e)).data(),a=t.overlapThreshold,i=void 0===a?5:a,o=t.firstDayOfWeek,d=void 0===o?0:o,l=t.locale,c=void 0===l?"en":l,s=t.currentDay,u=void 0===s?new moment:s;e.fullCalendar({now:new moment,defaultDate:u,defaultView:"month",nextDayThreshold:"0"+i+":00:01",fixedWeekCount:!1,eventLimit:1,firstDay:d,lang:c,height:"auto",columnFormat:"dd",viewRender:r,windowResize:r,eventClick:n.eventClick,dayClick:function(e){window.location.href=Craft.getCpUrl("calendar/view/day/"+e.format("YYYY/MM/DD"))},events:function(t,a){var n,r,i;$.ajax({url:Craft.getCpUrl("calendar/month"),data:(n={rangeStart:t.toISOString(),rangeEnd:a.toISOString(),nonEditable:!0,calendars:e.data("calendars"),siteId:e.data("siteId")},r=Craft.csrfTokenName,i=Craft.csrfTokenValue,r in n?Object.defineProperty(n,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[r]=i,n),type:"post",dataType:"json",success:function(e){$(".fc-content-skeleton .fc-day-top.fc-has-event").removeClass("fc-has-event");for(var t=0;t<e.length;t++)for(var a=e[t],n=moment(a.start).utc(),r=moment(a.end).utc();n.isBefore(r);)$(".fc-content-skeleton .fc-day-top[data-date="+n.utc().format("YYYY-MM-DD")+"]").addClass("fc-has-event"),n.add(1,"days")}})},header:{left:"prev",center:"title",right:"next"}})}));var r=function(e,t){var a=$(".fc-content-skeleton",t);$(".fc-day-number",t).css({textAlign:"center",padding:0,minHeight:a.height()+"px",lineHeight:a.height()+"px"})}}});