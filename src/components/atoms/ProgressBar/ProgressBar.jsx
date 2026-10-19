//react
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

//css
import 'react-circular-progressbar/dist/styles.css';

//functions
import { getCurrentHour } from '@utils/index.js';

export default function ProgressBar({ dataFromApi }) {
  return (
    <>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient
            id='riskGradient'
            gradientUnits='userSpaceOnUse'
            x1='50'
            y1='10'
            x2='10'
            y2='45'
          >
            <stop offset='0%' stopColor='#2E7D57' />
            <stop offset='25%' stopColor='#5B903B' />
            <stop offset='50%' stopColor='#D99B26' />
            <stop offset='75%' stopColor='#D9531E' />
            <stop offset='100%' stopColor='#DC2626' />
          </linearGradient>
        </defs>
      </svg>

      <div style={{ width: 200, height: 200, margin: '0 auto' }}>
        <CircularProgressbar
          value={
            dataFromApi.allergyrisk_hourly?.allergyrisk_hourly_1?.[
              getCurrentHour()
            ] || 0
          }
          maxValue={10}
          text={
            <tspan dy='2'>
              <tspan
                style={{
                  fontSize: '28px',
                  fontWeight: 'medium',
                  fill: '#12171F',
                }}
              >
                {dataFromApi.allergyrisk_hourly?.allergyrisk_hourly_1?.[
                  getCurrentHour()
                ] || 0}
              </tspan>
              <tspan
                style={{
                  fontSize: '12px',
                  fontWeight: 'normal',
                  fill: '#6B7280',
                }}
              >
                /10
              </tspan>
            </tspan>
          }
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + (1 - 0.75) / 2,
            pathColor: 'url(#riskGradient)',
            trailColor: '#eaecee',
            textColor: '#6B7380',
            textSize: '22px',
            pathTransitionDuration: 1.5,
          })}
        />
      </div>
    </>
  );
}
