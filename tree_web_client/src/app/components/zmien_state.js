function zmien_state(state, lvl, plec) {
  if (state == "-1") {
    return "-1";
  }

  if (lvl == 1) {
    //meskie
    if (state == "wuj" || state == "ciotka") {
      if (plec == 0) {
        return "kuzyn";
      } else {
        return "kuzynka";
      }
    }
    if (state == "ojciec" || state == "matka") {
      if (plec == 0) {
        return "brat";
      } else {
        return "siostra";
      }
    }
    if (state == "dziadek" || state == "babcia") {
      if (plec == 0) {
        return "wuj";
      } else {
        return "ciotka";
      }
    }
    if (state == "brat" || state == "bratowa") {
      if (plec == 0) {
        return "bratanek";
      } else {
        return "bratanica";
      }
    }
    if (state == "pradziadek" || state == "prababcia") {
      if (plec == 0) {
        return "dziadek";
      } else {
        return "babcia";
      }
    }
    if (state == "probant" || state == "zona" || state == "maz") {
      if (plec == 0) {
        return "syn";
      } else {
        return "corka";
      }
    }
    if (state == "syn" || state == "corka") {
      if (plec == 0) {
        return "wnuk";
      } else {
        return "wnuczka";
      }
    }
  } else if (lvl == -1) {
    if (state == "kuzyn" || state == "kuzynka") {
      if (plec == 0) {
        return "wuj";
      } else {
        return "ciotka";
      }
    }
    if (state == "ojciec" || state == "matka") {
      if (plec == 0) {
        return "dziadek";
      } else {
        return "babcia";
      }
    }
    if (state == "dziadek" || state == "babcia") {
      if (plec == 0) {
        return "pradziadek";
      } else {
        return "prababcia";
      }
    }
    if (state == "syn" || state == "probant" || state == "corka") {
      if (plec == 0) {
        return "ojciec";
      } else {
        return "matka";
      }
    }
    if (state == "wuj" || state == "ciotka") {
      if (plec == 0) {
        return "dziadek";
      } else {
        return "babcia";
      }
    }
  }
  return "nieokreslony";
}

export default zmien_state;
