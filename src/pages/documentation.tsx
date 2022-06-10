import {Component} from "solid-js";

const Documentation: Component = () => {

  return(
    <>
      <h3>
        Documentation
      </h3>
      <p>
        The following is the documentation for Ambient. This documentation is not final.
      </p>
      <br/>
      <h4>
        Ambient Color generation Algorithm
      </h4>
      <h5>Legacy Generation Algorithm</h5>
      <p>The Legacy method of generating shades of color utilizes brightening and darkening of colors.
        This method of generating colors generates a relatively good palette for general shades, but the hue and saturation of shades generated from the primary color
        is perceived lower. The biggest issue with simply brightening and darkening color is that <strong>the relative difference luminance of color shades</strong> are
        much smaller for brighter colors. For example, a shade step for a yellow color is perceived to be a lesser change compared to a darker color like blue. 
      </p>
      <br/>
      <h5>
        Relative Luminance Generation Algorithm
      </h5>
      <p>
        A New method of generating shades were devised by gaining the relative luminance (WCAG RGB Luminance) of shades and affecting the relative luminance for each 
        shades generated. The algorithm gets the relative luminance of the current primary color and adjusts each shades' luminance by a percentage point given by the 
        change array. The algorithm also decreases saturation for lighter colors and increases the saturation for darker colors maintaining relative saturation levels.
        Hues are also adjusted per color shade. The biggest issue with utilizing luminance as the only method of generating shades is that darker shades fail contrast 
        tests as relative luminance steps decrease in intensity in efforts of maintaining hue and saturation. 
      </p>
      <br/>
      <h5>
        Lab Color mix
      </h5>
      <p>
        The two methods are blended together at a ratio of 50:50 from the legacy generation method (for general shades) and the relative luminance method 
        to generate a average of the two methods using Lab color (to maintain saturation and hue adjustments).
      </p>
      <br/>
      <h5>
        Shade Correction
      </h5>
      <p>
        Now that all of the color shades are generated, a simple shade correction is done through mixing a black or white solid color depending on the 
        contrast of the color to generate UI usable color shade (ie. Toast background) taking in account for the minimum contrast ratios needed based on
        APAC (WCAG 3 standard) values.
      </p>
      <br/>
      <h4>
        Contrast Ratio Labels
      </h4>
      <div style={{
        display: 'flex',
        "flex-direction": 'row',
        "gap": '14px'
      }}>
        <i class="bi bi-x-circle"></i>
        <p>
          None of the Contrast tests pass. <strong>This color should not be used as a text color or background color in any case.</strong>
        </p>
        <i class="bi bi-dash-circle"></i>
        <p>
          Fails APCA Contrast for colored text, however, APCA Contrast test for default text colors passes. <strong>Only the recommended text color should be used with the background.</strong>
        </p>
        <i class="bi bi-exclamation-circle"></i>
        <p>
          Passes APCA Contrast for both colored text and default text colors, however, WCAG 2 contrast tests fail. <strong>The color text combination can be used as well as the recommended text color.</strong>
        </p>
        <i class="bi bi-check2-circle"></i>
        <p>
          Passes all APCA and WCAG Contrast tests. <strong>The color text combination can be used as well as the recommended text color.</strong>
        </p>
      </div>
      <br/>
      <h4>
        Limitations
      </h4>
      <p>
        The current contrast ratio is based on 4.5:1 and 60 for recommended contrast between text and background. When designing for accessibility in mind, <strong>text sizes should also be considered</strong>. 
        Ambient does not give any recommendation for text sizes on backgrounds and the official WCAG documentation should be referred to generate a lookup table for text and background combination for text sizes.
      </p>
      <br/>
    </>
  )

}

export default Documentation;