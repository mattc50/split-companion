import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import Item from './Item'

import { useAppContext } from '../context/appContext';

const styles = {
  root: {
    margin: "0 16px",
    paddingTop: "1rem"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }
}

const ItemsContainer = () => {
  const { items, addItem, setItem } = useAppContext()

  const addNewItem = () => {
    const item = ({
      item: "",
      price: 0,
      split: []
    })
    addItem(item)
  }

  const handleMouseUp = () => {

  }

  return (
    <div
      style={styles.root}
      onMouseUp={handleMouseUp}
    >
      <SectionHeader use="Items" btnFunc={addNewItem} />
      <div className="items-container" style={styles.container}>
        {items.map((el, index) => (
          <Item
            key={index}
            id={`item-${index}`}
            item={el.item} price={el.price}
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
          />
        ))}
      </div>
    </div>
  )
}

export default ItemsContainer