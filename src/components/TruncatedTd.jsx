// TruncatedTd.jsx @ 240801
import { truncateString } from "../Tools/utils"

const TruncatedTd = ({ className, children, num }) => {
  const isString = typeof children === 'string'
  return (
    <td className={className} title={children}>
      {(isString && num) ? truncateString(children, num) : children}
    </td>
  )  
}

export default TruncatedTd