var XPromise=function(){var n;return n=function(n){var t;return t=function(n){function t(n,t){if(n)for(var r=0,e=n.length;e>r&&t(n[r],r)!==!1;r++);}function r(n,t){for(var r in t)n[r]=t[r]}function e(n,t,r){if(n instanceof s)r.call(n,n[h]);else{var o=n[h],u=n[y];void 0===u&&(u=n[y]=[]),u?u.push([t,r]):i(o)?e(o,t,r):t&&t.call(n,o)}}function o(n){var t=this;return t instanceof o?(t.promise=n||new c,t.promise.defer=t,void 0):new o(n)}function i(n){return n&&n instanceof c}function u(n,t){return function(){return n.apply(t,arguments)}}function c(n){var t=this;if("function"==typeof n){var r=new o(t),e=u(r.resolve,r),i=u(r.reject,r);try{n(e,i)}catch(c){console.error(c.stack||c),i(c)}}}function s(n){if(n instanceof s)return n;var t=this;return t[h]=n,t[y]=!1,t[v]=!1,t}function f(){}function a(n,t,r){function i(n){try{return t?t.call(this,n):n}catch(r){return console.error(r.stack||r),new s(r)}}function u(n){try{return r?r.call(this,n):new s(n)}catch(t){return console.error(t.stack||t),new s(t)}}function f(n){l||(l=1,a.resolve(i.call(this,n)))}var a=new o,l=0;return n instanceof c?e(n,f,function(n){l||(l=1,a.resolve(u.call(this,n)))}):f(n),a.promise}function l(n){return n&&!p(n)&&n[y]===!1&&(!i(n[h])||l(n[h]))}function p(n){return n&&(n instanceof s||n[h]instanceof s)}var h="__promise_value",v="__promise_progress_listeners",y="__promise_pendings";return o.prototype={constructor:o,resolve:function(n){var r,o=this.promise;return(r=o[y])===!1?null:(o[h]=n,r=r?[].concat(r):[],o[y]=!1,o[v]=!1,t(r,function(n){e(o,n[0],n[1])}),n)},reject:function(n){return this.resolve(new s(n))},notify:function(n){t(this.promise[v],function(t){t(n)})}},c.prototype={constructor:c,then:function(n,t,r){return r&&this.progress(r),a(this,n,t)},progress:function(n){var t=this,r=t[v];return r===!1?t:(r||(r=t[v]=[]),r.push(n),t)},fail:function(n){return a(this,0,n)},fin:function(n){return a(this,function(t){return n(t,!0)},function(t){return n(t,!1)})},done:function(n,t){var r=this,e=function(n){setTimeout(function(){throw n},0)},o=n||t?r.then(n,t):r;o.fail(e)},isResolved:function(){return l(this)},isRejected:function(){return p(this)}},c.prototype["catch"]=c.prototype.fail,f.prototype=c.prototype,s.prototype=new f,s.prototype.constructor=s,c.Defer=o,r(c,{version:"1.0.1",when:a,cast:function(n){return n instanceof c?n:a(n)},resolve:function(n){return a(n)},reject:function(n){return new s(n)},isPromise:i,isResolved:l,isRejected:p,all:function(n){var t=n.length;if(!t)return null;for(var r=new o,e=0;e<n.length;e++)!function(e,o){a(e,function(e){n[o]=e,0===--t&&r.resolve(n)},function(n){r.reject(n)})}(n[e],e);return r.promise},async:function(n){return function(){function t(n,t){var i;try{i=o[n](t)}catch(u){return new s(u)}return i.done?i.value:a(i.value,r,e)}function r(n){return t("next",n)}function e(n){return t("throw",n)}var o=n.apply(this,arguments);return r()}}}),n=c}(),n=t}()}();