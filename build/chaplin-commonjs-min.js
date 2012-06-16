// Generated by CoffeeScript 1.3.3
/*
Chaplin 1.0.0-pre.

Chaplin may be freely distributed under the MIT license.
For all details and documentation:
http://github.com/chaplinjs/chaplin
*/(function(){"use strict";var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t},n=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1},r=function(e,t){return function(){return e.apply(t,arguments)}},i=[].slice;require.define({jquery:function(e,t,n){return n.exports=$},underscore:function(e,t,n){return n.exports=_},backbone:function(e,t,n){return n.exports=Backbone}}),require.define({"chaplin/application":function(e,t,n){var r,i,s,o,u;return u=t("chaplin/mediator"),i=t("chaplin/dispatcher"),s=t("chaplin/views/layout"),o=t("chaplin/lib/router"),n.exports=r=function(){function e(){}return e.prototype.title="",e.prototype.dispatcher=null,e.prototype.layout=null,e.prototype.router=null,e.prototype.initialize=function(){},e.prototype.initDispatcher=function(e){return this.dispatcher=new i(e)},e.prototype.initLayout=function(e){var t;return e==null&&(e={}),(t=e.title)==null&&(e.title=this.title),this.layout=new s(e)},e.prototype.initRouter=function(e,t){return this.router=new o(t),typeof e=="function"&&e(this.router.match),this.router.startHistory()},e.prototype.disposed=!1,e.prototype.dispose=function(){var e,t,n,r;if(this.disposed)return;t=["dispatcher","layout","router"];for(n=0,r=t.length;n<r;n++)e=t[n],this[e].dispose(),delete this[e];return this.disposed=!0,typeof Object.freeze=="function"?Object.freeze(this):void 0},e}()}}),require.define({"chaplin/mediator":function(e,t,n){var r,i,s,o,u;return u=t("underscore"),r=t("backbone"),s=t("chaplin/lib/support"),o=t("chaplin/lib/utils"),i={},i.subscribe=i.on=r.Events.on,i.unsubscribe=i.off=r.Events.off,i.publish=i.trigger=r.Events.trigger,i._callbacks=null,o.readonly(i,"subscribe","unsubscribe","publish","on","off","trigger"),i.seal=function(){if(s.propertyDescriptors&&Object.seal)return Object.seal(i)},o.readonly(i,"seal"),n.exports=i}}),require.define({"chaplin/dispatcher":function(e,t,n){var r,i,s,o,u;return u=t("underscore"),s=t("chaplin/mediator"),o=t("chaplin/lib/utils"),i=t("chaplin/lib/subscriber"),n.exports=r=function(){function e(){this.initialize.apply(this,arguments)}return u(e.prototype).extend(i),e.prototype.previousControllerName=null,e.prototype.currentControllerName=null,e.prototype.currentController=null,e.prototype.currentAction=null,e.prototype.currentParams=null,e.prototype.url=null,e.prototype.initialize=function(e){return e==null&&(e={}),this.settings=u(e).defaults({controllerPath:"controllers/",controllerSuffix:"_controller"}),this.subscribeEvent("matchRoute",this.matchRoute),this.subscribeEvent("!startupController",this.startupController)},e.prototype.matchRoute=function(e,t){return this.startupController(e.controller,e.action,t)},e.prototype.startupController=function(e,t,n){var r,i;t==null&&(t="index"),n==null&&(n={}),n.changeURL!==!1&&(n.changeURL=!0),n.forceStartup!==!0&&(n.forceStartup=!1),i=!n.forceStartup&&this.currentControllerName===e&&this.currentAction===t&&(!this.currentParams||u(n).isEqual(this.currentParams));if(i)return;return r=u(this.controllerLoaded).bind(this,e,t,n),this.loadController(e,r)},e.prototype.loadController=function(e,n){var r,i;return r=o.underscorize(e)+this.settings.controllerSuffix,i=this.settings.controllerPath+r,(typeof define!="undefined"&&define!==null?define.amd:void 0)?t([i],n):n(t(i))},e.prototype.controllerLoaded=function(e,t,n,r){var i,o,u;return u=this.currentControllerName||null,o=this.currentController||null,o&&(s.publish("beforeControllerDispose",o),o.dispose(n,e)),i=new r(n,u),i[t](n,u),this.previousControllerName=u,this.currentControllerName=e,this.currentController=i,this.currentAction=t,this.currentParams=n,this.adjustURL(i,n),s.publish("startupController",{previousControllerName:this.previousControllerName,controller:this.currentController,controllerName:this.currentControllerName,params:this.currentParams})},e.prototype.adjustURL=function(e,t){var n;if(t.path)n=t.path;else if(typeof e.historyURL=="function")n=e.historyURL(t);else{if(typeof e.historyURL!="string")throw new Error("Dispatcher#adjustURL: controller for "+(""+this.currentControllerName+" does not provide a historyURL"));n=e.historyURL}return t.changeURL&&s.publish("!router:changeURL",n),this.url=n},e.prototype.disposed=!1,e.prototype.dispose=function(){if(this.disposed)return;return this.unsubscribeAllEvents(),this.disposed=!0,typeof Object.freeze=="function"?Object.freeze(this):void 0},e}()}}),require.define({"chaplin/controllers/controller":function(t,n,r){var i,s,o;return o=n("underscore"),s=n("chaplin/lib/subscriber"),r.exports=i=function(){function t(){this.initialize.apply(this,arguments)}return o(t.prototype).extend(s),t.prototype.view=null,t.prototype.currentId=null,t.prototype.initialize=function(){},t.prototype.disposed=!1,t.prototype.dispose=function(){var t,n,r,i,s;if(this.disposed)return;for(n in this){if(!e.call(this,n))continue;t=this[n],t&&typeof t.dispose=="function"&&(t.dispose(),delete this[n])}this.unsubscribeAllEvents(),r=["currentId"];for(i=0,s=r.length;i<s;i++)n=r[i],delete this[n];return this.disposed=!0,typeof Object.freeze=="function"?Object.freeze(this):void 0},t}()}}),require.define({"chaplin/models/collection":function(e,n,r){var i,s,o,u,a,f;return f=n("underscore"),i=n("backbone"),u=n("chaplin/lib/subscriber"),a=n("chaplin/lib/sync_machine"),o=n("chaplin/models/model"),r.exports=s=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),f(n.prototype).extend(u),n.prototype.model=o,n.prototype.initDeferred=function(){return f(this).extend($.Deferred())},n.prototype.initSyncMachine=function(){return f(this).extend(a)},n.prototype.addAtomic=function(e,t){var n,r;t==null&&(t={});if(!e.length)return;t.silent=!0,n=typeof t.at=="number"?"pop":"shift";while(r=e[n]())this.add(r,t);return this.trigger("reset")},n.prototype.update=function(e,t){var n,r,i,s,o,u,a,l,c,h;t==null&&(t={}),n=this.pluck("id").join(),i=f(e).pluck("id"),o=i.join();if(o!==n){l=f(i),r=this.models.length;while(r--)s=this.models[r],l.include(s.id)||this.remove(s)}if(o!==n||t.deep){h=[];for(r=a=0,c=e.length;a<c;r=++a)s=e[r],u=this.get(s.id),u?t.deep?h.push(u.set(s)):h.push(void 0):h.push(this.add(s,{at:r}));return h}},n.prototype.disposed=!1,n.prototype.dispose=function(){var e,t,n,r;if(this.disposed)return;this.trigger("dispose",this),this.reset([],{silent:!0}),this.unsubscribeAllEvents(),this.off(),typeof this.reject=="function"&&this.reject(),t=["model","models","_byId","_byCid","_callbacks"];for(n=0,r=t.length;n<r;n++)e=t[n],delete this[e];return this.disposed=!0,typeof Object.freeze=="function"?Object.freeze(this):void 0},n}(i.Collection)}}),require.define({"chaplin/models/model":function(e,r,i){var s,o,u,a,f,l;return l=r("underscore"),s=r("backbone"),f=r("chaplin/lib/utils"),u=r("chaplin/lib/subscriber"),a=r("chaplin/lib/sync_machine"),i.exports=o=function(e){function i(){return i.__super__.constructor.apply(this,arguments)}var r;return t(i,e),l(i.prototype).extend(u),i.prototype.initDeferred=function(){return l(this).extend($.Deferred())},i.prototype.initSyncMachine=function(){return l(this).extend(a)},i.prototype.getAttributes=function(){return this.attributes},r=function(e,t,o){var u,a,l,c;o?o.push(e):(u=f.beget(t),o=[e]);for(l in t)c=t[l],c instanceof i?(u==null&&(u=f.beget(t)),u[l]=c===e||n.call(o,c)>=0?null:r(c,c.getAttributes(),o)):c instanceof s.Collection&&(u==null&&(u=f.beget(t)),u[l]=function(){var e,t,n,i;n=c.models,i=[];for(e=0,t=n.length;e<t;e++)a=n[e],i.push(r(a,a.getAttributes(),o));return i}());return o.pop(),u||t},i.prototype.serialize=function(e){return r(this,this.getAttributes())},i.prototype.disposed=!1,i.prototype.dispose=function(){var e,t,n,r;if(this.disposed)return;this.trigger("dispose",this),this.unsubscribeAllEvents(),this.off(),typeof this.reject=="function"&&this.reject(),t=["collection","attributes","changed","_escapedAttributes","_previousAttributes","_silent","_pending","_callbacks"];for(n=0,r=t.length;n<r;n++)e=t[n],delete this[e];return this.disposed=!0,typeof Object.freeze=="function"?Object.freeze(this):void 0},i}(s.Model)}}),require.define({"chaplin/views/layout":function(e,t,n){var i,s,o,u,a,f,l;return i=t("jquery"),l=t("underscore"),s=t("backbone"),a=t("chaplin/mediator"),f=t("chaplin/lib/utils"),u=t("chaplin/lib/subscriber"),n.exports=o=function(){function e(){this.openLink=r(this.openLink,this),this.initialize.apply(this,arguments)}return l(e.prototype).extend(u),e.prototype.title="",e.prototype.events={},e.prototype.el=document,e.prototype.$el=i(document),e.prototype.cid="chaplin-layout",e.prototype.initialize=function(e){e==null&&(e={}),this.title=e.title,this.settings=l(e).defaults({routeLinks:!0,scrollTo:[0,0]}),this.subscribeEvent("beforeControllerDispose",this.hideOldView),this.subscribeEvent("startupController",this.showNewView),this.subscribeEvent("startupController",this.adjustTitle),this.delegateEvents();if(this.settings.routeLinks)return this.initLinkRouting()},e.prototype.undelegateEvents=s.View.prototype.undelegateEvents,e.prototype.delegateEvents=s.View.prototype.delegateEvents,e.prototype.hideOldView=function(e){var t;this.settings.scrollTo&&scrollTo(this.settings.scrollTo),t=e.view;if(t)return t.$el.css("display","none")},e.prototype.showNewView=function(e){var t;t=e.controller.view;if(t)return t.$el.css({display:"block",opacity:1,visibility:"visible"})},e.prototype.adjustTitle=function(e){var t,n;return n=this.title,t=e.controller.title,t&&(n=""+t+" – "+n),setTimeout(function(){return document.title=n},50)},e.prototype.initLinkRouting=function(){return i(document).on("click",".go-to",this.goToHandler).on("click","a",this.openLink)},e.prototype.stopLinkRouting=function(){return i(document).off("click",".go-to",this.goToHandler).off("click","a",this.openLink)},e.prototype.openLink=function(e){var t,n,r,s,o;if(f.modifierKeyPressed(e))return;n=e.currentTarget,s=n.getAttribute("href");if(s===null||s===""||s.charAt(0)==="#"||i(n).hasClass("noscript"))return;t=location.hostname.replace(".","\\."),r=!RegExp(""+t+"$","i").test(n.hostname);if(r)return;return o=n.pathname+n.search,o.charAt(0)!=="/"&&(o="/"+o),a.publish("!router:route",o,function(t){if(t)return e.preventDefault()})},e.prototype.goToHandler=function(e){var t,n;t=e.currentTarget;if(e.nodeName==="A")return;n=i(t).data("href");if(!n)return;return a.publish("!router:route",n,function(t){return t?e.preventDefault():location.href=n})},e.prototype.disposed=!1,e.prototype.dispose=function(){if(this.disposed)return;return this.stopLinkRouting(),this.unsubscribeAllEvents(),this.undelegateEvents(),delete this.title,this.disposed=!0,typeof Object.freeze=="function"?Object.freeze(this):void 0},e}()}}),require.define({"chaplin/views/view":function(e,n,r){var i,s,o,u,a,f,l;return i=n("jquery"),l=n("underscore"),s=n("backbone"),f=n("chaplin/lib/utils"),u=n("chaplin/lib/subscriber"),o=n("chaplin/models/model"),r.exports=a=function(e){function n(){this.initialize!==n.prototype.initialize&&this.wrapMethod("initialize"),this.render!==n.prototype.render?this.wrapMethod("render"):this.render=l(this.render).bind(this),n.__super__.constructor.apply(this,arguments)}return t(n,e),l(n.prototype).extend(u),n.prototype.autoRender=!1,n.prototype.container=null,n.prototype.containerMethod="append",n.prototype.subviews=null,n.prototype.subviewsByName=null,n.prototype.wrapMethod=function(e){var t,n;return n=this,t=n[e],n[""+e+"IsWrapped"]=!0,n[e]=function(){return this.disposed?!1:(t.apply(n,arguments),n["after"+f.upcase(e)].apply(n,arguments),n)}},n.prototype.initialize=function(e){var t,n,r,i;if(e){i=["autoRender","container","containerMethod"];for(n=0,r=i.length;n<r;n++)t=i[n],e[t]!=null&&(this[t]=e[t])}this.subviews=[],this.subviewsByName={},(this.model||this.collection)&&this.modelBind("dispose",this.dispose);if(!this.initializeIsWrapped)return this.afterInitialize()},n.prototype.afterInitialize=function(){if(this.autoRender)return this.render()},n.prototype.delegate=function(e,t,n){var r,i;if(typeof e!="string")throw new TypeError("View#delegate: first argument must be a string");if(arguments.length===2)r=t;else{if(arguments.length!==3)throw new TypeError("View#delegate: only two or three arguments are allowed");i=t;if(typeof i!="string")throw new TypeError("View#delegate: second argument must be a string");r=n}if(typeof r!="function")throw new TypeError("View#delegate: handler argument must be function");return e+=".delegate"+this.cid,r=l(r).bind(this),i?this.$el.on(e,i,r):this.$el.on(e,r),r},n.prototype.undelegate=function(){return this.$el.unbind(".delegate"+this.cid)},n.prototype.modelBind=function(e,t){var n;if(typeof e!="string")throw new TypeError("View#modelBind: type must be a string");if(typeof t!="function")throw new TypeError("View#modelBind: handler argument must be function");n=this.model||this.collection;if(!n)throw new TypeError("View#modelBind: no model or collection set");return n.off(e,t,this),n.on(e,t,this)},n.prototype.modelUnbind=function(e,t){var n;if(typeof e!="string")throw new TypeError("View#modelUnbind: type argument must be a string");if(typeof t!="function")throw new TypeError("View#modelUnbind: handler argument must be a function");n=this.model||this.collection;if(!n)return;return n.off(e,t)},n.prototype.modelUnbindAll=function(){var e;e=this.model||this.collection;if(!e)return;return e.off(null,null,this)},n.prototype.pass=function(e,t){var n=this;return this.modelBind("change:"+e,function(e,r){var i;return i=n.$(t),i.is(":input")?i.val(r):i.text(r)})},n.prototype.subview=function(e,t){if(e&&t)return this.removeSubview(e),this.subviews.push(t),this.subviewsByName[e]=t,t;if(e)return this.subviewsByName[e]},n.prototype.removeSubview=function(e){var t,n,r,i,s,o;if(!e)return;if(typeof e=="string")n=e,s=this.subviewsByName[n];else{s=e,o=this.subviewsByName;for(r in o){i=o[r];if(s===i){n=r;break}}}if(!(n&&s&&s.dispose))return;return s.dispose(),t=l(this.subviews).indexOf(s),t>-1&&this.subviews.splice(t,1),delete this.subviewsByName[n]},n.prototype.getTemplateData=function(){var e,t,n,r,i,s,o;if(this.model)r=this.model.serialize();else if(this.collection){e=[],o=this.collection.models;for(i=0,s=o.length;i<s;i++)t=o[i],e.push(t.serialize());r={items:e}}else r={};return n=this.model||this.collection,n&&(typeof n.state=="function"&&!("resolved"in r)&&(r.resolved=n.state()==="resolved"),typeof n.isSynced=="function"&&!("synced"in r)&&(r.synced=n.isSynced())),r},n.prototype.getTemplateFunction=function(){throw new Error("View#getTemplateFunction must be overridden")},n.prototype.render=function(){var e,t;return this.disposed?!1:(t=this.getTemplateFunction(),typeof t=="function"&&(e=t(this.getTemplateData()),this.$el.empty().append(e)),this.renderIsWrapped||this.afterRender(),this)},n.prototype.afterRender=function(){if(this.container)return i(this.container)[this.containerMethod](this.el),this.trigger("addedToDOM")},n.prototype.disposed=!1,n.prototype.dispose=function(){var e,t,n,r,i,s,o,u;if(this.disposed)return;u=this.subviews;for(r=0,s=u.length;r<s;r++)n=u[r],n.dispose();this.unsubscribeAllEvents(),this.modelUnbindAll(),this.off(),this.$el.remove(),t=["el","$el","options","model","collection","subviews","subviewsByName","_callbacks"];for(i=0,o=t.length;i<o;i++)e=t[i],delete this[e];return this.disposed=!0,typeof Object.freeze=="function"?Object.freeze(this):void 0},n}(s.View)}}),require.define({"chaplin/views/collection_view":function(n,i,s){var o,u,a,f;return o=i("jquery"),f=i("underscore"),a=i("chaplin/views/view"),s.exports=u=function(n){function i(){return this.renderAllItems=r(this.renderAllItems,this),this.showHideFallback=r(this.showHideFallback,this),this.itemsResetted=r(this.itemsResetted,this),this.itemRemoved=r(this.itemRemoved,this),this.itemAdded=r(this.itemAdded,this),i.__super__.constructor.apply(this,arguments)}return t(i,n),i.prototype.animationDuration=500,i.prototype.listSelector=null,i.prototype.$list=null,i.prototype.fallbackSelector=null,i.prototype.$fallback=null,i.prototype.loadingSelector=null,i.prototype.$loading=null,i.prototype.itemSelector=null,i.prototype.itemView=null,i.prototype.filterer=null,i.prototype.viewsByCid=null,i.prototype.visibleItems=null,i.prototype.getView=function(e){if(this.itemView!=null)return new this.itemView({model:e});throw new Error("The CollectionView#itemView property must bedefined (or the getView() must be overridden)")},i.prototype.getTemplateFunction=function(){},i.prototype.initialize=function(e){e==null&&(e={}),i.__super__.initialize.apply(this,arguments),f(e).defaults({render:!0,renderItems:!0,filterer:null}),e.itemView!=null&&(this.itemView=e.itemView),this.viewsByCid={},this.visibleItems=[],this.addCollectionListeners(),e.filterer&&this.filter(e.filterer),e.render&&this.render();if(e.renderItems)return this.renderAllItems()},i.prototype.addCollectionListeners=function(){return this.modelBind("add",this.itemAdded),this.modelBind("remove",this.itemRemoved),this.modelBind("reset",this.itemsResetted)},i.prototype.itemAdded=function(e,t,n){return n==null&&(n={}),this.renderAndInsertItem(e,n.index)},i.prototype.itemRemoved=function(e){return this.removeViewForItem(e)},i.prototype.itemsResetted=function(){return this.renderAllItems()},i.prototype.render=function(){return i.__super__.render.apply(this,arguments),this.$list=this.listSelector?this.$(this.listSelector):this.$el,this.initFallback(),this.initLoadingIndicator()},i.prototype.initFallback=function(){if(!this.fallbackSelector)return;return this.$fallback=this.$(this.fallbackSelector),this.bind("visibilityChange",this.showHideFallback),this.modelBind("syncStateChange",this.showHideFallback)},i.prototype.showHideFallback=function(){var e;return e=this.visibleItems.length===0&&(typeof this.collection.isSynced=="function"?this.collection.isSynced():!0),this.$fallback.css("display",e?"block":"none")},i.prototype.initLoadingIndicator=function(){if(!this.loadingSelector||typeof this.collection.isSyncing!="function")return;return this.$loading=this.$(this.loadingSelector),this.modelBind("syncStateChange",this.showHideLoadingIndicator),this.showHideLoadingIndicator()},i.prototype.showHideLoadingIndicator=function(){var e;return e=this.collection.length===0&&this.collection.isSyncing(),this.$loading.css("display",e?"block":"none")},i.prototype.filter=function(e){var t,n,r,i,s,o,u;this.filterer=e;if(!f(this.viewsByCid).isEmpty()){u=this.collection.models;for(n=s=0,o=u.length;s<o;n=++s){r=u[n],t=typeof e=="function"?e(r,n):!0,i=this.viewsByCid[r.cid];if(!i)throw new Error("CollectionView#filter: "+("no view found for "+r.cid));i.$el.stop(!0,!0).css("display",t?"":"none"),this.updateVisibleItems(r,t,!1)}}return this.trigger("visibilityChange",this.visibleItems)},i.prototype.renderAllItems=function(){var t,n,r,i,s,o,u,a,f,l,c;i=this.collection.models,this.visibleItems=[],s={};for(u=0,f=i.length;u<f;u++)r=i[u],o=this.viewsByCid[r.cid],o&&(s[r.cid]=o);c=this.viewsByCid;for(t in c){if(!e.call(c,t))continue;o=c[t],t in s||this.removeView(t,o)}for(n=a=0,l=i.length;a<l;n=++a)r=i[n],o=this.viewsByCid[r.cid],o?this.insertView(r,o,n,0):this.renderAndInsertItem(r,n);if(!i.length)return this.trigger("visibilityChange",this.visibleItems)},i.prototype.renderAndInsertItem=function(e,t){var n;return n=this.renderItem(e),this.insertView(e,n,t)},i.prototype.renderItem=function(e){var t;return t=this.viewsByCid[e.cid],t||(t=this.getView(e),this.viewsByCid[e.cid]=t),t.render(),t},i.prototype.insertView=function(e,t,n,r){var i,s,o,u,a,f,l,c,h;n==null&&(n=null),r==null&&(r=this.animationDuration),c=typeof n=="number"?n:this.collection.indexOf(e),f=typeof this.filterer=="function"?this.filterer(e,c):!0,h=t.el,u=t.$el,f?(r&&u.addClass("opacity-transitionable"),r&&u.css("opacity",0)):u.css("display","none"),i=this.$list,a=i.children(this.itemSelector||void 0),l=a.length,l===0||c===l?i.append(h):c===0?(s=a.eq(c),s.before(h)):(o=a.eq(c-1),o.after(h)),t.trigger("addedToDOM"),this.updateVisibleItems(e,f);if(r&&f)return u.addClass("opacity-transitionable-end"),u.animate({opacity:1},r)},i.prototype.removeViewForItem=function(e){var t;return this.updateVisibleItems(e,!1),t=this.viewsByCid[e.cid],this.removeView(e.cid,t)},i.prototype.removeView=function(e,t){return t.dispose(),delete this.viewsByCid[e]},i.prototype.updateVisibleItems=function(e,t,n){var r,i,s;return n==null&&(n=!0),i=!1,s=f(this.visibleItems).indexOf(e),r=s>-1,t&&!r?(this.visibleItems.push(e),i=!0):!t&&r&&(this.visibleItems.splice(s,1),i=!0),i&&n&&this.trigger("visibilityChange",this.visibleItems),i},i.prototype.dispose=function(){var t,n,r,s,o,u,a;if(this.disposed)return;a=this.viewsByCid;for(t in a){if(!e.call(a,t))continue;s=a[t],s.dispose()}r=["$list","$fallback","$loading","viewsByCid","visibleItems"];for(o=0,u=r.length;o<u;o++)n=r[o],delete this[n];return i.__super__.dispose.apply(this,arguments)},i}(a)}}),require.define({"chaplin/lib/route":function(t,n,i){var s,o,u;return u=n("underscore"),o=n("chaplin/mediator"),i.exports=s=function(){function a(e,t,n){var i;this.options=n!=null?n:{},this.handler=r(this.handler,this),this.addParamName=r(this.addParamName,this),this.pattern=e,i=t.split("#"),this.controller=i[0],this.action=i[1],this.createRegExp()}var t,n,i,s;return s="path changeURL".split(" "),t=/[-[\]{}()+?.,\\^$|#\s]/g,n="&",i="=",a.prototype.createRegExp=function(){var e;if(u.isRegExp(this.pattern)){this.regExp=this.pattern;return}return e=this.pattern.replace(t,"\\$&").replace(/:(\w+)/g,this.addParamName),this.regExp=RegExp("^"+e+"(?=\\?|$)")},a.prototype.addParamName=function(e,t){var n;(n=this.paramNames)==null&&(this.paramNames=[]);if(u(s).include(t))throw new Error("Route#addParamName: parameter name "+t+" is reserved");return this.paramNames.push(t),"([\\w-]+)"},a.prototype.test=function(t){var n,r,i,s,o;i=this.regExp.test(t);if(!i)return!1;r=this.options.constraints;if(r){o=this.extractParams(t);for(s in r){if(!e.call(r,s))continue;n=r[s];if(!n.test(o[s]))return!1}}return!0},a.prototype.handler=function(e,t){var n;return n=this.buildParams(e,t),o.publish("matchRoute",this,n)},a.prototype.buildParams=function(e,t){var n,r,i;return n={},i=this.extractQueryParams(e),u(n).extend(i),r=this.extractParams(e),u(n).extend(r),u(n).extend(this.options.params),n.changeURL=Boolean(t&&t.changeURL),n.path=e,n},a.prototype.extractParams=function(e){var t,n,r,i,s,o,u,a;s={},r=this.regExp.exec(e),a=r.slice(1);for(t=o=0,u=a.length;o<u;t=++o)n=a[t],i=this.paramNames?this.paramNames[t]:t,s[i]=n;return s},a.prototype.extractQueryParams=function(e){var t,r,s,o,u,a,f,l,c,h,p,d;a={},l=/\?(.+?)(?=#|$)/,s=l.exec(e);if(!s)return a;f=s[1],u=f.split(n);for(h=0,p=u.length;h<p;h++){o=u[h];if(!o.length)continue;d=o.split(i),r=d[0],c=d[1];if(!r.length)continue;r=decodeURIComponent(r),c=decodeURIComponent(c),t=a[r],t?t.push?t.push(c):a[r]=[t,c]:a[r]=c}return a},a}()}}),require.define({"chaplin/lib/router":function(e,t,n){var i,s,o,u,a,f;return f=t("underscore"),i=t("backbone"),a=t("chaplin/mediator"),u=t("chaplin/lib/subscriber"),s=t("chaplin/lib/route"),n.exports=o=function(){function e(e){this.options=e!=null?e:{},this.route=r(this.route,this),this.match=r(this.match,this),f(this.options).defaults({pushState:!0}),this.subscribeEvent("!router:route",this.routeHandler),this.subscribeEvent("!router:changeURL",this.changeURLHandler),this.createHistory()}return f(e.prototype).extend(u),e.prototype.createHistory=function(){return i.history||(i.history=new i.History)},e.prototype.startHistory=function(){return i.history.start(this.options)},e.prototype.stopHistory=function(){return i.history.stop()},e.prototype.match=function(e,t,n){var r;return n==null&&(n={}),r=new s(e,t,n),i.history.route(r,r.handler)},e.prototype.route=function(e){var t,n,r,s;e=e.replace(/^(\/#|\/)/,""),s=i.history.handlers;for(n=0,r=s.length;n<r;n++){t=s[n];if(t.route.test(e))return t.callback(e,{changeURL:!0}),!0}return!1},e.prototype.routeHandler=function(e,t){var n;return n=this.route(e),typeof t=="function"?t(n):void 0},e.prototype.changeURL=function(e){return i.history.navigate(e,{trigger:!1})},e.prototype.changeURLHandler=function(e){return this.changeURL(e)},e.prototype.disposed=!1,e.prototype.dispose=function(){if(this.disposed)return;return this.stopHistory(),delete i.history,this.unsubscribeAllEvents(),this.disposed=!0,typeof Object.freeze=="function"?Object.freeze(this):void 0},e}()}}),require.define({"chaplin/lib/subscriber":function(e,t,n){var r,i;return i=t("chaplin/mediator"),r={subscribeEvent:function(e,t){if(typeof e!="string")throw new TypeError("Subscriber#subscribeEvent: type argument must be a string");if(typeof t!="function")throw new TypeError("Subscriber#subscribeEvent: handler argument must be a function");return i.unsubscribe(e,t,this),i.subscribe(e,t,this)},unsubscribeEvent:function(e,t){if(typeof e!="string")throw new TypeError("Subscriber#unsubscribeEvent: type argument must be a string");if(typeof t!="function")throw new TypeError("Subscriber#unsubscribeEvent: handler argument must be a function");return i.unsubscribe(e,t)},unsubscribeAllEvents:function(){return i.unsubscribe(null,null,this)}},typeof Object.freeze=="function"&&Object.freeze(r),n.exports=r}}),require.define({"chaplin/lib/support":function(e,t,n){var r;return r={propertyDescriptors:function(){var e;if(typeof Object.defineProperty!="function"||typeof Object.defineProperties!="function")return!1;try{return e={},Object.defineProperty(e,"foo",{value:"bar"}),e.foo==="bar"}catch(t){return!1}}()},n.exports=r}}),require.define({"chaplin/lib/sync_machine":function(e,t,n){var r,i,s,o,u,a,f,l,c,h;u="unsynced",s="syncing",i="synced",r="syncStateChange",o={_syncState:u,_previousSyncState:null,syncState:function(){return this._syncState},isUnsynced:function(){return this._syncState===u},isSynced:function(){return this._syncState===i},isSyncing:function(){return this._syncState===s},unsync:function(){var e;if((e=this._syncState)===s||e===i)this._previousSync=this._syncState,this._syncState=u,this.trigger(this._syncState,this,this._syncState),this.trigger(r,this,this._syncState)},beginSync:function(){var e;if((e=this._syncState)===u||e===i)this._previousSync=this._syncState,this._syncState=s,this.trigger(this._syncState,this,this._syncState),this.trigger(r,this,this._syncState)},finishSync:function(){this._syncState===s&&(this._previousSync=this._syncState,this._syncState=i,this.trigger(this._syncState,this,this._syncState),this.trigger(r,this,this._syncState))},abortSync:function(){this._syncState===s&&(this._syncState=this._previousSync,this._previousSync=this._syncState,this.trigger(this._syncState,this,this._syncState),this.trigger(r,this,this._syncState))}},h=[u,s,i,r],f=function(e){return o[e]=function(t,n){n==null&&(n=this),this.on(e,t,n);if(this._syncState===e)return t.call(n)}};for(l=0,c=h.length;l<c;l++)a=h[l],f(a);return typeof Object.freeze=="function"&&Object.freeze(o),n.exports=o}}),require.define({"chaplin/lib/utils":function(e,t,n){var r,s;return r=t("chaplin/lib/support"),s={beget:function(){var e;return typeof Object.create=="function"?Object.create:(e=function(){},function(t){return e.prototype=t,new e})}(),readonly:function(){var e;return r.propertyDescriptors?(e={writable:!1,enumerable:!0,configurable:!1},function(){var t,n,r,s,o;t=arguments[0],r=2<=arguments.length?i.call(arguments,1):[];for(s=0,o=r.length;s<o;s++)n=r[s],Object.defineProperty(t,n,e);return!0}):function(){return!1}}(),upcase:function(e){return e.charAt(0).toUpperCase()+e.substring(1)},underscorize:function(e){return e.replace(/[A-Z]/g,function(e,t){return(t!==0?"_":"")+e.toLowerCase()})},modifierKeyPressed:function(e){return e.shiftKey||e.altKey||e.ctrlKey||e.metaKey}},typeof Object.seal=="function"&&Object.seal(s),n.exports=s}}),require.define({chaplin:function(e,t,n){var r,i,s,o,u,a,f,l,c,h,p,d,v,m,g;return r=t("chaplin/application"),v=t("chaplin/mediator"),u=t("chaplin/dispatcher"),o=t("chaplin/controllers/controller"),i=t("chaplin/models/collection"),f=t("chaplin/models/model"),a=t("chaplin/views/layout"),d=t("chaplin/views/view"),s=t("chaplin/views/collection_view"),l=t("chaplin/lib/route"),c=t("chaplin/lib/router"),h=t("chaplin/lib/subscriber"),m=t("chaplin/lib/support"),p=t("chaplin/lib/sync_machine"),g=t("chaplin/lib/utils"),n.exports={Application:r,mediator:v,Dispatcher:u,Controller:o,Collection:i,Model:f,Layout:a,View:d,CollectionView:s,Route:l,Router:c,Subscriber:h,support:m,SyncMachine:p,utils:g}}})}).call(this);