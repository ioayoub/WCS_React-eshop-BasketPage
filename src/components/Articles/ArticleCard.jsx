import { Link } from "react-router-dom"
import PropTypes from "prop-types"

function ArticleCard({ id, picture, name, price }) {
  return (
    <article>
      <Link
        to={`/product/${id}`}
        className="group no-underline w-full h-full flex"
      >
        <div className="bg-gray-50 rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6 flex flex-col">
          <img
            src={picture}
            height="300px"
            width="200px"
            alt={name}
            title={name}
            className="grow m-auto object-cover"
          />

          <div className="pt-3 md:pt-6 text-center">
            <p className="text-gray-800 font-semibold text-lg group-hover:text-indigo-600 mb-1">
              {name}
            </p>
            <p className="text-gray-400 text-sm">{price} €</p>
          </div>
        </div>
      </Link>
    </article>
  )
}

ArticleCard.propTypes = {
  id: PropTypes.number,
  picture: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
}

export default ArticleCard
