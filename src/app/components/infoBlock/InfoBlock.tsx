import { ColorSpaceHsl } from "sass";
import "./InfoBlock.scss"

interface InfoT {
    
    InfoBlock?: string;
    InfoTxtBlock: string;
    
}
 
const InfoBlock = ({InfoBlock, InfoTxtBlock}: InfoT) => {
    return (
        <>
<div className='InfoBlock'>
<div className="InfoBlock_title">{InfoBlock}</div>
<div className="InfoBlock_txt">{InfoTxtBlock}</div>
<div className="InfoBlock_swiper"></div>
</div>
</>
    )
}

export default InfoBlock