import{c as chroma,s as styled,d as delegateEvents,a as splitProps,b as createComponent,m as mergeProps,e as memo,i as insert,f as toast,t as template,g as createSignal,h as textColorScale,j as createEffect,F as For,k as Flex,l as arrSize,n as createRenderEffect,o as createComputed,C as ColorShades,p as ColorMix,q as ColorRelative,r as ColorLegacy,u as untrack,v as createRoot,w as onCleanup,x as colorScale,y as setAttribute,z as setColorScale,A as setTextColorScale}from"./index.2b7568c5.js";const mainTRC=2.4,sRco=.2126729,sGco=.7151522,sBco=.072175,normBG=.56,normTXT=.57,revTXT=.62,revBG=.65,blkThrs=.022,blkClmp=1.414,scaleBoW=1.14,scaleWoB=1.14,loBoWthresh=.035991,loWoBthresh=.035991,loBoWfactor=27.7847239587675,loWoBfactor=27.7847239587675,loBoWoffset=.027,loWoBoffset=.027,loClip=.001,deltaYmin=5e-4;function sRGBtoY(t){let r=(t&16711680)>>16,n=(t&65280)>>8,o=t&255;function i(s){return Math.pow(s/255,mainTRC)}return sRco*i(r)+sGco*i(n)+sBco*i(o)}function APCAcontrast(t,r){var n=0,o=0;return t=t>blkThrs?t:t+Math.pow(blkThrs-t,blkClmp),r=r>blkThrs?r:r+Math.pow(blkThrs-r,blkClmp),Math.abs(r-t)<deltaYmin?0:(r>t?(n=(Math.pow(r,normBG)-Math.pow(t,normTXT))*scaleBoW,o=n<loClip?0:n<loBoWthresh?n-n*loBoWfactor*loBoWoffset:n-loBoWoffset):(n=(Math.pow(r,revBG)-Math.pow(t,revTXT))*scaleWoB,o=n>-loClip?0:n>-loWoBthresh?n-n*loWoBfactor*loWoBoffset:n+loWoBoffset),o*100)}const calcWCAG=(t,r)=>chroma.contrast(t,r),calcMaxWCAG=(t,r)=>{let n=0,o="",i="";return Object.entries(t).forEach(([s,l])=>{let c=calcWCAG(l,r);c>n&&(n=c,o=s,i=l)}),[n.toFixed(2),o,i]},calcAPCA=(t,r)=>{const n=parseInt(`0x${t.substring(1)}`,16),o=parseInt(`0x${r.substring(1)}`,16);return APCAcontrast(sRGBtoY(n),sRGBtoY(o))},calcMaxAPCA=(t,r)=>{let n=0,o="",i="";return Object.entries(t).forEach(([s,l])=>{let c=Math.abs(calcAPCA(l,r));c>n&&(n=c,o=s,i=l)}),[n.toFixed(2),o,i]},ColorIdentifier=styled("div")`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background-color: ${t=>t.color?t.color:"white"};
  border: 1px solid rgba(255, 255, 255, 0.14);
`,_tmpl$$9=template("<p></p>"),_tmpl$2$9=template('<a><i class="bi bi-x"></i></a>'),Toast=t=>{const[r,n]=splitProps(t,["children","toast","color","showExit","box"]),o=()=>{switch(t.color){case"warning":return"#674d0f";case"error":return"#5d000a";case"info":return"#040e1f"}return"black"},i=styled("div")`
    display: flex;
    background-color: ${o};
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    padding: 10px 10px 6px 10px;
    gap: 8px;

    @media only screen and (max-width: 780px) {
      padding: 8px 8px 6px 8px;
    }
  `;return createComponent(i,mergeProps(n,{get children(){return[memo(()=>memo(()=>!!r.box,!0)()&&createComponent(ColorIdentifier,{get color(){return t.box}})),(()=>{const s=_tmpl$$9.cloneNode(!0);return insert(s,()=>t.children),s})(),memo(()=>memo(()=>!!r.showExit,!0)()&&(()=>{const s=_tmpl$2$9.cloneNode(!0);return s.$$click=()=>toast.dismiss(t.toast.id),s})())]}}))};delegateEvents(["click"]);const _tmpl$$8=template('<i class="bi bi-x-circle"></i>'),_tmpl$2$8=template('<i class="bi bi-dash-circle"></i>'),_tmpl$3$7=template('<i class="bi bi-exclamation-circle"></i>'),_tmpl$4$4=template('<i class="bi bi-check-circle"></i>'),_tmpl$5$4=template("<div></div>"),_tmpl$6$3=template("<p></p>"),_tmpl$7$2=template('<p class="contrast"><object><strong>WCAG: </strong> </object><br><object><strong>APCA: </strong> </object><br><object><strong>APCA TEXT: </strong> </object></p>'),_tmpl$8$2=template('<p class="helper"><strong></strong><br></p>'),ColorSwatch=t=>{const r=()=>t.colorSwatch,[n,o]=createSignal(textColorScale());createEffect(()=>{o(textColorScale())});const i=d=>{navigator.clipboard.writeText(d).then(()=>{toast.custom(u=>createComponent(Toast,{box:d,showExit:!0,toast:u,get children(){return["Pallette Copied! ",d]}}))},()=>{toast.custom(u=>createComponent(Toast,{color:"error",showExit:!0,toast:u,children:"Copying Failed"}))})},s=(d,u,b)=>{const v=Number(calcMaxWCAG(d,b)[0]),S=Number(calcMaxAPCA(d,b)[0]),m=Number(calcMaxWCAG(u,b)[0]),y=Number(calcMaxAPCA(u,b)[0]);return m<4.5||v<4.5?y<60?_tmpl$$8.cloneNode(!0):S<60?_tmpl$2$8.cloneNode(!0):_tmpl$3$7.cloneNode(!0):_tmpl$4$4.cloneNode(!0)},l=styled("div")`
    display:flex;
    column-gap: 10px;
    padding: 5px 0;

    .helper {
      font-size: 10px;
      line-height: 12px;
      align-self: flex-end;
      margin-top: 8px;
      width: 100%;
    }
  `,c=styled("div")`
    position: absolute;
    top: 0px;
    right: 6px;
    i {
      font-size: 12px;
    }
  `,f=styled("div")`
    background-color: ${d=>d.color};
    height: 84px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 5px 8px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid ${d=>calcMaxAPCA(n(),d.color)[2]=="#FFFFFF"?chroma(d.color).brighten(1.02).hex():chroma(d.color).darken(1.02).hex()};
    width: 100%;

    p {
      color: ${d=>calcMaxAPCA(n(),d.color)[2]} !important;
      font-size: 10px;
      line-height: 12px;
    }
    .contrast {
      opacity: 0;
      align-self: flex-start;
      width: 100%;
      color: white;
      transition: opacity 100ms ease-in-out;
    }

    &:hover {
      .contrast {
        opacity: 1;
      }
    }
  `;return(()=>{const d=_tmpl$5$4.cloneNode(!0);return insert(d,createComponent(For,{get each(){return Object.entries(r())},children:([u,b],v)=>[(()=>{const S=_tmpl$6$3.cloneNode(!0);return insert(S,u),S})(),createComponent(l,{get children(){return createComponent(For,{get each(){return Object.entries(b)},children:([S,m],y)=>createComponent(Flex,{flexDirection:"column",style:{"flex-basis":"100%",overflow:"hidden"},get children(){return[createComponent(f,{color:m,get style(){return{border:y()==Math.floor(arrSize()/2)?"1px solid rgba(256, 256, 256, 1)":"",flex:y()==arrSize()/2?"none":"1","border-radius":(y()==Math.floor(arrSize()/2),"3px")}},onClick:()=>i(m),get children(){return[createComponent(c,{get style(){return{color:calcMaxAPCA(n(),m)[2]}},get children(){return s(b,n(),m)}}),(()=>{const x=_tmpl$7$2.cloneNode(!0),w=x.firstChild;w.firstChild.nextSibling;const I=w.nextSibling,E=I.nextSibling;E.firstChild.nextSibling;const F=E.nextSibling,W=F.nextSibling;return W.firstChild.nextSibling,insert(w,()=>calcMaxWCAG(b,m)[0],null),insert(E,()=>calcMaxAPCA(b,m)[0],null),insert(W,()=>calcMaxAPCA(n(),m)[0],null),createRenderEffect(D=>{const Q=calcMaxWCAG(b,m)[2],$=calcMaxAPCA(b,m)[2],M=calcMaxAPCA(n(),m)[2];return Q!==D._v$&&w.style.setProperty("color",D._v$=Q),$!==D._v$2&&E.style.setProperty("color",D._v$2=$),M!==D._v$3&&W.style.setProperty("color",D._v$3=M),D},{_v$:void 0,_v$2:void 0,_v$3:void 0}),x})()]}}),(()=>{const x=_tmpl$8$2.cloneNode(!0),w=x.firstChild;return w.nextSibling,insert(w,S),insert(x,m,null),x})()]}})})}})]})),d})()},_tmpl$$7=template("<h5></h5>"),_tmpl$2$7=template("<br>"),SwatchList=t=>{const[r,n]=createSignal(t.swatchList);return createComputed(()=>{n(t.swatchList)}),createComponent(For,{get each(){return r()},children:o=>[(()=>{const i=_tmpl$$7.cloneNode(!0);return insert(i,()=>o.name),i})(),createComponent(ColorSwatch,{get colorSwatch(){return o.swatch}}),_tmpl$2$7.cloneNode(!0)]})},Button=styled("button")`
  background: none;
  color: inherit;
  letter-spacing: -0.45px;
  font-weight: bold !important;
  cursor: pointer !important;
  outline: none;
  padding: 6px 12px;
  background-color: rgba(255, 255, 255, 0.14);
  border-radius: 3px;
  border: none;
  max-width: auto;
  flex: none;
  transition: all 100ms ease-in-out;
  outline: 0;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.14);
  margin-top: 12px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.09);
  }
  &:active {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
  }
`,Select=styled("select")`
  background: none;
  color: inherit;
  font-weight: bold !important;
  cursor: pointer !important;
  outline: none;
  padding: 6px 12px;
  background-color: rgba(255, 255, 255, 0.14);
  border-radius: 3px;
  border: none;
  max-width: auto;
  flex: none;
  transition: all 100ms ease-in-out;
  outline: 0;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.14);
  margin-top: 12px;


  -webkit-appearance: none;


  &:hover {
    background-color: rgba(255, 255, 255, 0.09);
  }
  &:active {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
  }
  &::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='sprites'%3E%3Csymbol id='select-arrow-down' viewbox='0 0 10 6'%3E%3Cpolyline points='1 1 5 5 9 1'%3E%3C/polyline%3E%3C/symbol%3E%3C/svg%3E");
    position: absolute;
    right: 12px;
    top: calc(50% - 3px);
    width: 10px;
    height: 6px;
    stroke-width: 2px;
    stroke: #9098a9;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }
`,_tmpl$$6=template("<h3>Generated Colors</h3>"),_tmpl$2$6=template("<p>Export color type:</p>"),_tmpl$3$6=template('<option value="hex" selected>HEX (Default)</option>'),_tmpl$4$3=template('<option value="rgb">RGB</option>'),_tmpl$5$3=template('<option value="hsl">HSL</option>'),_tmpl$6$2=template('<option value="hsv">HSV</option>'),_tmpl$7$1=template('<option value="hsi">HSI</option>'),_tmpl$8$1=template('<option value="lab">LAB</option>'),_tmpl$9=template('<option value="oklab">OKLAB</option>'),_tmpl$10=template('<option value="lch">LCH</option>'),_tmpl$11=template('<option value="hcl">HCL</option>'),_tmpl$12=template('<option value="okhcl">OKHCL</option>'),_tmpl$13=template("<br>"),ColorListPage=()=>{const[t,r]=createSignal("hex"),n=()=>{let f=[];for(const d of s()){let u={};u.name=d.name;let b={};for(const[v,S]of Object.entries(d.swatch)){let m={};for(const[y,x]of Object.entries(S))switch(m[y]=x,t()){case"hex":m[y]=chroma(x).hex();break;case"rgb":m[y]=`rgb(${chroma(x).rgb().toString()})`;break;case"hsl":m[y]=`hsl(${chroma(x).hsl().toString()})`;break;case"hsv":m[y]=`hsv(${chroma(x).hsv().toString()})`;break;case"hsi":m[y]=`hsi(${chroma(x).hsi().toString()})`;break;case"lab":m[y]=`lab(${chroma(x).lab().toString()})`;break;case"oklab":m[y]=`oklab(${chroma(x).oklab().toString()})`;break;case"lch":m[y]=`lch(${chroma(x).lch().toString()})`;break;case"hcl":m[y]=`hcl(${chroma(x).hcl().toString()})`;break;case"okhcl":m[y]=`okhcl(${chroma(x).okhcl().toString()})`;break}b[v]=m}u.swatch=b,f.push(u)}return f},o=()=>{console.log(n());const f=JSON.stringify(s()),d=new Blob([f],{type:"text/plain"}),u=URL.createObjectURL(d),b=document.createElement("a");b.download="ambientcolors-full.json",b.href=u,b.click()},i=()=>{const f=JSON.stringify(n()[0].swatch),d=new Blob([f],{type:"text/plain"}),u=URL.createObjectURL(d),b=document.createElement("a");b.download="ambientcolors-full.json",b.href=u,b.click()},[s,l]=createSignal([{name:"Shades Corrected (RGB)",swatch:ColorShades()},{name:"Blended (Lab Color Mix)",swatch:ColorMix()},{name:"Relative (HSV & Relative Luminance)",swatch:ColorRelative()},{name:"Brighten and Darken (Legacy)",swatch:ColorLegacy()}]);createEffect(()=>{console.log("master update"),l([{name:"Shades Corrected (RGB)",swatch:ColorShades()},{name:"Blended (Lab Color Mix)",swatch:ColorMix()},{name:"Relative (HSV & Relative Luminance)",swatch:ColorRelative()},{name:"Brighten and Darken (Legacy)",swatch:ColorLegacy()}])});const c=f=>{r(f.target.value)};return[_tmpl$$6.cloneNode(!0),createComponent(Flex,{flexDirection:"row",gap:8,style:{margin:"0 0 24px -2px"},get children(){return[createComponent(Button,{type:"submit",onclick:o,children:"Export colors"}),createComponent(Button,{type:"submit",onclick:i,children:"Export colors (Tailwind)"}),(()=>{const f=_tmpl$2$6.cloneNode(!0);return f.style.setProperty("padding","18px 0 0 12px"),f})(),createComponent(Select,{get value(){return t()},onChange:c,get children(){return[_tmpl$3$6.cloneNode(!0),_tmpl$4$3.cloneNode(!0),_tmpl$5$3.cloneNode(!0),_tmpl$6$2.cloneNode(!0),_tmpl$7$1.cloneNode(!0),_tmpl$8$1.cloneNode(!0),_tmpl$9.cloneNode(!0),_tmpl$10.cloneNode(!0),_tmpl$11.cloneNode(!0),_tmpl$12.cloneNode(!0)]}})]}}),createComponent(SwatchList,{get swatchList(){return s()}}),_tmpl$13.cloneNode(!0)]};function subscribe(t,...r){const n=t.subscribe(...r);return n.unsubscribe?()=>n.unsubscribe():n}function get(t){let r;return subscribe(t,n=>r=n)(),r}class FelteSubmitError extends Error{constructor(r,n){super(r),this.name="FelteSubmitError",this.response=n}}function _some(t,r){return Object.keys(t).some(o=>r(t[o]))}function _mapValues(t,r){return Object.keys(t).reduce((o,i)=>Object.assign(Object.assign({},o),{[i]:r(t[i])}),{})}function _isPlainObject(t){return Object.prototype.toString.call(t)==="[object Object]"}function _cloneDeep(t){return Object.keys(t||{}).reduce((r,n)=>Object.assign(Object.assign({},r),{[n]:_isPlainObject(t[n])?_cloneDeep(t[n]):Array.isArray(t[n])?[...t[n]]:t[n]}),{})}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function __rest$2(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(t);i<o.length;i++)r.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(t,o[i])&&(n[o[i]]=t[o[i]]);return n}function handleArray(t){return function(r){if(_isPlainObject(r)){const n=deepSet(r,t);return __rest$2(n,["key"])}return t}}function deepSet(t,r){return _mapValues(t,n=>_isPlainObject(n)?deepSet(n,r):Array.isArray(n)?n.map(handleArray(r)):r)}function _mergeWith(...t){const r=t.pop(),n=_cloneDeep(t.shift());if(t.length===0)return n;for(const o of t){if(!o)continue;let i=r(n,o);if(typeof i<"u")return i;const s=Array.from(new Set(Object.keys(n).concat(Object.keys(o))));for(const l of s)if(i=r(n[l],o[l]),typeof i<"u")n[l]=i;else if(_isPlainObject(o[l])&&_isPlainObject(n[l]))n[l]=_mergeWith(n[l],o[l],r);else if(Array.isArray(o[l]))n[l]=o[l].map((c,f)=>{if(!_isPlainObject(c))return c;const d=Array.isArray(n[l])?n[l][f]:n[l];return _mergeWith(d,c,r)});else if(_isPlainObject(o[l])){const c=deepSet(_cloneDeep(o[l]),void 0);n[l]=_mergeWith(c,o[l],r)}else typeof o[l]<"u"&&(n[l]=o[l])}return n}function defaultsCustomizer(t,r){if(!(_isPlainObject(t)&&_isPlainObject(r))){if(Array.isArray(r)){if(r.some(_isPlainObject))return;const n=Array.isArray(t)?t:[];return r.map((o,i)=>{var s;return(s=n[i])!==null&&s!==void 0?s:o})}if(typeof t<"u")return t}}function _defaultsDeep(...t){return _mergeWith(...t,defaultsCustomizer)}function _merge(...t){return _mergeWith(...t,()=>{})}function _get(t,r,n){const o=s=>String.prototype.split.call(r,s).filter(Boolean).reduce((l,c)=>l!=null?l[c]:l,t),i=o(/[,[\]]+?/)||o(/[,[\].]+?/);return i===void 0||i===t?n:i}function _update(t,r,n){t&&(t=_cloneDeep(t)),_isPlainObject(t)||(t={});const o=Array.isArray(r)?r:r.match(/[^.[\]]+/g)||[],i=o[o.length-1];if(!i)return t;let s=t;for(let l=0;l<o.length-1;l++){const c=o[l];if(!s[c]||!_isPlainObject(s[c])&&!Array.isArray(s[c])){const f=o[l+1];isNaN(Number(f))?s[c]={}:s[c]=[]}s=s[c]}return s[i]=n(s[i]),t}function _set(t,r,n){return _update(t,r,()=>n)}function _unset(t,r){if(!t||Object(t)!==t)return;typeof t<"u"&&(t=_cloneDeep(t));const n=Array.isArray(r)?r:r.toString().match(/[^.[\]]+/g)||[],o=n.length===1?t:_get(t,n.slice(0,-1).join("."));return Array.isArray(o)?o.splice(Number(n[n.length-1]),1):o==null||delete o[n[n.length-1]],t}function deepSome(t,r){return _some(t,n=>_isPlainObject(n)?deepSome(n,r):Array.isArray(n)?n.length===0||n.every(o=>typeof o=="string")?r(n):n.some(o=>_isPlainObject(o)?deepSome(o,r):r(o)):r(n))}function isInputElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="INPUT"}function isTextAreaElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="TEXTAREA"}function isSelectElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="SELECT"}function isFieldSetElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="FIELDSET"}function isFormControl(t){return isInputElement(t)||isTextAreaElement(t)||isSelectElement(t)}function isElement(t){return t.nodeType===Node.ELEMENT_NODE}function getPath(t,r){return r??(isFormControl(t)?t.name:"")}function shouldIgnore(t){let r=t;for(;r&&r.nodeName!=="FORM";){if(r.hasAttribute("data-felte-ignore"))return!0;r=r.parentElement}return!1}function getValue(t,r){return!_isPlainObject(t)||!r?t:typeof r=="string"?_get(t,r):r(t)}function executeCustomizer(t,r){if(!(_isPlainObject(t)||_isPlainObject(r))){if(t===null||t==="")return r;if(r===null||r===""||!r)return t;if(!(!t||!r)){if(Array.isArray(t)){if(!Array.isArray(r))return[...t,r];const n=[],o=Math.max(r.length,t.length);for(let i=0;i<o;i++){let s=t[i],l=r[i];!_isPlainObject(s)&&!_isPlainObject(l)?(Array.isArray(s)||(s=[s]),Array.isArray(l)||(l=[l]),n.push(...s,...l)):n.push(mergeErrors([s??{},l??{}]))}return n.filter(Boolean)}return Array.isArray(r)||(r=[r]),[t,...r].reduce((n,o)=>n.concat(o),[]).filter(Boolean)}}}function mergeErrors(t){return _mergeWith(...t,executeCustomizer)}function runValidations(t,r){return r?(Array.isArray(r)?r:[r]).map(o=>o(t)):[]}function executeTransforms(t,r){return r?Array.isArray(r)?r.reduce((n,o)=>o(n),t):r(t):t}function createId(t=8){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";for(let o=0;o<t;o++)n+=r.charAt(Math.floor(Math.random()*r.length));return n}function isEqual(t,r){if(t===r)return!0;if(Array.isArray(t)&&Array.isArray(r))return t.length!==r.length?!1:t.every((n,o)=>isEqual(n,r[o]));if(_isPlainObject(t)&&_isPlainObject(r)){const n=Object.keys(t),o=Object.keys(r);return n.length!==o.length?!1:n.every(i=>isEqual(t[i],r[i]))}return!1}function debounce(t,r,{onInit:n,onEnd:o}={}){let i;return(...s)=>{i||n?.(),i&&clearTimeout(i),i=setTimeout(()=>{t.apply(this,s),i=void 0,o?.()},r)}}function getFormControls(t){if(isFormControl(t))return[t];if(t.childElementCount===0)return[];const r=new Set;for(const n of t.children){if(isFormControl(n)&&r.add(n),isFieldSetElement(n))for(const o of n.elements)isFormControl(o)&&r.add(o);n.childElementCount>0&&getFormControls(n).forEach(o=>r.add(o))}return Array.from(r)}function addAttrsFromFieldset(t){for(const r of t.elements)!isFormControl(r)&&!isFieldSetElement(r)||t.hasAttribute("data-felte-keep-on-remove")&&!r.hasAttribute("data-felte-keep-on-remove")&&(r.dataset.felteKeepOnRemove=t.dataset.felteKeepOnRemove)}function getInputTextOrNumber(t){return t.type.match(/^(number|range)$/)?t.value?+t.value:void 0:t.value}function getFormDefaultValues(t){var r;let n={},o={};for(const i of t.elements){if(isFieldSetElement(i)&&addAttrsFromFieldset(i),!isFormControl(i)||!i.name)continue;const s=getPath(i);if(isInputElement(i)){if(i.type==="checkbox"){if(typeof _get(n,s)>"u"){if(Array.from(t.querySelectorAll(`[name="${i.name}"]`)).filter(f=>isFormControl(f)?s===getPath(f):!1).length===1){n=_set(n,s,i.checked),o=_set(o,s,!1);continue}n=_set(n,s,i.checked?[i.value]:[]),o=_set(o,s,!1);continue}Array.isArray(_get(n,s))&&i.checked&&(n=_update(n,s,c=>[...c,i.value]));continue}if(i.type==="radio"){if(_get(n,s))continue;n=_set(n,s,i.checked?i.value:void 0),o=_set(o,s,!1);continue}if(i.type==="file"){n=_set(n,s,i.multiple?Array.from(i.files||[]):(r=i.files)===null||r===void 0?void 0:r[0]),o=_set(o,s,!1);continue}}else if(isSelectElement(i)){if(!i.multiple)n=_set(n,s,i.value);else{const f=Array.from(i.options).filter(d=>d.selected).map(d=>d.value);n=_set(n,s,f)}o=_set(o,s,!1);continue}const l=getInputTextOrNumber(i);n=_set(n,s,l),o=_set(o,s,!1)}return{defaultData:n,defaultTouched:o}}function setControlValue(t,r){var n;if(!isFormControl(t))return;const o=r;if(isInputElement(t)){if(t.type==="checkbox"){const i=o;if(typeof i>"u"||typeof i=="boolean"){t.checked=!!i;return}Array.isArray(i)&&(i.includes(t.value)?t.checked=!0:t.checked=!1);return}if(t.type==="radio"){const i=o;t.value===i?t.checked=!0:t.checked=!1;return}if(t.type==="file"){t.files=null,t.value="";return}}else if(isSelectElement(t)){if(t.multiple){if(Array.isArray(o)){t.value=String((n=o[0])!==null&&n!==void 0?n:"");for(const s of t.options)o.includes(s.value)?s.selected=!0:s.selected=!1}}else{t.value=String(o??"");for(const s of t.options)s.value===o?s.selected=!0:s.selected=!1}return}t.value=String(o??"")}function setForm(t,r){for(const n of t.elements){if(isFieldSetElement(n)&&addAttrsFromFieldset(n),!isFormControl(n)||!n.name)continue;const o=getPath(n);setControlValue(n,_get(r,o))}}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function __rest$1(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(t);i<o.length;i++)r.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(t,o[i])&&(n[o[i]]=t[o[i]]);return n}function deepSetTouched(t,r){return _mapValues(t,n=>_isPlainObject(n)?deepSetTouched(n,r):Array.isArray(n)?n.length===0||n.every(o=>typeof o=="string")?r:n.map(o=>{const i=deepSetTouched(o,r);return __rest$1(i,["key"])}):r)}function deepSetKey(t){return t?_mapValues(t,r=>_isPlainObject(r)?deepSetKey(r):Array.isArray(r)?r.length===0||r.every(n=>typeof n=="string")?r:r.map(n=>{if(!_isPlainObject(n))return n;const o=deepSetKey(n);return o.key||(o.key=createId()),o}):r):{}}function deepRemoveKey(t){return t?_mapValues(t,r=>_isPlainObject(r)?deepSetKey(r):Array.isArray(r)?r.length===0||r.every(n=>typeof n=="string")?r:r.map(n=>{if(!_isPlainObject(n))return n;const o=deepSetKey(n);return __rest$1(o,["key"])}):r):{}}function createEventConstructors(){class t extends CustomEvent{constructor(i){super("feltesuccess",{detail:i})}}class r extends CustomEvent{constructor(i){super("felteerror",{detail:i,cancelable:!0})}setErrors(i){this.preventDefault(),this.errors=i}}class n extends Event{constructor(){super("feltesubmit",{cancelable:!0})}handleSubmit(i){this.onSubmit=i}handleError(i){this.onError=i}handleSuccess(i){this.onSuccess=i}}return{createErrorEvent:o=>new r(o),createSubmitEvent:()=>new n,createSuccessEvent:o=>new t(o)}}function createDefaultSubmitHandler(t){if(!!t)return async function(){let n=new FormData(t);const o=new URL(t.action),i=t.method.toLowerCase()==="get"?"get":o.searchParams.get("_method")||t.method;let s=t.enctype;t.querySelector('input[type="file"]')&&(s="multipart/form-data"),(i==="get"||s==="application/x-www-form-urlencoded")&&(n=new URLSearchParams(n));let l;i==="get"?(n.forEach((f,d)=>{o.searchParams.append(d,f)}),l={method:i,headers:{Accept:"application/json"}}):l={method:i,body:n,headers:{"Content-Type":s,Accept:"application/json"}};const c=await window.fetch(o.toString(),l);if(c.ok)return c;throw new FelteSubmitError("An error occurred while submitting the form",c)}}function addAtIndex(t,r,n,o){return _update(t,r,i=>(typeof i<"u"&&!Array.isArray(i)||(i||(i=[]),typeof o>"u"?i.push(n):i.splice(o,0,n)),i))}function swapInArray(t,r,n,o){return _update(t,r,i=>(!i||!Array.isArray(i)||([i[n],i[o]]=[i[o],i[n]]),i))}function moveInArray(t,r,n,o){return _update(t,r,i=>(!i||!Array.isArray(i)||i.splice(o,0,i.splice(n,1)[0]),i))}function isUpdater(t){return typeof t=="function"}function createSetHelper(t){return(n,o)=>{if(typeof n=="string"){const i=n;t(s=>{const l=isUpdater(o)?o(_get(s,i)):o;return _set(s,i,l)})}else t(i=>isUpdater(n)?n(i):n)}}function createHelpers({stores:t,config:r,validateErrors:n,validateWarnings:o,_getCurrentExtenders:i}){var s;let l,c=deepSetKey((s=r.initialValues)!==null&&s!==void 0?s:{});const{data:f,touched:d,errors:u,warnings:b,isDirty:v,isSubmitting:S,interacted:m}=t,y=createSetHelper(f.update),x=createSetHelper(d.update),w=createSetHelper(u.update),K=createSetHelper(b.update);function I(p){y(C=>{const A=p(C);return l&&setForm(l,A),A})}const E=(p,C,A)=>{createSetHelper(I)(p,C),typeof p=="string"&&A&&x(p,!0)};function V(p,C,A){const N=_isPlainObject(C)?deepSetTouched(C,!1):!1,L=_isPlainObject(N)?deepSet(N,[]):[];C=_isPlainObject(C)?Object.assign(Object.assign({},C),{key:createId()}):C,u.update(T=>addAtIndex(T,p,L,A)),b.update(T=>addAtIndex(T,p,L,A)),d.update(T=>addAtIndex(T,p,N,A)),f.update(T=>{const X=addAtIndex(T,p,C,A);return setTimeout(()=>l&&setForm(l,X)),X})}function F(p){u.update(p),b.update(p),d.update(p),f.update(C=>{const A=p(C);return setTimeout(()=>l&&setForm(l,A)),A})}function W(p){F(C=>_unset(C,p))}function J(p,C,A){F(N=>swapInArray(N,p,C,A))}function D(p,C,A){F(N=>moveInArray(N,p,C,A))}function Q(p){const C=_get(c,p),A=_isPlainObject(C)?deepSetTouched(C,!1):!1,N=_isPlainObject(A)?deepSet(A,[]):[];f.update(L=>{const T=_set(L,p,C);return l&&setForm(l,T),T}),d.update(L=>_set(L,p,A)),u.update(L=>_set(L,p,N)),b.update(L=>_set(L,p,N))}const $=createSetHelper(S.update),M=createSetHelper(v.update),ee=createSetHelper(m.update);async function ne(){const p=get(f);d.set(deepSetTouched(p,!0)),m.set(null);const C=await n(p);return await o(p),C}function oe(){E(_cloneDeep(c)),x(p=>deepSet(p,!1)),m.set(null),v.set(!1)}function k(p){return async function(A){var N,L,T,X,ie,ce,ue;const{createErrorEvent:fe,createSubmitEvent:be,createSuccessEvent:g}=createEventConstructors(),a=be();l?.dispatchEvent(a);const h=(L=(N=a.onError)!==null&&N!==void 0?N:p?.onError)!==null&&L!==void 0?L:r.onError,_=(X=(T=a.onSuccess)!==null&&T!==void 0?T:p?.onSuccess)!==null&&X!==void 0?X:r.onSuccess,H=(ue=(ce=(ie=a.onSubmit)!==null&&ie!==void 0?ie:p?.onSubmit)!==null&&ce!==void 0?ce:r.onSubmit)!==null&&ue!==void 0?ue:createDefaultSubmitHandler(l);if(!H||(A?.preventDefault(),a.defaultPrevented))return;S.set(!0),m.set(null);const G=deepRemoveKey(get(f)),le=await n(G,p?.validate),q=await o(G,p?.warn);if(q&&b.set(_merge(deepSet(G,[]),q)),d.set(deepSetTouched(G,!0)),le&&(d.set(deepSetTouched(le,!0)),deepSome(le,j=>Array.isArray(j)?j.length>=1:!!j))){await new Promise(j=>setTimeout(j)),i().forEach(j=>{var z;return(z=j.onSubmitError)===null||z===void 0?void 0:z.call(j,{data:G,errors:le})}),S.set(!1);return}const re={setFields:E,setData:y,setTouched:x,setErrors:w,setWarnings:K,unsetField:W,addField:V,resetField:Q,reset:oe,setInitialValues:te.setInitialValues,moveField:D,swapFields:J,form:l,controls:l&&Array.from(l.elements).filter(isFormControl),config:Object.assign(Object.assign({},r),p)};try{const Z=await H(G,re);l?.dispatchEvent(g(Object.assign({response:Z},re))),await _?.(Z,re)}catch(Z){const j=fe(Object.assign({error:Z},re));if(l?.dispatchEvent(j),!h&&!j.defaultPrevented)throw Z;if(!h&&!j.errors)return;const z=j.errors||await h?.(Z,re);z&&(d.set(deepSetTouched(z,!0)),u.set(z),await new Promise(de=>setTimeout(de)),i().forEach(de=>{var he;return(he=de.onSubmitError)===null||he===void 0?void 0:he.call(de,{data:G,errors:get(u)})}))}finally{S.set(!1)}}}const te={setData:y,setFields:E,setTouched:x,setErrors:w,setWarnings:K,setIsSubmitting:$,setIsDirty:M,setInteracted:ee,validate:ne,reset:oe,unsetField:W,resetField:Q,addField:V,swapFields:J,moveField:D,createSubmitHandler:k,handleSubmit:k(),setInitialValues:p=>{c=deepSetKey(p)}};return{public:te,private:{_setFormNode(p){l=p},_getInitialValues:()=>c}}}function createFormAction({helpers:t,stores:r,config:n,extender:o,createSubmitHandler:i,handleSubmit:s,_setFormNode:l,_getInitialValues:c,_setCurrentExtenders:f,_getCurrentExtenders:d}){const{setFields:u,setTouched:b,reset:v,setInitialValues:S}=t,{addValidator:m,addTransformer:y,validate:x}=t,{data:w,errors:K,warnings:I,touched:E,isSubmitting:V,isDirty:F,interacted:W,isValid:J,isValidating:D}=r;function Q($){$.requestSubmit||($.requestSubmit=s);function M(g){return function(a){return a({form:$,stage:g,controls:Array.from($.elements).filter(isFormControl),data:w,errors:K,warnings:I,touched:E,isValid:J,isValidating:D,isSubmitting:V,isDirty:F,interacted:W,config:n,addValidator:m,addTransformer:y,setFields:u,validate:x,reset:v,createSubmitHandler:i,handleSubmit:s})}}f(o.map(M("MOUNT"))),$.noValidate=!!n.validate;const{defaultData:ee,defaultTouched:ne}=getFormDefaultValues($);l($),S(_merge(_cloneDeep(ee),c())),u(c()),E.set(ne);function oe(g){const a=getPath(g),h=Array.from($.querySelectorAll(`[name="${g.name}"]`)).filter(_=>isFormControl(_)?a===getPath(_):!1);if(h.length!==0)return h.length===1?w.update(_=>_set(_,getPath(g),g.checked)):w.update(_=>_set(_,getPath(g),h.filter(isInputElement).filter(H=>H.checked).map(H=>H.value)))}function k(g){const a=$.querySelectorAll(`[name="${g.name}"]`),h=Array.from(a).find(_=>isInputElement(_)&&_.checked);w.update(_=>_set(_,getPath(g),h?.value))}function te(g){var a;const h=Array.from((a=g.files)!==null&&a!==void 0?a:[]);w.update(_=>_set(_,getPath(g),g.multiple?h:h[0]))}function se(g){if(!g.multiple)w.update(a=>_set(a,getPath(g),g.value));else{const a=Array.from(g.options).filter(h=>h.selected).map(h=>h.value);w.update(h=>_set(h,getPath(g),a))}}function p(g){const a=g.target;if(!a||!isFormControl(a)||isSelectElement(a)||shouldIgnore(a)||["checkbox","radio","file"].includes(a.type)||!a.name)return;F.set(!0);const h=getInputTextOrNumber(a);W.set(a.name),w.update(_=>_set(_,getPath(a),h))}function C(g){const a=g.target;if(!(!a||!isFormControl(a)||shouldIgnore(a))&&!!a.name)if(b(getPath(a),!0),W.set(a.name),(isSelectElement(a)||["checkbox","radio","file","hidden"].includes(a.type))&&F.set(!0),a.type==="hidden"&&w.update(h=>_set(h,getPath(a),a.value)),isSelectElement(a))se(a);else if(isInputElement(a))a.type==="checkbox"?oe(a):a.type==="radio"?k(a):a.type==="file"&&te(a);else return}function A(g){const a=g.target;!a||!isFormControl(a)||shouldIgnore(a)||!a.name||(b(getPath(a),!0),W.set(a.name))}function N(g){g.preventDefault(),v()}const L={childList:!0,subtree:!0};function T(g){let a=get(w),h=get(E),_=get(K),H=get(I);for(const G of g.reverse()){if(G.hasAttribute("data-felte-keep-on-remove")&&G.dataset.felteKeepOnRemove!=="false")continue;const le=/.*(\[[0-9]+\]|\.[0-9]+)\.[^.]+$/;let q=getPath(G);const re=get(E);if(le.test(q)){const j=q.split(".").slice(0,-1).join("."),z=_get(re,j);_isPlainObject(z)&&Object.keys(z).length<=1&&(q=j)}a=_unset(a,q),h=_unset(h,q),_=_unset(_,q),H=_unset(H,q)}w.set(a),E.set(h),K.set(_),I.set(H)}const X=debounce(()=>{d().forEach(h=>{var _;return(_=h.destroy)===null||_===void 0?void 0:_.call(h)}),f(o.map(M("UPDATE")));const{defaultData:g,defaultTouched:a}=getFormDefaultValues($);w.update(h=>_defaultsDeep(h,g)),E.update(h=>_defaultsDeep(h,a))},0);let ie=[];const ce=debounce(()=>{d().forEach(g=>{var a;return(a=g.destroy)===null||a===void 0?void 0:a.call(g)}),f(o.map(M("UPDATE"))),T(ie),ie=[]},0);function ue(g){for(const a of g)if(a.type==="childList"){if(a.addedNodes.length>0){if(!Array.from(a.addedNodes).some(_=>isElement(_)?isFormControl(_)?!0:getFormControls(_).length>0:!1))continue;X()}if(a.removedNodes.length>0)for(const h of a.removedNodes){if(!isElement(h))continue;const _=getFormControls(h);_.length!==0&&(ie.push(..._),ce())}}}const fe=new MutationObserver(ue);fe.observe($,L),$.addEventListener("input",p),$.addEventListener("change",C),$.addEventListener("focusout",A),$.addEventListener("submit",s),$.addEventListener("reset",N);const be=K.subscribe(g=>{for(const a of $.elements){if(!isFormControl(a)||!a.name)continue;const h=_get(g,getPath(a)),_=Array.isArray(h)?h.join(`
`):typeof h=="string"?h:void 0;_!==a.dataset.felteValidationMessage&&(_?(a.dataset.felteValidationMessage=_,a.setAttribute("aria-invalid","true")):(delete a.dataset.felteValidationMessage,a.removeAttribute("aria-invalid")))}});return{destroy(){fe.disconnect(),$.removeEventListener("input",p),$.removeEventListener("change",C),$.removeEventListener("focusout",A),$.removeEventListener("submit",s),$.removeEventListener("reset",N),be(),d().forEach(g=>{var a;return(a=g.destroy)===null||a===void 0?void 0:a.call(g)})}}}return{form:Q}}function createValidationController(t){const r={aborted:!1,priority:t};return{signal:r,abort(){r.aborted=!0}}}function errorFilterer(t,r){if(_isPlainObject(t))return!r||_isPlainObject(r)&&Object.keys(r).length===0?deepSet(t,null):void 0;if(Array.isArray(t)){if(t.some(_isPlainObject))return;const n=Array.isArray(r)?r:[];return t.map((o,i)=>{const s=n[i];return Array.isArray(s)&&s.length===0?null:o&&s||null})}return Array.isArray(r)&&r.length===0?null:Array.isArray(r)?t?r:null:t&&r?[r]:null}function warningFilterer(t,r){if(_isPlainObject(t))return!r||_isPlainObject(r)&&Object.keys(r).length===0?deepSet(t,null):void 0;if(Array.isArray(t)){if(t.some(_isPlainObject))return;const n=Array.isArray(r)?r:[];return t.map((o,i)=>{const s=n[i];return Array.isArray(s)&&s.length===0?null:s||null})}return Array.isArray(r)&&r.length===0?null:Array.isArray(r)?r:r?[r]:null}function filterErrors([t,r]){return _mergeWith(r,t,errorFilterer)}function filterWarnings([t,r]){return _mergeWith(r,t,warningFilterer)}function createDerivedFactory(t){return function(n,o,i){const s=Array.isArray(n)?n:[n],l=new Array(s.length),c=t(i),f=c.set,d=c.subscribe;let u;function b(){u=s.map((S,m)=>S.subscribe(y=>{l[m]=y,f(o(l))}))}function v(){u?.forEach(S=>S())}return c.subscribe=function(m){const y=d(m);return()=>{y()}},[c,b,v]}}function createStores(t,r){var n,o,i,s,l,c,f,d,u;const b=createDerivedFactory(t),v=r.initialValues=r.initialValues?deepSetKey(executeTransforms(_cloneDeep(r.initialValues),r.transform)):{},S=deepSetTouched(deepRemoveKey(v),!1),m=t(S),y=t(0),[x,w,K]=b([m,y],([O,P])=>deepSome(O,U=>!!U)&&P>=1,!1);delete x.set,delete x.update;function I(O){let P;return async function(U,Y,B,pe=!1){if(!B||!U)return;let ae=Y&&Object.keys(Y).length>0?Y:deepSet(U,[]);const me=createValidationController(pe);if((!P?.signal.priority||pe)&&(P?.abort(),P=me),P.signal.priority&&!pe)return;y.update(ge=>ge+1);const ye=runValidations(U,B);return ye.forEach(async ge=>{const _e=await ge;me.signal.aborted||(ae=mergeErrors([ae,_e]),O.set(ae))}),await Promise.all(ye),P=void 0,y.update(ge=>ge-1),ae}}let E=deepSet(S,[]);const V=t(v),F=deepSet(S,[]),W=t(F),J=t(_cloneDeep(F)),[D,Q,$]=b([W,J],mergeErrors,_cloneDeep(F)),M=deepSet(S,[]),ee=t(M),ne=t(_cloneDeep(M)),[oe,k,te]=b([ee,ne],mergeErrors,_cloneDeep(M)),[se,p,C]=b([D,m],filterErrors,_cloneDeep(F)),[A,N,L]=b([oe,m],filterWarnings,_cloneDeep(M));let T=!1;const[X,ie,ce]=b(D,([O])=>{var P;return T?!deepSome(O,R=>Array.isArray(R)?R.length>=1:!!R):(T=!0,!r.validate&&!(!((P=r.debounced)===null||P===void 0)&&P.validate))},!r.validate&&!(!((n=r.debounced)===null||n===void 0)&&n.validate));delete X.set,delete X.update;const ue=t(!1),fe=t(!1),be=t(null),g=I(W),a=I(ee),h=I(J),_=I(ne),H=debounce(h,(l=(i=(o=r.debounced)===null||o===void 0?void 0:o.validateTimeout)!==null&&i!==void 0?i:(s=r.debounced)===null||s===void 0?void 0:s.timeout)!==null&&l!==void 0?l:300,{onInit:()=>{y.update(O=>O+1)},onEnd:()=>{y.update(O=>O-1)}}),G=debounce(_,(u=(f=(c=r.debounced)===null||c===void 0?void 0:c.warnTimeout)!==null&&f!==void 0?f:(d=r.debounced)===null||d===void 0?void 0:d.timeout)!==null&&u!==void 0?u:300);async function le(O,P){var R;const U=deepRemoveKey(O),Y=g(U,E,P??r.validate,!0);if(P)return Y;const B=h(U,E,(R=r.debounced)===null||R===void 0?void 0:R.validate,!0);return mergeErrors(await Promise.all([Y,B]))}async function q(O,P){var R;const U=deepRemoveKey(O),Y=a(U,E,P??r.warn,!0);if(P)return Y;const B=_(U,E,(R=r.debounced)===null||R===void 0?void 0:R.warn,!0);return mergeErrors(await Promise.all([Y,B]))}let re=F,Z=M;function j(){const O=V.subscribe(B=>{var pe,ae;const me=deepRemoveKey(B);g(me,E,r.validate),a(me,E,r.warn),H(me,E,(pe=r.debounced)===null||pe===void 0?void 0:pe.validate),G(me,E,(ae=r.debounced)===null||ae===void 0?void 0:ae.warn)}),P=m.subscribe(B=>{E=deepSet(B,[])}),R=D.subscribe(B=>{re=B}),U=oe.subscribe(B=>{Z=B});Q(),ie(),k(),p(),N(),w();function Y(){O(),C(),$(),te(),L(),ce(),K(),P(),R(),U()}return Y}function z(O){W.set(O(re)),J.set({})}function de(O){ee.set(O(Z)),ne.set({})}function he(O){z(()=>O)}function ve(O){de(()=>O)}return se.set=he,se.update=z,A.set=ve,A.update=de,{data:V,errors:se,warnings:A,touched:m,isValid:X,isSubmitting:ue,isDirty:fe,isValidating:x,interacted:be,validateErrors:le,validateWarnings:q,cleanup:r.preventStoreStart?()=>{}:j(),start:j}}function createForm$1(t,r){var n,o;(n=t.extend)!==null&&n!==void 0||(t.extend=[]),(o=t.debounced)!==null&&o!==void 0||(t.debounced={}),t.validate&&!Array.isArray(t.validate)&&(t.validate=[t.validate]),t.debounced.validate&&!Array.isArray(t.debounced.validate)&&(t.debounced.validate=[t.debounced.validate]),t.transform&&!Array.isArray(t.transform)&&(t.transform=[t.transform]),t.warn&&!Array.isArray(t.warn)&&(t.warn=[t.warn]),t.debounced.warn&&!Array.isArray(t.debounced.warn)&&(t.debounced.warn=[t.debounced.warn]);function i(k,{debounced:te,level:se}={debounced:!1,level:"error"}){var p;const C=se==="error"?"validate":"warn";(p=t.debounced)!==null&&p!==void 0||(t.debounced={});const A=te?t.debounced:t;A[C]?A[C]=[...A[C],k]:A[C]=[k]}function s(k){t.transform?t.transform=[...t.transform,k]:t.transform=[k]}const l=Array.isArray(t.extend)?t.extend:[t.extend];let c=[];const f=()=>c,d=k=>{c=k},{isSubmitting:u,isValidating:b,data:v,errors:S,warnings:m,touched:y,isValid:x,isDirty:w,cleanup:K,start:I,validateErrors:E,validateWarnings:V,interacted:F}=createStores(r.storeFactory,t),W=v.update,J=v.set,D=k=>W(te=>deepSetKey(executeTransforms(k(te),t.transform))),Q=k=>J(deepSetKey(executeTransforms(k,t.transform)));v.update=D,v.set=Q;const $=createHelpers({extender:l,config:t,addValidator:i,addTransformer:s,validateErrors:E,validateWarnings:V,_getCurrentExtenders:f,stores:{data:v,errors:S,warnings:m,touched:y,isValid:x,isValidating:b,isSubmitting:u,isDirty:w,interacted:F}}),{createSubmitHandler:M,handleSubmit:ee}=$.public;c=l.map(k=>k({stage:"SETUP",errors:S,warnings:m,touched:y,data:v,isDirty:w,isValid:x,isValidating:b,isSubmitting:u,interacted:F,config:t,addValidator:i,addTransformer:s,setFields:$.public.setFields,reset:$.public.reset,validate:$.public.validate,handleSubmit:ee,createSubmitHandler:M}));const ne=Object.assign({config:t,stores:{data:v,touched:y,errors:S,warnings:m,isSubmitting:u,isValidating:b,isValid:x,isDirty:w,interacted:F},createSubmitHandler:M,handleSubmit:ee,helpers:Object.assign(Object.assign({},$.public),{addTransformer:s,addValidator:i}),extender:l,_getCurrentExtenders:f,_setCurrentExtenders:d},$.private),{form:oe}=createFormAction(ne);return Object.assign({data:v,errors:S,warnings:m,touched:y,isValid:x,isSubmitting:u,isValidating:b,isDirty:w,interacted:F,form:oe,cleanup:K,startStores:I},$.public)}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function __rest(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(t);i<o.length;i++)r.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(t,o[i])&&(n[o[i]]=t[o[i]]);return n}function createAccessor(t){const r={},n={};function o(i){if(!i)return t();if(!r[i.toString()]){const l=createSignal(getValue(untrack(t),i));n[i.toString()]=l,r[i.toString()]=i}const[s]=n[i.toString()];return s()}return createEffect(()=>{const i=t(),s=Object.keys(r);for(const l of s){const c=r[l],f=getValue(i,c),[d,u]=n[c.toString()];isEqual(f,untrack(d))||u(f)}}),o}function createSubscriber(t){return function(n){return createRoot(o=>(createEffect(()=>n(t())),o))}}const storeFactory=t=>{const[r,n]=createSignal(t);function o(c){n(()=>c)}function i(c){n(c)}const s=createAccessor(r),l=createSubscriber(r);return s.subscribe=l,s.set=o,s.update=i,s};function createForm(t){const r=createForm$1(t??{},{storeFactory}),{form:n,cleanup:o,startStores:i,data:s,errors:l,warnings:c,touched:f}=r,d=__rest(r,["form","cleanup","startStores","data","errors","warnings","touched"]);function u(b){const{destroy:v}=n(b);return onCleanup(v),{destroy:v}}return onCleanup(o),Object.assign(Object.assign({},d),{data:s,errors:l,warnings:c,touched:f,form:u})}const _tmpl$$5=template('<form><a><i class="bi bi-plus-circle-fill"></i> Add Color</a></form>'),_tmpl$2$5=template('<i class="bi bi-cloud-arrow-down-fill"></i>'),_tmpl$3$5=template('<label><input type="file"><i class="bi bi-cloud-arrow-up-fill"></i> Import Color Set</label>'),_tmpl$4$2=template("<div></div>"),_tmpl$5$2=template("<label></label>"),_tmpl$6$1=template('<div class="form-element"><label for="colorName">Name</label><input type="text"></div>'),_tmpl$7=template('<div class="form-element"><label for="colorHEX">HEX</label><input type="text" maxlength="7" style="text-transform:uppercase"></div>'),_tmpl$8=template('<a><i class="bi bi-trash3-fill"></i></a>'),ColorSelector=()=>{const[colors,setColors]=createSignal(Object.entries(colorScale())),[jsonFile,setJsonFile]=createSignal(),addColor=()=>{setColors([...colors(),["NAME","#ffffff"]])},removeColor=t=>{setColors([...colors().slice(0,t),...colors().slice(t+1)])},FormGroup=styled("div")`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    .form-element {
      display: flex;
      flex-direction: row;
      width: auto;
      align-items: center;
      position: relative;
      margin-left: 4px;
      label {
        width: 50px;
        position: absolute;
        padding: 4px;
        padding-left: 8px;
        background-color: rgba(255, 255, 255, 0.14);
        left: 1px;
        border-radius: 2px 0 0 2px;
      }
      input {
        padding: 4px 8px;
        padding-left: 60px;
        background-color:rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: white;
        border-radius: 3px;
        outline: none;
        width: 180px;
        &:focus {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
          font-weight: bold;
        }
        @media only screen and (max-width: 472px) {
        & {
            width: 120px;
          }
        }
      }
    }
  `,arrToObj=t=>{let r={};for(let n=0;n<t.length;n+=2)r[t[n]]=t[n+1];return r},arrToArr=t=>{let r=[];for(let n=0;n<t.length;n+=2)r.push(t[n]);return r},{form,data,errors,isSubmitting,isValid}=createForm({onSubmit:t=>{setColorScale(arrToObj(Object.values(t)))},validate:t=>{const r={};let n=arrToArr(Object.values(t));return n.length!==new Set(n).size&&(r.duplicate="There are duplicates in the color names!"),isSubmitting&&!isValid&&(console.log("wow"),toast.custom(o=>createComponent(Toast,{color:"error",showExit:!0,toast:o,children:"Something Happened"})),console.log("lmao")),r}});createEffect(()=>{setColors(Object.entries(colorScale()))});const fileDownload=()=>{const t=JSON.stringify(colorScale()),r=new Blob([t],{type:"text/plain"}),n=URL.createObjectURL(r),o=document.createElement("a");o.download="ambientcolors.json",o.href=n,o.click()},fileChange=e=>{const fileReader=new FileReader;fileReader.readAsText(e.target.files[0]),fileReader.onload=e=>{setJsonFile(eval(`(${e.target?.result})`)),setColors(Object.entries(jsonFile()))}};return[(()=>{const t=_tmpl$$5.cloneNode(!0),r=t.firstChild;return form(t,()=>!0),t.style.setProperty("display","flex"),t.style.setProperty("flex-direction","column"),t.style.setProperty("gap","8px"),t.style.setProperty("padding","4px 0 8px 0"),t.style.setProperty("align-items","flex-start"),insert(t,createComponent(For,{get each(){return colors()},children:([n,o],i)=>createComponent(FormGroup,{get children(){return[(()=>{const s=_tmpl$4$2.cloneNode(!0);return s.style.setProperty("width","12px"),insert(s,()=>i()+1),s})(),(()=>{const s=_tmpl$5$2.cloneNode(!0);return insert(s,createComponent(ColorIdentifier,{get color(){return colors()[i()][1]}})),s})(),(()=>{const s=_tmpl$6$1.cloneNode(!0),l=s.firstChild,c=l.nextSibling;return c.value=n,createRenderEffect(()=>setAttribute(c,"name",`colorName${i()}`)),s})(),(()=>{const s=_tmpl$7.cloneNode(!0),l=s.firstChild,c=l.nextSibling;return c.value=o,createRenderEffect(()=>setAttribute(c,"name",`colorHEX${i()}`)),s})(),(()=>{const s=_tmpl$8.cloneNode(!0);return s.$$click=()=>removeColor(i()),s})()]}})}),r),r.$$click=()=>addColor(),insert(t,createComponent(Button,{type:"submit",children:"Generate Color Set"}),null),t})(),createComponent(Flex,{flexDirection:"row",gap:12,style:{"padding-bottom":"20px"},get children(){return[createComponent(Button,{type:"submit",onclick:fileDownload,get children(){return[_tmpl$2$5.cloneNode(!0)," Export Color Set"]}}),createComponent(Button,{type:"submit",get children(){const t=_tmpl$3$5.cloneNode(!0),r=t.firstChild;return t.style.setProperty("font-weight","bold"),t.style.setProperty("cursor","pointer"),r.addEventListener("change",fileChange),r.style.setProperty("display","none"),t}})]}})]};delegateEvents(["click"]);const LuminanceCalc=t=>(chroma(t).luminance()*100).toFixed(2),normalize=(t,r,n)=>(t-n)/(r-n),normalizeArr=(t,r)=>{const n={},o=Object.values(t),i=o[Math.floor(o.length/2)],s=Math.min(...o),l=Math.max(...o),c=Object.entries(t);let f=0;if(r=="to-primary")for(var[d,u]of c)f>Math.floor(o.length/2)&&(n[d]=Number(normalize(u,i,s).toFixed(2))*.5),f==Math.floor(o.length/2)&&(n[d]=.5),f<Math.floor(o.length/2)&&(n[d]=Number(normalize(u,l,i).toFixed(2))*.5+.5),f+=1;if(r=="to-min-max")for(var[d,u]of c)n[d]=Number(normalize(u,l,s).toFixed(2));if(r=="none")for(var[d,u]of c)n[d]=Number((u/100).toFixed(2));return n},relativeLuminanceCalc=(t,r)=>{const n={};for(var o of Object.values(t))n[o]=Number(LuminanceCalc(o));return normalizeArr(n,r)},_tmpl$$4=template('<div class="start"><p>1</p></div>'),_tmpl$2$4=template('<div class="end"><p>0</p></div>'),_tmpl$3$4=template("<br>"),ColorGraph=t=>{const r=()=>t.colorSwatch,n=()=>t.displayType,[o,i]=createSignal(relativeLuminanceCalc(r(),n()));createEffect(()=>{i(relativeLuminanceCalc(r(),n()))});const s=styled("p")`
    margin-top: -22px;
    font-size: 10px;
    opacity: 0;
    transition: opacity 100ms ease-in-out;
    line-height: 2;
    &:hover {
      opacity: 1;
    }
  `,l=styled("div")`
    width: 100%;
    height: 1px;
    background-color: rgba(256, 256, 256, 0.14);
    margin-top: 8px;
    display: flex;
    justify-content: space-between;

    .start, .end {
      height: 10px;
      margin-top: -4px;
      p {
        margin-top: -4px;
      }
    }

    .start{
      border-left: 1px solid rgba(256, 256, 256, 0.14);
      margin-left: -1px;
      p {
        margin-left: -28px;
      }
    }

    .end {
      border-right: 1px solid rgba(256, 256, 256, 0.14);
      margin-right: -1px;
      p {
        transform: translateX(28px);
      }
    }
  `;return createComponent(Flex,{style:{width:"100%",height:"33px",position:"relative","padding-top":"16px",cursor:"crosshair"},get children(){return[createComponent(l,{get children(){return[_tmpl$$4.cloneNode(!0),_tmpl$2$4.cloneNode(!0)]}}),createComponent(For,{get each(){return Object.entries(o())},children:([c,f],d)=>createComponent(ColorIdentifier,{color:c,style:{position:"absolute",left:`calc(${100-f*100}% - 8px)`},get children(){return createComponent(s,{get children(){return[c,_tmpl$3$4.cloneNode(!0),_tmpl$3$4.cloneNode(!0),f]}})}})})]}})},_tmpl$$3=template("<br>"),_tmpl$2$3=template('<option value="to-primary" selected>Primary Normalization (Recommended)</option>'),_tmpl$3$3=template('<option value="to-min-max">Min Max Normalization</option>'),_tmpl$4$1=template('<option value="none">No Normalization</option>'),_tmpl$5$1=template("<p>Graph Normalization Techniques:<br><strong>No Normalization:</strong> All colors represent the raw 0 to 1 value in luminance.<br><strong>Min Max Normalization:</strong> All data is normalized to min and max of each color group from 0 to 1.<br><strong>Primary Normalization (Recommended):</strong> Luminance values are normalized based on the primary color's luminance value as 0.5 (center).</p>"),GraphList=t=>{const r=()=>t.colorSwatch,[n,o]=createSignal("to-primary"),i=s=>{o(s.target.value)};return[createComponent(Flex,{flexDirection:"column",gap:10,style:{padding:"0 28px"},get children(){return createComponent(For,{get each(){return Object.entries(r())},children:([s,l],c)=>createComponent(ColorGraph,{colorSwatch:l,get displayType(){return n()}})})}}),_tmpl$$3.cloneNode(!0),createComponent(Select,{get value(){return n()},onChange:i,get children(){return[_tmpl$2$3.cloneNode(!0),_tmpl$3$3.cloneNode(!0),_tmpl$4$1.cloneNode(!0)]}}),_tmpl$$3.cloneNode(!0),(()=>{const s=_tmpl$5$1.cloneNode(!0);return s.style.setProperty("padding-top","12px"),s.style.setProperty("color","rgba(256, 256, 256, 0.5)"),s})()]},_tmpl$$2=template("<h3>Ambient Color Generation Tool</h3>"),_tmpl$2$2=template("<p>This tool is designed to generate <strong>contrast ready</strong> color pallets built specifically for UIUX design. Unlike other pallette generation tools, Ambient generates the colors <strong>based on the primary color</strong>. Hues, saturation, and relative lightness adjustments are made automatically using our <a>algorithm</a>. These values can be adjusted by adjusting the base functions.styled.tsx file located inside the styles folder. As ambient relies on the primary color for alternative color generation, primary colors <strong>must be contrast compliant</strong>. Ambient displays both WACG and APCA definitions of text contrast, a 4.5:1(WACG) or 60Lc(APCA) is recommended for text contrast. Please remember that for the best results, contrast in colors or differences in color should not represent meaningful information in UIUX design to prevent accessability issues. </p>"),_tmpl$3$2=template("<br>"),Introduction=()=>[_tmpl$$2.cloneNode(!0),_tmpl$2$2.cloneNode(!0),_tmpl$3$2.cloneNode(!0)],_tmpl$$1=template("<form></form>"),_tmpl$2$1=template("<br>"),_tmpl$3$1=template("<div></div>"),_tmpl$4=template("<label></label>"),_tmpl$5=template('<div class="form-element"><label for="colorName">Name</label><input type="text"></div>'),_tmpl$6=template('<div class="form-element"><label for="colorHEX">HEX</label><input type="text" maxlength="7" style="text-transform:uppercase"></div>'),TextColorSelector=()=>{const[t,r]=createSignal(Object.entries(textColorScale())),n=styled("div")`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    .form-element {
      display: flex;
      flex-direction: row;
      width: auto;
      align-items: center;
      position: relative;
      margin-left: 4px;
      label {
        width: 50px;
        position: absolute;
        padding: 4px;
        padding-left: 8px;
        background-color: rgba(255, 255, 255, 0.14);
        left: 1px;
        border-radius: 2px 0 0 2px;
      }
      input {
        padding: 4px 8px;
        padding-left: 60px;
        background-color:rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: white;
        border-radius: 3px;
        outline: none;
        width: 180px;
        &:focus {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
          font-weight: bold;
        }
        @media only screen and (max-width: 472px) {
        & {
            width: 120px;
          }
        }
      }
    }
  `,o=u=>{let b={};for(let v=0;v<u.length;v+=2)b[u[v]]=u[v+1];return b},i=u=>{let b=[];for(let v=0;v<u.length;v+=2)b.push(u[v]);return b},{form:s,data:l,errors:c,isSubmitting:f,isValid:d}=createForm({onSubmit:u=>{setTextColorScale(o(Object.values(u)))},validate:u=>{const b={};let v=i(Object.values(u));return v.length!==new Set(v).size&&(b.duplicate="There are duplicates in the color names!"),f&&!d&&(console.log("wow"),toast.custom(S=>createComponent(Toast,{color:"error",showExit:!0,toast:S,children:"Something Happened"})),console.log("lmao")),b}});return createEffect(()=>{r(Object.entries(textColorScale()))}),[(()=>{const u=_tmpl$$1.cloneNode(!0);return s(u,()=>!0),u.style.setProperty("display","flex"),u.style.setProperty("flex-direction","column"),u.style.setProperty("gap","8px"),u.style.setProperty("padding","4px 0 16px 0"),u.style.setProperty("align-items","flex-start"),insert(u,createComponent(For,{get each(){return t()},children:([b,v],S)=>createComponent(n,{get children(){return[(()=>{const m=_tmpl$3$1.cloneNode(!0);return m.style.setProperty("width","auto"),insert(m,b),m})(),(()=>{const m=_tmpl$4.cloneNode(!0);return insert(m,createComponent(ColorIdentifier,{get color(){return t()[S()][1]}})),m})(),(()=>{const m=_tmpl$5.cloneNode(!0),y=m.firstChild,x=y.nextSibling;return m.style.setProperty("display","none"),x.value=b,createRenderEffect(()=>setAttribute(x,"name",`colorName${S()}`)),m})(),(()=>{const m=_tmpl$6.cloneNode(!0),y=m.firstChild,x=y.nextSibling;return x.value=v,createRenderEffect(()=>setAttribute(x,"name",`colorHEX${S()}`)),m})()]}})}),null),insert(u,createComponent(Button,{type:"submit",children:"Change Text Colors"}),null),u})(),_tmpl$2$1.cloneNode(!0)]},_tmpl$=template("<div><h3>Color Table</h3><p>Color table of generated colors can be edited here. Only the primary color is considered. <strong>Color names must be unique.</strong></p><br><h4>Text Colors</h4></div>"),_tmpl$2=template("<div><h3>Color Graph</h3><p>These values are the calculated luminance values of each color. The graph does not update until the color set is generated. </p><br><br></div>"),_tmpl$3=template("<br>"),Home=()=>[createComponent(Introduction,{}),createComponent(Flex,{flexDirection:"row",gap:16,get children(){return[(()=>{const t=_tmpl$.cloneNode(!0),r=t.firstChild,n=r.nextSibling,o=n.nextSibling,i=o.nextSibling;return t.style.setProperty("width","auto"),insert(t,createComponent(ColorSelector,{}),i),insert(t,createComponent(TextColorSelector,{}),null),t})(),(()=>{const t=_tmpl$2.cloneNode(!0),r=t.firstChild,n=r.nextSibling,o=n.nextSibling;return t.style.setProperty("width","100%"),n.style.setProperty("padding-bottom","12px"),insert(t,createComponent(GraphList,{get colorSwatch(){return ColorShades()}}),o),t})()]}}),createComponent(ColorListPage,{}),_tmpl$3.cloneNode(!0)];export{Home as default};
