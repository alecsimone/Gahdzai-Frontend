import { coolGrey, white } from "@/styles/constants/colors";

// interface DefaultAvatarProps {}
const DefaultAvatar = (): JSX.Element => {
  return (
    <>
      <rect width="200" height="200" fill={coolGrey} />
      <path
        d="M139,113.5h-7.35a49.94,49.94,0,0,1-66.1,0H62a42,42,0,0,0-42,42v45H181v-45A42,42,0,0,0,139,113.5Z"
        fill={white}
      />
      <circle cx="98.75" cy="68" r="50" fill={white} />
    </>
  );
};

export default DefaultAvatar;
