import React from 'react'
import type { Props } from 'payload/components/views/Cell'

const baseClass = 'product-image'

const CustomCell: React.FC<Props> = (props) => {
    const { field, colIndex, collection, cellData, rowData } = props
    // console.log(props);
    // console.log("Cell data", cellData, typeof (cellData))
    // To add some input validation in the collections config to ensure that cellData is a valid url to an image

    return (<img className={baseClass} src={cellData as string} alt='ProductImage'/>)
}

export default CustomCell;