import React from 'react'

export const FavProduct = ({id, title, price, description, category, image, rating}) => {
    console.log({id, title, price, description, category, image, rating})
  return (
    <div key={id} style={{ backgroundColor: '#fffff0', display: 'flex', gap: '5rem', margin: '1rem', padding: '1rem', width: '100%'}}>
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
