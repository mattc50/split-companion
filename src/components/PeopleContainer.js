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
    // padding: "1rem 0",
    // overflowY: "auto"
    overflowY: "hidden"

  },
  container: {
    transition: "0.1s",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    // maxHeight: "calc((62.95px* 4.5) + 32px)",
    // maxHeight: "25vh",
    // maxHeight: "100%",
    maxHeight: "calc(100% - 4rem)",
    overflowY: "auto"
    // overflowX: "visible",
  }
}

const PeopleContainer = () => {
  const { yourself, people, numPeople, revPeople, addPerson, activeItem } = useAppContext()

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
    // console.log('rerun')
  }, [people, numPeople])


  return (
    <div style={styles.root}>
      <SectionHeader use="People" btnFunc={addNewPerson} showNum />
      <div className="people-container" style={styles.container}>
        {activeItem && <Yourself id={yourself.id} initial={yourself.initial} name={yourself.name} dues={yourself.dues} />}
        {revPeople.map((el, index) => (
          <Person key={index} id={el.id} name={el.name} dues={el.dues} />
        ))}
      </div>
    </div>
  )
}

export default PeopleContainer