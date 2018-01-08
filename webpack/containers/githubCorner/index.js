import {connect} from 'react-redux'
import {APP_THEMES} from 'reducers/settings'
import GithubCorner from 'components/githubCorner'

const mapStateToProps = (state) => ({
  theme: (
    APP_THEMES[0] === state.settings.theme ? APP_THEMES[1] : APP_THEMES[0]
  )
})

export default connect(
  mapStateToProps
)(GithubCorner)
