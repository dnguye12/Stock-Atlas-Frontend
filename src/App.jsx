import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' 
import { fab }  from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fas, fab, far)

function App() {

  return (
    <p className=' text-red-500'><FontAwesomeIcon icon="fa-brands fa-hire-a-helper" /> Homepage</p>
  )
}

export default App
