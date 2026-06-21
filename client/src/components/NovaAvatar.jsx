/**
 * Nova's avatar — a Y2K bratz-doll-inspired illustration.
 * size: number (px), used for both the large header avatar and the small message avatar.
 */
export default function NovaAvatar({ size = 44 }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      width={size}
      height={size}
      role="img"
      aria-label="Nova avatar"
    >
      <circle cx="22" cy="22" r="22" fill="#1a1030" />
      <ellipse cx="22" cy="27" rx="10" ry="9" fill="#2a1840" />
      <circle cx="22" cy="17" r="7.5" fill="#231535" />
      <ellipse cx="19.2" cy="16.5" rx="2.3" ry="3.2" fill="#0d0a18" />
      <ellipse cx="24.8" cy="16.5" rx="2.3" ry="3.2" fill="#0d0a18" />
      <circle cx="19.7" cy="15.6" r="0.8" fill="#c9b8ff" />
      <circle cx="25.3" cy="15.6" r="0.8" fill="#c9b8ff" />
      <path
        d="M18.5 21.5 Q22 23 25.5 21.5"
        stroke="#9b6dff"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 14 Q18.5 11 21 12.5"
        stroke="#7a4aaa"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M23 12.5 Q25.5 11 28 14"
        stroke="#7a4aaa"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13 19 Q9 22.5 10.5 27 Q11.5 29 13.5 28"
        stroke="#2a1840"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M31 19 Q35 22.5 33.5 27 Q32.5 29 30.5 28"
        stroke="#2a1840"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="22" cy="35" rx="6" ry="3" fill="#1e1230" />
      <path d="M17.5 33 Q22 37.5 26.5 33" fill="#3a2050" />
      <path
        d="M11 7 Q13.5 3 18 5.5"
        stroke="#9b6dff"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M33 7 Q30.5 3 26 5.5"
        stroke="#9b6dff"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="7" r="1.2" fill="#c9b8ff" opacity="0.7" />
      <circle cx="32" cy="7" r="1.2" fill="#c9b8ff" opacity="0.7" />
      <circle cx="22" cy="3.5" r="1" fill="#f0a8d0" opacity="0.5" />
      <ellipse cx="19.2" cy="23.5" rx="1" ry="0.4" fill="#ff8ec8" opacity="0.6" />
      <ellipse cx="24.8" cy="23.5" rx="1" ry="0.4" fill="#ff8ec8" opacity="0.6" />
    </svg>
  );
}
