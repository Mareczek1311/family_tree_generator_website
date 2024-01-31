class Person{
    constructor(name, id, children = [], plec = 0, malzonek = null, father = null, mother = null) {
        this.realName = name;
        this.id = id;
        this.name =  "|| " + id + " " + name;
        this.children = children;
        this.father = father;
        this.mother = mother;
        this.plec = plec;
        this.malzonek = malzonek
      }

    changeName(newName) {
        return new Person(newName, this.id, this.children);
    }
}

export default Person;