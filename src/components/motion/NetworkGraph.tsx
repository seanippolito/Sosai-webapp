export function NetworkGraph() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <svg
        className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4 md:h-[800px] md:w-[800px]"
        viewBox="0 0 800 800"
        fill="none"
      >
        {[
          [400, 400], [250, 300], [550, 280], [300, 550], [520, 520],
          [150, 420], [650, 400], [400, 180], [200, 180], [600, 180],
          [350, 650], [500, 680], [180, 600], [620, 600],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="8" stroke="#00ff88" strokeWidth="1" fill="none" opacity="0.3">
              <animate attributeName="r" values="8;20;8" dur={`${3 + (i % 4) * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur={`${3 + (i % 4) * 0.7}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="3" fill="#00ff88" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.3;0.6" dur={`${2 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {[
          [400, 400, 250, 300], [400, 400, 550, 280], [400, 400, 300, 550],
          [400, 400, 520, 520], [400, 400, 400, 180], [250, 300, 150, 420],
          [250, 300, 200, 180], [550, 280, 650, 400], [550, 280, 600, 180],
          [300, 550, 180, 600], [300, 550, 350, 650], [520, 520, 620, 600],
          [520, 520, 500, 680], [400, 180, 200, 180], [400, 180, 600, 180],
          [150, 420, 180, 600], [650, 400, 620, 600],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00ff88" strokeWidth="0.5" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.05;0.15" dur={`${4 + (i % 5) * 0.6}s`} repeatCount="indefinite" />
          </line>
        ))}
      </svg>
    </div>
  )
}
