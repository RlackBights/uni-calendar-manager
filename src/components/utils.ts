export function normaliseTime(hours: number, minutes: number) {
    return `${(hours > 9) ? hours : "0" + hours}:${(minutes > 9) ? minutes : "0" + minutes}`;
}

export function getTimeFromMinutes(minutes: number) {
    return normaliseTime(Math.floor(minutes / 60), minutes % 60);
}

export function getMinutesFromTime(time: string) {
    return ((parseInt(time.split(":")[0]) - 6) * 60) + parseInt(time.split(":")[1]);
}

export function getFontColour(bgColor: string) {
    let color: string = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r: number = parseInt(color.substring(0, 2), 16); // hexToR
    let g: number = parseInt(color.substring(2, 4), 16); // hexToG
    let b: number = parseInt(color.substring(4, 6), 16); // hexToB
    let uicolors: number[] = [r / 255, g / 255, b / 255];
    let c: number[] = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });

    return ((0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]) <= 0.179) ? "#D3D3D3" : "#171717";
  }