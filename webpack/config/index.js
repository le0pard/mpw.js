import buildConfig from './builder'

import loggerScope from './scopes/logger'
import sentryScope from './scopes/sentry'

const env = process.env.NODE_ENV || 'development'
const configLoader = buildConfig(env)

export default {
  env,
  isDev: env === 'development',
  isProd: env === 'production',
  logger: configLoader(loggerScope),
  sentry: configLoader(sentryScope)
}
