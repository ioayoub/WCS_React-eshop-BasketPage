import PropTypes from "prop-types"
import { AiFillStar } from "react-icons/ai"
import { IconContext } from "react-icons"

function Star({ color }) {
  return (
    <IconContext.Provider value={{ color }}>
      <AiFillStar />
    </IconContext.Provider>
  )
}

Star.propTypes = {
  color: PropTypes.string,
}

Star.defaultProps = {
  color: "black",
}

export default Star
