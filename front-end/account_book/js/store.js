export const store = {
  currentFunds : 0,
  isFirstEdit : true,
  todayId : 1,
  dateList : [],
  detailList : {},
}

export function updateStorage(){
  sessionStorage.setItem("store", JSON.stringify((store)));
}

export function initStore(){
  const storage = sessionStorage.getItem("store");
  if(!storage) updateStorage();
  const { dateList, detailList , todayId, currentFunds, isFirstEdit } = JSON.parse(storage);
  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNuewHistory(newHistory){
  try{
    store.currentFunds = newHistory.fundsAtTheTime;
    store.detailList[store.todayId].push(newHistory);
    updateStorage();

    return true;
  }catch(error){
    alert(error);
    return false;
  }
}