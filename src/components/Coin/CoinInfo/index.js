import React, { useState } from 'react'
import './styles.css'

function CoinInfo({heading, desc}) {

    const shortDesc = desc.slice(0,200)+
        '<p style="color:var(--grey)"> Read more...</p>';
    const longDesc = desc +
        '<p style="color:var(--grey)"> Read less...</p>';

    const [flag, setFlag] = useState(false);

  return (
    <div className='grey-wrapper'>
        <h2 className='coin-info-heading'>{heading}</h2>
        {desc.length > 200 ?
            (<p 
                className='coin-info-desc' 
                onClick={()=>{setFlag(!flag)}}
                dangerouslySetInnerHTML={{__html:!flag ? shortDesc : longDesc}}
            />)
            :
            (
            <p 
                className='coin-info-desc' 
                onClick={()=>{setFlag(!flag)}}
                dangerouslySetInnerHTML={{__html:desc}}
            />
            )
        }
    </div>
  )
}

export default CoinInfo