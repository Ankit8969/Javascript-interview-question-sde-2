import React, {useState} from 'react'
import './index.css'
import StarIcon from '@mui/icons-material/Star';

const temp = new Array(5).fill('white');
function App() {
  const [stars, setStart] = useState(temp);
  
  const handleClick = (e, ind) => {
    // console.log(e, ind);
    e.stopPropagation();
    let arr = [...stars];
    for (let i=0;i<5;i++) {
      arr[i] = i <= ind ? "yellow": "white"
    }
    setStart([...arr]);
  }

  const handleMouseEnter = (ind) => {
    let arr = [...stars];
    for (let i=0;i<5;i++) {
      arr[i] = i <= ind ? "yellow": "white"
    }
    setStart([...arr]);
  }

  const handleMouseLeave = (ind) => {
    let arr = [...stars];
    for (let i=0;i<5;i++) {
      if (i<=ind) {
        arr[i] = "yellow"
      }
    }
    setStart([...arr]);
  }



  return (
    <React.Fragment>
      <h2>Start Pattern</h2>
      <div className="box">
        {
          stars.map((star, ind) => {
            return <StarIcon 
              key={ind}
              onClick={(e)=>handleClick(e, ind)}
              onMouseEnter={()=>handleMouseEnter(ind)}
              onMouseLeave={()=>handleMouseLeave(ind)}
              style={{ fill: star, fontSize: "30px" }}
              />
          })
        }
      </div>
    </React.Fragment>
  )
}

export default App;

