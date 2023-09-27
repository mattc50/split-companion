import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import Item from './Item'

import { useAppContext } from '../context/appContext';

const styles = {
  root: {
    // width: "100%",
    margin: "0 16px",
    paddingTop: "1rem",
    // padding: "1rem 0",
    // overflowX: "visible",
    // display: "flex",
    // justifyItems: "end"
    // overflowY: "auto"
    overflowY: "hidden"

  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    // maxHeight: "calc((62.95px* 4.5) + 32px)",
    // maxHeight: "25vh",
    // maxHeight: "100%",
    maxHeight: "calc(100% - 4rem)",
    overflowY: "auto"
  }
}

const ItemsContainer = () => {
  const { items, numItems, revItems, addItem } = useAppContext()

  const findFreeId = () => {
    let num = 0;
    let numFree = false;
    let tempId = `item-${num}`

    // best case: if there are no items (array length is 0), return right away
    // console.log(tempId)
    if (items.length === 0) return tempId;

    const itemIds = items.map(item => item.id);
    // console.log(itemIds)
    while (!numFree) {
      num++;
      if (!itemIds.includes(`item-${num}`)) numFree = true;
    }
    // console.log(`item-${num}`)
    return `item-${num}`;
  }

  const addNewItem = () => {
    const id = findFreeId();
    const item = ({
      id: id,
      item: "",
      price: 0,
      split: []
    })
    addItem(item, items)
  }

  const handleMouseUp = () => {

  }

  useEffect(() => {
    // console.log('rerun')
    // console.log(revItems)
    // console.log(items)
  }, [items, numItems])

  return (
    <div
      style={styles.root}
      onMouseUp={handleMouseUp}
    >
      <SectionHeader use="Items" btnFunc={addNewItem} showNum />
      <div className="items-container" style={styles.container}>
        {revItems.map((el, index) => (
          <Item
            key={index}
            id={el.id}
            item={el.item}
            price={el.price}
            split={el.split}
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