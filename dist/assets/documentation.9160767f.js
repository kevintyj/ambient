import{s as c,a as h,o as u,b as s,c as p,d as t,C as m,F as r,t as e}from"./index.80d5b3bc.js";const g=e("<h2>Documentation</h2>"),f=e("<p>The following is the documentation for Ambient. This documentation is not final.</p>"),o=e("<br>"),b=e("<h3>Ambient Color generation Algorithm</h3>"),x=e("<h4>Legacy Generation Algorithm</h4>"),N=e("<p>The Legacy method of generating shades of color utilizes brightening and darkening of colors. This method of generating colors generates a relatively good palette for general shades, but the hue and saturation of shades generated from the primary color is perceived lower. The biggest issue with simply brightening and darkening color is that <strong>the relative difference luminance of color shades</strong> are much smaller for brighter colors. For example, a shade step for a yellow color is perceived to be a lesser change compared to a darker color like blue.</p>"),v=e("<h4>Relative Luminance Generation Algorithm</h4>"),y=e("<p>A New method of generating shades were devised by gaining the relative luminance (WCAG RGB Luminance) of shades and affecting the relative luminance for each shades generated. The algorithm gets the relative luminance of the current primary color and adjusts each shades' luminance by a percentage point given by the change array. The algorithm also decreases saturation for lighter colors and increases the saturation for darker colors maintaining relative saturation levels. Hues are also adjusted per color shade. The biggest issue with utilizing luminance as the only method of generating shades is that darker shades fail contrast tests as relative luminance steps decrease in intensity in efforts of maintaining hue and saturation.</p>"),w=e("<h4>Lab Color mix</h4>"),A=e("<p>The two methods are blended together at a ratio of 50:50 from the legacy generation method (for general shades) and the relative luminance method to generate a average of the two methods using Lab color (to maintain saturation and hue adjustments).</p>"),C=e("<h4>Shade Correction</h4>"),_=e("<p>Now that all of the color shades are generated, a simple shade correction is done through mixing a black or white solid color depending on the contrast of the color to generate UI usable color shade (ie. Toast background) taking in account for the minimum contrast ratios needed based on APAC (WCAG 3 standard) values.</p>"),$=e("<h3>Contrast Ratio Labels</h3>"),k=e('<div><i class="bi bi-x-circle"></i><p>None of the Contrast tests pass. <strong>This color should not be used as a text color or background color in any case.</strong></p><i class="bi bi-dash-circle"></i><p>Fails APCA Contrast for colored text, however, APCA Contrast test for default text colors passes. <strong>Only the recommended text color should be used with the background.</strong></p><i class="bi bi-exclamation-circle"></i><p>Passes APCA Contrast for both colored text and default text colors, however, WCAG 2 contrast tests fail. <strong>The color text combination can be used as well as the recommended text color.</strong></p><i class="bi bi-check2-circle"></i><p>Passes all APCA and WCAG Contrast tests. <strong>The color text combination can be used as well as the recommended text color.</strong></p></div>'),T=e("<h3>Limitations</h3>"),P=e("<p>The current contrast ratio is based on 4.5:1 and 60 for recommended contrast between text and background. When designing for accessibility in mind, <strong>text sizes should also be considered</strong>. Ambient does not give any recommendation for text sizes on backgrounds and the official WCAG documentation should be referred to generate a lookup table for text and background combination for text sizes.</p>"),G=e("<h3>Understanding the color visualization</h3>"),F=e('<div class="helper-number one">1</div>'),S=e('<div class="helper-number two">2</div>'),z=e('<div class="helper-number three">3</div>'),L=e('<div class="helper-number four">4</div>'),W=e('<div class="helper-number list">1</div>'),I=e("<p>Name of the color</p>"),j=e('<div class="helper-number list">2</div>'),B=e("<p>Name of the color shade (100 = lightest), Followed by the HEX value of the color.</p>"),l=e('<div class="helper-number list">3</div>'),D=e("<p>Colors inside BG color safe should be reserved as a shade for either the background of a text wand should not be used for UI elements unless specified.</p>"),H=e("<p>Name of the color swatch</p>"),R=e('<div class="helper-number list">4</div>'),U=e("<div><p>For all: If NA is displayed, it means that there are no compatible colors for this color set.</p><p>WCAG: Shows the recommended text contrast safe (WCAG) color in the same color shade for the current color shade (For color 200 as background, color 400 should be used as a text color)</p><p>APCA: Shows the recommended text contrast safe (APCA) color in the same color shade for the current color shade (For color 200 as background, color 400 should be used as a text color)</p><p>APCA TEXT: Shows the contrast ratio if this color shade is used as a text color. The color of this text denotes the recommended background for this color. If NA is displayed, this color should not be used in any background unless specified.</p><p>APCA BG: Shows the contrast ratio if this color shade is used as a background color for the defined text colors. The color of this text denotes teh recommended text for this color. If NA is displayed, this color should not used used as a color for any important textual information as it fails contrasts tests.</p></div>"),X=()=>{let i=c();const d={PINK:{100:"#fcc7d2",200:"#fc4d8b",400:"#4a0008"}},a=h("div")`
    width: 100%;
    position: relative;
  
    .helper-number {
      position: absolute;
      background-color: #F1475F;
      border: 1px solid rgba(256, 256, 256, 0.5);
      color: #fff;
      border-radius: 100%;
      width: 18px !important;
      min-width: 18px !important;
      height: 18px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: 800;
      cursor: default;
      z-index: 9999;
    }

    .list {
      position: relative;
      margin-right: 8px;
      margin-top: 1px;
    }

    .one {
      left: 36px;
      top: -4px;
    }
    
    .two {
      left: 52px;
      top: 102px;
    }

    .three {
      left: 100px;
      top: 134px;
    }

    .four {
      left: calc(33% + 110px);
      top: 35px;
    }
  `;return u(()=>{s("1")}),p(()=>{s(i)}),[g.cloneNode(!0),f.cloneNode(!0),o.cloneNode(!0),b.cloneNode(!0),x.cloneNode(!0),N.cloneNode(!0),o.cloneNode(!0),v.cloneNode(!0),y.cloneNode(!0),o.cloneNode(!0),w.cloneNode(!0),A.cloneNode(!0),o.cloneNode(!0),C.cloneNode(!0),_.cloneNode(!0),o.cloneNode(!0),$.cloneNode(!0),(()=>{const n=k.cloneNode(!0);return n.style.setProperty("display","flex"),n.style.setProperty("flex-direction","row"),n.style.setProperty("gap","14px"),n})(),o.cloneNode(!0),T.cloneNode(!0),P.cloneNode(!0),o.cloneNode(!0),G.cloneNode(!0),t(a,{get children(){return[F.cloneNode(!0),S.cloneNode(!0),z.cloneNode(!0),L.cloneNode(!0),t(m,{colorSwatch:d,light:!1})]}}),o.cloneNode(!0),t(a,{get children(){return[t(r,{flexDirection:"column",flexAlign:"flex-start",gap:8,get children(){return[t(r,{style:{margin:"0 0"},get children(){return[W.cloneNode(!0),I.cloneNode(!0)]}}),t(r,{style:{margin:"0 0"},get children(){return[j.cloneNode(!0),B.cloneNode(!0)]}}),t(r,{style:{margin:"0 0"},get children(){return[l.cloneNode(!0),D.cloneNode(!0)]}}),t(r,{style:{margin:"0 0"},get children(){return[l.cloneNode(!0),H.cloneNode(!0)]}}),t(r,{style:{margin:"0 0"},get children(){return[R.cloneNode(!0),U.cloneNode(!0)]}})]}}),o.cloneNode(!0)]}})]};export{X as default};
