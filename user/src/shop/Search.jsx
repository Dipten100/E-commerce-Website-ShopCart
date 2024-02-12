import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Search = ({ Products, GridList }) => {
    const [SearchTerm, setSearchTerm] = useState("")
    const filteredProducts = Products.filter((product) => product.productName.toLowerCase().includes(SearchTerm.toLowerCase()))
    return (
        <div className='widget widget-search'>
            <form action="" className="search-wrapper mb-3">
                <input type="text" name='search' id='search' placeholder='Search...' defaultValue={SearchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type='submit'>
                    <i className="icofont-search-2"></i>
                </button>
            </form>

            {/* showing search result */}
            <div>
                {
                    SearchTerm && filteredProducts.map((product)=>(
                        <Link key={product._id} to={`/shop/${product._id}`} >
                            <div className="d-flex gap-3 p-2">
                                <div>
                                    <div className="pro-thumb h-25">
                                        <img src={product.productImages} alt="" width={70} className="fex-{grow|shrink-0}"/>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <p>
                                        <Link to={`/shop/${product._id}`}>{product.productName}</Link>
                                    </p>
                                    <h6>${product.productPrice}</h6>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Search