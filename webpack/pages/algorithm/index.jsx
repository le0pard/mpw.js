import React from 'react'

export default class AlgorithmPage extends React.Component {
  render() {
    return (
      <div>
        <p>
          <strong>Master Password is an algorithm used to generate unique passwords</strong> for websites, email accounts, or anything else based only on easily reproducible input.
  The goal is a process that avoids all the problems involved with other password solutions.
        </p>
        <p>
          The Master Password algorithm is open: this page describes its inner workings in detail. We believe the following is an important lesson we should all learn: Regardless of how much encryption a solution claims, if you don't know how it works, you cannot assume it is secure (at least, not the kind of secure you care about).
        </p>
      </div>
    )
  }
}
