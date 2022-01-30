import { Application } from "@hotwired/stimulus"
import * as Turbo from "@hotwired/turbo"
import * as bootstrap from "bootstrap"

import HelloController from './controllers/hello_controller'

window.Stimulus = Application.start()

Stimulus.register("hello", HelloController)
