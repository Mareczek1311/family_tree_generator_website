
function sprawdzPokrewienstwo(od_id, do_id) {
    let od_ = findPerson(od_id);
    let do_ = findPerson(do_id);

    let state = "probant";

    let pair = [od_, state];
    let pair2 = [-1, -1];

    let q = [];

    q.push(pair);

    let visited = [od_];

    while (q.length != 0) {

      let curr = q[0];
      q.shift();

      visited.push(curr[0]);

      if (findPerson(curr[0].id) == null) {
        continue;
      }

      if (curr[0].id == do_.id) {
        console.log("POKREWIENSTWO: ", curr[1]);
        setPokrewienstwo(curr[1])
        return curr[1];
      }

      for (let i = 0; i < curr[0].children.length; i++) {
        console.log("DZIECKO: ", curr[0].children[i]);
        let found = -1;
        for (let j = 0; j < visited.length; j++) {
          if (visited[j] == curr[0].children[i]) {
            found = 1;
          }
        }

        if (found == -1) {
          visited.push(curr[0]);
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
      }

      let found2 = -1;
      let found = -1;

      for (let j = 0; j < visited.length; j++) {
        if (curr[0].father != null && visited[j] == curr[0].father) {
          found = 1;
        }
        if (curr[0].mother != null && visited[j] == curr[0].mother) {
          found2 = 1;
        }
      }

      if (found == -1 && curr[0].father != null) {
        pair[0] = curr[0].father;
        pair[1] = zmien_state(curr[1], -1, pair[0].plec);
        q.push(pair);
      }

      if (found2 == -1 && curr[0].mother != null) {
        pair[0] = curr[0].mother;
        pair[1] = zmien_state(curr[1], -1, pair[0].plec);
        q.push(pair);
      }
    }
  }
  export default sprawdzPokrewienstwo