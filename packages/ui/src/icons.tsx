export type Icon = React.SVGProps<SVGSVGElement>;

export function BaseIcon(props: Icon): React.ReactNode {
  return (
    <svg
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.children}
    </svg>
  );
}

// Remix icons - https://remixicon.com/
export function MailIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="mail icon">
      <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z" />
    </BaseIcon>
  );
}
export function GlobalIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="globe icon">
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z" />{" "}
    </BaseIcon>
  );
}

export function XIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="twitter icon">
      <path d="M18.2048 2.25H21.5128L14.2858 10.51L22.7878 21.75H16.1308L10.9168 14.933L4.95084 21.75H1.64084L9.37084 12.915L1.21484 2.25H8.04084L12.7538 8.481L18.2048 2.25ZM17.0438 19.77H18.8768L7.04484 4.126H5.07784L17.0438 19.77Z" />
    </BaseIcon>
  );
}

export function GithubIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="github icon">
      <path
        d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"
        fill="currentColor"
      />{" "}
    </BaseIcon>
  );
}

export function LinkIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="external link icon">
      <path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z" />
    </BaseIcon>
  );
}

export function RightArrowIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="right arrow icon">
      <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z" />
    </BaseIcon>
  );
}

export function SpotifyIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="spotify icon">
      <path d="M12.001 2C6.50098 2 2.00098 6.5 2.00098 12C2.00098 17.5 6.50098 22 12.001 22C17.501 22 22.001 17.5 22.001 12C22.001 6.5 17.551 2 12.001 2ZM15.751 16.65C13.401 15.2 10.451 14.8992 6.95014 15.6992C6.60181 15.8008 6.30098 15.55 6.20098 15.25C6.10098 14.8992 6.35098 14.6 6.65098 14.5C10.451 13.6492 13.751 14 16.351 15.6C16.701 15.75 16.7501 16.1492 16.6018 16.45C16.4018 16.7492 16.0518 16.85 15.751 16.65ZM16.7501 13.95C14.051 12.3 9.95098 11.8 6.80098 12.8C6.40181 12.9 5.95098 12.7 5.85098 12.3C5.75098 11.9 5.95098 11.4492 6.35098 11.3492C10.001 10.25 14.501 10.8008 17.601 12.7C17.9018 12.8508 18.051 13.35 17.8018 13.7C17.551 14.05 17.101 14.2 16.7501 13.95ZM6.30098 9.75083C5.80098 9.9 5.30098 9.6 5.15098 9.15C5.00098 8.64917 5.30098 8.15 5.75098 7.99917C9.30098 6.94917 15.151 7.14917 18.8518 9.35C19.301 9.6 19.451 10.2 19.201 10.65C18.9518 11.0008 18.351 11.1492 17.9018 10.9C14.701 9 9.35098 8.8 6.30098 9.75083Z" />{" "}
    </BaseIcon>
  );
}

export function LinkedinIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="linkedin icon">
      <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z" />{" "}
    </BaseIcon>
  );
}

export function PrinterIcon(props: Icon): React.ReactNode {
  return (
    <BaseIcon {...props} aria-label="linkedin icon">
      <path d="M7 17H17V22H7V17ZM19 20V15H5V20H3C2.44772 20 2 19.5523 2 19V9C2 8.44772 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9V19C22 19.5523 21.5523 20 21 20H19ZM5 10V12H8V10H5ZM7 2H17C17.5523 2 18 2.44772 18 3V6H6V3C6 2.44772 6.44772 2 7 2Z" />{" "}
    </BaseIcon>
  );
}
