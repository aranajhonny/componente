!function(t,n,s){var o=function(t,o){"use strict";var i=function(n,s){this.CLASS&&"ColVis"==this.CLASS||alert("Warning: ColVis must be initialised with the keyword 'new'"),"undefined"==typeof s&&(s={});var o=t.fn.dataTable.camelToHungarian;return o&&(o(i.defaults,i.defaults,!0),o(i.defaults,s)),this.s={dt:null,oInit:s,hidden:!0,abOriginal:[]},this.dom={wrapper:null,button:null,collection:null,background:null,catcher:null,buttons:[],groupButtons:[],restore:null},i.aInstances.push(this),this.s.dt=t.fn.dataTable.Api?new t.fn.dataTable.Api(n).settings()[0]:n,this._fnConstruct(s),this};return i.prototype={button:function(){return this.dom.wrapper},fnRebuild:function(){this.rebuild()},rebuild:function(){for(var t=this.dom.buttons.length-1;t>=0;t--)this.dom.collection.removeChild(this.dom.buttons[t]);this.dom.buttons.splice(0,this.dom.buttons.length),this.dom.groupButtons.splice(0,this.dom.groupButtons.length),this.dom.restore&&this.dom.restore.parentNode(this.dom.restore),this._fnAddGroups(),this._fnAddButtons(),this._fnDrawCallback()},_fnConstruct:function(s){this._fnApplyCustomisation(s);var o,i,e=this;for(this.dom.wrapper=n.createElement("div"),this.dom.wrapper.className="ColVis",this.dom.button=t("<button />",{"class":this.s.dt.bJUI?"ColVis_Button ColVis_MasterButton ui-button ui-state-default":"ColVis_Button ColVis_MasterButton"}).append("<span>"+this.s.buttonText+"</span>").bind("mouseover"==this.s.activate?"mouseover":"click",function(t){t.preventDefault(),e._fnCollectionShow()}).appendTo(this.dom.wrapper)[0],this.dom.catcher=this._fnDomCatcher(),this.dom.collection=this._fnDomCollection(),this.dom.background=this._fnDomBackground(),this._fnAddGroups(),this._fnAddButtons(),o=0,i=this.s.dt.aoColumns.length;o<i;o++)this.s.abOriginal.push(this.s.dt.aoColumns[o].bVisible);this.s.dt.aoDrawCallback.push({fn:function(){e._fnDrawCallback.call(e)},sName:"ColVis"}),t(this.s.dt.oInstance).bind("column-reorder.dt",function(t,n,s){for(o=0,i=e.s.aiExclude.length;o<i;o++)e.s.aiExclude[o]=s.aiInvertMapping[e.s.aiExclude[o]];var a=e.s.abOriginal.splice(s.iFrom,1)[0];e.s.abOriginal.splice(s.iTo,0,a),e.fnRebuild()}),t(this.s.dt.oInstance).bind("destroy.dt",function(){t(e.dom.wrapper).remove()}),this._fnDrawCallback()},_fnApplyCustomisation:function(n){t.extend(!0,this.s,i.defaults,n),!this.s.showAll&&this.s.bShowAll&&(this.s.showAll=this.s.sShowAll),!this.s.restore&&this.s.bRestore&&(this.s.restore=this.s.sRestore);var s=this.s.groups,o=this.s.aoGroups;if(s)for(var e=0,a=s.length;e<a;e++)s[e].title&&(o[e].sTitle=s[e].title),s[e].columns&&(o[e].aiColumns=s[e].columns)},_fnDrawCallback:function(){for(var n,o=this.s.dt.aoColumns,i=this.dom.buttons,e=this.s.aoGroups,a=0,l=i.length;a<l;a++)n=i[a],n.__columnIdx!==s&&t("input",n).prop("checked",o[n.__columnIdx].bVisible);for(var u=function(t){for(var n=0,s=t.length;n<s;n++)if(o[t[n]].bVisible===!1)return!1;return!0},r=function(t){for(var n=0,s=t.length;n<s;n++)if(o[t[n]].bVisible===!0)return!1;return!0},d=0,h=e.length;d<h;d++)u(e[d].aiColumns)?(t("input",this.dom.groupButtons[d]).prop("checked",!0),t("input",this.dom.groupButtons[d]).prop("indeterminate",!1)):r(e[d].aiColumns)?(t("input",this.dom.groupButtons[d]).prop("checked",!1),t("input",this.dom.groupButtons[d]).prop("indeterminate",!1)):t("input",this.dom.groupButtons[d]).prop("indeterminate",!0)},_fnAddGroups:function(){var t;if("undefined"!=typeof this.s.aoGroups)for(var n=0,s=this.s.aoGroups.length;n<s;n++)t=this._fnDomGroupButton(n),this.dom.groupButtons.push(t),this.dom.buttons.push(t),this.dom.collection.appendChild(t)},_fnAddButtons:function(){var n,s=this.s.dt.aoColumns;if(t.inArray("all",this.s.aiExclude)===-1)for(var o=0,i=s.length;o<i;o++)t.inArray(o,this.s.aiExclude)===-1&&(n=this._fnDomColumnButton(o),n.__columnIdx=o,this.dom.buttons.push(n));"alpha"===this.s.order&&this.dom.buttons.sort(function(t,n){var o=s[t.__columnIdx].sTitle,i=s[n.__columnIdx].sTitle;return o===i?0:o<i?-1:1}),this.s.restore&&(n=this._fnDomRestoreButton(),n.className+=" ColVis_Restore",this.dom.buttons.push(n)),this.s.showAll&&(n=this._fnDomShowXButton(this.s.showAll,!0),n.className+=" ColVis_ShowAll",this.dom.buttons.push(n)),this.s.showNone&&(n=this._fnDomShowXButton(this.s.showNone,!1),n.className+=" ColVis_ShowNone",this.dom.buttons.push(n)),t(this.dom.collection).append(this.dom.buttons)},_fnDomRestoreButton:function(){var n=this,s=this.s.dt;return t('<li class="ColVis_Special '+(s.bJUI?"ui-button ui-state-default":"")+'">'+this.s.restore+"</li>").click(function(t){for(var s=0,o=n.s.abOriginal.length;s<o;s++)n.s.dt.oInstance.fnSetColumnVis(s,n.s.abOriginal[s],!1);n._fnAdjustOpenRows(),n.s.dt.oInstance.fnAdjustColumnSizing(!1),n.s.dt.oInstance.fnDraw(!1)})[0]},_fnDomShowXButton:function(n,s){var o=this,i=this.s.dt;return t('<li class="ColVis_Special '+(i.bJUI?"ui-button ui-state-default":"")+'">'+n+"</li>").click(function(t){for(var n=0,i=o.s.abOriginal.length;n<i;n++)o.s.aiExclude.indexOf(n)===-1&&o.s.dt.oInstance.fnSetColumnVis(n,s,!1);o._fnAdjustOpenRows(),o.s.dt.oInstance.fnAdjustColumnSizing(!1),o.s.dt.oInstance.fnDraw(!1)})[0]},_fnDomGroupButton:function(n){var s=this,o=this.s.dt,i=this.s.aoGroups[n];return t('<li class="ColVis_Special '+(o.bJUI?"ui-button ui-state-default":"")+'"><label><input type="checkbox" /><span>'+i.sTitle+"</span></label></li>").click(function(n){var o=!t("input",this).is(":checked");"li"!==n.target.nodeName.toLowerCase()&&(o=!o);for(var e=0;e<i.aiColumns.length;e++)s.s.dt.oInstance.fnSetColumnVis(i.aiColumns[e],o)})[0]},_fnDomColumnButton:function(n){var s=this,o=this.s.dt.aoColumns[n],i=this.s.dt,e=null===this.s.fnLabel?o.sTitle:this.s.fnLabel(n,o.sTitle,o.nTh);return t("<li "+(i.bJUI?'class="ui-button ui-state-default"':"")+'><label><input type="checkbox" /><span>'+e+"</span></label></li>").click(function(o){var e=!t("input",this).is(":checked");"li"!==o.target.nodeName.toLowerCase()&&("input"!=o.target.nodeName.toLowerCase()&&null!==s.s.fnStateChange||(e=!e));var a=t.fn.dataTableExt.iApiIndex;t.fn.dataTableExt.iApiIndex=s._fnDataTablesApiIndex.call(s),i.oFeatures.bServerSide?(s.s.dt.oInstance.fnSetColumnVis(n,e,!1),s.s.dt.oInstance.fnAdjustColumnSizing(!1),""===i.oScroll.sX&&""===i.oScroll.sY||s.s.dt.oInstance.oApi._fnScrollDraw(s.s.dt),s._fnDrawCallback()):s.s.dt.oInstance.fnSetColumnVis(n,e),t.fn.dataTableExt.iApiIndex=a,null!==s.s.fnStateChange&&("span"==o.target.nodeName.toLowerCase()&&o.preventDefault(),s.s.fnStateChange.call(s,n,e))})[0]},_fnDataTablesApiIndex:function(){for(var t=0,n=this.s.dt.oInstance.length;t<n;t++)if(this.s.dt.oInstance[t]==this.s.dt.nTable)return t;return 0},_fnDomCollection:function(){return t("<ul />",{"class":this.s.dt.bJUI?"ColVis_collection ui-buttonset ui-buttonset-multi":"ColVis_collection"}).css({display:"none",opacity:0,position:this.s.bCssPosition?"":"absolute"})[0]},_fnDomCatcher:function(){var s=this,o=n.createElement("div");return o.className="ColVis_catcher",t(o).click(function(){s._fnCollectionHide.call(s,null,null)}),o},_fnDomBackground:function(){var n=this,s=t("<div></div>").addClass("ColVis_collectionBackground").css("opacity",0).click(function(){n._fnCollectionHide.call(n,null,null)});return"mouseover"==this.s.activate&&s.mouseover(function(){n.s.overcollection=!1,n._fnCollectionHide.call(n,null,null)}),s[0]},_fnCollectionShow:function(){var s,o=this,i=t(this.dom.button).offset(),e=this.dom.collection,a=this.dom.background,l=parseInt(i.left,10),u=parseInt(i.top+t(this.dom.button).outerHeight(),10);this.s.bCssPosition||(e.style.top=u+"px",e.style.left=l+"px"),t(e).css({display:"block",opacity:0}),a.style.bottom="0px",a.style.right="0px";var r=this.dom.catcher.style;if(r.height=t(this.dom.button).outerHeight()+"px",r.width=t(this.dom.button).outerWidth()+"px",r.top=i.top+"px",r.left=l+"px",n.body.appendChild(a),n.body.appendChild(e),n.body.appendChild(this.dom.catcher),t(e).animate({opacity:1},o.s.iOverlayFade),t(a).animate({opacity:.1},o.s.iOverlayFade,"linear",function(){t.browser&&t.browser.msie&&"6.0"==t.browser.version&&o._fnDrawCallback()}),!this.s.bCssPosition){s="left"==this.s.sAlign?l:l-t(e).outerWidth()+t(this.dom.button).outerWidth(),e.style.left=s+"px";var d=t(e).outerWidth(),h=(t(e).outerHeight(),t(n).width());s+d>h&&(e.style.left=h-d+"px")}this.s.hidden=!1},_fnCollectionHide:function(){var s=this;this.s.hidden||null===this.dom.collection||(this.s.hidden=!0,t(this.dom.collection).animate({opacity:0},s.s.iOverlayFade,function(t){this.style.display="none"}),t(this.dom.background).animate({opacity:0},s.s.iOverlayFade,function(t){n.body.removeChild(s.dom.background),n.body.removeChild(s.dom.catcher)}))},_fnAdjustOpenRows:function(){for(var t=this.s.dt.aoOpenRows,n=this.s.dt.oApi._fnVisbleColumns(this.s.dt),s=0,o=t.length;s<o;s++)t[s].nTr.getElementsByTagName("td")[0].colSpan=n}},i.fnRebuild=function(n){var s=null;"undefined"!=typeof n&&(s=t.fn.dataTable.Api?new t.fn.dataTable.Api(n).table().node():n.fnSettings().nTable);for(var o=0,e=i.aInstances.length;o<e;o++)"undefined"!=typeof n&&s!=i.aInstances[o].s.dt.nTable||i.aInstances[o].fnRebuild()},i.defaults={active:"click",buttonText:"Show / hide columns",aiExclude:[],bRestore:!1,sRestore:"Restore original",bShowAll:!1,sShowAll:"Show All",sAlign:"left",fnStateChange:null,iOverlayFade:500,fnLabel:null,bCssPosition:!1,aoGroups:[],order:"column"},i.aInstances=[],i.prototype.CLASS="ColVis",i.VERSION="1.1.2",i.prototype.VERSION=i.VERSION,"function"==typeof t.fn.dataTable&&"function"==typeof t.fn.dataTableExt.fnVersionCheck&&t.fn.dataTableExt.fnVersionCheck("1.7.0")?t.fn.dataTableExt.aoFeatures.push({fnInit:function(t){var n=t.oInit,s=new i(t,n.colVis||n.oColVis||{});return s.button()},cFeature:"C",sFeature:"ColVis"}):alert("Warning: ColVis requires DataTables 1.7 or greater - www.datatables.net/download"),t.fn.dataTable.ColVis=i,t.fn.DataTable.ColVis=i,i};"function"==typeof define&&define.amd?define(["jquery","datatables"],o):"object"==typeof exports?o(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.ColVis&&o(jQuery,jQuery.fn.dataTable)}(window,document);