import React from 'react'
import PropTypes from 'prop-types'
import headerStyles from '../styles/headerStyles.module.scss'

function Header({ leftImg, rightImg, name }) {
  return (
    <div className={headerStyles.rectangle}>
      <div className={headerStyles.leftHorizontal}>
        <img src={leftImg} height="35px" width="height" alt="" />
      </div>
      <div className={headerStyles.horizontal}>
        <div className={headerStyles.vertical}>
          <div className={headerStyles.name}>{name}</div>
        </div>
      </div>
      <div className={headerStyles.rightHorizontal}>
        <img src={rightImg} height="35px" width="height" alt="" />
      </div>
    </div>
  )
}

Header.propTypes = {
  leftImg: PropTypes.string.isRequired,
  rightImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Header
