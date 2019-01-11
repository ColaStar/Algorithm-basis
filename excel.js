
//var XLSX = require('xlsx'), 去除，如需要独立在html外部引入，目的是减少js文件的大小

// 字符串转字符流
function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}
/**
 *
 * @param {*} data 要生成excel的数据 ,数据模型:[{sheetName:'excel表单名称',data:[{}]}]  .data数据为数据数组
 * @param {*} downName
 * @param {*} adom
 */
export function downloadExl(data, downName, adom) {
  if (!data || data.length === 0) {
    return
  }
  const tmpWorkbook = { SheetNames: [], Sheets: {}}
  data.forEach(element => {
    const sheet = XLSX.utils.json_to_sheet(element.data, { skipHeader: true })
    tmpWorkbook.SheetNames.push(element.sheetName)
    tmpWorkbook.Sheets[element.sheetName] = Object.assign({},
      sheet)
  })

  const tmpDown = new Blob([s2ab(XLSX.write(tmpWorkbook, { bookType: 'xlsx', bookSST: false, type: 'binary' }))], { type: '' }) // 创建二进制对象写入转换好的字节流

  downloadBlob(tmpDown, downName + '.xlsx')
}

const DOWNLOAD_A_ID = '____a_____'

export function downloadBlob(blob, name) {
  if (!blob) return
  var href = URL.createObjectURL(blob) // 创建对象超链接
  var adom = document.getElementById(DOWNLOAD_A_ID)
  if (!adom) {
    adom = document.createElement('a')
    adom.id = DOWNLOAD_A_ID
    adom.style.display = 'none'
    document.body.appendChild(adom)
  }
  adom.download = name // 下载名称
  adom.href = href // 绑定a标签
  adom.click() // 模拟点击实现下载
  setTimeout(function() { // 延时释放
    URL.revokeObjectURL(blob) // 用URL.revokeObjectURL()来释放这个object URL
  }, 100)
}

export function importFile(file) {
  return new Promise((resolve, reject)=>{
    if (!file) {
      reject('文件不存在')
    } else {
      var reader = new FileReader()
      reader.onload = function(e) {
        const data = e.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        if (workbook && workbook.SheetNames && workbook.SheetNames.length) {
          var res = []
          workbook.SheetNames.forEach(sheetName => {
            const tmp = {}
            tmp.sheetName = sheetName
            tmp.data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })
            res.push(tmp)
          })
          resolve(res)
        } else {
          reject('数据不存在')
        }
      }
      reader.readAsBinaryString(file)
    }
  })
}
