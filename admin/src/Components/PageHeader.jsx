import React from 'react'

const PageHeader = ({title}) => {
  return (
    <div className='pageheader-section'>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="pageheader-content text-center">
                        <h2>{title}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PageHeader