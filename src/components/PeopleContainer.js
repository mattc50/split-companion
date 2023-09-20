import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import Person from './Person'

import { useAppContext } from '../context/appContext';

const styles = {
  root: {
    margin: "0 16px",
    paddingTop: "1rem"
  }
}

const PeopleContainer = () => {
  const { people, addPerson } = useAppContext()

  const addNewPerson = () => {
    const person = ({
      name: "",
    })
    addPerson(person)
  }

  return (
    <div style={styles.root}>
      <SectionHeader use="People" btnFunc={addNewPerson} />
      {people.map((el, index) => (
        <Person key={index} id={`person-${index}`} name={el.name} />
      ))}
    </div>
  )
}

export default PeopleContainer