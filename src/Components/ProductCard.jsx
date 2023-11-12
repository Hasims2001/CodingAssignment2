import React, { useState } from 'react'

export const ProductCard = ({id, title, price,handleChecked, description, category, image, rating}) => {
  const [bg,setBg] = useState(false);
  const handleChange  = ()=> {
    handleChecked(id)
    setBg(!bg)
  }
  return (
    <div key={id} style={{ backgroundColor: bg ? '#ffff00': '#fffff0', display: 'flex', gap: '5rem', margin: '1rem', padding: '1rem', width: '100%'}}>
      <input type='checkbox' style={{width: '2rem'}} checked={bg} onChange={handleChange} />
      <img width={'20%'} src={image} alt='img'  />
      <div>
        <h4>{title}</h4>
        <p>Price: {price}</p>
        <p>Category: {category}</p>
        <p>Rating: {rating.rate}</p>
      </div>
    </div>
  )
}
