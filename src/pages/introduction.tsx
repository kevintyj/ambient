import {Component} from "solid-js";

const Introduction: Component = () => {

  return(
    <>
      <h3>
        Ambient Color Generation Tool
      </h3>
      <p>
        This tool is designed to generate <strong>contrast ready</strong> color pallets built specifically for UIUX design. Unlike other pallete generation tools,
        Ambient generates the colors <strong>based on the primary color</strong>. Hues, saturation, and relative lightness adjustments are made automatically using
        our <a>algoorithm</a>. These values can be adjusted by adjusting the base functions.styled.tsx file located inside the styles folder.
        As ambient relies on the primary color for alternative color generation, primary colors <strong>must be contrast compliant</strong>. 
        Ambient displays both WACG and APCA definitions of text contrast, a 4.5:1(WACG) or 60Lc(APCA) is recommended for text contrast. Please remember that for the
        best results, contrast in colors or differences in color should not represent meaningful information in UIUX design to prevent accesability issues. 
      </p>
      <br/>
      <h4>
        Ambient Color generation Algorithm
      </h4>
    </>
  )

}

export default Introduction;