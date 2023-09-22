import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import Person from './Person'

import { useAppContext } from '../context/appContext';
import Yourself from './Yourself';

const styles = {
  root: {
    position: "relative",
    // width: "100%",
    margin: "0 16px",
    paddingTop: "1rem",
  },
  container: {
    transition: "0.1s",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    // maxHeight: "calc((62.95px* 4.5) + 32px)",
    maxHeight: "25vh",
    overflowY: "auto"
    // overflowX: "visible",
  }
}

const PeopleContainer = () => {
  const { yourself, people, addPerson, addPersonToSplit, activeItem } = useAppContext()

  const findFreeId = () => {
    let num = 0;
    let numFree = false;
    let tempId = `person-${num}`

    // best case: if there are no items (array length is 0), return right away
    if (people.length === 0) return tempId;

    const itemIds = people.map(person => person.id);
    while (!numFree) {
      num++;
      if (!itemIds.includes(`person-${num}`)) numFree = true;
    }
    return `person-${num}`;
  }

  const addNewPerson = () => {
    const id = findFreeId();
    const person = ({
      id: id,
      name: "",
      dues: {}
    })
    addPerson(person, people)
  }

  useEffect(() => {
    // console.log(people)
  }, [people])

  return (
    <div style={styles.root}>
      <SectionHeader use="People" btnFunc={addNewPerson} showNum />
      <div className="items-container" style={styles.container}>
        {activeItem && <Yourself id={yourself.id} initial={yourself.initial} name={yourself.name} dues={yourself.dues} />}
        {people.map((el, index) => (
          <Person key={index} id={el.id} name={el.name} dues={el.dues} />
        ))}
      </div>
    </div>
  )
}

export default PeopleContainer