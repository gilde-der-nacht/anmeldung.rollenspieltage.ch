export default function SpieltageLogo() {
    return <>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000" height="75" width="75" className="lst-logo">
            <defs>
                <linearGradient id="lst-gradient-1" x1="820.05" y1="684.81" x2="820.05" y2="295" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2" stopColor="var(--clr-blue-to-green-start)"></stop>
                    <stop offset="1" stopColor="var(--clr-blue-to-green-end)"></stop>
                </linearGradient>
                <linearGradient id="lst-gradient-2" x1="160" y1="224.03" x2="510" y2="224.03" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="var(--clr-yellow-to-red-end)"></stop>
                    <stop offset="0.8" stopColor="var(--clr-yellow-to-red-start)"></stop>
                </linearGradient>
                <linearGradient id="lst-gradient-3" x1="169.89" y1="778.56" x2="520.21" y2="778.56" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2" stopColor="var(--clr-pink-to-purple-start)"></stop>
                    <stop offset="1" stopColor="var(--clr-pink-to-purple-end)"></stop>
                </linearGradient>
            </defs>
            <g>
                <path className="lst-fill-1" d="M199.89,682.93V315.19h-40V684.81H160c0,.07,0,.13,0,.19a20,20,0,0,0,40,0A20.2,20.2,0,0,0,199.89,682.93Z"></path>
                <path className="lst-fill-2" d="M840,685a20,20,0,0,0-29.83-17.4l-.06-.11L490,852.31,510,887,828.28,703.19A20,20,0,0,0,840,685Z"></path>
                <path className="lst-fill-3" d="M510,113.05l-.06.11a20,20,0,1,0-18.43,35.4l318.6,184,20-34.64Z"></path>
                <path fill="url('#lst-gradient-1')" d="M840,315.19c0-.07,0-.13,0-.19a20,20,0,0,0-40,0,20.2,20.2,0,0,0,.11,2.07V684.81h40V315.19Z"></path>
                <path fill="url('#lst-gradient-2')" d="M510,147.69l-20-34.64L171.72,296.81a20,20,0,1,0,18.11,35.59l.06.11Z"></path>
                <path fill="url('#lst-gradient-3')" d="M508.49,851.44l-318.6-184-20,34.64L490,887l.06-.11a20,20,0,1,0,18.43-35.4Z"></path>
            </g>
        </svg>
    </>;
}
