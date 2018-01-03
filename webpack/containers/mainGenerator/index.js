import {connect} from 'react-redux'
import MainGenerator from 'components/mainGenerator'

const mapStateToProps = (state) => ({
  isHaveGeneratedKey: state.ww.isHaveGeneratedKey
})

export default connect(
  mapStateToProps
)(MainGenerator)
