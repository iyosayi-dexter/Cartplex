import {useRef ,FC , Fragment} from 'react'

const ProductDisplayLoading:FC=()=>{
    return (
        <div className='product_blank'>
        </div>
    )
}


const Loading:FC<{number_of_skels?:number}>=({number_of_skels})=>{
    if(number_of_skels === 3){
        return (
            <Fragment>
                <ProductDisplayLoading/>
                <ProductDisplayLoading/>
                <ProductDisplayLoading/>
            </Fragment>
        )
    }

    else if(number_of_skels === 6){
        return (
            <Fragment>
                <ProductDisplayLoading/>
                <ProductDisplayLoading/>
                <ProductDisplayLoading/>
                <ProductDisplayLoading/>
                <ProductDisplayLoading/>
                <ProductDisplayLoading/>
            </Fragment>
        )
    }
    else if(number_of_skels === 8 ){
        return (
        <Fragment>
            <ProductDisplayLoading/>
            <ProductDisplayLoading/>
            <ProductDisplayLoading/>
            <ProductDisplayLoading/>
            <ProductDisplayLoading/>
            <ProductDisplayLoading/>
            <ProductDisplayLoading/>
            <ProductDisplayLoading/>
        </Fragment>
        )
    }

    else {
        return <ProductDisplayLoading/>
    }

}
export default Loading