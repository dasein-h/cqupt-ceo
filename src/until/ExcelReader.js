function readWorkbookFromLocalFile(file, callback) {
	var reader = new FileReader()
	reader.onload = function(e) {
		var data = e.target.result
		var workbook = XLSX.read(data, {type: 'binary'})
		if(callback) callback(workbook)
	};
	reader.readAsBinaryString(file)
}
function outputWorkbook(workbook) {
	var sheetNames = workbook.SheetNames
	sheetNames.forEach(name => {
		var worksheet = workbook.Sheets[name]
		for(var key in worksheet) {
			// v是读取单元格的原始值
			console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v)
		}
	})
}