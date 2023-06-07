import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  useEffect(() => {
    fetch(`http://localhost:3001/pets/`)
      .then((resp) => resp.json())
      .then((petArr) => setPets(petArr));
  }, []);
  function onChangeType(filter) {
    const filterObj = {
      type: filter,
    };
    setFilters(filterObj);
  }
  function onFindPetsClick() {
    const filterURL = filters.type === "all" ? "" : `?type=${filters.type}`;
    fetch(`http://localhost:3001/pets/${filterURL}`)
      .then((resp) => resp.json())
      .then((petArr) => setPets(petArr));
  }
  function onAdoptPet(adoptedPetID) {
    const adoptedPetArr = pets.map((pet) => {
      if (pet.id === adoptedPetID) {
        pet.isAdopted = true;
      }
      return pet;
    });
    setPets(adoptedPetArr);
  }
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
