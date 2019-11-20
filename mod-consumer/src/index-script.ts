/**
 * This is the module entry point for app-script.
 */
import { registerModule } from 'lib-common'
import { ConsumerConnected } from './consumer-connected'

registerModule('Consumer', ConsumerConnected)
