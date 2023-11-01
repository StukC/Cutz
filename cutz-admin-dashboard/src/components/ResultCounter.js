import React from 'react'

export const ResultCounter = ({list}) => {
  return (
    list.length ? (
        <b>&nbsp;&nbsp;Result: {list.length}</b>
      ) : (
        <b> &nbsp;&nbsp;Result: 0</b>
      )
  )
}
