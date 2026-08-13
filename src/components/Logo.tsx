export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      {/* 印章外框 */}
      <rect
        x="2.5"
        y="2.5"
        width="35"
        height="35"
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      {/* 双螺旋：墨线 */}
      <path
        d="M14.5 9c0 4.4 11 6.6 11 11s-11 6.6-11 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M25.5 9c0 4.4-11 6.6-11 11s11 6.6 11 11"
        className="text-accent"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* 横向连接梯级 */}
      <path
        d="M15.4 13.2h9.2M14.2 20h11.6M15.4 26.8h9.2"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}