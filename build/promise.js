define("promise",[],function(n,t,e){var r;r=function(n){function t(n,t){if(n)for(var e=0,r=n.length;r>e&&t(n[e],e)!==!1;e++);}function e(n,t){for(var e in t)n[e]=t[e]}function r(n){return n&&"function"==typeof n.then}function o(n,t,e){if(n instanceof f)e.call(n,n.reason);else if(n instanceof s||!r(n)){var i=n[p];if(r(i)||i instanceof f)return o(i,t,e),void 0;n[v]===w?n[d].push([t,e]):t&&t.call(n,i)}else n.then(t,e)}function i(n){var t=this;return t instanceof i?(t.promise=n||new s,t.promise.defer=t,void 0):new i(n)}function u(n){return n&&n instanceof s}function c(n,t){return function(){return n.apply(t,arguments)}}function s(n){var t=this;if(t[d]=[],t[m]=[],n)if("function"==typeof n){t[v]=w;var e=new i(t),r=c(e.resolve,e),o=c(e.reject,e);try{n(r,o)}catch(u){console.error(u.stack||u),o(u)}}else t[v]=y;else t[v]=w}function f(n){return n instanceof f?n:(this.reason=n,void 0)}function a(n,t,e){function u(n){try{return t?t.call(this,n):n}catch(e){return console.error(e.stack||e),new f(e)}}function c(n){try{return e?e.call(this,n):new f(n)}catch(t){return console.error(t.stack||t),new f(t)}}function s(n){l||(l=1,a.resolve(u.call(this,n)))}var a=new i,l=0;return r(n)?o(n,s,function(n){l||(l=1,a.resolve(c.call(this,n)))}):s(n),a.promise}function l(n){return n&&n[v]===y}function h(n){return n&&n[v]===_}var p="__promise_value",v="__promise_status",m="__promise_progress_listeners",d="__promise_pendings",w="Pending",y="Fulfilled",_="Rejected";return i.prototype={constructor:i,resolve:function(n){var e=this.promise;if(e[v]!==w)return null;e[v]=n instanceof f?_:y,e[p]=n;var r=e[d];return t(r,function(n){o(e,n[0],n[1])}),e[d]=[],e[m]=[],this.promise},reject:function(n){return this.resolve(new f(n))},notify:function(n){return this.promise[v]!==w?null:(t(this.promise[m],function(t){t(n)}),void 0)}},s.prototype={constructor:s,then:function(n,t,e){return e&&this.progress(e),a(this,n,t)},progress:function(n){var t=this,e=t[m];return t[v]!==w?t:(e||(e=t[m]=[]),e.push(n),t)},fail:function(n){return this.then(0,n)},fin:function(n){return this.then(function(t){return n(t,!0)},function(t){return n(t,!1)})},done:function(n,t){var e=this,r=function(n){setTimeout(function(){throw n},0)},o=n||t?e.then(n,t):e;o.fail(r)},isResolved:function(){return l(this)},isRejected:function(){return h(this)}},s.prototype["catch"]=s.prototype.fail,s.Defer=i,e(s,{version:"1.1.3",when:a,cast:function(n){return n instanceof s?n:new s(function(t){t(n)})},resolve:function(n){return new s(function(t){t(n)})},reject:function(n){return new s(function(t,e){e(n)})},isPromise:u,isResolved:l,isRejected:h,all:function(n){var t=n.length;if(!t)return null;for(var e=new i,r=0;r<n.length;r++)!function(r,o){a(r,function(r){n[o]=r,0===--t&&e.resolve(n)},function(n){e.reject(n)})}(n[r],r);return e.promise},async:function(n){return function(){function t(n,t){var i;return i=o[n](t),i.done?i.value:a(i.value,e,r)}function e(n){return t("next",n)}function r(n){return t("throw",n)}var o=n.apply(this,arguments);try{return e()}catch(i){return s.reject(i)}}}}),n=s}(),e.exports=r});