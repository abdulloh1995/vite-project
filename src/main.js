import { createApp } from 'vue'
import App from './components/app/App.vue'
import router from './router'
import uiComponents from './ui-components'
import '@/assets/main.css'

const app = createApp(App)
uiComponents.map(component => {
    app.component(component.name, component)
})
app.use(router)
app.mount('#app')
