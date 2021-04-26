const form = document.querySelector("#formContainer");
const colorPicker = document.querySelector("#colorPicker");
const submitBtn = document.querySelector("#submitBtn");
const mainInput = document.querySelector("#mainInput");
const rgbOp = document.querySelector("#rgbOp");
const hexOp = document.querySelector("#hexOp");
const hslOp = document.querySelector("#hslOp");
const op = document.getElementsByClassName("op");
const opContainer = document.querySelector("#opContainer");

const hexToRgb = (h) => {
    let r = 0, g = 0, b = 0;
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return "rgb("+ +r + "," + +g + "," + +b + ")";
}


const rgbToHex = (rgb) => {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
            if (r.length == 1)
              r = "0" + r;
            if (g.length == 1)
              g = "0" + g;
            if (b.length == 1)
              b = "0" + b;
        
    return "#" + r + g + b;
  }


  const rgbToHsl = (rgb) => {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    for (let R in rgb) {
      let r = rgb[R];
      if (r.indexOf("%") > -1) 
        rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
    }
  
    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;

        let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

        if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

      l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
  }



  const hexToHsl = (H) => {
      // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
  }




  const hslToRgb = (hsl) => {
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
   hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = hsl[0];
  let s = hsl[1].substr(0,hsl[1].length - 1) / 100;
  let l = hsl[2].substr(0,hsl[2].length - 1) / 100;

      if (h.indexOf("deg") > -1) 
    h = h.substr(0,h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0,h.length - 4) * 360);
  // Keep hue fraction of 360 if ending up over
  if (h >= 360)
    h %= 360;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;  
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "rgb(" + r + "," + g + "," + b + ")";

  }


  const hslToHex = (hsl) => {

    let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = hsl[0],
      s = hsl[1].substr(0,hsl[1].length - 1) / 100,
      l = hsl[2].substr(0,hsl[2].length - 1) / 100;
        
  // Strip label and convert to degrees (if necessary)
  if (h.indexOf("deg") > -1)
    h = h.substr(0,h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0,h.length - 4) * 360);
  if (h >= 360)
    h %= 360;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0; 

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;

  
  }














form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputVal = mainInput.value;
    opContainer.style.backgroundColor = inputVal;

    //checks for HEX
    if(inputVal[0]==="#"){
        rgbOp.innerText = hexToRgb(inputVal);
        hslOp.innerText = hexToHsl(inputVal);
        hexOp.innerText = inputVal;
    }
    
    if(inputVal.substr(0, 3) === "rgb"){
        rgbOp.innerText = inputVal;
        hslOp.innerText = rgbToHsl(inputVal);
        hexOp.innerText = rgbToHex(inputVal);
    }

    if(inputVal.substr(0, 3) === "hsl"){
        rgbOp.innerText = hslToRgb(inputVal);
        hslOp.innerText = inputVal;
        hexOp.innerText = hslToHex(inputVal);
    }

    for(let val of op){
        val.classList.add("opGenerate");
    }
})