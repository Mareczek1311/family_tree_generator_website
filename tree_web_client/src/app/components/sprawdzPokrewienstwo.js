import findPerson from "./findPerson";
import zmien_state from "./zmien_state";
import dodaj_malzonka from "./dodajMalzonka";

function sprawdzPokrewienstwo(od_id, do_id, data) {
  console.log("findPerson:", data);
  let od_ = findPerson(od_id, data);
  let do_ = findPerson(do_id, data);

  let state = "probant";

  let pair = [od_, state];
  let pair2 = [-1, -1];

  let q = [];

  q.push(pair);

  var visited = [];

  while (q.length != 0) {
    let curr = [0,0];
    curr[0] = q[0][0];
    curr[1] = q[0][1];
    q.shift();

    console.log("AKTUALNIE: ", curr[0], " | state: ", curr[1])
    console.log(visited)

    if (curr[0].id == do_id) {
      console.log("POKREWIENSTWO: ", curr[1])
      return curr[1];
    }

    if(visited.includes(curr[0].id)){
      continue
    }
    if (findPerson(curr[0].id, data) == null) {
      continue;
    }


    visited.push(curr[0].id);


 
    
    console.log("DZIECI: ", curr[0].children)
    for (let i = 0; i < curr[0].children.length; i++) {
      if (!visited.includes(curr[0].children[i].id) && curr[0].children[i] != null) {
        console.log("DODAJE",curr[0].children[i])
        pair[0] = curr[0].children[i];
        pair[1] = zmien_state(curr[1], 1, pair[0].plec);
        q.push(pair);

        let malzonek = dodaj_malzonka(pair[0]);
        if (malzonek != null) {
          pair2[0] = malzonek;
          pair2[1] = zmien_state(curr[1], 1, pair[0].plec);
          q.push(pair2);
        }
      }
      else{
        console.log("TA OSOBA JEST JUZ: ", curr[0].children[i])
      }
    }


    if (curr[0].father != null && !visited.includes(curr[0].father.id)) {
      console.log("DODAJE OJCA: ", curr[0].father)
      pair[0] = curr[0].father;
      pair[1] = zmien_state(curr[1], -1, pair[0].plec);
      q.push(pair);
    }

    if (curr[0].mother != null && !visited.includes(curr[0].mother.id)) {
      console.log("DODAJE")

      pair[0] = curr[0].mother;
      pair[1] = zmien_state(curr[1], -1, pair[0].plec);
      q.push(pair);
    }
  }
}
export default sprawdzPokrewienstwo;
