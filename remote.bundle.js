webpackJsonp([2,0],[function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var i=o(6),d=t(i),l=o(5),r=t(l);o(1);var a=void 0;(0,d.default)(document).ready(function(){var n=(0,d.default)("#log"),e=(0,d.default)("#logs");(0,d.default)("#connect").click(function(){a&&a.disconnect(),a=new r.default(n.val(),{onAdd:function(n,o,t){for(var i=(0,d.default)('<div class="log" log-id="'+t+'"></div>'),l=0;l<n.length;l+=1)i.append((0,d.default)('<div class="log-part">'+n[l]+"</div>"));i.append((0,d.default)('<div class="caller">'+o+"</div>")),e.append(i)},onRemove:function(){e.empty()}})})})},function(n,e){},,,,function(n,e){"use strict";function o(n){if(Array.isArray(n)){for(var e=0,o=Array(n.length);e<n.length;e++)o[e]=n[e];return o}return Array.from(n)}function t(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function n(n,e){for(var o=0;o<e.length;o++){var t=e[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,o,t){return o&&n(e.prototype,o),t&&n(e,t),e}}(),d=void 0,l=function(){function n(e){var o=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t(this,n),this.wilddog=window.wilddog,this.uuid=e,i.onAdd&&(this.onAdd=i.onAdd),i.onRemove&&(this.onRemove=i.onRemove);var l={syncURL:"https://remote-console.wilddogio.com/"};this.wilddog.initializeApp(l),d=this.wilddog.sync().ref("screens/"+this.uuid),d.endAt(0).limitToLast(10).on("child_added",function(n){var e=n.val();o.onAdd(e.log,e.caller,n.key())}),d.on("child_removed",function(n){o.onRemove(n.key())})}return i(n,[{key:"onAdd",value:function(n){var e;(e=console).log.apply(e,o(n))}},{key:"onRemove",value:function(){}},{key:"disconnect",value:function(){this.wilddog.sync().goOffline()}}]),n}();e.default=l},function(n,e){n.exports=$}]);