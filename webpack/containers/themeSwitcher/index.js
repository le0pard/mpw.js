import {connect} from 'react-redux'
import {settingsToggleTheme} from 'reducers/settings'
import {APP_THEMES} from 'reducers/settings'
import LocalStorage from 'lib/localStorage'
import ThemeSwitcher from 'components/themeSwitcher'

const mapStateToProps = (state) => ({
  theme: state.settings.theme
})

const mapDispatchToProps = (dispatch) => ({
  settingsToggleTheme: (prevTheme) => {
    dispatch(settingsToggleTheme())
    LocalStorage.setItem(
      'theme',
      APP_THEMES[0] === prevTheme ? APP_THEMES[1] : APP_THEMES[0]
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeSwitcher)
