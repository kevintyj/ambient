import{c as chroma,s as styled,d as delegateEvents,a as splitProps,b as createComponent,m as mergeProps,e as memo,i as insert,f as toast,t as template,g as createSignal,h as textColorScale,j as createEffect,F as For,k as Flex,l as arrSize,n as createRenderEffect,o as createComputed,C as ColorShades,p as ColorMix,q as ColorRelative,r as ColorLegacy,S as SetLegacy,u as SetRelative,v as SetShades,w as untrack,x as createRoot,y as onCleanup,z as colorScale,A as setAttribute,B as setColorScale,D as setTextColorScale}from"./index.315d8abf.js";const mainTRC=2.4,sRco=.2126729,sGco=.7151522,sBco=.072175,normBG=.56,normTXT=.57,revTXT=.62,revBG=.65,blkThrs=.022,blkClmp=1.414,scaleBoW=1.14,scaleWoB=1.14,loBoWthresh=.035991,loWoBthresh=.035991,loBoWfactor=27.7847239587675,loWoBfactor=27.7847239587675,loBoWoffset=.027,loWoBoffset=.027,loClip=.001,deltaYmin=5e-4;function sRGBtoY(t){let r=(t&16711680)>>16,n=(t&65280)>>8,o=t&255;function i(l){return Math.pow(l/255,mainTRC)}return sRco*i(r)+sGco*i(n)+sBco*i(o)}function APCAcontrast(t,r){var n=0,o=0;return t=t>blkThrs?t:t+Math.pow(blkThrs-t,blkClmp),r=r>blkThrs?r:r+Math.pow(blkThrs-r,blkClmp),Math.abs(r-t)<deltaYmin?0:(r>t?(n=(Math.pow(r,normBG)-Math.pow(t,normTXT))*scaleBoW,o=n<loClip?0:n<loBoWthresh?n-n*loBoWfactor*loBoWoffset:n-loBoWoffset):(n=(Math.pow(r,revBG)-Math.pow(t,revTXT))*scaleWoB,o=n>-loClip?0:n>-loWoBthresh?n-n*loWoBfactor*loWoBoffset:n+loWoBoffset),o*100)}const calcWCAG=(t,r)=>chroma.contrast(t,r),calcMaxWCAG=(t,r)=>{let n=0,o="",i="";return Object.entries(t).forEach(([l,s])=>{let c=calcWCAG(s,r);c>n&&(n=c,o=l,i=s)}),[n.toFixed(2),o,i]},calcAPCA=(t,r)=>{const n=parseInt(`0x${t.substring(1)}`,16),o=parseInt(`0x${r.substring(1)}`,16);return APCAcontrast(sRGBtoY(n),sRGBtoY(o))},calcMaxAPCA=(t,r)=>{let n=0,o="",i="";return Object.entries(t).forEach(([l,s])=>{let c=Math.abs(calcAPCA(s,r));c>n&&(n=c,o=l,i=s)}),[n.toFixed(2),o,i]},calcMaxAPCABG=(t,r)=>{let n=0,o="",i="";return Object.entries(t).forEach(([l,s])=>{let c=Math.abs(calcAPCA(r,s));c>n&&(n=c,o=l,i=s)}),[n.toFixed(2),o,i]},ColorIdentifier=styled("div")`
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
  `;return createComponent(i,mergeProps(n,{get children(){return[memo(()=>memo(()=>!!r.box,!0)()&&createComponent(ColorIdentifier,{get color(){return t.box}})),(()=>{const l=_tmpl$$9.cloneNode(!0);return insert(l,()=>t.children),l})(),memo(()=>memo(()=>!!r.showExit,!0)()&&(()=>{const l=_tmpl$2$9.cloneNode(!0);return l.$$click=()=>toast.dismiss(t.toast.id),l})())]}}))};delegateEvents(["click"]);const _tmpl$$8=template('<i class="bi bi-x-circle"></i>'),_tmpl$2$8=template('<i class="bi bi-dash-circle"></i>'),_tmpl$3$7=template('<i class="bi bi-exclamation-circle"></i>'),_tmpl$4$4=template('<i class="bi bi-check-circle"></i>'),_tmpl$5$4=template("<div></div>"),_tmpl$6$3=template("<p></p>"),_tmpl$7$2=template('<p class="contrast"><object><strong>WCAG: </strong> </object><br><object><strong>APCA: </strong> </object><br><object><strong>APCA TEXT: </strong> </object><br><object><strong>APCA BG: </strong> </object></p>'),_tmpl$8$2=template('<p class="helper"><strong></strong><br></p>'),ColorSwatch=t=>{const r=()=>t.colorSwatch,[n,o]=createSignal(textColorScale());createEffect(()=>{o(textColorScale())});const i=p=>{navigator.clipboard.writeText(p).then(()=>{toast.custom(u=>createComponent(Toast,{box:p,showExit:!0,toast:u,get children(){return["Pallette Copied! ",p]}}))},()=>{toast.custom(u=>createComponent(Toast,{color:"error",showExit:!0,toast:u,children:"Copying Failed"}))})},l=(p,u,d)=>{const y=Number(calcMaxWCAG(p,d)[0]),_=Number(calcMaxAPCA(p,d)[0]),f=Number(calcMaxWCAG(u,d)[0]),A=Number(calcMaxAPCA(u,d)[0]);return Number(calcMaxAPCABG(u,d)[0]),f<4.5||y<4.5?A<60?_tmpl$$8.cloneNode(!0):_<60?_tmpl$2$8.cloneNode(!0):_tmpl$3$7.cloneNode(!0):_tmpl$4$4.cloneNode(!0)},s=styled("div")`
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
  `,b=styled("div")`
    background-color: ${p=>p.color};
    height: 84px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 5px 8px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid ${p=>calcMaxAPCA(n(),p.color)[2]=="#FFFFFF"?chroma(p.color).brighten(1.02).hex():chroma(p.color).darken(1.02).hex()};
    width: 100%;

    p {
      color: ${p=>calcMaxAPCA(n(),p.color)[2]} !important;
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
  `;return(()=>{const p=_tmpl$5$4.cloneNode(!0);return insert(p,createComponent(For,{get each(){return Object.entries(r())},children:([u,d],y)=>[(()=>{const _=_tmpl$6$3.cloneNode(!0);return insert(_,u),_})(),createComponent(s,{get children(){return createComponent(For,{get each(){return Object.entries(d)},children:([_,f],A)=>createComponent(Flex,{flexDirection:"column",style:{"flex-basis":"100%",overflow:"hidden"},get children(){return[createComponent(b,{color:f,get style(){return{border:A()==Math.floor(arrSize()/2)?"1px solid rgba(256, 256, 256, 1)":"",flex:A()==arrSize()/2?"none":"1","border-radius":(A()==Math.floor(arrSize()/2),"3px")}},onClick:()=>i(f),get children(){return[createComponent(c,{get style(){return{color:calcMaxAPCA(n(),f)[2]}},get children(){return l(d,n(),f)}}),(()=>{const w=_tmpl$7$2.cloneNode(!0),v=w.firstChild;v.firstChild.nextSibling;const O=v.nextSibling,E=O.nextSibling;E.firstChild.nextSibling;const j=E.nextSibling,R=j.nextSibling;R.firstChild.nextSibling;const X=R.nextSibling,q=X.nextSibling;return q.firstChild.nextSibling,insert(v,()=>calcMaxWCAG(d,f)[0],null),insert(E,()=>calcMaxAPCA(d,f)[0],null),insert(R,()=>calcMaxAPCA(n(),f)[0],null),insert(q,()=>calcMaxAPCABG(n(),f)[0],null),createRenderEffect(N=>{const H=calcMaxWCAG(d,f)[2],J=calcMaxAPCA(d,f)[2],Q=calcMaxAPCA(n(),f)[2],k=calcMaxAPCABG(n(),f)[2];return H!==N._v$&&v.style.setProperty("color",N._v$=H),J!==N._v$2&&E.style.setProperty("color",N._v$2=J),Q!==N._v$3&&R.style.setProperty("color",N._v$3=Q),k!==N._v$4&&q.style.setProperty("color",N._v$4=k),N},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),w})()]}}),(()=>{const w=_tmpl$8$2.cloneNode(!0),v=w.firstChild;return v.nextSibling,insert(v,_),insert(w,f,null),w})()]}})})}})]})),p})()},_tmpl$$7=template("<h5></h5>"),_tmpl$2$7=template("<br>"),SwatchList=t=>{const[r,n]=createSignal(t.swatchList);return createComputed(()=>{n(t.swatchList)}),createComponent(For,{get each(){return r()},children:o=>[(()=>{const i=_tmpl$$7.cloneNode(!0);return insert(i,()=>o.name),i})(),createComponent(ColorSwatch,{get colorSwatch(){return o.swatch}}),_tmpl$2$7.cloneNode(!0)]})},Button=styled("button")`
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
`,_tmpl$$6=template("<h3>Generated Colors</h3>"),_tmpl$2$6=template("<p>Export color type:</p>"),_tmpl$3$6=template('<option value="hex" selected>HEX (Default)</option>'),_tmpl$4$3=template('<option value="rgb">RGB</option>'),_tmpl$5$3=template('<option value="hsl">HSL</option>'),_tmpl$6$2=template('<option value="hsv">HSV</option>'),_tmpl$7$1=template('<option value="hsi">HSI</option>'),_tmpl$8$1=template('<option value="lab">LAB</option>'),_tmpl$9=template('<option value="oklab">OKLAB</option>'),_tmpl$10=template('<option value="lch">LCH</option>'),_tmpl$11=template('<option value="hcl">HCL</option>'),_tmpl$12=template('<option value="okhcl">OKHCL</option>'),_tmpl$13=template("<p>Color Shade Length:</p>"),_tmpl$14=template('<option value="7" selected>7 (Default)</option>'),_tmpl$15=template('<option value="9">9</option>'),_tmpl$16=template("<br>"),ColorListPage=()=>{const[t,r]=createSignal("hex"),[n,o]=createSignal(7),i=()=>{let d=[];for(const y of c()){let _={};_.name=y.name;let f={};for(const[A,w]of Object.entries(y.swatch)){let v={};for(const[F,O]of Object.entries(w))switch(v[F]=O,t()){case"hex":v[F]=chroma(O).hex();break;case"rgb":v[F]=`rgb(${chroma(O).rgb().toString()})`;break;case"hsl":v[F]=`hsl(${chroma(O).hsl().toString()})`;break;case"hsv":v[F]=`hsv(${chroma(O).hsv().toString()})`;break;case"hsi":v[F]=`hsi(${chroma(O).hsi().toString()})`;break;case"lab":v[F]=`lab(${chroma(O).lab().toString()})`;break;case"oklab":v[F]=`oklab(${chroma(O).oklab().toString()})`;break;case"lch":v[F]=`lch(${chroma(O).lch().toString()})`;break;case"hcl":v[F]=`hcl(${chroma(O).hcl().toString()})`;break;case"okhcl":v[F]=`okhcl(${chroma(O).okhcl().toString()})`;break}f[A]=v}_.swatch=f,d.push(_)}return d},l=()=>{console.log(i());const d=JSON.stringify(c()),y=new Blob([d],{type:"text/plain"}),_=URL.createObjectURL(y),f=document.createElement("a");f.download="ambientcolors-full.json",f.href=_,f.click()},s=()=>{const d=JSON.stringify(i()[0].swatch),y=new Blob([d],{type:"text/plain"}),_=URL.createObjectURL(y),f=document.createElement("a");f.download="ambientcolors-full.json",f.href=_,f.click()},[c,b]=createSignal([{name:"Shades Corrected (RGB)",swatch:ColorShades()},{name:"Blended (Lab Color Mix)",swatch:ColorMix()},{name:"Relative (HSV & Relative Luminance)",swatch:ColorRelative()},{name:"Brighten and Darken (Legacy)",swatch:ColorLegacy()}]);createEffect(()=>{console.log("master update"),b([{name:"Shades Corrected (RGB)",swatch:ColorShades()},{name:"Blended (Lab Color Mix)",swatch:ColorMix()},{name:"Relative (HSV & Relative Luminance)",swatch:ColorRelative()},{name:"Brighten and Darken (Legacy)",swatch:ColorLegacy()}])});const p=d=>{r(d.target.value)},u=d=>{o(d.target.value),n()==9&&(SetLegacy([1.7,1.3,1.2,1.1,1,.9,.8,.7,.1]),SetRelative([1.3,1.2,1.15,1.1,1,.9,.85,.6,.5]),SetShades([.4,.6,.8,.9,1,1.1,1.2,1.4,1.6])),n()==7&&(SetLegacy([1.7,1.3,1.1,1,.9,.7,.1]),SetRelative([1.3,1.2,1.1,1,.9,.6,.5]),SetShades([.4,.6,.9,1,1.1,1.4,1.6]))};return[_tmpl$$6.cloneNode(!0),createComponent(Flex,{flexDirection:"row",gap:8,style:{margin:"0 0 24px -2px"},get children(){return[createComponent(Button,{type:"submit",onclick:l,children:"Export colors"}),createComponent(Button,{type:"submit",onclick:s,children:"Export colors (Tailwind)"}),(()=>{const d=_tmpl$2$6.cloneNode(!0);return d.style.setProperty("padding","18px 0 0 12px"),d})(),createComponent(Select,{get value(){return t()},onChange:p,get children(){return[_tmpl$3$6.cloneNode(!0),_tmpl$4$3.cloneNode(!0),_tmpl$5$3.cloneNode(!0),_tmpl$6$2.cloneNode(!0),_tmpl$7$1.cloneNode(!0),_tmpl$8$1.cloneNode(!0),_tmpl$9.cloneNode(!0),_tmpl$10.cloneNode(!0),_tmpl$11.cloneNode(!0),_tmpl$12.cloneNode(!0)]}}),(()=>{const d=_tmpl$13.cloneNode(!0);return d.style.setProperty("padding","18px 0 0 12px"),d})(),createComponent(Select,{get value(){return n()},onChange:u,get children(){return[_tmpl$14.cloneNode(!0),_tmpl$15.cloneNode(!0)]}})]}}),createComponent(SwatchList,{get swatchList(){return c()}}),_tmpl$16.cloneNode(!0)]};function subscribe(t,...r){const n=t.subscribe(...r);return n.unsubscribe?()=>n.unsubscribe():n}function get(t){let r;return subscribe(t,n=>r=n)(),r}class FelteSubmitError extends Error{constructor(r,n){super(r),this.name="FelteSubmitError",this.response=n}}function _some(t,r){return Object.keys(t).some(o=>r(t[o]))}function _mapValues(t,r){return Object.keys(t).reduce((o,i)=>Object.assign(Object.assign({},o),{[i]:r(t[i])}),{})}function _isPlainObject(t){return Object.prototype.toString.call(t)==="[object Object]"}function _cloneDeep(t){return Object.keys(t||{}).reduce((r,n)=>Object.assign(Object.assign({},r),{[n]:_isPlainObject(t[n])?_cloneDeep(t[n]):Array.isArray(t[n])?[...t[n]]:t[n]}),{})}/*! *****************************************************************************
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
***************************************************************************** */function __rest$2(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(t);i<o.length;i++)r.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(t,o[i])&&(n[o[i]]=t[o[i]]);return n}function handleArray(t){return function(r){if(_isPlainObject(r)){const n=deepSet(r,t);return __rest$2(n,["key"])}return t}}function deepSet(t,r){return _mapValues(t,n=>_isPlainObject(n)?deepSet(n,r):Array.isArray(n)?n.map(handleArray(r)):r)}function _mergeWith(...t){const r=t.pop(),n=_cloneDeep(t.shift());if(t.length===0)return n;for(const o of t){if(!o)continue;let i=r(n,o);if(typeof i<"u")return i;const l=Array.from(new Set(Object.keys(n).concat(Object.keys(o))));for(const s of l)if(i=r(n[s],o[s]),typeof i<"u")n[s]=i;else if(_isPlainObject(o[s])&&_isPlainObject(n[s]))n[s]=_mergeWith(n[s],o[s],r);else if(Array.isArray(o[s]))n[s]=o[s].map((c,b)=>{if(!_isPlainObject(c))return c;const p=Array.isArray(n[s])?n[s][b]:n[s];return _mergeWith(p,c,r)});else if(_isPlainObject(o[s])){const c=deepSet(_cloneDeep(o[s]),void 0);n[s]=_mergeWith(c,o[s],r)}else typeof o[s]<"u"&&(n[s]=o[s])}return n}function defaultsCustomizer(t,r){if(!(_isPlainObject(t)&&_isPlainObject(r))){if(Array.isArray(r)){if(r.some(_isPlainObject))return;const n=Array.isArray(t)?t:[];return r.map((o,i)=>{var l;return(l=n[i])!==null&&l!==void 0?l:o})}if(typeof t<"u")return t}}function _defaultsDeep(...t){return _mergeWith(...t,defaultsCustomizer)}function _merge(...t){return _mergeWith(...t,()=>{})}function _get(t,r,n){const o=l=>String.prototype.split.call(r,l).filter(Boolean).reduce((s,c)=>s!=null?s[c]:s,t),i=o(/[,[\]]+?/)||o(/[,[\].]+?/);return i===void 0||i===t?n:i}function _update(t,r,n){t&&(t=_cloneDeep(t)),_isPlainObject(t)||(t={});const o=Array.isArray(r)?r:r.match(/[^.[\]]+/g)||[],i=o[o.length-1];if(!i)return t;let l=t;for(let s=0;s<o.length-1;s++){const c=o[s];if(!l[c]||!_isPlainObject(l[c])&&!Array.isArray(l[c])){const b=o[s+1];isNaN(Number(b))?l[c]={}:l[c]=[]}l=l[c]}return l[i]=n(l[i]),t}function _set(t,r,n){return _update(t,r,()=>n)}function _unset(t,r){if(!t||Object(t)!==t)return;typeof t<"u"&&(t=_cloneDeep(t));const n=Array.isArray(r)?r:r.toString().match(/[^.[\]]+/g)||[],o=n.length===1?t:_get(t,n.slice(0,-1).join("."));return Array.isArray(o)?o.splice(Number(n[n.length-1]),1):o==null||delete o[n[n.length-1]],t}function deepSome(t,r){return _some(t,n=>_isPlainObject(n)?deepSome(n,r):Array.isArray(n)?n.length===0||n.every(o=>typeof o=="string")?r(n):n.some(o=>_isPlainObject(o)?deepSome(o,r):r(o)):r(n))}function isInputElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="INPUT"}function isTextAreaElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="TEXTAREA"}function isSelectElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="SELECT"}function isFieldSetElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="FIELDSET"}function isFormControl(t){return isInputElement(t)||isTextAreaElement(t)||isSelectElement(t)}function isElement(t){return t.nodeType===Node.ELEMENT_NODE}function getPath(t,r){return r??(isFormControl(t)?t.name:"")}function shouldIgnore(t){let r=t;for(;r&&r.nodeName!=="FORM";){if(r.hasAttribute("data-felte-ignore"))return!0;r=r.parentElement}return!1}function getValue(t,r){return!_isPlainObject(t)||!r?t:typeof r=="string"?_get(t,r):r(t)}function executeCustomizer(t,r){if(!(_isPlainObject(t)||_isPlainObject(r))){if(t===null||t==="")return r;if(r===null||r===""||!r)return t;if(!(!t||!r)){if(Array.isArray(t)){if(!Array.isArray(r))return[...t,r];const n=[],o=Math.max(r.length,t.length);for(let i=0;i<o;i++){let l=t[i],s=r[i];!_isPlainObject(l)&&!_isPlainObject(s)?(Array.isArray(l)||(l=[l]),Array.isArray(s)||(s=[s]),n.push(...l,...s)):n.push(mergeErrors([l??{},s??{}]))}return n.filter(Boolean)}return Array.isArray(r)||(r=[r]),[t,...r].reduce((n,o)=>n.concat(o),[]).filter(Boolean)}}}function mergeErrors(t){return _mergeWith(...t,executeCustomizer)}function runValidations(t,r){return r?(Array.isArray(r)?r:[r]).map(o=>o(t)):[]}function executeTransforms(t,r){return r?Array.isArray(r)?r.reduce((n,o)=>o(n),t):r(t):t}function createId(t=8){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";for(let o=0;o<t;o++)n+=r.charAt(Math.floor(Math.random()*r.length));return n}function isEqual(t,r){if(t===r)return!0;if(Array.isArray(t)&&Array.isArray(r))return t.length!==r.length?!1:t.every((n,o)=>isEqual(n,r[o]));if(_isPlainObject(t)&&_isPlainObject(r)){const n=Object.keys(t),o=Object.keys(r);return n.length!==o.length?!1:n.every(i=>isEqual(t[i],r[i]))}return!1}function debounce(t,r,{onInit:n,onEnd:o}={}){let i;return(...l)=>{i||n?.(),i&&clearTimeout(i),i=setTimeout(()=>{t.apply(this,l),i=void 0,o?.()},r)}}function getFormControls(t){if(isFormControl(t))return[t];if(t.childElementCount===0)return[];const r=new Set;for(const n of t.children){if(isFormControl(n)&&r.add(n),isFieldSetElement(n))for(const o of n.elements)isFormControl(o)&&r.add(o);n.childElementCount>0&&getFormControls(n).forEach(o=>r.add(o))}return Array.from(r)}function addAttrsFromFieldset(t){for(const r of t.elements)!isFormControl(r)&&!isFieldSetElement(r)||t.hasAttribute("data-felte-keep-on-remove")&&!r.hasAttribute("data-felte-keep-on-remove")&&(r.dataset.felteKeepOnRemove=t.dataset.felteKeepOnRemove)}function getInputTextOrNumber(t){return t.type.match(/^(number|range)$/)?t.value?+t.value:void 0:t.value}function getFormDefaultValues(t){var r;let n={},o={};for(const i of t.elements){if(isFieldSetElement(i)&&addAttrsFromFieldset(i),!isFormControl(i)||!i.name)continue;const l=getPath(i);if(isInputElement(i)){if(i.type==="checkbox"){if(typeof _get(n,l)>"u"){if(Array.from(t.querySelectorAll(`[name="${i.name}"]`)).filter(b=>isFormControl(b)?l===getPath(b):!1).length===1){n=_set(n,l,i.checked),o=_set(o,l,!1);continue}n=_set(n,l,i.checked?[i.value]:[]),o=_set(o,l,!1);continue}Array.isArray(_get(n,l))&&i.checked&&(n=_update(n,l,c=>[...c,i.value]));continue}if(i.type==="radio"){if(_get(n,l))continue;n=_set(n,l,i.checked?i.value:void 0),o=_set(o,l,!1);continue}if(i.type==="file"){n=_set(n,l,i.multiple?Array.from(i.files||[]):(r=i.files)===null||r===void 0?void 0:r[0]),o=_set(o,l,!1);continue}}else if(isSelectElement(i)){if(!i.multiple)n=_set(n,l,i.value);else{const b=Array.from(i.options).filter(p=>p.selected).map(p=>p.value);n=_set(n,l,b)}o=_set(o,l,!1);continue}const s=getInputTextOrNumber(i);n=_set(n,l,s),o=_set(o,l,!1)}return{defaultData:n,defaultTouched:o}}function setControlValue(t,r){var n;if(!isFormControl(t))return;const o=r;if(isInputElement(t)){if(t.type==="checkbox"){const i=o;if(typeof i>"u"||typeof i=="boolean"){t.checked=!!i;return}Array.isArray(i)&&(i.includes(t.value)?t.checked=!0:t.checked=!1);return}if(t.type==="radio"){const i=o;t.value===i?t.checked=!0:t.checked=!1;return}if(t.type==="file"){t.files=null,t.value="";return}}else if(isSelectElement(t)){if(t.multiple){if(Array.isArray(o)){t.value=String((n=o[0])!==null&&n!==void 0?n:"");for(const l of t.options)o.includes(l.value)?l.selected=!0:l.selected=!1}}else{t.value=String(o??"");for(const l of t.options)l.value===o?l.selected=!0:l.selected=!1}return}t.value=String(o??"")}function setForm(t,r){for(const n of t.elements){if(isFieldSetElement(n)&&addAttrsFromFieldset(n),!isFormControl(n)||!n.name)continue;const o=getPath(n);setControlValue(n,_get(r,o))}}/*! *****************************************************************************
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
***************************************************************************** */function __rest$1(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(t);i<o.length;i++)r.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(t,o[i])&&(n[o[i]]=t[o[i]]);return n}function deepSetTouched(t,r){return _mapValues(t,n=>_isPlainObject(n)?deepSetTouched(n,r):Array.isArray(n)?n.length===0||n.every(o=>typeof o=="string")?r:n.map(o=>{const i=deepSetTouched(o,r);return __rest$1(i,["key"])}):r)}function deepSetKey(t){return t?_mapValues(t,r=>_isPlainObject(r)?deepSetKey(r):Array.isArray(r)?r.length===0||r.every(n=>typeof n=="string")?r:r.map(n=>{if(!_isPlainObject(n))return n;const o=deepSetKey(n);return o.key||(o.key=createId()),o}):r):{}}function deepRemoveKey(t){return t?_mapValues(t,r=>_isPlainObject(r)?deepSetKey(r):Array.isArray(r)?r.length===0||r.every(n=>typeof n=="string")?r:r.map(n=>{if(!_isPlainObject(n))return n;const o=deepSetKey(n);return __rest$1(o,["key"])}):r):{}}function createEventConstructors(){class t extends CustomEvent{constructor(i){super("feltesuccess",{detail:i})}}class r extends CustomEvent{constructor(i){super("felteerror",{detail:i,cancelable:!0})}setErrors(i){this.preventDefault(),this.errors=i}}class n extends Event{constructor(){super("feltesubmit",{cancelable:!0})}handleSubmit(i){this.onSubmit=i}handleError(i){this.onError=i}handleSuccess(i){this.onSuccess=i}}return{createErrorEvent:o=>new r(o),createSubmitEvent:()=>new n,createSuccessEvent:o=>new t(o)}}function createDefaultSubmitHandler(t){if(!!t)return async function(){let n=new FormData(t);const o=new URL(t.action),i=t.method.toLowerCase()==="get"?"get":o.searchParams.get("_method")||t.method;let l=t.enctype;t.querySelector('input[type="file"]')&&(l="multipart/form-data"),(i==="get"||l==="application/x-www-form-urlencoded")&&(n=new URLSearchParams(n));let s;i==="get"?(n.forEach((b,p)=>{o.searchParams.append(p,b)}),s={method:i,headers:{Accept:"application/json"}}):s={method:i,body:n,headers:{"Content-Type":l,Accept:"application/json"}};const c=await window.fetch(o.toString(),s);if(c.ok)return c;throw new FelteSubmitError("An error occurred while submitting the form",c)}}function addAtIndex(t,r,n,o){return _update(t,r,i=>(typeof i<"u"&&!Array.isArray(i)||(i||(i=[]),typeof o>"u"?i.push(n):i.splice(o,0,n)),i))}function swapInArray(t,r,n,o){return _update(t,r,i=>(!i||!Array.isArray(i)||([i[n],i[o]]=[i[o],i[n]]),i))}function moveInArray(t,r,n,o){return _update(t,r,i=>(!i||!Array.isArray(i)||i.splice(o,0,i.splice(n,1)[0]),i))}function isUpdater(t){return typeof t=="function"}function createSetHelper(t){return(n,o)=>{if(typeof n=="string"){const i=n;t(l=>{const s=isUpdater(o)?o(_get(l,i)):o;return _set(l,i,s)})}else t(i=>isUpdater(n)?n(i):n)}}function createHelpers({stores:t,config:r,validateErrors:n,validateWarnings:o,_getCurrentExtenders:i}){var l;let s,c=deepSetKey((l=r.initialValues)!==null&&l!==void 0?l:{});const{data:b,touched:p,errors:u,warnings:d,isDirty:y,isSubmitting:_,interacted:f}=t,A=createSetHelper(b.update),w=createSetHelper(p.update),v=createSetHelper(u.update),F=createSetHelper(d.update);function O(m){A($=>{const S=m($);return s&&setForm(s,S),S})}const E=(m,$,S)=>{createSetHelper(O)(m,$),typeof m=="string"&&S&&w(m,!0)};function re(m,$,S){const D=_isPlainObject($)?deepSetTouched($,!1):!1,W=_isPlainObject(D)?deepSet(D,[]):[];$=_isPlainObject($)?Object.assign(Object.assign({},$),{key:createId()}):$,u.update(L=>addAtIndex(L,m,W,S)),d.update(L=>addAtIndex(L,m,W,S)),p.update(L=>addAtIndex(L,m,D,S)),b.update(L=>{const Z=addAtIndex(L,m,$,S);return setTimeout(()=>s&&setForm(s,Z)),Z})}function j(m){u.update(m),d.update(m),p.update(m),b.update($=>{const S=m($);return setTimeout(()=>s&&setForm(s,S)),S})}function R(m){j($=>_unset($,m))}function V(m,$,S){j(D=>swapInArray(D,m,$,S))}function X(m,$,S){j(D=>moveInArray(D,m,$,S))}function q(m){const $=_get(c,m),S=_isPlainObject($)?deepSetTouched($,!1):!1,D=_isPlainObject(S)?deepSet(S,[]):[];b.update(W=>{const L=_set(W,m,$);return s&&setForm(s,L),L}),p.update(W=>_set(W,m,S)),u.update(W=>_set(W,m,D)),d.update(W=>_set(W,m,D))}const C=createSetHelper(_.update),N=createSetHelper(y.update),H=createSetHelper(f.update);async function J(){const m=get(b);p.set(deepSetTouched(m,!0)),f.set(null);const $=await n(m);return await o(m),$}function Q(){E(_cloneDeep(c)),w(m=>deepSet(m,!1)),f.set(null),y.set(!1)}function k(m){return async function(S){var D,W,L,Z,ie,ce,ue;const{createErrorEvent:fe,createSubmitEvent:be,createSuccessEvent:g}=createEventConstructors(),a=be();s?.dispatchEvent(a);const h=(W=(D=a.onError)!==null&&D!==void 0?D:m?.onError)!==null&&W!==void 0?W:r.onError,x=(Z=(L=a.onSuccess)!==null&&L!==void 0?L:m?.onSuccess)!==null&&Z!==void 0?Z:r.onSuccess,G=(ue=(ce=(ie=a.onSubmit)!==null&&ie!==void 0?ie:m?.onSubmit)!==null&&ce!==void 0?ce:r.onSubmit)!==null&&ue!==void 0?ue:createDefaultSubmitHandler(s);if(!G||(S?.preventDefault(),a.defaultPrevented))return;_.set(!0),f.set(null);const z=deepRemoveKey(get(b)),se=await n(z,m?.validate),Y=await o(z,m?.warn);if(Y&&d.set(_merge(deepSet(z,[]),Y)),p.set(deepSetTouched(z,!0)),se&&(p.set(deepSetTouched(se,!0)),deepSome(se,M=>Array.isArray(M)?M.length>=1:!!M))){await new Promise(M=>setTimeout(M)),i().forEach(M=>{var U;return(U=M.onSubmitError)===null||U===void 0?void 0:U.call(M,{data:z,errors:se})}),_.set(!1);return}const oe={setFields:E,setData:A,setTouched:w,setErrors:v,setWarnings:F,unsetField:R,addField:re,resetField:q,reset:Q,setInitialValues:ne.setInitialValues,moveField:X,swapFields:V,form:s,controls:s&&Array.from(s.elements).filter(isFormControl),config:Object.assign(Object.assign({},r),m)};try{const ee=await G(z,oe);s?.dispatchEvent(g(Object.assign({response:ee},oe))),await x?.(ee,oe)}catch(ee){const M=fe(Object.assign({error:ee},oe));if(s?.dispatchEvent(M),!h&&!M.defaultPrevented)throw ee;if(!h&&!M.errors)return;const U=M.errors||await h?.(ee,oe);U&&(p.set(deepSetTouched(U,!0)),u.set(U),await new Promise(de=>setTimeout(de)),i().forEach(de=>{var he;return(he=de.onSubmitError)===null||he===void 0?void 0:he.call(de,{data:z,errors:get(u)})}))}finally{_.set(!1)}}}const ne={setData:A,setFields:E,setTouched:w,setErrors:v,setWarnings:F,setIsSubmitting:C,setIsDirty:N,setInteracted:H,validate:J,reset:Q,unsetField:R,resetField:q,addField:re,swapFields:V,moveField:X,createSubmitHandler:k,handleSubmit:k(),setInitialValues:m=>{c=deepSetKey(m)}};return{public:ne,private:{_setFormNode(m){s=m},_getInitialValues:()=>c}}}function createFormAction({helpers:t,stores:r,config:n,extender:o,createSubmitHandler:i,handleSubmit:l,_setFormNode:s,_getInitialValues:c,_setCurrentExtenders:b,_getCurrentExtenders:p}){const{setFields:u,setTouched:d,reset:y,setInitialValues:_}=t,{addValidator:f,addTransformer:A,validate:w}=t,{data:v,errors:F,warnings:O,touched:E,isSubmitting:re,isDirty:j,interacted:R,isValid:V,isValidating:X}=r;function q(C){C.requestSubmit||(C.requestSubmit=l);function N(g){return function(a){return a({form:C,stage:g,controls:Array.from(C.elements).filter(isFormControl),data:v,errors:F,warnings:O,touched:E,isValid:V,isValidating:X,isSubmitting:re,isDirty:j,interacted:R,config:n,addValidator:f,addTransformer:A,setFields:u,validate:w,reset:y,createSubmitHandler:i,handleSubmit:l})}}b(o.map(N("MOUNT"))),C.noValidate=!!n.validate;const{defaultData:H,defaultTouched:J}=getFormDefaultValues(C);s(C),_(_merge(_cloneDeep(H),c())),u(c()),E.set(J);function Q(g){const a=getPath(g),h=Array.from(C.querySelectorAll(`[name="${g.name}"]`)).filter(x=>isFormControl(x)?a===getPath(x):!1);if(h.length!==0)return h.length===1?v.update(x=>_set(x,getPath(g),g.checked)):v.update(x=>_set(x,getPath(g),h.filter(isInputElement).filter(G=>G.checked).map(G=>G.value)))}function k(g){const a=C.querySelectorAll(`[name="${g.name}"]`),h=Array.from(a).find(x=>isInputElement(x)&&x.checked);v.update(x=>_set(x,getPath(g),h?.value))}function ne(g){var a;const h=Array.from((a=g.files)!==null&&a!==void 0?a:[]);v.update(x=>_set(x,getPath(g),g.multiple?h:h[0]))}function le(g){if(!g.multiple)v.update(a=>_set(a,getPath(g),g.value));else{const a=Array.from(g.options).filter(h=>h.selected).map(h=>h.value);v.update(h=>_set(h,getPath(g),a))}}function m(g){const a=g.target;if(!a||!isFormControl(a)||isSelectElement(a)||shouldIgnore(a)||["checkbox","radio","file"].includes(a.type)||!a.name)return;j.set(!0);const h=getInputTextOrNumber(a);R.set(a.name),v.update(x=>_set(x,getPath(a),h))}function $(g){const a=g.target;if(!(!a||!isFormControl(a)||shouldIgnore(a))&&!!a.name)if(d(getPath(a),!0),R.set(a.name),(isSelectElement(a)||["checkbox","radio","file","hidden"].includes(a.type))&&j.set(!0),a.type==="hidden"&&v.update(h=>_set(h,getPath(a),a.value)),isSelectElement(a))le(a);else if(isInputElement(a))a.type==="checkbox"?Q(a):a.type==="radio"?k(a):a.type==="file"&&ne(a);else return}function S(g){const a=g.target;!a||!isFormControl(a)||shouldIgnore(a)||!a.name||(d(getPath(a),!0),R.set(a.name))}function D(g){g.preventDefault(),y()}const W={childList:!0,subtree:!0};function L(g){let a=get(v),h=get(E),x=get(F),G=get(O);for(const z of g.reverse()){if(z.hasAttribute("data-felte-keep-on-remove")&&z.dataset.felteKeepOnRemove!=="false")continue;const se=/.*(\[[0-9]+\]|\.[0-9]+)\.[^.]+$/;let Y=getPath(z);const oe=get(E);if(se.test(Y)){const M=Y.split(".").slice(0,-1).join("."),U=_get(oe,M);_isPlainObject(U)&&Object.keys(U).length<=1&&(Y=M)}a=_unset(a,Y),h=_unset(h,Y),x=_unset(x,Y),G=_unset(G,Y)}v.set(a),E.set(h),F.set(x),O.set(G)}const Z=debounce(()=>{p().forEach(h=>{var x;return(x=h.destroy)===null||x===void 0?void 0:x.call(h)}),b(o.map(N("UPDATE")));const{defaultData:g,defaultTouched:a}=getFormDefaultValues(C);v.update(h=>_defaultsDeep(h,g)),E.update(h=>_defaultsDeep(h,a))},0);let ie=[];const ce=debounce(()=>{p().forEach(g=>{var a;return(a=g.destroy)===null||a===void 0?void 0:a.call(g)}),b(o.map(N("UPDATE"))),L(ie),ie=[]},0);function ue(g){for(const a of g)if(a.type==="childList"){if(a.addedNodes.length>0){if(!Array.from(a.addedNodes).some(x=>isElement(x)?isFormControl(x)?!0:getFormControls(x).length>0:!1))continue;Z()}if(a.removedNodes.length>0)for(const h of a.removedNodes){if(!isElement(h))continue;const x=getFormControls(h);x.length!==0&&(ie.push(...x),ce())}}}const fe=new MutationObserver(ue);fe.observe(C,W),C.addEventListener("input",m),C.addEventListener("change",$),C.addEventListener("focusout",S),C.addEventListener("submit",l),C.addEventListener("reset",D);const be=F.subscribe(g=>{for(const a of C.elements){if(!isFormControl(a)||!a.name)continue;const h=_get(g,getPath(a)),x=Array.isArray(h)?h.join(`
`):typeof h=="string"?h:void 0;x!==a.dataset.felteValidationMessage&&(x?(a.dataset.felteValidationMessage=x,a.setAttribute("aria-invalid","true")):(delete a.dataset.felteValidationMessage,a.removeAttribute("aria-invalid")))}});return{destroy(){fe.disconnect(),C.removeEventListener("input",m),C.removeEventListener("change",$),C.removeEventListener("focusout",S),C.removeEventListener("submit",l),C.removeEventListener("reset",D),be(),p().forEach(g=>{var a;return(a=g.destroy)===null||a===void 0?void 0:a.call(g)})}}}return{form:q}}function createValidationController(t){const r={aborted:!1,priority:t};return{signal:r,abort(){r.aborted=!0}}}function errorFilterer(t,r){if(_isPlainObject(t))return!r||_isPlainObject(r)&&Object.keys(r).length===0?deepSet(t,null):void 0;if(Array.isArray(t)){if(t.some(_isPlainObject))return;const n=Array.isArray(r)?r:[];return t.map((o,i)=>{const l=n[i];return Array.isArray(l)&&l.length===0?null:o&&l||null})}return Array.isArray(r)&&r.length===0?null:Array.isArray(r)?t?r:null:t&&r?[r]:null}function warningFilterer(t,r){if(_isPlainObject(t))return!r||_isPlainObject(r)&&Object.keys(r).length===0?deepSet(t,null):void 0;if(Array.isArray(t)){if(t.some(_isPlainObject))return;const n=Array.isArray(r)?r:[];return t.map((o,i)=>{const l=n[i];return Array.isArray(l)&&l.length===0?null:l||null})}return Array.isArray(r)&&r.length===0?null:Array.isArray(r)?r:r?[r]:null}function filterErrors([t,r]){return _mergeWith(r,t,errorFilterer)}function filterWarnings([t,r]){return _mergeWith(r,t,warningFilterer)}function createDerivedFactory(t){return function(n,o,i){const l=Array.isArray(n)?n:[n],s=new Array(l.length),c=t(i),b=c.set,p=c.subscribe;let u;function d(){u=l.map((_,f)=>_.subscribe(A=>{s[f]=A,b(o(s))}))}function y(){u?.forEach(_=>_())}return c.subscribe=function(f){const A=p(f);return()=>{A()}},[c,d,y]}}function createStores(t,r){var n,o,i,l,s,c,b,p,u;const d=createDerivedFactory(t),y=r.initialValues=r.initialValues?deepSetKey(executeTransforms(_cloneDeep(r.initialValues),r.transform)):{},_=deepSetTouched(deepRemoveKey(y),!1),f=t(_),A=t(0),[w,v,F]=d([f,A],([T,P])=>deepSome(T,K=>!!K)&&P>=1,!1);delete w.set,delete w.update;function O(T){let P;return async function(K,te,I,pe=!1){if(!I||!K)return;let ae=te&&Object.keys(te).length>0?te:deepSet(K,[]);const me=createValidationController(pe);if((!P?.signal.priority||pe)&&(P?.abort(),P=me),P.signal.priority&&!pe)return;A.update(ge=>ge+1);const ye=runValidations(K,I);return ye.forEach(async ge=>{const _e=await ge;me.signal.aborted||(ae=mergeErrors([ae,_e]),T.set(ae))}),await Promise.all(ye),P=void 0,A.update(ge=>ge-1),ae}}let E=deepSet(_,[]);const re=t(y),j=deepSet(_,[]),R=t(j),V=t(_cloneDeep(j)),[X,q,C]=d([R,V],mergeErrors,_cloneDeep(j)),N=deepSet(_,[]),H=t(N),J=t(_cloneDeep(N)),[Q,k,ne]=d([H,J],mergeErrors,_cloneDeep(N)),[le,m,$]=d([X,f],filterErrors,_cloneDeep(j)),[S,D,W]=d([Q,f],filterWarnings,_cloneDeep(N));let L=!1;const[Z,ie,ce]=d(X,([T])=>{var P;return L?!deepSome(T,B=>Array.isArray(B)?B.length>=1:!!B):(L=!0,!r.validate&&!(!((P=r.debounced)===null||P===void 0)&&P.validate))},!r.validate&&!(!((n=r.debounced)===null||n===void 0)&&n.validate));delete Z.set,delete Z.update;const ue=t(!1),fe=t(!1),be=t(null),g=O(R),a=O(H),h=O(V),x=O(J),G=debounce(h,(s=(i=(o=r.debounced)===null||o===void 0?void 0:o.validateTimeout)!==null&&i!==void 0?i:(l=r.debounced)===null||l===void 0?void 0:l.timeout)!==null&&s!==void 0?s:300,{onInit:()=>{A.update(T=>T+1)},onEnd:()=>{A.update(T=>T-1)}}),z=debounce(x,(u=(b=(c=r.debounced)===null||c===void 0?void 0:c.warnTimeout)!==null&&b!==void 0?b:(p=r.debounced)===null||p===void 0?void 0:p.timeout)!==null&&u!==void 0?u:300);async function se(T,P){var B;const K=deepRemoveKey(T),te=g(K,E,P??r.validate,!0);if(P)return te;const I=h(K,E,(B=r.debounced)===null||B===void 0?void 0:B.validate,!0);return mergeErrors(await Promise.all([te,I]))}async function Y(T,P){var B;const K=deepRemoveKey(T),te=a(K,E,P??r.warn,!0);if(P)return te;const I=x(K,E,(B=r.debounced)===null||B===void 0?void 0:B.warn,!0);return mergeErrors(await Promise.all([te,I]))}let oe=j,ee=N;function M(){const T=re.subscribe(I=>{var pe,ae;const me=deepRemoveKey(I);g(me,E,r.validate),a(me,E,r.warn),G(me,E,(pe=r.debounced)===null||pe===void 0?void 0:pe.validate),z(me,E,(ae=r.debounced)===null||ae===void 0?void 0:ae.warn)}),P=f.subscribe(I=>{E=deepSet(I,[])}),B=X.subscribe(I=>{oe=I}),K=Q.subscribe(I=>{ee=I});q(),ie(),k(),m(),D(),v();function te(){T(),$(),C(),ne(),W(),ce(),F(),P(),B(),K()}return te}function U(T){R.set(T(oe)),V.set({})}function de(T){H.set(T(ee)),J.set({})}function he(T){U(()=>T)}function ve(T){de(()=>T)}return le.set=he,le.update=U,S.set=ve,S.update=de,{data:re,errors:le,warnings:S,touched:f,isValid:Z,isSubmitting:ue,isDirty:fe,isValidating:w,interacted:be,validateErrors:se,validateWarnings:Y,cleanup:r.preventStoreStart?()=>{}:M(),start:M}}function createForm$1(t,r){var n,o;(n=t.extend)!==null&&n!==void 0||(t.extend=[]),(o=t.debounced)!==null&&o!==void 0||(t.debounced={}),t.validate&&!Array.isArray(t.validate)&&(t.validate=[t.validate]),t.debounced.validate&&!Array.isArray(t.debounced.validate)&&(t.debounced.validate=[t.debounced.validate]),t.transform&&!Array.isArray(t.transform)&&(t.transform=[t.transform]),t.warn&&!Array.isArray(t.warn)&&(t.warn=[t.warn]),t.debounced.warn&&!Array.isArray(t.debounced.warn)&&(t.debounced.warn=[t.debounced.warn]);function i(k,{debounced:ne,level:le}={debounced:!1,level:"error"}){var m;const $=le==="error"?"validate":"warn";(m=t.debounced)!==null&&m!==void 0||(t.debounced={});const S=ne?t.debounced:t;S[$]?S[$]=[...S[$],k]:S[$]=[k]}function l(k){t.transform?t.transform=[...t.transform,k]:t.transform=[k]}const s=Array.isArray(t.extend)?t.extend:[t.extend];let c=[];const b=()=>c,p=k=>{c=k},{isSubmitting:u,isValidating:d,data:y,errors:_,warnings:f,touched:A,isValid:w,isDirty:v,cleanup:F,start:O,validateErrors:E,validateWarnings:re,interacted:j}=createStores(r.storeFactory,t),R=y.update,V=y.set,X=k=>R(ne=>deepSetKey(executeTransforms(k(ne),t.transform))),q=k=>V(deepSetKey(executeTransforms(k,t.transform)));y.update=X,y.set=q;const C=createHelpers({extender:s,config:t,addValidator:i,addTransformer:l,validateErrors:E,validateWarnings:re,_getCurrentExtenders:b,stores:{data:y,errors:_,warnings:f,touched:A,isValid:w,isValidating:d,isSubmitting:u,isDirty:v,interacted:j}}),{createSubmitHandler:N,handleSubmit:H}=C.public;c=s.map(k=>k({stage:"SETUP",errors:_,warnings:f,touched:A,data:y,isDirty:v,isValid:w,isValidating:d,isSubmitting:u,interacted:j,config:t,addValidator:i,addTransformer:l,setFields:C.public.setFields,reset:C.public.reset,validate:C.public.validate,handleSubmit:H,createSubmitHandler:N}));const J=Object.assign({config:t,stores:{data:y,touched:A,errors:_,warnings:f,isSubmitting:u,isValidating:d,isValid:w,isDirty:v,interacted:j},createSubmitHandler:N,handleSubmit:H,helpers:Object.assign(Object.assign({},C.public),{addTransformer:l,addValidator:i}),extender:s,_getCurrentExtenders:b,_setCurrentExtenders:p},C.private),{form:Q}=createFormAction(J);return Object.assign({data:y,errors:_,warnings:f,touched:A,isValid:w,isSubmitting:u,isValidating:d,isDirty:v,interacted:j,form:Q,cleanup:F,startStores:O},C.public)}/*! *****************************************************************************
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
***************************************************************************** */function __rest(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(t);i<o.length;i++)r.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(t,o[i])&&(n[o[i]]=t[o[i]]);return n}function createAccessor(t){const r={},n={};function o(i){if(!i)return t();if(!r[i.toString()]){const s=createSignal(getValue(untrack(t),i));n[i.toString()]=s,r[i.toString()]=i}const[l]=n[i.toString()];return l()}return createEffect(()=>{const i=t(),l=Object.keys(r);for(const s of l){const c=r[s],b=getValue(i,c),[p,u]=n[c.toString()];isEqual(b,untrack(p))||u(b)}}),o}function createSubscriber(t){return function(n){return createRoot(o=>(createEffect(()=>n(t())),o))}}const storeFactory=t=>{const[r,n]=createSignal(t);function o(c){n(()=>c)}function i(c){n(c)}const l=createAccessor(r),s=createSubscriber(r);return l.subscribe=s,l.set=o,l.update=i,l};function createForm(t){const r=createForm$1(t??{},{storeFactory}),{form:n,cleanup:o,startStores:i,data:l,errors:s,warnings:c,touched:b}=r,p=__rest(r,["form","cleanup","startStores","data","errors","warnings","touched"]);function u(d){const{destroy:y}=n(d);return onCleanup(y),{destroy:y}}return onCleanup(o),Object.assign(Object.assign({},p),{data:l,errors:s,warnings:c,touched:b,form:u})}const _tmpl$$5=template('<form><a><i class="bi bi-plus-circle-fill"></i> Add Color</a></form>'),_tmpl$2$5=template('<i class="bi bi-cloud-arrow-down-fill"></i>'),_tmpl$3$5=template('<label><input type="file"><i class="bi bi-cloud-arrow-up-fill"></i> Import Color Set</label>'),_tmpl$4$2=template("<div></div>"),_tmpl$5$2=template("<label></label>"),_tmpl$6$1=template('<div class="form-element"><label for="colorName">Name</label><input type="text"></div>'),_tmpl$7=template('<div class="form-element"><label for="colorHEX">HEX</label><input type="text" maxlength="7" style="text-transform:uppercase"></div>'),_tmpl$8=template('<a><i class="bi bi-trash3-fill"></i></a>'),ColorSelector=()=>{const[colors,setColors]=createSignal(Object.entries(colorScale())),[jsonFile,setJsonFile]=createSignal(),addColor=()=>{setColors([...colors(),["NAME","#ffffff"]])},removeColor=t=>{setColors([...colors().slice(0,t),...colors().slice(t+1)])},FormGroup=styled("div")`
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
  `,arrToObj=t=>{let r={};for(let n=0;n<t.length;n+=2)r[t[n]]=t[n+1];return r},arrToArr=t=>{let r=[];for(let n=0;n<t.length;n+=2)r.push(t[n]);return r},{form,data,errors,isSubmitting,isValid}=createForm({onSubmit:t=>{setColorScale(arrToObj(Object.values(t)))},validate:t=>{const r={};let n=arrToArr(Object.values(t));return n.length!==new Set(n).size&&(r.duplicate="There are duplicates in the color names!"),isSubmitting&&!isValid&&(console.log("wow"),toast.custom(o=>createComponent(Toast,{color:"error",showExit:!0,toast:o,children:"Something Happened"})),console.log("lmao")),r}});createEffect(()=>{setColors(Object.entries(colorScale()))});const fileDownload=()=>{const t=JSON.stringify(colorScale()),r=new Blob([t],{type:"text/plain"}),n=URL.createObjectURL(r),o=document.createElement("a");o.download="ambientcolors.json",o.href=n,o.click()},fileChange=e=>{const fileReader=new FileReader;fileReader.readAsText(e.target.files[0]),fileReader.onload=e=>{setJsonFile(eval(`(${e.target?.result})`)),setColors(Object.entries(jsonFile()))}};return[(()=>{const t=_tmpl$$5.cloneNode(!0),r=t.firstChild;return form(t,()=>!0),t.style.setProperty("display","flex"),t.style.setProperty("flex-direction","column"),t.style.setProperty("gap","8px"),t.style.setProperty("padding","4px 0 8px 0"),t.style.setProperty("align-items","flex-start"),insert(t,createComponent(For,{get each(){return colors()},children:([n,o],i)=>createComponent(FormGroup,{get children(){return[(()=>{const l=_tmpl$4$2.cloneNode(!0);return l.style.setProperty("width","12px"),insert(l,()=>i()+1),l})(),(()=>{const l=_tmpl$5$2.cloneNode(!0);return insert(l,createComponent(ColorIdentifier,{get color(){return colors()[i()][1]}})),l})(),(()=>{const l=_tmpl$6$1.cloneNode(!0),s=l.firstChild,c=s.nextSibling;return c.value=n,createRenderEffect(()=>setAttribute(c,"name",`colorName${i()}`)),l})(),(()=>{const l=_tmpl$7.cloneNode(!0),s=l.firstChild,c=s.nextSibling;return c.value=o,createRenderEffect(()=>setAttribute(c,"name",`colorHEX${i()}`)),l})(),(()=>{const l=_tmpl$8.cloneNode(!0);return l.$$click=()=>removeColor(i()),l})()]}})}),r),r.$$click=()=>addColor(),insert(t,createComponent(Button,{type:"submit",children:"Generate Color Set"}),null),t})(),createComponent(Flex,{flexDirection:"row",gap:12,style:{"padding-bottom":"20px"},get children(){return[createComponent(Button,{type:"submit",onclick:fileDownload,get children(){return[_tmpl$2$5.cloneNode(!0)," Export Color Set"]}}),createComponent(Button,{type:"submit",get children(){const t=_tmpl$3$5.cloneNode(!0),r=t.firstChild;return t.style.setProperty("font-weight","bold"),t.style.setProperty("cursor","pointer"),r.addEventListener("change",fileChange),r.style.setProperty("display","none"),t}})]}})]};delegateEvents(["click"]);const LuminanceCalc=t=>(chroma(t).luminance()*100).toFixed(2),normalize=(t,r,n)=>(t-n)/(r-n),normalizeArr=(t,r)=>{const n={},o=Object.values(t),i=o[Math.floor(o.length/2)],l=Math.min(...o),s=Math.max(...o),c=Object.entries(t);let b=0;if(r=="to-primary")for(var[p,u]of c)b>Math.floor(o.length/2)&&(n[p]=Number(normalize(u,i,l).toFixed(2))*.5),b==Math.floor(o.length/2)&&(n[p]=.5),b<Math.floor(o.length/2)&&(n[p]=Number(normalize(u,s,i).toFixed(2))*.5+.5),b+=1;if(r=="to-min-max")for(var[p,u]of c)n[p]=Number(normalize(u,s,l).toFixed(2));if(r=="none")for(var[p,u]of c)n[p]=Number((u/100).toFixed(2));return n},relativeLuminanceCalc=(t,r)=>{const n={};for(var o of Object.values(t))n[o]=Number(LuminanceCalc(o));return normalizeArr(n,r)},_tmpl$$4=template('<div class="start"><p>1</p></div>'),_tmpl$2$4=template('<div class="end"><p>0</p></div>'),_tmpl$3$4=template("<br>"),ColorGraph=t=>{const r=()=>t.colorSwatch,n=()=>t.displayType,[o,i]=createSignal(relativeLuminanceCalc(r(),n()));createEffect(()=>{i(relativeLuminanceCalc(r(),n()))});const l=styled("p")`
    margin-top: -22px;
    font-size: 10px;
    opacity: 0;
    transition: opacity 100ms ease-in-out;
    line-height: 2;
    &:hover {
      opacity: 1;
    }
  `,s=styled("div")`
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
  `;return createComponent(Flex,{style:{width:"100%",height:"33px",position:"relative","padding-top":"16px",cursor:"crosshair"},get children(){return[createComponent(s,{get children(){return[_tmpl$$4.cloneNode(!0),_tmpl$2$4.cloneNode(!0)]}}),createComponent(For,{get each(){return Object.entries(o())},children:([c,b],p)=>createComponent(ColorIdentifier,{color:c,style:{position:"absolute",left:`calc(${100-b*100}% - 8px)`},get children(){return createComponent(l,{get children(){return[c,_tmpl$3$4.cloneNode(!0),_tmpl$3$4.cloneNode(!0),b]}})}})})]}})},_tmpl$$3=template("<br>"),_tmpl$2$3=template('<option value="to-primary" selected>Primary Normalization (Recommended)</option>'),_tmpl$3$3=template('<option value="to-min-max">Min Max Normalization</option>'),_tmpl$4$1=template('<option value="none">No Normalization</option>'),_tmpl$5$1=template("<p>Graph Normalization Techniques:<br><strong>No Normalization:</strong> All colors represent the raw 0 to 1 value in luminance.<br><strong>Min Max Normalization:</strong> All data is normalized to min and max of each color group from 0 to 1.<br><strong>Primary Normalization (Recommended):</strong> Luminance values are normalized based on the primary color's luminance value as 0.5 (center).</p>"),GraphList=t=>{const r=()=>t.colorSwatch,[n,o]=createSignal("to-primary"),i=l=>{o(l.target.value)};return[createComponent(Flex,{flexDirection:"column",gap:10,style:{padding:"0 28px"},get children(){return createComponent(For,{get each(){return Object.entries(r())},children:([l,s],c)=>createComponent(ColorGraph,{colorSwatch:s,get displayType(){return n()}})})}}),_tmpl$$3.cloneNode(!0),createComponent(Select,{get value(){return n()},onChange:i,get children(){return[_tmpl$2$3.cloneNode(!0),_tmpl$3$3.cloneNode(!0),_tmpl$4$1.cloneNode(!0)]}}),_tmpl$$3.cloneNode(!0),(()=>{const l=_tmpl$5$1.cloneNode(!0);return l.style.setProperty("padding-top","12px"),l.style.setProperty("color","rgba(256, 256, 256, 0.5)"),l})()]},_tmpl$$2=template("<h3>Ambient Color Generation Tool</h3>"),_tmpl$2$2=template("<p>This tool is designed to generate <strong>contrast ready</strong> color pallets built specifically for UIUX design. Unlike other pallette generation tools, Ambient generates the colors <strong>based on the primary color</strong>. Hues, saturation, and relative lightness adjustments are made automatically using our <a>algorithm</a>. These values can be adjusted by adjusting the base functions.styled.tsx file located inside the styles folder. As ambient relies on the primary color for alternative color generation, primary colors <strong>must be contrast compliant</strong>. Ambient displays both WACG and APCA definitions of text contrast, a 4.5:1(WACG) or 60Lc(APCA) is recommended for text contrast. Please remember that for the best results, contrast in colors or differences in color should not represent meaningful information in UIUX design to prevent accessability issues. </p>"),_tmpl$3$2=template("<br>"),Introduction=()=>[_tmpl$$2.cloneNode(!0),_tmpl$2$2.cloneNode(!0),_tmpl$3$2.cloneNode(!0)],_tmpl$$1=template("<form></form>"),_tmpl$2$1=template("<br>"),_tmpl$3$1=template("<div></div>"),_tmpl$4=template("<label></label>"),_tmpl$5=template('<div class="form-element"><label for="colorName">Name</label><input type="text"></div>'),_tmpl$6=template('<div class="form-element"><label for="colorHEX">HEX</label><input type="text" maxlength="7" style="text-transform:uppercase"></div>'),TextColorSelector=()=>{const[t,r]=createSignal(Object.entries(textColorScale())),n=styled("div")`
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
  `,o=u=>{let d={};for(let y=0;y<u.length;y+=2)d[u[y]]=u[y+1];return d},i=u=>{let d=[];for(let y=0;y<u.length;y+=2)d.push(u[y]);return d},{form:l,data:s,errors:c,isSubmitting:b,isValid:p}=createForm({onSubmit:u=>{setTextColorScale(o(Object.values(u)))},validate:u=>{const d={};let y=i(Object.values(u));return y.length!==new Set(y).size&&(d.duplicate="There are duplicates in the color names!"),b&&!p&&(console.log("wow"),toast.custom(_=>createComponent(Toast,{color:"error",showExit:!0,toast:_,children:"Something Happened"})),console.log("lmao")),d}});return createEffect(()=>{r(Object.entries(textColorScale()))}),[(()=>{const u=_tmpl$$1.cloneNode(!0);return l(u,()=>!0),u.style.setProperty("display","flex"),u.style.setProperty("flex-direction","column"),u.style.setProperty("gap","8px"),u.style.setProperty("padding","4px 0 16px 0"),u.style.setProperty("align-items","flex-start"),insert(u,createComponent(For,{get each(){return t()},children:([d,y],_)=>createComponent(n,{get children(){return[(()=>{const f=_tmpl$3$1.cloneNode(!0);return f.style.setProperty("width","auto"),insert(f,d),f})(),(()=>{const f=_tmpl$4.cloneNode(!0);return insert(f,createComponent(ColorIdentifier,{get color(){return t()[_()][1]}})),f})(),(()=>{const f=_tmpl$5.cloneNode(!0),A=f.firstChild,w=A.nextSibling;return f.style.setProperty("display","none"),w.value=d,createRenderEffect(()=>setAttribute(w,"name",`colorName${_()}`)),f})(),(()=>{const f=_tmpl$6.cloneNode(!0),A=f.firstChild,w=A.nextSibling;return w.value=y,createRenderEffect(()=>setAttribute(w,"name",`colorHEX${_()}`)),f})()]}})}),null),insert(u,createComponent(Button,{type:"submit",children:"Change Text Colors"}),null),u})(),_tmpl$2$1.cloneNode(!0)]},_tmpl$=template("<div><h3>Color Table</h3><p>Color table of generated colors can be edited here. Only the primary color is considered. <strong>Color names must be unique.</strong></p><br><h4>Text Colors</h4></div>"),_tmpl$2=template("<div><h3>Color Graph</h3><p>These values are the calculated luminance values of each color. The graph does not update until the color set is generated. </p><br><br></div>"),_tmpl$3=template("<br>"),Home=()=>[createComponent(Introduction,{}),createComponent(Flex,{flexDirection:"row",gap:16,get children(){return[(()=>{const t=_tmpl$.cloneNode(!0),r=t.firstChild,n=r.nextSibling,o=n.nextSibling,i=o.nextSibling;return t.style.setProperty("width","auto"),insert(t,createComponent(ColorSelector,{}),i),insert(t,createComponent(TextColorSelector,{}),null),t})(),(()=>{const t=_tmpl$2.cloneNode(!0),r=t.firstChild,n=r.nextSibling,o=n.nextSibling;return t.style.setProperty("width","100%"),n.style.setProperty("padding-bottom","12px"),insert(t,createComponent(GraphList,{get colorSwatch(){return ColorShades()}}),o),t})()]}}),createComponent(ColorListPage,{}),_tmpl$3.cloneNode(!0)];export{Home as default};
