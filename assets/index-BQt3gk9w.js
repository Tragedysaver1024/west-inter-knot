(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))E(m);new MutationObserver(m=>{for(const g of m)if(g.type==="childList")for(const _ of g.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&E(_)}).observe(document,{childList:!0,subtree:!0});function T(m){const g={};return m.integrity&&(g.integrity=m.integrity),m.referrerPolicy&&(g.referrerPolicy=m.referrerPolicy),m.crossOrigin==="use-credentials"?g.credentials="include":m.crossOrigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function E(m){if(m.ep)return;m.ep=!0;const g=T(m);fetch(m.href,g)}})();var Y=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function K(v){return v&&v.__esModule&&Object.prototype.hasOwnProperty.call(v,"default")?v.default:v}var j={exports:{}};(function(v,f){(function(T,E){v.exports=E()})(Y,function(){function T(e,t){var n=void 0;return function(){n&&clearTimeout(n),n=setTimeout(e,t)}}function E(e,t){for(var n=e.length,r=n,c=[];n--;)c.push(t(e[r-n-1]));return c}function m(e,t){var n=arguments.length>2&&arguments[2]!==void 0&&arguments[2];if(window.Promise)return q(e,t,n);e.recalculate(!0,!0)}function g(e){for(var t=e.options,n=e.responsiveOptions,r=e.keys,c=e.docWidth,s=void 0,a=0;a<r.length;a++){var l=parseInt(r[a],10);c>=l&&(s=t.breakAt[l],$(s,n))}return n}function _(e){for(var t=e.options,n=e.responsiveOptions,r=e.keys,c=e.docWidth,s=void 0,a=r.length-1;a>=0;a--){var l=parseInt(r[a],10);c<=l&&(s=t.breakAt[l],$(s,n))}return n}function L(e){var t=e.useContainerForBreakpoints?e.container.clientWidth:window.innerWidth,n={columns:e.columns};w(e.margin)?n.margin={x:e.margin.x,y:e.margin.y}:n.margin={x:e.margin,y:e.margin};var r=Object.keys(e.breakAt);return e.mobileFirst?g({options:e,responsiveOptions:n,keys:r,docWidth:t}):_({options:e,responsiveOptions:n,keys:r,docWidth:t})}function M(e){return L(e).columns}function b(e){return L(e).margin}function S(e){var t=!(arguments.length>1&&arguments[1]!==void 0)||arguments[1],n=M(e),r=b(e).x,c=100/n;if(!t)return c;if(n===1)return"100%";var s="px";if(typeof r=="string"){var a=parseFloat(r);s=r.replace(a,""),r=a}return r=(n-1)*r/n,s==="%"?c-r+"%":"calc("+c+"% - "+r+s+")"}function O(e,t){var n=M(e.options),r=0,c=void 0,s=void 0;if(++t===1)return 0;s=b(e.options).x;var a="px";if(typeof s=="string"){var l=parseFloat(s,10);a=s.replace(l,""),s=l}return c=(s-(n-1)*s/n)*(t-1),r+=S(e.options,!1)*(t-1),a==="%"?r+c+"%":"calc("+r+"% + "+c+a+")"}function x(e){var t=0,n=e.container,r=e.rows;o(r,function(c){t=c>t?c:t}),n.style.height=t+"px"}function k(e,t){var n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=!(arguments.length>3&&arguments[3]!==void 0)||arguments[3],c=M(e.options),s=b(e.options).y;R(e,c,n),o(t,function(a){var l=0,C=parseInt(a.offsetHeight,10);isNaN(C)||(e.rows.forEach(function(J,Q){J<e.rows[l]&&(l=Q)}),a.style.position="absolute",a.style.top=e.rows[l]+"px",a.style.left=""+e.cols[l],e.rows[l]+=isNaN(C)?0:C+s,r&&(a.dataset.macyComplete=1))}),r&&(e.tmpRows=null),x(e)}function N(e,t){var n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=!(arguments.length>3&&arguments[3]!==void 0)||arguments[3],c=M(e.options),s=b(e.options).y;R(e,c,n),o(t,function(a){e.lastcol===c&&(e.lastcol=0);var l=B(a,"height");l=parseInt(a.offsetHeight,10),isNaN(l)||(a.style.position="absolute",a.style.top=e.rows[e.lastcol]+"px",a.style.left=""+e.cols[e.lastcol],e.rows[e.lastcol]+=isNaN(l)?0:l+s,e.lastcol+=1,r&&(a.dataset.macyComplete=1))}),r&&(e.tmpRows=null),x(e)}var i=function e(t,n){if(!(this instanceof e))return new e(t,n);if(t&&t.nodeName)return t;if(t=t.replace(/^\s*/,"").replace(/\s*$/,""),n)return this.byCss(t,n);for(var r in this.selectors)if(n=r.split("/"),new RegExp(n[1],n[2]).test(t))return this.selectors[r](t);return this.byCss(t)};i.prototype.byCss=function(e,t){return(t||document).querySelectorAll(e)},i.prototype.selectors={},i.prototype.selectors[/^\.[\w\-]+$/]=function(e){return document.getElementsByClassName(e.substring(1))},i.prototype.selectors[/^\w+$/]=function(e){return document.getElementsByTagName(e)},i.prototype.selectors[/^\#[\w\-]+$/]=function(e){return document.getElementById(e.substring(1))};var o=function(e,t){for(var n=e.length,r=n;n--;)t(e[r-n-1])},u=function(){var e=arguments.length>0&&arguments[0]!==void 0&&arguments[0];this.running=!1,this.events=[],this.add(e)};u.prototype.run=function(){if(!this.running&&this.events.length>0){var e=this.events.shift();this.running=!0,e(),this.running=!1,this.run()}},u.prototype.add=function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0&&arguments[0];return!!t&&(Array.isArray(t)?o(t,function(n){return e.add(n)}):(this.events.push(t),void this.run()))},u.prototype.clear=function(){this.events=[]};var h=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.instance=e,this.data=t,this},d=function(){var e=arguments.length>0&&arguments[0]!==void 0&&arguments[0];this.events={},this.instance=e};d.prototype.on=function(){var e=arguments.length>0&&arguments[0]!==void 0&&arguments[0],t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];return!(!e||!t)&&(Array.isArray(this.events[e])||(this.events[e]=[]),this.events[e].push(t))},d.prototype.emit=function(){var e=arguments.length>0&&arguments[0]!==void 0&&arguments[0],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!e||!Array.isArray(this.events[e]))return!1;var n=new h(this.instance,t);o(this.events[e],function(r){return r(n)})};var y=function(e){return!("naturalHeight"in e&&e.naturalHeight+e.naturalWidth===0)||e.width+e.height!==0},A=function(e,t){var n=arguments.length>2&&arguments[2]!==void 0&&arguments[2];return new Promise(function(r,c){if(t.complete)return y(t)?r(t):c(t);t.addEventListener("load",function(){return y(t)?r(t):c(t)}),t.addEventListener("error",function(){return c(t)})}).then(function(r){n&&e.emit(e.constants.EVENT_IMAGE_LOAD,{img:r})}).catch(function(r){return e.emit(e.constants.EVENT_IMAGE_ERROR,{img:r})})},I=function(e,t){var n=arguments.length>2&&arguments[2]!==void 0&&arguments[2];return E(t,function(r){return A(e,r,n)})},q=function(e,t){var n=arguments.length>2&&arguments[2]!==void 0&&arguments[2];return Promise.all(I(e,t,n)).then(function(){e.emit(e.constants.EVENT_IMAGE_COMPLETE)})},P=function(e){return T(function(){e.emit(e.constants.EVENT_RESIZE),e.queue.add(function(){return e.recalculate(!0,!0)})},100)},H=function(e){if(e.container=i(e.options.container),e.container instanceof i||!e.container)return!!e.options.debug&&console.error("Error: Container not found");e.container.length&&(e.container=e.container[0]),e.options.container=e.container,e.container.style.position="relative"},G=function(e){e.queue=new u,e.events=new d(e),e.rows=[],e.resizer=P(e)},D=function(e){var t=i("img",e.container);window.addEventListener("resize",e.resizer),e.on(e.constants.EVENT_IMAGE_LOAD,function(){return e.recalculate(!1,!1)}),e.on(e.constants.EVENT_IMAGE_COMPLETE,function(){return e.recalculate(!0,!0)}),e.options.useOwnImageLoader||m(e,t,!e.options.waitForImages),e.emit(e.constants.EVENT_INITIALIZED)},z=function(e){H(e),G(e),D(e)},w=function(e){return e===Object(e)&&Object.prototype.toString.call(e)!=="[object Array]"},$=function(e,t){w(e)||(t.columns=e),w(e)&&e.columns&&(t.columns=e.columns),w(e)&&e.margin&&!w(e.margin)&&(t.margin={x:e.margin,y:e.margin}),w(e)&&e.margin&&w(e.margin)&&e.margin.x&&(t.margin.x=e.margin.x),w(e)&&e.margin&&w(e.margin)&&e.margin.y&&(t.margin.y=e.margin.y)},B=function(e,t){return window.getComputedStyle(e,null).getPropertyValue(t)},R=function(e,t){var n=arguments.length>2&&arguments[2]!==void 0&&arguments[2];if(e.lastcol||(e.lastcol=0),e.rows.length<1&&(n=!0),n){e.rows=[],e.cols=[],e.lastcol=0;for(var r=t-1;r>=0;r--)e.rows[r]=0,e.cols[r]=O(e,r)}else if(e.tmpRows){e.rows=[];for(var r=t-1;r>=0;r--)e.rows[r]=e.tmpRows[r]}else{e.tmpRows=[];for(var r=t-1;r>=0;r--)e.tmpRows[r]=e.rows[r]}},F=function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n=!(arguments.length>2&&arguments[2]!==void 0)||arguments[2],r=t?e.container.children:i(':scope > *:not([data-macy-complete="1"])',e.container);r=Array.from(r).filter(function(s){return s.offsetParent!==null});var c=S(e.options);return o(r,function(s){t&&(s.dataset.macyComplete=0),s.style.width=c}),e.options.trueOrder?(N(e,r,t,n),e.emit(e.constants.EVENT_RECALCULATED)):(k(e,r,t,n),e.emit(e.constants.EVENT_RECALCULATED))},W=function(){return!!window.Promise},Z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};Array.from||(Array.from=function(e){for(var t=0,n=[];t<e.length;)n.push(e[t++]);return n});var U={columns:4,margin:2,trueOrder:!1,waitForImages:!1,useImageLoader:!0,breakAt:{},useOwnImageLoader:!1,onInit:!1,cancelLegacy:!1,useContainerForBreakpoints:!1};(function(){try{document.createElement("a").querySelector(":scope *")}catch{(function(){function t(s){return function(a){if(a&&n.test(a)){var l=this.getAttribute("id");l||(this.id="q"+Math.floor(9e6*Math.random())+1e6),arguments[0]=a.replace(n,"#"+this.id);var C=s.apply(this,arguments);return l===null?this.removeAttribute("id"):l||(this.id=l),C}return s.apply(this,arguments)}}var n=/:scope\b/gi,r=t(Element.prototype.querySelector);Element.prototype.querySelector=function(s){return r.apply(this,arguments)};var c=t(Element.prototype.querySelectorAll);Element.prototype.querySelectorAll=function(s){return c.apply(this,arguments)}})()}})();var p=function e(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:U;if(!(this instanceof e))return new e(t);this.options={},Z(this.options,U,t),this.options.cancelLegacy&&!W()||z(this)};return p.init=function(e){return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "),new p(e)},p.prototype.recalculateOnImageLoad=function(){var e=arguments.length>0&&arguments[0]!==void 0&&arguments[0];return m(this,i("img",this.container),!e)},p.prototype.runOnImageLoad=function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n=i("img",this.container);return this.on(this.constants.EVENT_IMAGE_COMPLETE,e),t&&this.on(this.constants.EVENT_IMAGE_LOAD,e),m(this,n,t)},p.prototype.recalculate=function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0&&arguments[0],n=!(arguments.length>1&&arguments[1]!==void 0)||arguments[1];return n&&this.queue.clear(),this.queue.add(function(){return F(e,t,n)})},p.prototype.remove=function(){window.removeEventListener("resize",this.resizer),o(this.container.children,function(e){e.removeAttribute("data-macy-complete"),e.removeAttribute("style")}),this.container.removeAttribute("style")},p.prototype.reInit=function(){this.recalculate(!0,!0),this.emit(this.constants.EVENT_INITIALIZED),window.addEventListener("resize",this.resizer),this.container.style.position="relative"},p.prototype.on=function(e,t){this.events.on(e,t)},p.prototype.emit=function(e,t){this.events.emit(e,t)},p.constants={EVENT_INITIALIZED:"macy.initialized",EVENT_RECALCULATED:"macy.recalculated",EVENT_IMAGE_LOAD:"macy.image.load",EVENT_IMAGE_ERROR:"macy.image.error",EVENT_IMAGE_COMPLETE:"macy.images.complete",EVENT_RESIZE:"macy.resize"},p.prototype.constants=p.constants,p})})(j);var X=j.exports;const ee=K(X),V="/inter-knot/img.png";LA.init({id:"3J6dEY8wQU3ZxACy",ck:"3J6dEY8wQU3ZxACy",autoTrack:!0,prefix:"inter-knot/event"});(async()=>{var N;if(!(((N=localStorage.getItem("access_token"))==null?void 0:N.startsWith("ghu_"))??!1))if(new URL(location.href).searchParams.has("code"))try{await M(new URL(location.href).searchParams.get("code"))}catch{L()}else L();const v=[...document.querySelectorAll(".tab-container .tab")];v.forEach(i=>{i.addEventListener("click",()=>{v.forEach(o=>o.classList.remove("active")),i.classList.add("active")})});const f=document.querySelector(".popup-container");f.addEventListener("click",i=>{i.target===f&&(f.classList.remove("open"),f.classList.add("closed"))});const T=ee({container:".card-container",columns:5,margin:{x:0,y:0}});try{const i=await S(localStorage.getItem("access_token"));m({curExp:6982,totalExp:1e4,level:i.public_repos,name:i.name,profilePhoto:i.avatar_url,url:i.html_url})}catch{try{await b(localStorage.getItem("refresh_token"));const i=await S(localStorage.getItem("access_token"));m({curExp:6982,totalExp:1e4,level:i.public_repos,name:i.name,profilePhoto:i.avatar_url,url:i.html_url})}catch{L()}}try{const i=await O(localStorage.getItem("access_token"));g(i.map(o=>{var u,h;return{cover:((h=(u=E(o.bodyHTML))==null?void 0:u.querySelector("a > img"))==null?void 0:h.src)??V,authorPhoto:o.author.avatarUrl,title:o.title,author:o.author.login,content:o.bodyHTML,visited:x(0,1001),comments:o.comments.nodes.map(d=>({profilePhoto:d.author.avatarUrl,name:d.author.login,content:d.bodyHTML}))}}))}catch{try{await b(localStorage.getItem("refresh_token"));const i=await O(localStorage.getItem("access_token"));g(i.map(o=>{var u,h;return{cover:((h=(u=E(o.bodyHTML))==null?void 0:u.querySelector("a > img"))==null?void 0:h.src)??V,authorPhoto:o.author.avatarUrl,title:o.title,author:o.author.login,content:o.bodyHTML,visited:x(0,1001),comments:o.comments.nodes.map(d=>({profilePhoto:d.author.avatarUrl,name:d.author.login,content:d.bodyHTML}))}}))}catch{L()}}function E(i){const o=document.createElement("div");return o.innerHTML=i,o.firstElementChild}function m({curExp:i,totalExp:o,level:u,name:h,profilePhoto:d,url:y}){document.querySelector(".user-info").href=y,document.querySelector(".user-info .profile-photo").src=d,document.querySelector(".user-info .curExp").textContent=i+"",document.querySelector(".user-info .totalExp").textContent=o+"",document.querySelector(".user-info .level-num").textContent=u+"",document.querySelector(".user-info .username").textContent=h,document.querySelector(".user-info .bar").style.width=i/o*100+"%"}function g(i){document.querySelector(".card-container").innerHTML=i.map(({cover:o,title:u,author:h,authorPhoto:d,content:y,visited:A})=>`<div class="card-wrapper"><div class="card"><section class="cover-container"><img class="cover" src="${o}" alt="封面" /><div class="visited"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" ><path fill="currentColor" d="M1.182 12C2.122 6.88 6.608 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.819 9s-9.878-3.88-10.818-9M12 17a5 5 0 1 0 0-10a5 5 0 0 0 0 10m0-2a3 3 0 1 1 0-6a3 3 0 0 1 0 6" /></svg>${A}</div></section><section class="info-container"><div class="profile"><img class="profile-photo" src="${d}" alt="头像" /><div class="username">${h}</div></div><div class="title">${u}</div><div class="content">${y}</div></section></div></div>`).join(""),document.querySelectorAll(".card-container img").forEach(o=>o.addEventListener("load",()=>T.recalculate(!0),{once:!0})),document.querySelectorAll(".card-container .card").forEach((o,u)=>{const{cover:h,title:d,author:y,authorPhoto:A,content:I,visited:q,comments:P}=i[u];o.addEventListener("click",()=>{_({cover:h,title:d,author:y,authorPhoto:A,content:I,visited:q,comments:P})})})}function _({authorPhoto:i,author:o,visited:u,cover:h,title:d,content:y,comments:A}){f.innerHTML=`<div class="popup"><header><img class="profile-photo" src="${i}" alt="头像" /><div><div>${o}</div><div class="visited"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" ><path fill="currentColor" d="M1.182 12C2.122 6.88 6.608 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.819 9s-9.878-3.88-10.818-9M12 17a5 5 0 1 0 0-10a5 5 0 0 0 0 10m0-2a3 3 0 1 1 0-6a3 3 0 0 1 0 6" /></svg>${u}</div></div><div class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" ><path fill="currentColor" d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z" /></svg></div></header><main><div class="cover"><img src="${h}" alt="封面" /></div><div class="content"><div class="title">${d}</div><div class="text">${y}</div><div class="comments">${A.map(I=>`<section class="comment"><img class="profile-photo" src="${I.profilePhoto}" alt="头像" /><div><div class="name">${I.name}</div><div class="text">${I.content}</div></div></section>`).join("")}</div></div></main></div>`,document.querySelector(".close-btn").addEventListener("click",()=>{f.classList.remove("open"),f.classList.add("closed")}),f.classList.remove("closed"),f.classList.add("open")}function L(){location.href="https://github.com/login/oauth/authorize?client_id=Iv23li8gf1MxGAgvw5lU"}async function M(i){const o=await fetch(`https://github.com/login/oauth/access_token?client_id=Iv23li8gf1MxGAgvw5lU&client_secret=3ea999c0e2d7283f602ab4994cc684ada2eeec2b&code=${i}`,{method:"POST",headers:{accept:"application/json"}}).then(u=>u.json());return localStorage.setItem("access_token",o.access_token),localStorage.setItem("refresh_token",o.refresh_token),o}async function b(i){const o=await fetch(`https://github.com/login/oauth/access_token?client_id=Iv23li8gf1MxGAgvw5lU&client_secret=3ea999c0e2d7283f602ab4994cc684ada2eeec2b&grant_type=refresh_token&refresh_token=${i}`,{method:"POST",headers:{accept:"application/json"}}).then(u=>u.json());return localStorage.setItem("access_token",o.access_token),localStorage.setItem("refresh_token",o.refresh_token),o}async function S(i){const{data:o}=await k({access_token:i,data:"query { viewer { avatarUrl login repositories { totalCount } } }"});return{name:o.viewer.login,avatar_url:o.viewer.avatarUrl,html_url:`https://github.com/${o.viewer.login}`,public_repos:o.viewer.repositories.totalCount}}async function O(i){const{data:{repository:{discussions:{nodes:o}}}}=await k({access_token:i,data:'query { repository(owner: "share121", name: "inter-knot") { discussions(first: 100) { nodes { author { avatarUrl login url } bodyHTML title comments(first: 100) { nodes { author { avatarUrl login url } bodyHTML } } } } } }'});return o}function x(i,o){return i=Math.ceil(i),o=Math.floor(o),Math.floor(Math.random()*(o-i)+i)}function k({access_token:i,data:o}){return fetch("https://api.github.com/graphql",{method:"POST",headers:{Authorization:"Bearer "+i},body:JSON.stringify({query:o})}).then(u=>u.json())}})();
