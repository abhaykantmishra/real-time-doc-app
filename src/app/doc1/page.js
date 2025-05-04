import { TiptapCollabProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'

import Editor from '@/components/editor1'

const appId = 'YOUR_APP_ID'
const room = `abhay-room`

// ydoc and provider for Editor A
const ydocA = new Y.Doc()
const providerA = new TiptapCollabProvider({
  appId,
  name: room,
  document: ydocA,
})


const App = () => {
  return (
    <div className="col-group">
      <Editor provider={providerA} ydoc={ydocA} room={room} />
    </div>
  )
}

export default App