import React from 'react'
import type { Props } from 'payload/components/views/Cell'

const baseClass = 'product-image'

const CustomCell: React.FC<Props> = (props) => {
    const { field, colIndex, collection, cellData, rowData } = props
    console.log(props);
    console.log("Cell data", cellData, typeof (cellData))
    // maybe some input validation to ensure that cellData is a valid url to an image

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }

    }

    const isImageUrl = (url) => {
        return /\.(jpg|jpeg|png|gif)$/i.test(url);
    }

    const isValidImageUrl = isValidUrl(cellData) && isImageUrl(cellData)


    return (<img className={baseClass} src={cellData as string} alt='ProductImage'/>)
}

export default CustomCell;