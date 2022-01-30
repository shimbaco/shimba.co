import { Application } from "@hotwired/stimulus"
import * as Turbo from "@hotwired/turbo"
import * as bootstrap from "bootstrap"

import EditorController from './controllers/editor-controller'
import HelloController from './controllers/hello-controller'

window.Stimulus = Application.start()

Stimulus.register("editor", EditorController)
Stimulus.register("hello", HelloController)
