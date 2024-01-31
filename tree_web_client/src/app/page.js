"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Tree } from "react-tree-graph";
import "react-tree-graph/dist/style.css";
import Person from "./components/person";
import { useEffect, useState } from "react";
import InputINT from "./components/inputINT";
import zmien_state from "./components/zmien_state";
import sprawdzPokrewienstwo from "./components/sprawdzPokrewienstwo";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [prokrewienstwo, setPokrewienstwo] = useState("")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function toggleInfo() {
    setShowInfo(!showInfo);
  }

  const [gloabl_id, set_global_id] = useState(1);

  const [arr, setArr] = useState([new Person("korzen", 0, [], 0)]);
  const [data, setData] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const [int_ADD, set_int_ADD] = useState(0);
  const [int_OD, set_int_OD] = useState(-1);
  const [int_DO, set_int_DO] = useState(-1);
  const [int_DEL, set_int_DEL] = useState(0);
  const [int_CHECK, set_int_CHECK] = useState(0);
  const [int_LOAD, set_int_LOAD] = useState(0);

  function addChildren(idx, name, global_id) {
    if (findPerson(idx, arr) == null) {
      return;
    }

    const newPerson = new Person(name, global_id, [], 0);

    if (arr[idx].plec == 0) {
      newPerson.father = arr[idx];
      newPerson.mother = dodaj_malzonka(arr[idx]);
    } else {
      newPerson.mother = arr[idx];
      newPerson.father = dodaj_malzonka(arr[idx]);
    }

    const newArr = [...arr, newPerson];
    newArr[idx].children = [...newArr[idx].children, newPerson];
    setArr(newArr);

    const a = global_id;

    set_global_id(a + 1);
  }

  function findPerson(id, arr) {
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i])
      if (arr[i].id == id) {
        return arr[i];
      }
    }
    return null;
  }

  function saveData() {
    const newData = [...data];

    newData.push([])
    for(let i=0; i<arr.length; i++){
      newData[newData.length-1].push(new Person(arr[i].realName, arr[i].id, [], arr[i].plec, arr[i].malzonek, arr[i].father, arr[i].mother))      
    }

    for(let i=0; i<arr.length; i++){
      for(let j=0; j<arr[i].children.length; j++){
        console.log("HEREEE")
        const person = findPerson(arr[i].children[j].id, newData[newData.length-1])

        if(person != undefined){
          newData[newData.length-1][i].children.push(person)

        }
      }
    }
    console.log(newData)

    setData([...newData]);
  }

  function loadData(idx) {
    const newData = [...data[idx]]
    setArr([...newData])
  }

  function remove(idx) {
    let person = findPerson(idx, arr);

    if (person == null) {
      return;
    }
    person.realName = "Nieznany";
    person.name = "| " + person.id + " Nieznany";
    const newArr = [...arr];
    newArr[idx] = person;
    setArr(newArr);
  }

  function getInfo(idx) {
    let person = findPerson(idx, arr);

    if (person == null) {
      return (
        <div>
          <p>NIE MA TAKIEGO ID</p>
        </div>
      );
    }

    return (
      <div>
        <p>Imie: {person.realName}</p>
      </div>
    );
  }

  function dodaj_malzonka(osoba) {
    if (osoba.malzonek != null) {
      return osoba.malzonek;
    }
    return null;
  }


  return (
    <div>
      <div className={styles.treeSection}>
        <Tree data={arr[0]} height={400} width={400} />
      </div>

      <div className={styles.optionSection}>
        <div className={styles.container}>
          <h2>Dodaj osobę</h2>
          <p>Podaj imie</p>
          <input
            className="form-control"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />

          <p>Potomek kogo:</p>
          <InputINT value={int_ADD} setValue={set_int_ADD} />

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addChildren(int_ADD, inputValue, gloabl_id)}
          >
            Dodaj osobe
          </button>
        </div>

        <div className={styles.container}>
          <h2>Sprawdz osobe</h2>

          <InputINT value={int_CHECK} setValue={set_int_CHECK} />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => toggleInfo()}
          >
            Sprawdz
          </button>

          {showInfo ? getInfo(int_CHECK) : ""}
        </div>

        <div className={styles.container}>
          <h2>Sprawdz pokrewienstwo</h2>
          <p>Od:</p>
          <InputINT value={int_OD} setValue={set_int_OD} />
          <p>Do:</p>
          <InputINT value={int_DO} setValue={set_int_DO} />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => sprawdzPokrewienstwo(int_OD, int_DO)}
          >
            Sprawdz
          </button>

          <p>Pokrewienstwo: {prokrewienstwo}</p>
        </div>

        <div className={styles.container}>
          <h2>Usun</h2>
          <p>index:</p>
          <InputINT value={int_DEL} setValue={set_int_DEL} />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => remove(int_DEL)}
          >
            Usun osobe
          </button>
        </div>
        <div className={styles.container}>
          <h2>Zapisz</h2>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => saveData()}
          >
            Zapisz
          </button>
        </div>
        <div className={styles.container}>
          <h2>Wczytaj</h2>
          <div>Dostepne drzewa:</div>
          <p>Index: </p>
          {data.map((item, index) => (
            <div>{index}</div>
          ))}
          <InputINT value={int_LOAD} setValue={set_int_LOAD} /> <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => loadData(int_LOAD)}
          >
            Wczytaj
          </button>
        </div>
      </div>
    </div>
  );
}
