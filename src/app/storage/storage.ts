
const keys = ['auth']

export function loadData() {
  try {
    const data = {}
    keys.forEach(key => {
      const itemDataText = localStorage.getItem(key)
      const itemData = JSON.parse(itemDataText)
      data[key] = itemData;
    })
    return data
  } catch (error) {
    return {}
  }
}
