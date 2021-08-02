import React , { useRef,useEffect } from 'react'; 
import Popper from '../../src'; 
import "./index.css";

const Demo=()=>{

    const popperRef=useRef(null);
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => { 
        console.log("Demo effect",popperRef)
    },[])
 
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    return (
        <div> 
            <button onClick={handleClick}>Toggle Popper</button>
            <Popper visible={!!anchorEl} ref={popperRef} anchorEl={anchorEl} placement={'right'}>
                <div>aaa</div>
            </Popper>   
        </div>
    )
}

export default Demo;