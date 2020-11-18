import React from 'react'
import GenerateKey from 'components/generateKey'
import GeneratePassword from 'components/generatePass'
import {useSelector} from 'react-redux'

const MainGenerator = () => {
  const isHaveGeneratedKey = useSelector(({ww}) => ww.isHaveGeneratedKey)

  if (isHaveGeneratedKey) {
    return (<GeneratePassword />)
  } else {
    return (<GenerateKey />)
  }
}


export default MainGenerator
