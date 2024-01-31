function findPerson(id, arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (arr[i].id == id) {
      return arr[i];
    }
  }
  return null;
}

export default findPerson;
