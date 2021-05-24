import React from 'react'
import styled from 'styled-components'
import Icon from './svgBase'

const Svg = styled(Icon)`
  width: 24px;
  height: 24px;
`

export const ReturnIcon = ({
  className
}: {
  className?: string
}): JSX.Element => (
  <Svg viewBox="0 0 37 37" className={className}>
    <g clipPath="url(#clip0)">
      <path d="M11.0718 24.4464H36.0089C36.5562 24.4464 37 24.0026 37 23.4553V18.8303C37 18.283 36.5562 17.8393 36.0089 17.8393H11.0718V14.0353C11.0718 12.2694 8.93682 11.385 7.68807 12.6337L0.580521 19.7412C-0.193588 20.5153 -0.193588 21.7703 0.580521 22.5444L7.68807 29.6519C8.93673 30.9006 11.0718 30.0162 11.0718 28.2503V24.4464Z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="37" height="42.2857" />
      </clipPath>
    </defs>
  </Svg>
)
