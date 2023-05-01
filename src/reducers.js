const s10chLocalStorageKey = "s10ch";
const NOT_EKLE = "NOT_EKLE";
const NOT_SIL = "NOT_SIL";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    localStorageStateYaz(key, baslangicDegerleri);
    return baslangicDegerleri;
  }
}

export default function reducer(state = baslangicNotlariniGetir(s10chLocalStorageKey), action) {
  switch(action.type) {
    case NOT_EKLE:
      const newNotes = [...state.notlar, action.payload];
      const newState = {...state, notlar: newNotes};
      localStorageStateYaz(s10chLocalStorageKey, newState);
      return newState;

    case NOT_SIL:
      const notID = action.payload;
      const deletedNotesList = state.notlar.filter(not => not.id !== notID);
      const deletedNotesState = {...state, notlar: deletedNotesList};
      localStorageStateYaz(s10chLocalStorageKey, deletedNotesState)
      return deletedNotesState;

    default: 
      return state;
      
  }
}