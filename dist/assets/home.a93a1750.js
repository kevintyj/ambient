import{c as chroma,s as styled,d as delegateEvents,a as splitProps,b as createComponent,m as mergeProps,e as memo,i as insert,f as toast,t as template,g as createEffect,h as textColorScale,F as For,j as Flex,k as arrSize,l as createRenderEffect,n as createSignal,C as ColorShades,o as ColorMix,p as ColorRelative,q as ColorLegacy,S as SetLegacy,r as SetRelative,u as SetShades,v as untrack,w as createRoot,x as onCleanup,y as colorScale,z as setAttribute,A as setColorScale,B as setTextColorScale}from"./index.9d7bf36e.js";const mainTRC=2.4,sRco=.2126729,sGco=.7151522,sBco=.072175,normBG=.56,normTXT=.57,revTXT=.62,revBG=.65,blkThrs=.022,blkClmp=1.414,scaleBoW=1.14,scaleWoB=1.14,loBoWthresh=.035991,loWoBthresh=.035991,loBoWfactor=27.7847239587675,loWoBfactor=27.7847239587675,loBoWoffset=.027,loWoBoffset=.027,loClip=.001,deltaYmin=5e-4;function sRGBtoY(t){let r=(t&16711680)>>16,n=(t&65280)>>8,o=t&255;function l(i){return Math.pow(i/255,mainTRC)}return sRco*l(r)+sGco*l(n)+sBco*l(o)}function APCAcontrast(t,r){var n=0,o=0;return t=t>blkThrs?t:t+Math.pow(blkThrs-t,blkClmp),r=r>blkThrs?r:r+Math.pow(blkThrs-r,blkClmp),Math.abs(r-t)<deltaYmin?0:(r>t?(n=(Math.pow(r,normBG)-Math.pow(t,normTXT))*scaleBoW,o=n<loClip?0:n<loBoWthresh?n-n*loBoWfactor*loBoWoffset:n-loBoWoffset):(n=(Math.pow(r,revBG)-Math.pow(t,revTXT))*scaleWoB,o=n>-loClip?0:n>-loWoBthresh?n-n*loWoBfactor*loWoBoffset:n+loWoBoffset),o*100)}const calcWCAG=(t,r)=>chroma.contrast(t,r),calcMaxWCAG=(t,r)=>{let n=0,o="",l="";for(const[i,s]of Object.entries(t)){let u=calcWCAG(s,r);if(u>n&&(n=u,o=i,l=s,n>4.5&&contrastCalcType()==1))return[n.toFixed(2),o,l]}return n>4.5?[n.toFixed(2),o,l]:["NA","NA",l]},calcAPCA=(t,r)=>{const n=parseInt(`0x${t.substring(1)}`,16),o=parseInt(`0x${r.substring(1)}`,16);return APCAcontrast(sRGBtoY(n),sRGBtoY(o))},calcMaxAPCA=(t,r)=>{let n=0,o="",l="";for(const[i,s]of Object.entries(t)){let u=Math.abs(calcAPCA(s,r));if(u>n&&(n=u,o=i,l=s,n>60&&contrastCalcType()==1))return[n.toFixed(2),o,l]}return n>60?[n.toFixed(2),o,l]:["NA","NA",l]},calcMaxAPCABG=(t,r)=>{let n=0,o="",l="";for(const[i,s]of Object.entries(t)){let u=Math.abs(calcAPCA(r,s));if(u>n&&(n=u,o=i,l=s,n>60&&contrastCalcType()==1))return[n.toFixed(2),o,l]}return n>60?[n.toFixed(2),o,l]:["NA","NA",l]},ColorIdentifier=styled("div")`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background-color: ${t=>t.color?t.color:"white"};
  border: 1px solid rgba(255, 255, 255, 0.14);
`,_tmpl$$9=template("<p></p>"),_tmpl$2$9=template('<a><i class="bi bi-x"></i></a>'),Toast=t=>{const[r,n]=splitProps(t,["children","toast","color","showExit","box"]),o=()=>{switch(t.color){case"warning":return"#674d0f";case"error":return"#5d000a";case"info":return"#040e1f"}return"black"},l=styled("div")`
    display: flex;
    background-color: ${o};
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    padding: 10px 10px 6px 10px;
    gap: 8px;

    @media only screen and (max-width: 780px) {
      padding: 8px 8px 6px 8px;
    }
  `;return createComponent(l,mergeProps(n,{get children(){return[memo(()=>memo(()=>!!r.box,!0)()&&createComponent(ColorIdentifier,{get color(){return t.box}})),(()=>{const i=_tmpl$$9.cloneNode(!0);return insert(i,()=>t.children),i})(),memo(()=>memo(()=>!!r.showExit,!0)()&&(()=>{const i=_tmpl$2$9.cloneNode(!0);return i.$$click=()=>toast.dismiss(t.toast.id),i})())]}}))};delegateEvents(["click"]);const _tmpl$$8=template('<i class="bi bi-x-circle"></i>'),_tmpl$2$8=template('<i class="bi bi-dash-circle"></i>'),_tmpl$3$7=template('<i class="bi bi-exclamation-circle"></i>'),_tmpl$4$4=template('<i class="bi bi-check-circle"></i>'),_tmpl$5$4=template("<div></div>"),_tmpl$6$3=template("<p></p>"),_tmpl$7$2=template("<p>BG Color Safe</p>"),_tmpl$8$2=template('<p class="contrast"><object><strong>WCAG: </strong> </object><br><object><strong>APCA: </strong> </object><br><object><strong>APCA TEXT: </strong> </object><br><object><strong>APCA BG: </strong> </object></p>'),_tmpl$9$1=template('<p class="helper"><strong></strong><br></p>'),ColorSwatch=t=>{const r=()=>t.colorSwatch;createEffect(()=>{textColorScale()});const n=a=>{navigator.clipboard.writeText(a).then(()=>{toast.custom(p=>createComponent(Toast,{box:a,showExit:!0,toast:p,get children(){return["Pallette Copied! ",a]}}))},()=>{toast.custom(p=>createComponent(Toast,{color:"error",showExit:!0,toast:p,children:"Copying Failed!"}))})},o=(a,p,m)=>{const S=Number(calcMaxWCAG(a,m)[0]),d=Number(calcMaxAPCA(a,m)[0]),b=Number(calcMaxWCAG(p,m)[0]),x=Number(calcMaxAPCA(p,m)[0]),_=Number(calcMaxAPCABG(p,m)[0]);return b<4.5||S<4.5?x<60&&_?_tmpl$$8.cloneNode(!0):d<60?_tmpl$2$8.cloneNode(!0):_tmpl$3$7.cloneNode(!0):_tmpl$4$4.cloneNode(!0)},l=styled("div")`
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

    .left {
      background-color: aliceblue;
      height: 110px;
      width: 500px;
    }
  `,i=styled("div")`
    position: absolute;
    top: 0px;
    right: 6px;
    i {
      font-size: 12px;
    }
  `,s=a=>a==0?{"border-radius":"5px 0 0 5px",padding:"5px 5px 5px 5px","border-width":"1px 0 1px 1px","margin-right":"-5px"}:a==1?{"border-radius":"0 5px 5px 0",padding:"5px 5px 5px 5px","border-width":"1px 1px 1px 0",margin:"0 -5px"}:a==arrSize()-2?{"border-radius":"5px 0 0 5px",padding:"5px 5px 5px 5px","border-width":"1px 0 1px 1px",margin:"0 -5px"}:a==arrSize()-1?{"border-radius":"0 5px 5px 0",padding:"5px 5px 5px 5px","border-width":"1px 1px 1px 0","margin-left":"-5px"}:{padding:"5px 0"},u=styled("div")`
    background-color: ${a=>a.color};
    height: 84px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 5px 8px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid ${a=>calcMaxAPCA(textColorScale(),a.color)[2]=="#FFFFFF"?chroma(a.color).brighten(1.02).hex():chroma(a.color).darken(1.02).hex()};
    width: 100%;

    p {
      color: ${a=>calcMaxAPCA(textColorScale(),a.color)[2]} !important;
      font-size: 10px;
      line-height: 12px;
    }
    .contrast {
      opacity: ${()=>showContrast()};
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
  `;return(()=>{const a=_tmpl$5$4.cloneNode(!0);return insert(a,createComponent(For,{get each(){return Object.entries(r())},children:([p,m],S)=>[(()=>{const d=_tmpl$6$3.cloneNode(!0);return insert(d,p),d})(),createComponent(l,{get children(){return createComponent(For,{get each(){return Object.entries(m)},children:([d,b],x)=>createComponent(Flex,{flexDirection:"column",get style(){return Object.assign({"flex-basis":"100%",overflow:"hidden","border-style":"solid","border-color":"rgba(256, 256, 256, 0.14)"},s(x()))},get children(){return[createComponent(u,{color:b,get style(){return{border:x()==Math.floor(arrSize()/2)?"1px solid rgba(256, 256, 256, 1)":"",flex:x()==arrSize()/2?"none":"1","border-radius":(x()==Math.floor(arrSize()/2),"3px")}},onClick:()=>n(b),get children(){return[createComponent(i,{get style(){return{color:calcMaxAPCA(textColorScale(),b)[2]}},get children(){return o(m,textColorScale(),b)}}),(()=>{const _=_tmpl$8$2.cloneNode(!0),N=_.firstChild;N.firstChild.nextSibling;const P=N.nextSibling,w=P.nextSibling;w.firstChild.nextSibling;const V=w.nextSibling,O=V.nextSibling;O.firstChild.nextSibling;const q=O.nextSibling,B=q.nextSibling;return B.firstChild.nextSibling,insert(N,()=>`${calcMaxWCAG(m,b)[1]} (${calcMaxWCAG(m,b)[0]})`,null),insert(w,()=>`${calcMaxAPCA(m,b)[1]} (${calcMaxAPCA(m,b)[0]})`,null),insert(O,()=>calcMaxAPCA(textColorScale(),b)[0],null),insert(B,()=>calcMaxAPCABG(textColorScale(),b)[0],null),createRenderEffect(y=>{const W=calcMaxWCAG(m,b)[2],G=calcMaxAPCA(m,b)[2],J=calcMaxAPCA(textColorScale(),b)[2],Q=calcMaxAPCABG(textColorScale(),b)[2];return W!==y._v$&&N.style.setProperty("color",y._v$=W),G!==y._v$2&&w.style.setProperty("color",y._v$2=G),J!==y._v$3&&O.style.setProperty("color",y._v$3=J),Q!==y._v$4&&B.style.setProperty("color",y._v$4=Q),y},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),_})()]}}),(()=>{const _=_tmpl$9$1.cloneNode(!0),N=_.firstChild;return N.nextSibling,insert(N,d),insert(_,b,null),_})()]}})})}}),createComponent(Flex,{flexDirection:"row",flexJustify:"space-between",style:{color:"rgba(256, 256, 256, 0.4)","margin-top":"-3px",padding:"0 5px 9px 5px"},get children(){return[(()=>{const d=_tmpl$7$2.cloneNode(!0);return d.style.setProperty("font-size","12px"),d})(),(()=>{const d=_tmpl$7$2.cloneNode(!0);return d.style.setProperty("font-size","12px"),d})()]}})]})),a})()},_tmpl$$7=template("<h5></h5>"),_tmpl$2$7=template("<br>"),SwatchList=t=>{const r=()=>t.swatchList;return createComponent(For,{get each(){return r()},children:n=>[(()=>{const o=_tmpl$$7.cloneNode(!0);return insert(o,()=>n.name),o})(),createComponent(ColorSwatch,{get colorSwatch(){return n.swatch}}),_tmpl$2$7.cloneNode(!0)]})},Button=styled("button")`
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
`,_tmpl$$6=template("<h3>Generated Colors</h3>"),_tmpl$2$6=template("<p>Export color type:</p>"),_tmpl$3$6=template('<option value="hex" selected>HEX (Default)</option>'),_tmpl$4$3=template('<option value="rgb">RGB</option>'),_tmpl$5$3=template('<option value="hsl">HSL</option>'),_tmpl$6$2=template('<option value="hsv">HSV</option>'),_tmpl$7$1=template('<option value="hsi">HSI</option>'),_tmpl$8$1=template('<option value="lab">LAB</option>'),_tmpl$9=template('<option value="oklab">OKLAB</option>'),_tmpl$10=template('<option value="lch">LCH</option>'),_tmpl$11=template('<option value="hcl">HCL</option>'),_tmpl$12=template('<option value="okhcl">OKHCL</option>'),_tmpl$13=template("<p>Color Shade Length:</p>"),_tmpl$14=template('<option value="7" selected>7 (Default)</option>'),_tmpl$15=template('<option value="9">9</option>'),_tmpl$16=template("<p>Contrast Color Method:</p>"),_tmpl$17=template('<option value="0" selected>Most Contrasting Color (Default)</option>'),_tmpl$18=template('<option value="1">First Compliant Color</option>'),_tmpl$19=template("<p>Always Show Contrast Info</p>"),_tmpl$20=template('<option value="0" selected>False (Default)</option>'),_tmpl$21=template('<option value="1">True</option>'),_tmpl$22=template("<br>"),[showContrast,setShowContrast]=createSignal("0"),[contrastCalcType,setContrastCalcType]=createSignal(0),ColorListPage=()=>{const[t,r]=createSignal("hex"),[n,o]=createSignal(7),l=()=>{let d=[];for(const b of u()){let x={};x.name=b.name;let _={};for(const[N,F]of Object.entries(b.swatch)){let P={};for(const[w,A]of Object.entries(F))switch(P[w]=A,t()){case"hex":P[w]=chroma(A).hex();break;case"rgb":P[w]=`rgb(${chroma(A).rgb().toString()})`;break;case"hsl":P[w]=`hsl(${chroma(A).hsl().toString()})`;break;case"hsv":P[w]=`hsv(${chroma(A).hsv().toString()})`;break;case"hsi":P[w]=`hsi(${chroma(A).hsi().toString()})`;break;case"lab":P[w]=`lab(${chroma(A).lab().toString()})`;break;case"oklab":P[w]=`oklab(${chroma(A).oklab().toString()})`;break;case"lch":P[w]=`lch(${chroma(A).lch().toString()})`;break;case"hcl":P[w]=`hcl(${chroma(A).hcl().toString()})`;break;case"okhcl":P[w]=`okhcl(${chroma(A).okhcl().toString()})`;break}_[N]=P}x.swatch=_,d.push(x)}return d},i=()=>{console.log(l());const d=JSON.stringify(u()),b=new Blob([d],{type:"text/plain"}),x=URL.createObjectURL(b),_=document.createElement("a");_.download="ambientcolors-full.json",_.href=x,_.click()},s=()=>{const d=JSON.stringify(l()[0].swatch),b=new Blob([d],{type:"text/plain"}),x=URL.createObjectURL(b),_=document.createElement("a");_.download="ambientcolors-full.json",_.href=x,_.click()},u=()=>[{name:"Shades Corrected (RGB)",swatch:ColorShades()},{name:"Blended (Lab Color Mix)",swatch:ColorMix()},{name:"Relative (HSV & Relative Luminance)",swatch:ColorRelative()},{name:"Brighten and Darken (Legacy)",swatch:ColorLegacy()}],a=d=>{r(d.target.value)},p=d=>{o(d.target.value),n()==9&&(SetLegacy([1.7,1.3,1.2,1.1,1,.9,.8,.7,.1]),SetRelative([1.3,1.2,1.15,1.1,1,.9,.85,.6,.5]),SetShades([.4,.6,.8,.9,1,1.1,1.2,1.4,1.6])),n()==7&&(SetLegacy([1.7,1.3,1.1,1,.9,.7,.1]),SetRelative([1.3,1.2,1.1,1,.9,.6,.5]),SetShades([.4,.6,.9,1,1.1,1.4,1.6]))},m=d=>{setShowContrast(d.target.value)},S=d=>{setContrastCalcType(d.target.value)};return[_tmpl$$6.cloneNode(!0),createComponent(Flex,{flexDirection:"row",gap:8,style:{margin:"0 0 8px -2px"},get children(){return[createComponent(Button,{type:"submit",onclick:i,children:"Export colors"}),createComponent(Button,{type:"submit",onclick:s,children:"Export colors (Tailwind)"}),(()=>{const d=_tmpl$2$6.cloneNode(!0);return d.style.setProperty("padding","18px 0 0 12px"),d})(),createComponent(Select,{get value(){return t()},onChange:a,get children(){return[_tmpl$3$6.cloneNode(!0),_tmpl$4$3.cloneNode(!0),_tmpl$5$3.cloneNode(!0),_tmpl$6$2.cloneNode(!0),_tmpl$7$1.cloneNode(!0),_tmpl$8$1.cloneNode(!0),_tmpl$9.cloneNode(!0),_tmpl$10.cloneNode(!0),_tmpl$11.cloneNode(!0),_tmpl$12.cloneNode(!0)]}}),(()=>{const d=_tmpl$13.cloneNode(!0);return d.style.setProperty("padding","18px 0 0 12px"),d})(),createComponent(Select,{get value(){return n()},onChange:p,get children(){return[_tmpl$14.cloneNode(!0),_tmpl$15.cloneNode(!0)]}})]}}),createComponent(Flex,{flexDirection:"row",gap:8,style:{margin:"0 0 24px -2px"},get children(){return[(()=>{const d=_tmpl$16.cloneNode(!0);return d.style.setProperty("padding","18px 0 0 0"),d})(),createComponent(Select,{get value(){return contrastCalcType()},onChange:S,get children(){return[_tmpl$17.cloneNode(!0),_tmpl$18.cloneNode(!0)]}}),(()=>{const d=_tmpl$19.cloneNode(!0);return d.style.setProperty("padding","18px 0 0 12px"),d})(),createComponent(Select,{get value(){return showContrast()},onChange:m,get children(){return[_tmpl$20.cloneNode(!0),_tmpl$21.cloneNode(!0)]}})]}}),createComponent(SwatchList,{get swatchList(){return u()}}),_tmpl$22.cloneNode(!0)]};function subscribe(t,...r){const n=t.subscribe(...r);return n.unsubscribe?()=>n.unsubscribe():n}function get(t){let r;return subscribe(t,n=>r=n)(),r}class FelteSubmitError extends Error{constructor(r,n){super(r),this.name="FelteSubmitError",this.response=n}}function _some(t,r){return Object.keys(t).some(o=>r(t[o]))}function _mapValues(t,r){return Object.keys(t).reduce((o,l)=>Object.assign(Object.assign({},o),{[l]:r(t[l])}),{})}function _isPlainObject(t){return Object.prototype.toString.call(t)==="[object Object]"}function _cloneDeep(t){return Object.keys(t||{}).reduce((r,n)=>Object.assign(Object.assign({},r),{[n]:_isPlainObject(t[n])?_cloneDeep(t[n]):Array.isArray(t[n])?[...t[n]]:t[n]}),{})}/*! *****************************************************************************
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
***************************************************************************** */function __rest$2(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(t);l<o.length;l++)r.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(t,o[l])&&(n[o[l]]=t[o[l]]);return n}function handleArray(t){return function(r){if(_isPlainObject(r)){const n=deepSet(r,t);return __rest$2(n,["key"])}return t}}function deepSet(t,r){return _mapValues(t,n=>_isPlainObject(n)?deepSet(n,r):Array.isArray(n)?n.map(handleArray(r)):r)}function _mergeWith(...t){const r=t.pop(),n=_cloneDeep(t.shift());if(t.length===0)return n;for(const o of t){if(!o)continue;let l=r(n,o);if(typeof l<"u")return l;const i=Array.from(new Set(Object.keys(n).concat(Object.keys(o))));for(const s of i)if(l=r(n[s],o[s]),typeof l<"u")n[s]=l;else if(_isPlainObject(o[s])&&_isPlainObject(n[s]))n[s]=_mergeWith(n[s],o[s],r);else if(Array.isArray(o[s]))n[s]=o[s].map((u,a)=>{if(!_isPlainObject(u))return u;const p=Array.isArray(n[s])?n[s][a]:n[s];return _mergeWith(p,u,r)});else if(_isPlainObject(o[s])){const u=deepSet(_cloneDeep(o[s]),void 0);n[s]=_mergeWith(u,o[s],r)}else typeof o[s]<"u"&&(n[s]=o[s])}return n}function defaultsCustomizer(t,r){if(!(_isPlainObject(t)&&_isPlainObject(r))){if(Array.isArray(r)){if(r.some(_isPlainObject))return;const n=Array.isArray(t)?t:[];return r.map((o,l)=>{var i;return(i=n[l])!==null&&i!==void 0?i:o})}if(typeof t<"u")return t}}function _defaultsDeep(...t){return _mergeWith(...t,defaultsCustomizer)}function _merge(...t){return _mergeWith(...t,()=>{})}function _get(t,r,n){const o=i=>String.prototype.split.call(r,i).filter(Boolean).reduce((s,u)=>s!=null?s[u]:s,t),l=o(/[,[\]]+?/)||o(/[,[\].]+?/);return l===void 0||l===t?n:l}function _update(t,r,n){t&&(t=_cloneDeep(t)),_isPlainObject(t)||(t={});const o=Array.isArray(r)?r:r.match(/[^.[\]]+/g)||[],l=o[o.length-1];if(!l)return t;let i=t;for(let s=0;s<o.length-1;s++){const u=o[s];if(!i[u]||!_isPlainObject(i[u])&&!Array.isArray(i[u])){const a=o[s+1];isNaN(Number(a))?i[u]={}:i[u]=[]}i=i[u]}return i[l]=n(i[l]),t}function _set(t,r,n){return _update(t,r,()=>n)}function _unset(t,r){if(!t||Object(t)!==t)return;typeof t<"u"&&(t=_cloneDeep(t));const n=Array.isArray(r)?r:r.toString().match(/[^.[\]]+/g)||[],o=n.length===1?t:_get(t,n.slice(0,-1).join("."));return Array.isArray(o)?o.splice(Number(n[n.length-1]),1):o==null||delete o[n[n.length-1]],t}function deepSome(t,r){return _some(t,n=>_isPlainObject(n)?deepSome(n,r):Array.isArray(n)?n.length===0||n.every(o=>typeof o=="string")?r(n):n.some(o=>_isPlainObject(o)?deepSome(o,r):r(o)):r(n))}function isInputElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="INPUT"}function isTextAreaElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="TEXTAREA"}function isSelectElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="SELECT"}function isFieldSetElement(t){var r;return((r=t)===null||r===void 0?void 0:r.nodeName)==="FIELDSET"}function isFormControl(t){return isInputElement(t)||isTextAreaElement(t)||isSelectElement(t)}function isElement(t){return t.nodeType===Node.ELEMENT_NODE}function getPath(t,r){return r??(isFormControl(t)?t.name:"")}function shouldIgnore(t){let r=t;for(;r&&r.nodeName!=="FORM";){if(r.hasAttribute("data-felte-ignore"))return!0;r=r.parentElement}return!1}function getValue(t,r){return!_isPlainObject(t)||!r?t:typeof r=="string"?_get(t,r):r(t)}function executeCustomizer(t,r){if(!(_isPlainObject(t)||_isPlainObject(r))){if(t===null||t==="")return r;if(r===null||r===""||!r)return t;if(!(!t||!r)){if(Array.isArray(t)){if(!Array.isArray(r))return[...t,r];const n=[],o=Math.max(r.length,t.length);for(let l=0;l<o;l++){let i=t[l],s=r[l];!_isPlainObject(i)&&!_isPlainObject(s)?(Array.isArray(i)||(i=[i]),Array.isArray(s)||(s=[s]),n.push(...i,...s)):n.push(mergeErrors([i??{},s??{}]))}return n.filter(Boolean)}return Array.isArray(r)||(r=[r]),[t,...r].reduce((n,o)=>n.concat(o),[]).filter(Boolean)}}}function mergeErrors(t){return _mergeWith(...t,executeCustomizer)}function runValidations(t,r){return r?(Array.isArray(r)?r:[r]).map(o=>o(t)):[]}function executeTransforms(t,r){return r?Array.isArray(r)?r.reduce((n,o)=>o(n),t):r(t):t}function createId(t=8){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";for(let o=0;o<t;o++)n+=r.charAt(Math.floor(Math.random()*r.length));return n}function isEqual(t,r){if(t===r)return!0;if(Array.isArray(t)&&Array.isArray(r))return t.length!==r.length?!1:t.every((n,o)=>isEqual(n,r[o]));if(_isPlainObject(t)&&_isPlainObject(r)){const n=Object.keys(t),o=Object.keys(r);return n.length!==o.length?!1:n.every(l=>isEqual(t[l],r[l]))}return!1}function debounce(t,r,{onInit:n,onEnd:o}={}){let l;return(...i)=>{l||n?.(),l&&clearTimeout(l),l=setTimeout(()=>{t.apply(this,i),l=void 0,o?.()},r)}}function getFormControls(t){if(isFormControl(t))return[t];if(t.childElementCount===0)return[];const r=new Set;for(const n of t.children){if(isFormControl(n)&&r.add(n),isFieldSetElement(n))for(const o of n.elements)isFormControl(o)&&r.add(o);n.childElementCount>0&&getFormControls(n).forEach(o=>r.add(o))}return Array.from(r)}function addAttrsFromFieldset(t){for(const r of t.elements)!isFormControl(r)&&!isFieldSetElement(r)||t.hasAttribute("data-felte-keep-on-remove")&&!r.hasAttribute("data-felte-keep-on-remove")&&(r.dataset.felteKeepOnRemove=t.dataset.felteKeepOnRemove)}function getInputTextOrNumber(t){return t.type.match(/^(number|range)$/)?t.value?+t.value:void 0:t.value}function getFormDefaultValues(t){var r;let n={},o={};for(const l of t.elements){if(isFieldSetElement(l)&&addAttrsFromFieldset(l),!isFormControl(l)||!l.name)continue;const i=getPath(l);if(isInputElement(l)){if(l.type==="checkbox"){if(typeof _get(n,i)>"u"){if(Array.from(t.querySelectorAll(`[name="${l.name}"]`)).filter(a=>isFormControl(a)?i===getPath(a):!1).length===1){n=_set(n,i,l.checked),o=_set(o,i,!1);continue}n=_set(n,i,l.checked?[l.value]:[]),o=_set(o,i,!1);continue}Array.isArray(_get(n,i))&&l.checked&&(n=_update(n,i,u=>[...u,l.value]));continue}if(l.type==="radio"){if(_get(n,i))continue;n=_set(n,i,l.checked?l.value:void 0),o=_set(o,i,!1);continue}if(l.type==="file"){n=_set(n,i,l.multiple?Array.from(l.files||[]):(r=l.files)===null||r===void 0?void 0:r[0]),o=_set(o,i,!1);continue}}else if(isSelectElement(l)){if(!l.multiple)n=_set(n,i,l.value);else{const a=Array.from(l.options).filter(p=>p.selected).map(p=>p.value);n=_set(n,i,a)}o=_set(o,i,!1);continue}const s=getInputTextOrNumber(l);n=_set(n,i,s),o=_set(o,i,!1)}return{defaultData:n,defaultTouched:o}}function setControlValue(t,r){var n;if(!isFormControl(t))return;const o=r;if(isInputElement(t)){if(t.type==="checkbox"){const l=o;if(typeof l>"u"||typeof l=="boolean"){t.checked=!!l;return}Array.isArray(l)&&(l.includes(t.value)?t.checked=!0:t.checked=!1);return}if(t.type==="radio"){const l=o;t.value===l?t.checked=!0:t.checked=!1;return}if(t.type==="file"){t.files=null,t.value="";return}}else if(isSelectElement(t)){if(t.multiple){if(Array.isArray(o)){t.value=String((n=o[0])!==null&&n!==void 0?n:"");for(const i of t.options)o.includes(i.value)?i.selected=!0:i.selected=!1}}else{t.value=String(o??"");for(const i of t.options)i.value===o?i.selected=!0:i.selected=!1}return}t.value=String(o??"")}function setForm(t,r){for(const n of t.elements){if(isFieldSetElement(n)&&addAttrsFromFieldset(n),!isFormControl(n)||!n.name)continue;const o=getPath(n);setControlValue(n,_get(r,o))}}/*! *****************************************************************************
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
***************************************************************************** */function __rest$1(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(t);l<o.length;l++)r.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(t,o[l])&&(n[o[l]]=t[o[l]]);return n}function deepSetTouched(t,r){return _mapValues(t,n=>_isPlainObject(n)?deepSetTouched(n,r):Array.isArray(n)?n.length===0||n.every(o=>typeof o=="string")?r:n.map(o=>{const l=deepSetTouched(o,r);return __rest$1(l,["key"])}):r)}function deepSetKey(t){return t?_mapValues(t,r=>_isPlainObject(r)?deepSetKey(r):Array.isArray(r)?r.length===0||r.every(n=>typeof n=="string")?r:r.map(n=>{if(!_isPlainObject(n))return n;const o=deepSetKey(n);return o.key||(o.key=createId()),o}):r):{}}function deepRemoveKey(t){return t?_mapValues(t,r=>_isPlainObject(r)?deepSetKey(r):Array.isArray(r)?r.length===0||r.every(n=>typeof n=="string")?r:r.map(n=>{if(!_isPlainObject(n))return n;const o=deepSetKey(n);return __rest$1(o,["key"])}):r):{}}function createEventConstructors(){class t extends CustomEvent{constructor(l){super("feltesuccess",{detail:l})}}class r extends CustomEvent{constructor(l){super("felteerror",{detail:l,cancelable:!0})}setErrors(l){this.preventDefault(),this.errors=l}}class n extends Event{constructor(){super("feltesubmit",{cancelable:!0})}handleSubmit(l){this.onSubmit=l}handleError(l){this.onError=l}handleSuccess(l){this.onSuccess=l}}return{createErrorEvent:o=>new r(o),createSubmitEvent:()=>new n,createSuccessEvent:o=>new t(o)}}function createDefaultSubmitHandler(t){if(!!t)return async function(){let n=new FormData(t);const o=new URL(t.action),l=t.method.toLowerCase()==="get"?"get":o.searchParams.get("_method")||t.method;let i=t.enctype;t.querySelector('input[type="file"]')&&(i="multipart/form-data"),(l==="get"||i==="application/x-www-form-urlencoded")&&(n=new URLSearchParams(n));let s;l==="get"?(n.forEach((a,p)=>{o.searchParams.append(p,a)}),s={method:l,headers:{Accept:"application/json"}}):s={method:l,body:n,headers:{"Content-Type":i,Accept:"application/json"}};const u=await window.fetch(o.toString(),s);if(u.ok)return u;throw new FelteSubmitError("An error occurred while submitting the form",u)}}function addAtIndex(t,r,n,o){return _update(t,r,l=>(typeof l<"u"&&!Array.isArray(l)||(l||(l=[]),typeof o>"u"?l.push(n):l.splice(o,0,n)),l))}function swapInArray(t,r,n,o){return _update(t,r,l=>(!l||!Array.isArray(l)||([l[n],l[o]]=[l[o],l[n]]),l))}function moveInArray(t,r,n,o){return _update(t,r,l=>(!l||!Array.isArray(l)||l.splice(o,0,l.splice(n,1)[0]),l))}function isUpdater(t){return typeof t=="function"}function createSetHelper(t){return(n,o)=>{if(typeof n=="string"){const l=n;t(i=>{const s=isUpdater(o)?o(_get(i,l)):o;return _set(i,l,s)})}else t(l=>isUpdater(n)?n(l):n)}}function createHelpers({stores:t,config:r,validateErrors:n,validateWarnings:o,_getCurrentExtenders:l}){var i;let s,u=deepSetKey((i=r.initialValues)!==null&&i!==void 0?i:{});const{data:a,touched:p,errors:m,warnings:S,isDirty:d,isSubmitting:b,interacted:x}=t,_=createSetHelper(a.update),N=createSetHelper(p.update),F=createSetHelper(m.update),P=createSetHelper(S.update);function w(f){_($=>{const C=f($);return s&&setForm(s,C),C})}const A=(f,$,C)=>{createSetHelper(w)(f,$),typeof f=="string"&&C&&N(f,!0)};function V(f,$,C){const j=_isPlainObject($)?deepSetTouched($,!1):!1,L=_isPlainObject(j)?deepSet(j,[]):[];$=_isPlainObject($)?Object.assign(Object.assign({},$),{key:createId()}):$,m.update(D=>addAtIndex(D,f,L,C)),S.update(D=>addAtIndex(D,f,L,C)),p.update(D=>addAtIndex(D,f,j,C)),a.update(D=>{const Z=addAtIndex(D,f,$,C);return setTimeout(()=>s&&setForm(s,Z)),Z})}function O(f){m.update(f),S.update(f),p.update(f),a.update($=>{const C=f($);return setTimeout(()=>s&&setForm(s,C)),C})}function R(f){O($=>_unset($,f))}function q(f,$,C){O(j=>swapInArray(j,f,$,C))}function B(f,$,C){O(j=>moveInArray(j,f,$,C))}function oe(f){const $=_get(u,f),C=_isPlainObject($)?deepSetTouched($,!1):!1,j=_isPlainObject(C)?deepSet(C,[]):[];a.update(L=>{const D=_set(L,f,$);return s&&setForm(s,D),D}),p.update(L=>_set(L,f,C)),m.update(L=>_set(L,f,j)),S.update(L=>_set(L,f,j))}const y=createSetHelper(b.update),W=createSetHelper(d.update),G=createSetHelper(x.update);async function J(){const f=get(a);p.set(deepSetTouched(f,!0)),x.set(null);const $=await n(f);return await o(f),$}function Q(){A(_cloneDeep(u)),N(f=>deepSet(f,!1)),x.set(null),d.set(!1)}function k(f){return async function(C){var j,L,D,Z,le,ce,ue;const{createErrorEvent:fe,createSubmitEvent:be,createSuccessEvent:g}=createEventConstructors(),c=be();s?.dispatchEvent(c);const h=(L=(j=c.onError)!==null&&j!==void 0?j:f?.onError)!==null&&L!==void 0?L:r.onError,v=(Z=(D=c.onSuccess)!==null&&D!==void 0?D:f?.onSuccess)!==null&&Z!==void 0?Z:r.onSuccess,z=(ue=(ce=(le=c.onSubmit)!==null&&le!==void 0?le:f?.onSubmit)!==null&&ce!==void 0?ce:r.onSubmit)!==null&&ue!==void 0?ue:createDefaultSubmitHandler(s);if(!z||(C?.preventDefault(),c.defaultPrevented))return;b.set(!0),x.set(null);const U=deepRemoveKey(get(a)),se=await n(U,f?.validate),Y=await o(U,f?.warn);if(Y&&S.set(_merge(deepSet(U,[]),Y)),p.set(deepSetTouched(U,!0)),se&&(p.set(deepSetTouched(se,!0)),deepSome(se,M=>Array.isArray(M)?M.length>=1:!!M))){await new Promise(M=>setTimeout(M)),l().forEach(M=>{var K;return(K=M.onSubmitError)===null||K===void 0?void 0:K.call(M,{data:U,errors:se})}),b.set(!1);return}const ne={setFields:A,setData:_,setTouched:N,setErrors:F,setWarnings:P,unsetField:R,addField:V,resetField:oe,reset:Q,setInitialValues:re.setInitialValues,moveField:B,swapFields:q,form:s,controls:s&&Array.from(s.elements).filter(isFormControl),config:Object.assign(Object.assign({},r),f)};try{const ee=await z(U,ne);s?.dispatchEvent(g(Object.assign({response:ee},ne))),await v?.(ee,ne)}catch(ee){const M=fe(Object.assign({error:ee},ne));if(s?.dispatchEvent(M),!h&&!M.defaultPrevented)throw ee;if(!h&&!M.errors)return;const K=M.errors||await h?.(ee,ne);K&&(p.set(deepSetTouched(K,!0)),m.set(K),await new Promise(de=>setTimeout(de)),l().forEach(de=>{var he;return(he=de.onSubmitError)===null||he===void 0?void 0:he.call(de,{data:U,errors:get(m)})}))}finally{b.set(!1)}}}const re={setData:_,setFields:A,setTouched:N,setErrors:F,setWarnings:P,setIsSubmitting:y,setIsDirty:W,setInteracted:G,validate:J,reset:Q,unsetField:R,resetField:oe,addField:V,swapFields:q,moveField:B,createSubmitHandler:k,handleSubmit:k(),setInitialValues:f=>{u=deepSetKey(f)}};return{public:re,private:{_setFormNode(f){s=f},_getInitialValues:()=>u}}}function createFormAction({helpers:t,stores:r,config:n,extender:o,createSubmitHandler:l,handleSubmit:i,_setFormNode:s,_getInitialValues:u,_setCurrentExtenders:a,_getCurrentExtenders:p}){const{setFields:m,setTouched:S,reset:d,setInitialValues:b}=t,{addValidator:x,addTransformer:_,validate:N}=t,{data:F,errors:P,warnings:w,touched:A,isSubmitting:V,isDirty:O,interacted:R,isValid:q,isValidating:B}=r;function oe(y){y.requestSubmit||(y.requestSubmit=i);function W(g){return function(c){return c({form:y,stage:g,controls:Array.from(y.elements).filter(isFormControl),data:F,errors:P,warnings:w,touched:A,isValid:q,isValidating:B,isSubmitting:V,isDirty:O,interacted:R,config:n,addValidator:x,addTransformer:_,setFields:m,validate:N,reset:d,createSubmitHandler:l,handleSubmit:i})}}a(o.map(W("MOUNT"))),y.noValidate=!!n.validate;const{defaultData:G,defaultTouched:J}=getFormDefaultValues(y);s(y),b(_merge(_cloneDeep(G),u())),m(u()),A.set(J);function Q(g){const c=getPath(g),h=Array.from(y.querySelectorAll(`[name="${g.name}"]`)).filter(v=>isFormControl(v)?c===getPath(v):!1);if(h.length!==0)return h.length===1?F.update(v=>_set(v,getPath(g),g.checked)):F.update(v=>_set(v,getPath(g),h.filter(isInputElement).filter(z=>z.checked).map(z=>z.value)))}function k(g){const c=y.querySelectorAll(`[name="${g.name}"]`),h=Array.from(c).find(v=>isInputElement(v)&&v.checked);F.update(v=>_set(v,getPath(g),h?.value))}function re(g){var c;const h=Array.from((c=g.files)!==null&&c!==void 0?c:[]);F.update(v=>_set(v,getPath(g),g.multiple?h:h[0]))}function ie(g){if(!g.multiple)F.update(c=>_set(c,getPath(g),g.value));else{const c=Array.from(g.options).filter(h=>h.selected).map(h=>h.value);F.update(h=>_set(h,getPath(g),c))}}function f(g){const c=g.target;if(!c||!isFormControl(c)||isSelectElement(c)||shouldIgnore(c)||["checkbox","radio","file"].includes(c.type)||!c.name)return;O.set(!0);const h=getInputTextOrNumber(c);R.set(c.name),F.update(v=>_set(v,getPath(c),h))}function $(g){const c=g.target;if(!(!c||!isFormControl(c)||shouldIgnore(c))&&!!c.name)if(S(getPath(c),!0),R.set(c.name),(isSelectElement(c)||["checkbox","radio","file","hidden"].includes(c.type))&&O.set(!0),c.type==="hidden"&&F.update(h=>_set(h,getPath(c),c.value)),isSelectElement(c))ie(c);else if(isInputElement(c))c.type==="checkbox"?Q(c):c.type==="radio"?k(c):c.type==="file"&&re(c);else return}function C(g){const c=g.target;!c||!isFormControl(c)||shouldIgnore(c)||!c.name||(S(getPath(c),!0),R.set(c.name))}function j(g){g.preventDefault(),d()}const L={childList:!0,subtree:!0};function D(g){let c=get(F),h=get(A),v=get(P),z=get(w);for(const U of g.reverse()){if(U.hasAttribute("data-felte-keep-on-remove")&&U.dataset.felteKeepOnRemove!=="false")continue;const se=/.*(\[[0-9]+\]|\.[0-9]+)\.[^.]+$/;let Y=getPath(U);const ne=get(A);if(se.test(Y)){const M=Y.split(".").slice(0,-1).join("."),K=_get(ne,M);_isPlainObject(K)&&Object.keys(K).length<=1&&(Y=M)}c=_unset(c,Y),h=_unset(h,Y),v=_unset(v,Y),z=_unset(z,Y)}F.set(c),A.set(h),P.set(v),w.set(z)}const Z=debounce(()=>{p().forEach(h=>{var v;return(v=h.destroy)===null||v===void 0?void 0:v.call(h)}),a(o.map(W("UPDATE")));const{defaultData:g,defaultTouched:c}=getFormDefaultValues(y);F.update(h=>_defaultsDeep(h,g)),A.update(h=>_defaultsDeep(h,c))},0);let le=[];const ce=debounce(()=>{p().forEach(g=>{var c;return(c=g.destroy)===null||c===void 0?void 0:c.call(g)}),a(o.map(W("UPDATE"))),D(le),le=[]},0);function ue(g){for(const c of g)if(c.type==="childList"){if(c.addedNodes.length>0){if(!Array.from(c.addedNodes).some(v=>isElement(v)?isFormControl(v)?!0:getFormControls(v).length>0:!1))continue;Z()}if(c.removedNodes.length>0)for(const h of c.removedNodes){if(!isElement(h))continue;const v=getFormControls(h);v.length!==0&&(le.push(...v),ce())}}}const fe=new MutationObserver(ue);fe.observe(y,L),y.addEventListener("input",f),y.addEventListener("change",$),y.addEventListener("focusout",C),y.addEventListener("submit",i),y.addEventListener("reset",j);const be=P.subscribe(g=>{for(const c of y.elements){if(!isFormControl(c)||!c.name)continue;const h=_get(g,getPath(c)),v=Array.isArray(h)?h.join(`
`):typeof h=="string"?h:void 0;v!==c.dataset.felteValidationMessage&&(v?(c.dataset.felteValidationMessage=v,c.setAttribute("aria-invalid","true")):(delete c.dataset.felteValidationMessage,c.removeAttribute("aria-invalid")))}});return{destroy(){fe.disconnect(),y.removeEventListener("input",f),y.removeEventListener("change",$),y.removeEventListener("focusout",C),y.removeEventListener("submit",i),y.removeEventListener("reset",j),be(),p().forEach(g=>{var c;return(c=g.destroy)===null||c===void 0?void 0:c.call(g)})}}}return{form:oe}}function createValidationController(t){const r={aborted:!1,priority:t};return{signal:r,abort(){r.aborted=!0}}}function errorFilterer(t,r){if(_isPlainObject(t))return!r||_isPlainObject(r)&&Object.keys(r).length===0?deepSet(t,null):void 0;if(Array.isArray(t)){if(t.some(_isPlainObject))return;const n=Array.isArray(r)?r:[];return t.map((o,l)=>{const i=n[l];return Array.isArray(i)&&i.length===0?null:o&&i||null})}return Array.isArray(r)&&r.length===0?null:Array.isArray(r)?t?r:null:t&&r?[r]:null}function warningFilterer(t,r){if(_isPlainObject(t))return!r||_isPlainObject(r)&&Object.keys(r).length===0?deepSet(t,null):void 0;if(Array.isArray(t)){if(t.some(_isPlainObject))return;const n=Array.isArray(r)?r:[];return t.map((o,l)=>{const i=n[l];return Array.isArray(i)&&i.length===0?null:i||null})}return Array.isArray(r)&&r.length===0?null:Array.isArray(r)?r:r?[r]:null}function filterErrors([t,r]){return _mergeWith(r,t,errorFilterer)}function filterWarnings([t,r]){return _mergeWith(r,t,warningFilterer)}function createDerivedFactory(t){return function(n,o,l){const i=Array.isArray(n)?n:[n],s=new Array(i.length),u=t(l),a=u.set,p=u.subscribe;let m;function S(){m=i.map((b,x)=>b.subscribe(_=>{s[x]=_,a(o(s))}))}function d(){m?.forEach(b=>b())}return u.subscribe=function(x){const _=p(x);return()=>{_()}},[u,S,d]}}function createStores(t,r){var n,o,l,i,s,u,a,p,m;const S=createDerivedFactory(t),d=r.initialValues=r.initialValues?deepSetKey(executeTransforms(_cloneDeep(r.initialValues),r.transform)):{},b=deepSetTouched(deepRemoveKey(d),!1),x=t(b),_=t(0),[N,F,P]=S([x,_],([T,E])=>deepSome(T,X=>!!X)&&E>=1,!1);delete N.set,delete N.update;function w(T){let E;return async function(X,te,H,pe=!1){if(!H||!X)return;let ae=te&&Object.keys(te).length>0?te:deepSet(X,[]);const me=createValidationController(pe);if((!E?.signal.priority||pe)&&(E?.abort(),E=me),E.signal.priority&&!pe)return;_.update(ge=>ge+1);const ye=runValidations(X,H);return ye.forEach(async ge=>{const ve=await ge;me.signal.aborted||(ae=mergeErrors([ae,ve]),T.set(ae))}),await Promise.all(ye),E=void 0,_.update(ge=>ge-1),ae}}let A=deepSet(b,[]);const V=t(d),O=deepSet(b,[]),R=t(O),q=t(_cloneDeep(O)),[B,oe,y]=S([R,q],mergeErrors,_cloneDeep(O)),W=deepSet(b,[]),G=t(W),J=t(_cloneDeep(W)),[Q,k,re]=S([G,J],mergeErrors,_cloneDeep(W)),[ie,f,$]=S([B,x],filterErrors,_cloneDeep(O)),[C,j,L]=S([Q,x],filterWarnings,_cloneDeep(W));let D=!1;const[Z,le,ce]=S(B,([T])=>{var E;return D?!deepSome(T,I=>Array.isArray(I)?I.length>=1:!!I):(D=!0,!r.validate&&!(!((E=r.debounced)===null||E===void 0)&&E.validate))},!r.validate&&!(!((n=r.debounced)===null||n===void 0)&&n.validate));delete Z.set,delete Z.update;const ue=t(!1),fe=t(!1),be=t(null),g=w(R),c=w(G),h=w(q),v=w(J),z=debounce(h,(s=(l=(o=r.debounced)===null||o===void 0?void 0:o.validateTimeout)!==null&&l!==void 0?l:(i=r.debounced)===null||i===void 0?void 0:i.timeout)!==null&&s!==void 0?s:300,{onInit:()=>{_.update(T=>T+1)},onEnd:()=>{_.update(T=>T-1)}}),U=debounce(v,(m=(a=(u=r.debounced)===null||u===void 0?void 0:u.warnTimeout)!==null&&a!==void 0?a:(p=r.debounced)===null||p===void 0?void 0:p.timeout)!==null&&m!==void 0?m:300);async function se(T,E){var I;const X=deepRemoveKey(T),te=g(X,A,E??r.validate,!0);if(E)return te;const H=h(X,A,(I=r.debounced)===null||I===void 0?void 0:I.validate,!0);return mergeErrors(await Promise.all([te,H]))}async function Y(T,E){var I;const X=deepRemoveKey(T),te=c(X,A,E??r.warn,!0);if(E)return te;const H=v(X,A,(I=r.debounced)===null||I===void 0?void 0:I.warn,!0);return mergeErrors(await Promise.all([te,H]))}let ne=O,ee=W;function M(){const T=V.subscribe(H=>{var pe,ae;const me=deepRemoveKey(H);g(me,A,r.validate),c(me,A,r.warn),z(me,A,(pe=r.debounced)===null||pe===void 0?void 0:pe.validate),U(me,A,(ae=r.debounced)===null||ae===void 0?void 0:ae.warn)}),E=x.subscribe(H=>{A=deepSet(H,[])}),I=B.subscribe(H=>{ne=H}),X=Q.subscribe(H=>{ee=H});oe(),le(),k(),f(),j(),F();function te(){T(),$(),y(),re(),L(),ce(),P(),E(),I(),X()}return te}function K(T){R.set(T(ne)),q.set({})}function de(T){G.set(T(ee)),J.set({})}function he(T){K(()=>T)}function xe(T){de(()=>T)}return ie.set=he,ie.update=K,C.set=xe,C.update=de,{data:V,errors:ie,warnings:C,touched:x,isValid:Z,isSubmitting:ue,isDirty:fe,isValidating:N,interacted:be,validateErrors:se,validateWarnings:Y,cleanup:r.preventStoreStart?()=>{}:M(),start:M}}function createForm$1(t,r){var n,o;(n=t.extend)!==null&&n!==void 0||(t.extend=[]),(o=t.debounced)!==null&&o!==void 0||(t.debounced={}),t.validate&&!Array.isArray(t.validate)&&(t.validate=[t.validate]),t.debounced.validate&&!Array.isArray(t.debounced.validate)&&(t.debounced.validate=[t.debounced.validate]),t.transform&&!Array.isArray(t.transform)&&(t.transform=[t.transform]),t.warn&&!Array.isArray(t.warn)&&(t.warn=[t.warn]),t.debounced.warn&&!Array.isArray(t.debounced.warn)&&(t.debounced.warn=[t.debounced.warn]);function l(k,{debounced:re,level:ie}={debounced:!1,level:"error"}){var f;const $=ie==="error"?"validate":"warn";(f=t.debounced)!==null&&f!==void 0||(t.debounced={});const C=re?t.debounced:t;C[$]?C[$]=[...C[$],k]:C[$]=[k]}function i(k){t.transform?t.transform=[...t.transform,k]:t.transform=[k]}const s=Array.isArray(t.extend)?t.extend:[t.extend];let u=[];const a=()=>u,p=k=>{u=k},{isSubmitting:m,isValidating:S,data:d,errors:b,warnings:x,touched:_,isValid:N,isDirty:F,cleanup:P,start:w,validateErrors:A,validateWarnings:V,interacted:O}=createStores(r.storeFactory,t),R=d.update,q=d.set,B=k=>R(re=>deepSetKey(executeTransforms(k(re),t.transform))),oe=k=>q(deepSetKey(executeTransforms(k,t.transform)));d.update=B,d.set=oe;const y=createHelpers({extender:s,config:t,addValidator:l,addTransformer:i,validateErrors:A,validateWarnings:V,_getCurrentExtenders:a,stores:{data:d,errors:b,warnings:x,touched:_,isValid:N,isValidating:S,isSubmitting:m,isDirty:F,interacted:O}}),{createSubmitHandler:W,handleSubmit:G}=y.public;u=s.map(k=>k({stage:"SETUP",errors:b,warnings:x,touched:_,data:d,isDirty:F,isValid:N,isValidating:S,isSubmitting:m,interacted:O,config:t,addValidator:l,addTransformer:i,setFields:y.public.setFields,reset:y.public.reset,validate:y.public.validate,handleSubmit:G,createSubmitHandler:W}));const J=Object.assign({config:t,stores:{data:d,touched:_,errors:b,warnings:x,isSubmitting:m,isValidating:S,isValid:N,isDirty:F,interacted:O},createSubmitHandler:W,handleSubmit:G,helpers:Object.assign(Object.assign({},y.public),{addTransformer:i,addValidator:l}),extender:s,_getCurrentExtenders:a,_setCurrentExtenders:p},y.private),{form:Q}=createFormAction(J);return Object.assign({data:d,errors:b,warnings:x,touched:_,isValid:N,isSubmitting:m,isValidating:S,isDirty:F,interacted:O,form:Q,cleanup:P,startStores:w},y.public)}/*! *****************************************************************************
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
***************************************************************************** */function __rest(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(t);l<o.length;l++)r.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(t,o[l])&&(n[o[l]]=t[o[l]]);return n}function createAccessor(t){const r={},n={};function o(l){if(!l)return t();if(!r[l.toString()]){const s=createSignal(getValue(untrack(t),l));n[l.toString()]=s,r[l.toString()]=l}const[i]=n[l.toString()];return i()}return createEffect(()=>{const l=t(),i=Object.keys(r);for(const s of i){const u=r[s],a=getValue(l,u),[p,m]=n[u.toString()];isEqual(a,untrack(p))||m(a)}}),o}function createSubscriber(t){return function(n){return createRoot(o=>(createEffect(()=>n(t())),o))}}const storeFactory=t=>{const[r,n]=createSignal(t);function o(u){n(()=>u)}function l(u){n(u)}const i=createAccessor(r),s=createSubscriber(r);return i.subscribe=s,i.set=o,i.update=l,i};function createForm(t){const r=createForm$1(t??{},{storeFactory}),{form:n,cleanup:o,startStores:l,data:i,errors:s,warnings:u,touched:a}=r,p=__rest(r,["form","cleanup","startStores","data","errors","warnings","touched"]);function m(S){const{destroy:d}=n(S);return onCleanup(d),{destroy:d}}return onCleanup(o),Object.assign(Object.assign({},p),{data:i,errors:s,warnings:u,touched:a,form:m})}const _tmpl$$5=template('<form><a><i class="bi bi-plus-circle-fill"></i> Add Color</a></form>'),_tmpl$2$5=template('<i class="bi bi-cloud-arrow-down-fill"></i>'),_tmpl$3$5=template('<label><input type="file"><i class="bi bi-cloud-arrow-up-fill"></i> Import Color Set</label>'),_tmpl$4$2=template("<div></div>"),_tmpl$5$2=template("<label></label>"),_tmpl$6$1=template('<div class="form-element"><label for="colorName">Name</label><input type="text"></div>'),_tmpl$7=template('<div class="form-element"><label for="colorHEX">HEX</label><input type="text" maxlength="7" style="text-transform:uppercase"></div>'),_tmpl$8=template('<a><i class="bi bi-trash3-fill"></i></a>'),ColorSelector=()=>{const[colors,setColors]=createSignal(Object.entries(colorScale())),[jsonFile,setJsonFile]=createSignal(),addColor=()=>{setColors([...colors(),["NAME","#ffffff"]])},removeColor=t=>{setColors([...colors().slice(0,t),...colors().slice(t+1)])};createEffect(()=>{setColors(Object.entries(colorScale()))});const FormGroup=styled("div")`
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
  `,arrToObj=t=>{let r={};for(let n=0;n<t.length;n+=2)r[t[n]]=t[n+1];return r},arrToArr=t=>{let r=[];for(let n=0;n<t.length;n+=2)r.push(t[n]);return r},{form,data,errors,isSubmitting,isValid}=createForm({onSubmit:t=>{setColorScale(arrToObj(Object.values(t)))},validate:t=>{const r={};let n=arrToArr(Object.values(t));return n.length!==new Set(n).size&&(r.duplicate="There are duplicates in the color names!"),isSubmitting&&!isValid&&(console.log("wow"),toast.custom(o=>createComponent(Toast,{color:"error",showExit:!0,toast:o,children:"Something Happened"})),console.log("lmao")),r}}),fileDownload=()=>{const t=JSON.stringify(colorScale()),r=new Blob([t],{type:"text/plain"}),n=URL.createObjectURL(r),o=document.createElement("a");o.download="ambientcolors.json",o.href=n,o.click()},fileChange=e=>{const fileReader=new FileReader;fileReader.readAsText(e.target.files[0]),fileReader.onload=e=>{setJsonFile(eval(`(${e.target?.result})`)),setColors(Object.entries(jsonFile()))}};return[(()=>{const t=_tmpl$$5.cloneNode(!0),r=t.firstChild;return form(t,()=>!0),t.style.setProperty("display","flex"),t.style.setProperty("flex-direction","column"),t.style.setProperty("gap","8px"),t.style.setProperty("padding","4px 0 8px 0"),t.style.setProperty("align-items","flex-start"),insert(t,createComponent(For,{get each(){return colors()},children:([n,o],l)=>createComponent(FormGroup,{get children(){return[(()=>{const i=_tmpl$4$2.cloneNode(!0);return i.style.setProperty("width","12px"),insert(i,()=>l()+1),i})(),(()=>{const i=_tmpl$5$2.cloneNode(!0);return insert(i,createComponent(ColorIdentifier,{get color(){return colors()[l()][1]}})),i})(),(()=>{const i=_tmpl$6$1.cloneNode(!0),s=i.firstChild,u=s.nextSibling;return u.value=n,createRenderEffect(()=>setAttribute(u,"name",`colorName${l()}`)),i})(),(()=>{const i=_tmpl$7.cloneNode(!0),s=i.firstChild,u=s.nextSibling;return u.value=o,createRenderEffect(()=>setAttribute(u,"name",`colorHEX${l()}`)),i})(),(()=>{const i=_tmpl$8.cloneNode(!0);return i.$$click=()=>removeColor(l()),i})()]}})}),r),r.$$click=()=>addColor(),insert(t,createComponent(Button,{type:"submit",children:"Generate Color Set"}),null),t})(),createComponent(Flex,{flexDirection:"row",gap:12,style:{"padding-bottom":"20px"},get children(){return[createComponent(Button,{type:"submit",onclick:fileDownload,get children(){return[_tmpl$2$5.cloneNode(!0)," Export Color Set"]}}),createComponent(Button,{type:"submit",get children(){const t=_tmpl$3$5.cloneNode(!0),r=t.firstChild;return t.style.setProperty("font-weight","bold"),t.style.setProperty("cursor","pointer"),r.addEventListener("change",fileChange),r.style.setProperty("display","none"),t}})]}})]};delegateEvents(["click"]);const LuminanceCalc=t=>(chroma(t).luminance()*100).toFixed(2),normalize=(t,r,n)=>(t-n)/(r-n),normalizeArr=(t,r)=>{const n={},o=Object.values(t),l=o[Math.floor(o.length/2)],i=Math.min(...o),s=Math.max(...o),u=Object.entries(t);let a=0;if(r=="to-primary")for(var[p,m]of u)a>Math.floor(o.length/2)&&(n[p]=Number(normalize(m,l,i).toFixed(2))*.5),a==Math.floor(o.length/2)&&(n[p]=.5),a<Math.floor(o.length/2)&&(n[p]=Number(normalize(m,s,l).toFixed(2))*.5+.5),a+=1;if(r=="to-min-max")for(var[p,m]of u)n[p]=Number(normalize(m,s,i).toFixed(2));if(r=="none")for(var[p,m]of u)n[p]=Number((m/100).toFixed(2));return n},relativeLuminanceCalc=(t,r)=>{const n={};for(var o of Object.values(t))n[o]=Number(LuminanceCalc(o));return normalizeArr(n,r)},_tmpl$$4=template('<div class="start"><p>1</p></div>'),_tmpl$2$4=template('<div class="end"><p>0</p></div>'),_tmpl$3$4=template("<br>"),ColorGraph=t=>{const r=()=>t.colorSwatch,n=()=>t.displayType,[o,l]=createSignal(relativeLuminanceCalc(r(),n()));createEffect(()=>{l(relativeLuminanceCalc(r(),n()))});const i=styled("p")`
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
  `;return createComponent(Flex,{style:{width:"100%",height:"33px",position:"relative","padding-top":"16px",cursor:"crosshair"},get children(){return[createComponent(s,{get children(){return[_tmpl$$4.cloneNode(!0),_tmpl$2$4.cloneNode(!0)]}}),createComponent(For,{get each(){return Object.entries(o())},children:([u,a],p)=>createComponent(ColorIdentifier,{color:u,style:{position:"absolute",left:`calc(${100-a*100}% - 8px)`},get children(){return createComponent(i,{get children(){return[u,_tmpl$3$4.cloneNode(!0),_tmpl$3$4.cloneNode(!0),a]}})}})})]}})},_tmpl$$3=template("<br>"),_tmpl$2$3=template('<option value="to-primary" selected>Primary Normalization (Recommended)</option>'),_tmpl$3$3=template('<option value="to-min-max">Min Max Normalization</option>'),_tmpl$4$1=template('<option value="none">No Normalization</option>'),_tmpl$5$1=template("<p>Graph Normalization Techniques:<br><strong>No Normalization:</strong> All colors represent the raw 0 to 1 value in luminance.<br><strong>Min Max Normalization:</strong> All data is normalized to min and max of each color group from 0 to 1.<br><strong>Primary Normalization (Recommended):</strong> Luminance values are normalized based on the primary color's luminance value as 0.5 (center).</p>"),GraphList=t=>{const r=()=>t.colorSwatch,[n,o]=createSignal("to-primary"),l=i=>{o(i.target.value)};return[createComponent(Flex,{flexDirection:"column",gap:10,style:{padding:"0 28px"},get children(){return createComponent(For,{get each(){return Object.entries(r())},children:([i,s],u)=>createComponent(ColorGraph,{colorSwatch:s,get displayType(){return n()}})})}}),_tmpl$$3.cloneNode(!0),createComponent(Select,{get value(){return n()},onChange:l,get children(){return[_tmpl$2$3.cloneNode(!0),_tmpl$3$3.cloneNode(!0),_tmpl$4$1.cloneNode(!0)]}}),_tmpl$$3.cloneNode(!0),(()=>{const i=_tmpl$5$1.cloneNode(!0);return i.style.setProperty("padding-top","12px"),i.style.setProperty("color","rgba(256, 256, 256, 0.5)"),i})()]},_tmpl$$2=template("<h3>Ambient Color Generation Tool</h3>"),_tmpl$2$2=template("<p>This tool is designed to generate <strong>contrast ready</strong> color pallets built specifically for UIUX design. Unlike other pallette generation tools, Ambient generates the colors <strong>based on the primary color</strong>. Hues, saturation, and relative lightness adjustments are made automatically using our <a>algorithm</a>. These values can be adjusted by adjusting the base functions.styled.tsx file located inside the styles folder. As ambient relies on the primary color for alternative color generation, primary colors <strong>must be contrast compliant</strong>. Ambient displays both WACG and APCA definitions of text contrast, a 4.5:1(WACG) or 60Lc(APCA) is recommended for text contrast. Please remember that for the best results, contrast in colors or differences in color should not represent meaningful information in UIUX design to prevent accessability issues. </p>"),_tmpl$3$2=template("<br>"),Introduction=()=>[_tmpl$$2.cloneNode(!0),_tmpl$2$2.cloneNode(!0),_tmpl$3$2.cloneNode(!0)],_tmpl$$1=template("<form></form>"),_tmpl$2$1=template("<br>"),_tmpl$3$1=template("<div></div>"),_tmpl$4=template("<label></label>"),_tmpl$5=template('<div class="form-element"><label for="colorName">Name</label><input type="text"></div>'),_tmpl$6=template('<div class="form-element"><label for="colorHEX">HEX</label><input type="text" maxlength="7" style="text-transform:uppercase"></div>'),TextColorSelector=()=>{const t=styled("div")`
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
  `,r=a=>{let p={};for(let m=0;m<a.length;m+=2)p[a[m]]=a[m+1];return p},n=a=>{let p=[];for(let m=0;m<a.length;m+=2)p.push(a[m]);return p},{form:o,data:l,errors:i,isSubmitting:s,isValid:u}=createForm({onSubmit:a=>{setTextColorScale(r(Object.values(a)))},validate:a=>{const p={};let m=n(Object.values(a));return m.length!==new Set(m).size&&(p.duplicate="There are duplicates in the color names!"),s&&!u&&(console.log("wow"),toast.custom(S=>createComponent(Toast,{color:"error",showExit:!0,toast:S,children:"Something Happened"})),console.log("lmao")),p}});return createEffect(()=>{textColorScale()}),[(()=>{const a=_tmpl$$1.cloneNode(!0);return o(a,()=>!0),a.style.setProperty("display","flex"),a.style.setProperty("flex-direction","column"),a.style.setProperty("gap","8px"),a.style.setProperty("padding","4px 0 16px 0"),a.style.setProperty("align-items","flex-start"),insert(a,createComponent(For,{get each(){return Object.entries(textColorScale())},children:([p,m],S)=>createComponent(t,{get children(){return[(()=>{const d=_tmpl$3$1.cloneNode(!0);return d.style.setProperty("width","auto"),insert(d,p),d})(),(()=>{const d=_tmpl$4.cloneNode(!0);return insert(d,createComponent(ColorIdentifier,{get color(){return Object.entries(textColorScale())[S()][1]}})),d})(),(()=>{const d=_tmpl$5.cloneNode(!0),b=d.firstChild,x=b.nextSibling;return d.style.setProperty("display","none"),x.value=p,createRenderEffect(()=>setAttribute(x,"name",`colorName${S()}`)),d})(),(()=>{const d=_tmpl$6.cloneNode(!0),b=d.firstChild,x=b.nextSibling;return x.value=m,createRenderEffect(()=>setAttribute(x,"name",`colorHEX${S()}`)),d})()]}})}),null),insert(a,createComponent(Button,{type:"submit",children:"Change Text Colors"}),null),a})(),_tmpl$2$1.cloneNode(!0)]},_tmpl$=template("<div><h3>Color Table</h3><p>Color table of generated colors can be edited here. Only the primary color is considered. <strong>Color names must be unique.</strong></p><br><h4>Text Colors</h4></div>"),_tmpl$2=template("<div><h3>Color Graph</h3><p>These values are the calculated luminance values of each color. The graph does not update until the color set is generated. </p><br><br></div>"),_tmpl$3=template("<br>"),Home=()=>[createComponent(Introduction,{}),createComponent(Flex,{flexDirection:"row",gap:16,get children(){return[(()=>{const t=_tmpl$.cloneNode(!0),r=t.firstChild,n=r.nextSibling,o=n.nextSibling,l=o.nextSibling;return t.style.setProperty("width","auto"),insert(t,createComponent(ColorSelector,{}),l),insert(t,createComponent(TextColorSelector,{}),null),t})(),(()=>{const t=_tmpl$2.cloneNode(!0),r=t.firstChild,n=r.nextSibling,o=n.nextSibling;return t.style.setProperty("width","100%"),n.style.setProperty("padding-bottom","12px"),insert(t,createComponent(GraphList,{get colorSwatch(){return ColorShades()}}),o),t})()]}}),createComponent(ColorListPage,{}),_tmpl$3.cloneNode(!0)];export{Home as default};
