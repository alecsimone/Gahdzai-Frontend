import getComputedColor from "@/styles/functions/getComputedColor";
import { ColorNames } from "@/styles/styled";

interface XProps {
  color?: ColorNames; // color of the icon, defaults to red
}

const X = ({ color = "red" }: XProps): JSX.Element => {
  const computedColor = getComputedColor(color);

  return (
    <>
      <rect
        x="73.73"
        y="-15.06"
        width="52"
        height="230.58"
        transform="translate(-41.66 99.87) rotate(-45)"
        fill={computedColor}
      />
      <rect
        x="73.73"
        y="-15.06"
        width="52"
        height="230.58"
        transform="translate(99.37 241.62) rotate(-135)"
        fill={computedColor}
      />
    </>
  );
};

export default X;
