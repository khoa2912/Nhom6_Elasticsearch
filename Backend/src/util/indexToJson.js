
function indexToJsonView(index) {
    // const listIndex = []
    // var i = index.length / 10
    // for (var j = 0; j < i; j++) {
    //     console.log(j)
    //     newIndex = index.slice(j, j + 10)
    //     createdIndex = CreateIndexJson(j, newIndex)
    //     JSON.parse(createIndex)
    //     listIndex.push(createIndex)
    // }
    // console.log(listIndex)
    // return listIndex
    return JSON.parse(index)
}

function CreateIndexJson(index) {
    const list = []
    for (var i = 0; i < index.length / 10; i++) {
        var j = i * 10
        const newIndexJson = {
            "id": i,
            "health": index[j],
            "status": index[j + 1],
            "index": index[j + 2],
            "uuid": index[j + 3],
            "pri": index[j + 4],
            "rep": index[j + 5],
            "docs_count": index[j + 6],
            "docs_deleted": index[j + 7],
            "store_size": index[j + 8],
            "pri_store_size": index[j + 9],
        }
        list.push(newIndexJson)
    }


    return list
}

module.exports = {
    indexToJsonView, CreateIndexJson
}