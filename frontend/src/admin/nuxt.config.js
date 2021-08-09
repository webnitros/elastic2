import _ from 'lodash'
import {Config, findEnv, loadEnv} from '@vesp/frontend'
import en from './lexicons/en'
import de from './lexicons/de'
import ru from './lexicons/ru'

Config.ssr = false
Config.srcDir = __dirname
Config.buildDir = '.nuxt/admin'
Config.generate = {
  dir: 'dist/admin',
  exclude: [/^\//],
}

const env = loadEnv(findEnv('../'))
Config.axios.baseURL = env.API_URL || '/api/'
Config.head.title = env.APP_NAME || 'Vesp Framework'

Config.modules = [...Config.modules, ...['@vesp/frontend', '@nuxtjs/auth-next']]

Config.router = _.merge(Config.router, {
  base: '/admin/',
  middleware: ['auth'],
})

Config.fontawesome = _.merge(Config.fontawesome, {
  icons: {
    solid: _.union(Config.fontawesome.icons.solid, ['faUsers', 'faArrowLeft', 'faSignOutAlt']),
  },
})

Config.i18n = _.merge(Config.i18n, {
  vueI18n: {
    messages: {en, de, ru},
  },
})

Config.bootstrapVue = _.merge(Config.bootstrapVue, {
  componentPlugins: _.union(Config.bootstrapVue.componentPlugins, [
    'ImagePlugin',
    'FormCheckboxPlugin',
    'FormTagsPlugin',
    'DropdownPlugin',
    'ListGroupPlugin',
  ]),
})

export default Config
