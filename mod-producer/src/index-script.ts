/**
 * This is the module entry point for app-script.
 */
import { registerModule } from 'lib-common'
import { ProducerConnected } from './producer-connected'

registerModule('Producer', ProducerConnected)
