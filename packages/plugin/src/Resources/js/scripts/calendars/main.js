!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=3)}([function(e,t,a){"use strict";a.r(t),a.d(t,"renderEvent",(function(){return d})),a.d(t,"today",(function(){return c})),a.d(t,"renderDay",(function(){return s})),a.d(t,"renderView",(function(){return u})),a.d(t,"eventRepositioned",(function(){return f})),a.d(t,"eventDateChange",(function(){return p})),a.d(t,"eventDurationChange",(function(){return v})),a.d(t,"eventClick",(function(){return m})),a.d(t,"getDayViewLink",(function(){return h})),a.d(t,"getEvents",(function(){return y})),a.d(t,"closeAllQTips",(function(){return g})),a.d(t,"enableQTips",(function(){return C})),a.d(t,"getSpinner",(function(){return b}));var n=a(1);function r(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return i(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var l=$("#solspace-calendar"),o=null,d=function(e,t){if(e.allDay&&t.addClass("fc-event-all-day"),e.end){if(e.multiDay||e.allDay)t.addClass("fc-event-multi-day");else{t.addClass("fc-event-single-day");var a=$("<span />").addClass("fc-color-icon").css("background-color",e.backgroundColor).css("border-color",e.borderColor);$(".fc-content",t).prepend(a)}e.enabled||t.addClass("fc-event-disabled"),t.addClass("fc-color-"+e.textColor);var r=l.data(),i=r.timeFormat,o=r.isMultiSite;Object(n.buildEventPopup)(e,t,i,void 0!==o)}},c=new moment,s=function(e,t){var a=t.parents(".fc-bg:first").siblings(".fc-content-skeleton").find("thead > tr > td:eq("+t.index()+")"),n=h(e),r=$("<a />").attr("href",n).html(a.html());a.html(r)},u=function(e,t){var a=t.parents("#solspace-calendar"),n=new moment(a.data("current-day"));"agendaWeek"===e.name&&$(".fc-day-header.fc-widget-header",t).each((function(){var e=$(this).html(),t=e.split(" ");e=t[0]+" <span>"+t[1]+"</span>";var a=new moment($(this).data("date")),r=h(a),i=$("<a />").attr("href",r).html(e);n.format("YYYYMMDD")===a.format("YYYYMMDD")&&i.addClass("fc-title-today"),$(this).html(i)}));$(".fc-localeButton-button",l).addClass("menubtn btn"),"agendaDay"===e.name&&$("thead.fc-head",t).remove()},f=function(e,t,a,n){var r,i,l;$.ajax({url:Craft.getCpUrl("calendar/events/api/modify-"+e),type:"post",dataType:"json",data:(r={eventId:t.id,siteId:t.site.id,isAllDay:t.allDay,startDate:t.start.toISOString(),endDate:t.end?t.end.toISOString():null,deltaSeconds:a.as("seconds")},i=Craft.csrfTokenName,l=Craft.csrfTokenValue,i in r?Object.defineProperty(r,i,{value:l,enumerable:!0,configurable:!0,writable:!0}):r[i]=l,r),success:function(e){e.error?n():t.repeats&&$calendar.fullCalendar("refetchEvents")},error:function(){n()}})},p=function(e,t,a){f("date",e,t,a)},v=function(e,t,a){f("duration",e,t,a)},m=function(e){window.location.href=Craft.getCpUrl("calendar/events/"+e.id+"/"+e.site.handle)},h=function(e){if(e.isValid()){var t=e.format("YYYY"),a=e.format("MM"),n=e.format("DD");return Craft.getCpUrl("calendar/view/day/"+t+"/"+a+"/"+n)}return""},y=function(e,t,a,n){b().fadeIn("fast");var i=$("ul.calendar-list"),l="*";i.length&&(l=$("input:checked",i).map((function(){return $(this).val()})).get().join());var o=$("#solspace-calendar").data().currentSiteId,d=$("form.calendar-filters"),c=[].concat(r(d.serializeArray()),[{name:"rangeStart",value:e.toISOString()},{name:"rangeEnd",value:t.toISOString()},{name:"calendars",value:l},{name:"siteId",value:o},{name:[Craft.csrfTokenName],value:Craft.csrfTokenValue}]);$.ajax({url:Craft.getCpUrl("calendar/month"),data:$.param(c),type:"post",dataType:"json",success:function(e){for(var t=0;t<e.length;t++){var a=e[t];a.allDay&&(e[t].end=moment(a.end).add(2,"s").utc().format())}n(e),b().fadeOut("fast")}})},g=function(){window.qTipsEnabled=!1,$("div.qtip:visible").qtip("hide")},C=function(){window.qTipsEnabled=!0},b=function(){return o||(l.find(".fc-right").prepend('<div id="solspace-calendar-spinner" class="spinner" style="display: none;"></div>'),o=$("#solspace-calendar-spinner")),o}},function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.r(t),a.d(t,"showEventCreator",(function(){return l})),a.d(t,"buildEventPopup",(function(){return o})),a.d(t,"createDateAsUTC",(function(){return d}));var r=!1,i=$("#solspace-calendar"),l=function(e,t){r||(r=!0,$("<div />").qtip({content:{text:$("#event-creator"),title:Craft.t("calendar","New Event")},position:{my:"center",at:"center",target:$(window)},show:{ready:!0,modal:{on:!0,blur:!0}},hide:!1,style:{classes:"qtip-bootstrap dialogue",width:500},events:{render:function(a,r){var l=r.elements.content,o=i.data().currentSiteId;$("ul.errors",l).empty();var c=e.utc().format("HHmmss"),s=t.utc().format("HHmmss"),u=!1;c===s&&"000000"===s&&(t.subtract(1,"seconds"),u=!0);var f=d(e.toDate()),p=d(t.toDate()),v=$("#event-creator"),m=$('input[name="startDate[date]"]',v),h=$('input[name="startDate[time]"]',v),y=$('input[name="endDate[date]"]',v),g=$('input[name="endDate[time]"]',v);v.addClass("shown"),m.datepicker("setDate",f),y.datepicker("setDate",p),h.timepicker("setTime",f),g.timepicker("setTime",p);var C=$("input[name=allDay]"),b=C.parents(".lightswitch:first");$("input",b).val(u?1:""),u?(b.data("lightswitch").turnOn(),$(".timewrapper",v).hide()):(b.data("lightswitch").turnOff(),$(".timewrapper",v).show()),setTimeout((function(){$("input[name=title]:first",l).val("").focus().bind("keypress",(function(e){13===(e.which?e.which:e.keyCode)&&$("button.submit",l).trigger("click")}))}),100);var w=h.timepicker("option","timeFormat").replace("h","hh").replace("H","HH").replace("G","H").replace("g","h").replace("A","a").replace("i","mm");$("button.submit",l).unbind("click").click((function(e){var t=$(this),a=$("input[name=title]",l).val(),i=$("select[name=calendarId]",l).val(),d=moment(m.datepicker("getDate")),c=moment(h.val().replace(/(a|p)\.(m)\./gi,"$1$2"),w),s=moment(y.datepicker("getDate")),u=moment(g.val().replace(/(a|p)\.(m)\./gi,"$1$2"),w);t.prop("disabled",!0).addClass("disabled"),t.text(Craft.t("app","Saving...")),$.ajax({url:Craft.getCpUrl("calendar/events/api/create"),type:"post",dataType:"json",data:n({siteId:o,startDate:d.format("YYYY-MM-DD")+" "+c.format("HH:mm:ss"),endDate:s.format("YYYY-MM-DD")+" "+u.format("HH:mm:ss"),allDay:C.val(),event:{title:a,calendarId:i}},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(t){if(t.error)$("ul.errors",l).empty().append($("<li />",{text:t.error}));else if(t.event){var a=t.event;a.allDay&&(a.end=moment(a.end).add(2,"s").utc().format()),$("*[data-calendar-instance]").fullCalendar("renderEvent",a),$("*[data-calendar-instance]").fullCalendar("unselect"),r.hide(e)}},error:function(e){var t=e.responseJSON;Craft.cp.displayNotification("error",t.error)},complete:function(){t.prop("disabled",!1).removeClass("disabled"),t.text(Craft.t("app","Save"))}})})),$("button.delete",l).unbind("click").click((function(){r.hide()}))},hide:function(e,t){$("#event-creator").removeClass("shown").insertAfter($("#solspace-calendar")),$("*[data-calendar-instance]").fullCalendar("unselect"),r=!1,t.destroy()}}}))},o=function(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(e.calendar){var i=$("<div>",{class:"buttons"}),l=$("<div>"),o=$("<div>",{class:"calendar-data",html:'<span class="color-indicator" style="background-color: '+e.backgroundColor+';"></span> '+e.calendar.name}),d=moment(e.start),c=moment(e.end),s="dddd, MMMM D, YYYY";e.allDay?c.subtract(1,"days"):s=s+" [at] "+a;var u=$("<div>",{class:"event-date-range separator",html:'<div style="white-space: nowrap;"><label>'+Craft.t("calendar","Starts")+":</label> "+d.format(s)+'</div><div style="white-space: nowrap;"><label>'+Craft.t("calendar","Ends")+":</label> "+c.format(s)+"</div>"}),f="";e.repeats&&(f=$("<div>",{class:"event-repeats separator",html:'<div id="solspace-calendar-spinner" class="spinner"></div>'})),e.editable&&(i.append($("<a>",{class:"btn small submit",href:Craft.getCpUrl("calendar/events/"+e.id+(r?"/"+e.site.handle:"")),text:Craft.t("calendar","Edit")})),i.append($("<a>",{class:"btn small delete-event",href:Craft.getCpUrl("calendar/events/api/delete"),text:Craft.t("calendar","Delete"),data:{id:e.id}})),e.repeats&&i.append($("<a>",{class:"btn small delete-event-occurrence",href:Craft.getCpUrl("calendar/events/api/delete-occurrence"),text:Craft.t("calendar","Delete occurrence"),data:{id:e.id,date:e.start.toISOString()}}))),t.qtip({content:{title:e.title,button:!0,text:l.add(o).add(u).add(f).add(i)},style:{classes:"qtip-bootstrap qtip-event",tip:{width:30,height:15}},position:{my:"right center",at:"left center",adjust:{method:"shift flip"}},show:{solo:!0,delay:500},hide:{fixed:!0,delay:300},events:{show:function(t){window.qTipsEnabled||t.preventDefault(),e.repeats&&$.ajax({cache:!1,url:Craft.getCpUrl("calendar/events/api/first-occurrence-date"),type:"post",dataType:"json",data:n({eventId:e.id},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(e){e.success&&e.event&&e.event.hasOwnProperty("readableRepeatRule")&&$(".event-repeats").html("<label>"+Craft.t("calendar","Repeats")+":</label> "+e.event.readableRepeatRule)}})},render:function(t,a){$("a.delete-event-occurrence",a.elements.content).click((function(){var e=$(this).attr("href"),t=$(this).data("id"),r=$(this).data("date");return confirm(Craft.t("calendar","Are you sure?"))&&$.ajax({url:e,type:"post",dataType:"json",data:n({eventId:t,date:r},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(e){if(!e.error)return $("*[data-calendar-instance]").fullCalendar("refetchEvents"),void a.destroy();console.warn(e.error)}}),!1})),$("a.delete-event",a.elements.content).click((function(){var t=$(this).attr("href"),r=$(this).data("id");return confirm(Craft.t("calendar","Are you sure you want to delete this event?"))&&$.ajax({url:t,type:"post",dataType:"json",data:n({eventId:r},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(t){if(!t.error)return $("*[data-calendar-instance]").fullCalendar("removeEvents",e.id),void a.destroy();console.warn(t.error)}}),!1}))}}})}},d=function(e){return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds())}},,function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(1);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==a)return;var n,r,i=[],l=!0,o=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){o=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(o)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return l(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}window.qTipsEnabled=!0;var o=$("#solspace-calendar"),d=$("#calendar-mini-cal");$((function(){var e=o.data(),t=e.currentDay,a=e.siteMap,l=e.overlapThreshold,c=e.language,s=e.firstDayOfWeek,u=e.timeFormat,f=o.data(),p=f.currentSiteId,v=f.canEditEvents,m=f.canQuickCreate,h=f.isMultiSite;v=void 0!==v,m=void 0!==m,h=void 0!==h;var y={week:{titleFormat:"MMMM D, YYYY",columnFormat:"ddd D",timeFormat:u,slotLabelFormat:u},day:{titleFormat:"dddd, MMMM D, YYYY",columnFormat:"",timeFormat:u,slotLabelFormat:u}},g={datepicker:{text:Craft.t("calendar","Pick a Date"),icon:"calendar",click:function(){var e=$(".fc-datepicker-button:first"),t=e.offset(),a=t.top,n=t.left,r=e.outerHeight();e.datepicker("dialog",o.fullCalendar("getDate").format("YYYY-MM-DD"),(function(e){var t=o.fullCalendar("getView").type,a=i(/^(\d{4})-(\d{2})-(\d{2})$/.exec(e),4),n=(a[0],a[1]),r=a[2],l=a[3],d="month";switch(t){case"agendaDay":d="day";break;case"agendaWeek":d="week"}var c=Craft.getCpUrl("calendar/view/"+d+"/"+n+"/"+r+"/"+l);history.pushState("data","",c),o.fullCalendar("gotoDate",e)}),{dateFormat:"yy-mm-dd"},[n,a+r]),$("#ui-datepicker-div.ui-datepicker-dialog + input[id^=dp]").css({visibility:"hidden"})}},refresh:{text:Craft.t("calendar","Refresh"),click:function(){o.fullCalendar("refetchEvents")}},Today:{text:Craft.t("calendar","Today"),click:function(){o.fullCalendar("today")}}};h&&(g.siteButton={text:a[p],click:function(e){var t=$(".fc-siteButton-button",o);if(void 0===t.data("initialized")){var n=$("<div>",{class:"menu"}).insertAfter(e.currentTarget),r=$("<ul>").appendTo(n);for(var i in a)a.hasOwnProperty(i)&&$("<li>").append($("<a>",{"data-site-id":i,text:a[i]})).appendTo(r);new Garnish.MenuBtn(e.currentTarget,{onOptionSelect:function(e){var n=$(e).data("site-id");o.data("current-site-id",n),t.text(a[n]),o.fullCalendar("refetchEvents")}}).showMenu(),t.data("initialized",!0)}}}),o.fullCalendar({now:new moment,defaultDate:t,defaultView:o.data("view"),nextDayThreshold:"0"+l+":00:01",fixedWeekCount:!0,eventLimit:5,aspectRatio:1.3,editable:v,lang:c,views:y,firstDay:s,viewRender:n.renderView,events:n.getEvents,eventRender:n.renderEvent,dayRender:n.renderDay,eventDragStart:n.closeAllQTips,eventDragStop:n.enableQTips,eventDrop:n.eventDateChange,eventResizeStart:n.closeAllQTips,eventResizeStop:n.enableQTips,eventResize:n.eventDurationChange,selectable:m&&v,selectHelper:m&&v,select:r.showEventCreator,unselectAuto:!1,customButtons:g,timeFormat:u.replace("h:mm a","h(:mm)t"),header:{right:"siteButton refresh datepicker prev,Today,next",left:"title"}}),"month"!==o.fullCalendar("getView").name&&o.fullCalendar("option","height","auto"),$(".fc-next-button, .fc-prev-button, .fc-today-button",o).on({click:function(){var e=o.fullCalendar("getView").type,t=o.fullCalendar("getDate"),a=t.format("YYYY"),n=t.format("MM"),r=t.format("DD"),i="month";switch(e){case"agendaDay":i="day";break;case"agendaWeek":i="week"}var l=Craft.getCpUrl("calendar/view/"+i+"/"+a+"/"+n+"/"+r);history.pushState("data","",l)}}),$(".alert-dismissible a.close").on({click:function(){var e=$(this).parents(".alert:first");Craft.postActionRequest("calendar/view/dismiss-demo-alert",{},(function(){e.remove()}))}}),$(".calendar-list input").on({change:function(){var e={};$("ul.calendar-list input").map((function(){e[$(this).val()]=$(this).is(":checked")})).get().join(),localStorage.setItem("calendar-selectedCalendars",JSON.stringify(e));var t=[];for(var a in e)e.hasOwnProperty(a)&&e[a]&&t.push(a);d.data("calendars",t.join(",")),d.fullCalendar("refetchEvents"),o.fullCalendar("refetchEvents")}}),$(".calendar-filters").on({change:function(){d.fullCalendar("refetchEvents"),o.fullCalendar("refetchEvents")}});var C=$("#event-creator");$(".lightswitch",C).on({change:function(){var e=$(".timewrapper",C);$("input",this).val()?e.fadeOut("fast"):e.fadeIn("fast")}})}));var c=localStorage.getItem("calendar-selectedCalendars");if(null!==c){var s=[],u=$("ul.calendar-list input").map((function(){return parseInt($(this).val())})).get(),f={};"{"===c.substring(0,1)&&(f=JSON.parse(c));for(var p=0;p<u.length;p++){var v=u[p];void 0===f[v]?(f[v]=!0,s.push(v)):!0===f[v]&&s.push(v)}d.data("calendars",s.join(",")),d.hasClass("fc")&&d.fullCalendar("refetchEvents"),$(".calendar-list input").each((function(){var e=$(this).val(),t=void 0===f[e]||!0===f[e];$(this).prop("checked",t)}))}}]);