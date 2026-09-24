import SchemeWorkspace from '../modules/workspace/SchemeWorkspace'
import useScheme from './useScheme'

export default function App() {
  return <SchemeWorkspace scheme={useScheme()} />
}
